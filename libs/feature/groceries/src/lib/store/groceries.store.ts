import { computed, inject } from '@angular/core';

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

import { noopLogger } from '@kookio/core-logging';
import type { IngredientCategory } from '@kookio/prisma-client';

import { GROCERIES_TRPC, type GroceryItem } from '../groceries-trpc';

/**
 * External input to `GroceriesStore.toggleBought` — the store computes the
 * `intendedState` field (server contract) from local state internally.
 */
export interface GroceriesToggleInput {
  ingredientCatalogId: string;
}

const log = noopLogger;

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
}

const initialState: GroceriesState = {
  items: [],
  isLoading: false,
  isMutating: false,
  error: null,
  unpersistedNotice: false,
};

const errorMessage = (action: string, err: unknown): string => {
  const fallback = `Could not ${action} groceries`;
  if (typeof err === 'object' && err !== null && 'message' in err) {
    const msg = (err as { message?: unknown }).message;
    return typeof msg === 'string' && msg.length > 0 ? msg : fallback;
  }
  return fallback;
};

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

/**
 * Groceries CRUD state.
 *
 * Provided at the root: `load()` replaces `items` on every navigation to
 * `/groceries`, so cross-tab edits to plan or pantry surface on the next
 * visit. The reload button on the page calls `load()` again to pick up
 * mid-session changes without a navigation.
 *
 * `toggleBought` is optimistic — flips the local `isBought` immediately
 * and rolls back on server failure. The bought-state lives in Redis with
 * a 7-day TTL; the server returns updated counts on every successful
 * toggle so the counter stays honest after stale entries get filtered out.
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

    return {
      clearError: (): void => {
        patchState(store, { error: null });
      },

      clearUnpersistedNotice: (): void => {
        patchState(store, { unpersistedNotice: false });
      },

      load: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap(() =>
            from(trpc.groceries.list.query()).pipe(
              tap((items) => patchState(store, { items, isLoading: false })),
              catchError((err: unknown) => {
                log.warn({ err }, 'groceries.list failed');
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
            patchState(store, {
              isMutating: true,
              error: null,
              items: store
                .items()
                .map((i) =>
                  i.ingredientCatalogId === mutationInput.ingredientCatalogId
                    ? { ...i, isBought: mutationInput.intendedState }
                    : i,
                ),
            });
          }),
          switchMap((mutationInput) =>
            from(trpc.groceries.toggleBought.mutate(mutationInput)).pipe(
              tap((result) => {
                if (result.persisted) {
                  // Reconcile with the server's authoritative `isBought` —
                  // protects against drift if local state was already stale
                  // (e.g. another tab toggled the same row a moment earlier).
                  patchState(store, {
                    isMutating: false,
                    items: store
                      .items()
                      .map((i) =>
                        i.ingredientCatalogId ===
                        mutationInput.ingredientCatalogId
                          ? { ...i, isBought: result.isBought }
                          : i,
                      ),
                  });
                } else {
                  // Redis blip — server confirmed the toggle but couldn't
                  // persist. Keep the optimistic flip and surface a notice
                  // the page renders as a one-time snackbar.
                  patchState(store, {
                    isMutating: false,
                    unpersistedNotice: true,
                  });
                }
              }),
              catchError((err: unknown) => {
                log.warn({ err }, 'groceries.toggleBought failed');
                // Real failure (network down, derivation crash, etc.) — roll
                // back the optimistic flip back to the prior state.
                patchState(store, {
                  isMutating: false,
                  error: errorMessage('toggle', err),
                  items: store
                    .items()
                    .map((i) =>
                      i.ingredientCatalogId ===
                      mutationInput.ingredientCatalogId
                        ? { ...i, isBought: !mutationInput.intendedState }
                        : i,
                    ),
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
