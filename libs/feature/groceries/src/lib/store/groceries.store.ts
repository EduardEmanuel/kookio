import { computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { EMPTY, from, pipe } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { AuthStore } from '@kookio/feature-auth';
import type { IngredientCategory } from '@kookio/prisma-client';
import { reportError } from '@kookio/shared-observability';
import { messageFromError } from '@kookio/shared-utility';

import { GROCERIES_TRPC, type GroceryItem } from '../groceries-trpc';

/**
 * External input to `GroceriesStore.toggleBought` — the store computes the
 * `intendedState` field (server contract) from local state internally.
 */
export interface GroceriesToggleInput {
  ingredientCatalogId: string;
}

/**
 * localStorage key prefix for the bought-state cache; the per-user
 * namespace is appended on read/write. Mirrors the plan-draft pattern
 * (`kookio:plan-draft:<uid>`) for visual symmetry across stores.
 */
const BOUGHT_CACHE_PREFIX = 'kookio:groceries-bought:';

interface GroceriesState {
  items: GroceryItem[];
  isLoading: boolean;
  isMutating: boolean;
  error: string | null;
  /**
   * True when the most recent toggle returned `persisted: false` — server
   * could not persist (Redis blip). The page surfaces this once as a
   * snackbar, then calls `clearUnpersistedNotice()`.
   */
  unpersistedNotice: boolean;
  /**
   * Set after a successful `addBoughtToPantry` so the page can show a
   * snackbar with the counts. Cleared by the page once shown.
   */
  addBoughtResult: {
    added: number;
    merged: number;
    skipped: number;
  } | null;
}

const initialState: GroceriesState = {
  items: [],
  isLoading: false,
  isMutating: false,
  error: null,
  unpersistedNotice: false,
  addBoughtResult: null,
};

const errorMessage = (action: string, err: unknown): string =>
  messageFromError(err, `Could not ${action} groceries`);

export type GroceryGroup = {
  category: IngredientCategory | null;
  items: readonly GroceryItem[];
};

/**
 * Stable display order — matches a typical supermarket flow rather than
 * alphabetical, so the list reads top-to-bottom as the user walks aisles.
 * Anything not listed here (or `null` category) falls into the "Other"
 * bucket at the end.
 */
const CATEGORY_ORDER: readonly IngredientCategory[] = [
  'PRODUCE',
  'MEAT',
  'FISH',
  'DAIRY',
  'GRAINS',
  'LEGUMES',
  'NUTS',
  'HERBS',
  'SPICES',
  'CONDIMENTS',
  'BEVERAGES',
  'SWEETS',
  'OTHER',
];

const categoryRank = (cat: IngredientCategory | null): number => {
  if (cat === null) return CATEGORY_ORDER.length + 1;
  const idx = CATEGORY_ORDER.indexOf(cat);
  return idx === -1 ? CATEGORY_ORDER.length : idx;
};

const groupByCategory = (items: readonly GroceryItem[]): GroceryGroup[] => {
  const groups = new Map<IngredientCategory | null, GroceryItem[]>();
  for (const item of items) {
    const list = groups.get(item.category);
    if (list) list.push(item);
    else groups.set(item.category, [item]);
  }
  return [...groups.entries()]
    .map(([category, list]) => ({ category, items: list }))
    .sort((a, b) => categoryRank(a.category) - categoryRank(b.category));
};

interface BoughtCachePayload {
  boughtIds: string[];
}

const cacheKeyFor = (uid: string): string => `${BOUGHT_CACHE_PREFIX}${uid}`;

const safeReadCache = (
  uid: string,
  isBrowser: boolean,
): BoughtCachePayload | null => {
  if (!isBrowser) return null;
  try {
    const raw = window.localStorage.getItem(cacheKeyFor(uid));
    if (!raw) return null;
    return JSON.parse(raw) as BoughtCachePayload;
  } catch {
    return null;
  }
};

const safeWriteCache = (
  uid: string,
  payload: BoughtCachePayload,
  isBrowser: boolean,
): void => {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(cacheKeyFor(uid), JSON.stringify(payload));
  } catch {
    // Quota / Safari private browsing / disabled storage — accept the
    // loss. The toggle still works in-memory; cross-device sync via
    // Redis still works when reachable.
  }
};

const applyBoughtCacheOverride = (
  items: GroceryItem[],
  cached: ReadonlySet<string>,
): GroceryItem[] =>
  items.map((i) => ({
    ...i,
    isBought: cached.has(i.ingredientCatalogId),
  }));

/**
 * Groceries CRUD state.
 *
 * Provided at the root: `load()` replaces `items` on every navigation to
 * `/groceries`, so cross-tab edits to plan or pantry surface on the next
 * visit. The reload button on the page calls `load()` again to pick up
 * mid-session changes without a navigation.
 *
 * Bought-state persistence is belt-and-suspenders, mirroring the plan
 * draft strategy:
 *   - localStorage holds the device's view of bought IDs (zero-latency,
 *     offline-friendly)
 *   - Redis (via `groceries.toggleBought`) holds the cross-device
 *     authoritative state
 *   - Each toggle writes both
 *   - On `load`, the server response carries `boughtAvailable: boolean`
 *     so the client knows whether to trust `item.isBought` (Redis up,
 *     server canonical → also sync localStorage to match) or to override
 *     it from localStorage (Redis down, server returned a fallback empty
 *     set)
 *
 * Documented limitation: when Redis was unreachable during a toggle
 * (`persisted: false`), the localStorage cache holds the change until
 * Redis recovers. On the next successful list load the server's data is
 * canonical and any unconfirmed local change is dropped. A pending-writes
 * queue with retry-on-recovery would close that gap; out of scope here.
 *
 * `toggleBought` is optimistic — flips the local `isBought` immediately
 * (and writes localStorage) and rolls back on real server failure.
 */
export const GroceriesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed(({ items }) => ({
    activeItems: computed(() => items().filter((i) => !i.isBought)),
    boughtItems: computed(() => items().filter((i) => i.isBought)),
    totalCount: computed(() => items().length),
    remainingCount: computed(() => items().filter((i) => !i.isBought).length),
    boughtCount: computed(() => items().filter((i) => i.isBought).length),
    hasItems: computed(() => items().length > 0),
    groupedActive: computed(() =>
      groupByCategory(items().filter((i) => !i.isBought)),
    ),
    // Mirror of `groupedActive` for the "Done" section so bought items get
    // the same Produce/Meat/Dairy headers as active ones — keeps the user's
    // mental model of categories consistent across both halves of the page.
    groupedBought: computed(() =>
      groupByCategory(items().filter((i) => i.isBought)),
    ),
  })),

  withMethods((store) => {
    const trpc = inject(GROCERIES_TRPC);
    const authStore = inject(AuthStore);
    const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

    const writeCacheFromItems = (items: GroceryItem[]): void => {
      const uid = authStore.session()?.uid;
      if (!uid) return;
      const boughtIds = items
        .filter((i) => i.isBought)
        .map((i) => i.ingredientCatalogId);
      safeWriteCache(uid, { boughtIds }, isBrowser);
    };

    return {
      clearError: (): void => {
        patchState(store, { error: null });
      },

      clearUnpersistedNotice: (): void => {
        patchState(store, { unpersistedNotice: false });
      },

      clearAddBoughtResult: (): void => {
        patchState(store, { addBoughtResult: null });
      },

      load: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap(() =>
            from(trpc.groceries.list.query()).pipe(
              tap((response) => {
                const uid = authStore.session()?.uid;
                let items = response.items;

                if (response.boughtAvailable) {
                  // Server canonical — sync localStorage to match. This
                  // covers cross-device updates: the device that just
                  // loaded sees the latest bought-state from any device,
                  // and its cache catches up.
                  writeCacheFromItems(items);
                } else {
                  // Redis is down: server returned isBought=false for
                  // everything. Override from localStorage so the user
                  // doesn't lose their visible state on a Redis blip.
                  const cached = uid ? safeReadCache(uid, isBrowser) : null;
                  if (cached) {
                    items = applyBoughtCacheOverride(
                      items,
                      new Set(cached.boughtIds),
                    );
                  }
                }

                patchState(store, { items, isLoading: false });
              }),
              catchError((err: unknown) => {
                reportError(err, 'groceries.load');
                patchState(store, {
                  isLoading: false,
                  error: errorMessage('load', err),
                });
                return EMPTY;
              }),
            ),
          ),
        ),
      ),

      toggleBought: rxMethod<GroceriesToggleInput>(
        pipe(
          // Compute the intended state from local state BEFORE the optimistic
          // flip. The server uses this so a Redis blip (read failure) doesn't
          // force a fake toggle direction in the response.
          map((input) => {
            const current = store
              .items()
              .find((i) => i.ingredientCatalogId === input.ingredientCatalogId);
            return {
              ingredientCatalogId: input.ingredientCatalogId,
              intendedState: !(current?.isBought ?? false),
            };
          }),
          tap((mutationInput) => {
            const nextItems = store
              .items()
              .map((i) =>
                i.ingredientCatalogId === mutationInput.ingredientCatalogId
                  ? { ...i, isBought: mutationInput.intendedState }
                  : i,
              );
            patchState(store, {
              isMutating: true,
              error: null,
              items: nextItems,
            });
            // Belt write: localStorage in sync with the optimistic flip.
            // Survives refresh + offline + Redis-down cases.
            writeCacheFromItems(nextItems);
          }),
          switchMap((mutationInput) =>
            from(trpc.groceries.toggleBought.mutate(mutationInput)).pipe(
              tap((result) => {
                if (result.persisted) {
                  // Reconcile with the server's authoritative `isBought` —
                  // protects against drift if local state was already stale
                  // (e.g. another tab toggled the same row a moment earlier).
                  const reconciled = store
                    .items()
                    .map((i) =>
                      i.ingredientCatalogId ===
                      mutationInput.ingredientCatalogId
                        ? { ...i, isBought: result.isBought }
                        : i,
                    );
                  patchState(store, {
                    isMutating: false,
                    items: reconciled,
                  });
                  // Keep localStorage in sync with the post-reconcile
                  // state (server's isBought may differ from the
                  // optimistic flip if another device raced).
                  writeCacheFromItems(reconciled);
                } else {
                  // Redis blip — server confirmed the toggle but couldn't
                  // persist. Keep the optimistic flip + localStorage write
                  // (already done above) and surface a notice the page
                  // renders as a one-time snackbar.
                  patchState(store, {
                    isMutating: false,
                    unpersistedNotice: true,
                  });
                }
              }),
              catchError((err: unknown) => {
                reportError(err, 'groceries.toggleBought');
                // Real failure (network down, derivation crash, etc.) — roll
                // back the optimistic flip in BOTH the in-memory state and
                // localStorage.
                const rolledBack = store
                  .items()
                  .map((i) =>
                    i.ingredientCatalogId === mutationInput.ingredientCatalogId
                      ? { ...i, isBought: !mutationInput.intendedState }
                      : i,
                  );
                patchState(store, {
                  isMutating: false,
                  error: errorMessage('toggle', err),
                  items: rolledBack,
                });
                writeCacheFromItems(rolledBack);
                return EMPTY;
              }),
            ),
          ),
        ),
      ),

      /**
       * Bulk-move every currently-bought item into the pantry. On success,
       * drop the moved items from the local list and clear their bought
       * marks from the localStorage cache; the server has already cleared
       * Redis on its end. Sets `addBoughtResult` so the page can render a
       * snackbar with `Added X, merged Y, skipped Z` counts.
       */
      addBoughtToPantry: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isMutating: true, error: null })),
          switchMap(() =>
            from(trpc.groceries.addBoughtToPantry.mutate()).pipe(
              tap((result) => {
                // Trust the server: every bought item that wasn't `skipped`
                // is now in the pantry (or was already there and is gone
                // from the derived list). Drop bought items from the local
                // view en masse — the next reload reconciles with the
                // server's authoritative derive.
                const nextItems = store.items().filter((i) => !i.isBought);
                patchState(store, {
                  items: nextItems,
                  isMutating: false,
                  addBoughtResult: result,
                });
                // localStorage cache is now derivable from the items
                // array's `isBought` field (none after the filter above).
                writeCacheFromItems(nextItems);
              }),
              catchError((err: unknown) => {
                reportError(err, 'groceries.addBoughtToPantry');
                patchState(store, {
                  isMutating: false,
                  error: errorMessage('move to pantry', err),
                });
                return EMPTY;
              }),
            ),
          ),
        ),
      ),
    };
  }),
);
