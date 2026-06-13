import { computed, effect, inject } from '@angular/core';

import { EMPTY, from, pipe } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { AuthStore } from '@kookio/feature-auth';
import type { SavedRecipeRow } from '@kookio/prisma-client';

import { SAVED_TRPC } from '../saved-trpc';

export type SavedView = 'FLAT' | 'CUISINES' | 'CATEGORIES';

interface SavedState {
  /** Full saved rows for the `/recipes/saved` page. Populated by `load()`. */
  items: SavedRecipeRow[];

  /**
   * Authoritative set of saved recipe ids. Hydrated by `loadIds()` so any
   * surface (recipe detail, match cards) can read `isSaved(id)` synchronously
   * without an N+1 per-card query.
   */
  ids: Set<string>;

  /** True during the initial page-level load; drives the skeleton. */
  isLoading: boolean;

  /**
   * Per-recipe pending flag — used by the toggle button to disable itself
   * while a mutation is in flight, so a fast double-click cannot enqueue
   * a second toggle before the first settles.
   */
  pendingIds: Set<string>;

  /** Last error message to surface as a snackbar. */
  error: string | null;

  /** Active view for the toggle on `/recipes/saved`. */
  view: SavedView;
}

const initialState: SavedState = {
  items: [],
  ids: new Set(),
  isLoading: false,
  pendingIds: new Set(),
  error: null,
  view: 'FLAT',
};

const errorMessage = (action: string, err: unknown): string => {
  const fallback = `Could not ${action}`;
  if (typeof err === 'object' && err !== null && 'message' in err) {
    const msg = (err as { message?: unknown }).message;
    return typeof msg === 'string' && msg.length > 0 ? msg : fallback;
  }
  return fallback;
};

const UNCATEGORIZED_KEY = '__uncategorized__';

/**
 * Group key shape — keys are stable identifiers, label/emoji carry the data
 * the template renders. Using `id ?? UNCATEGORIZED_KEY` for the key (instead
 * of e.g. the label) prevents collisions when two distinct categories share a
 * display name.
 */
export interface SavedGroup {
  key: string;
  label: string;
  emoji: string | null;
  items: SavedRecipeRow[];
}

const groupBy = (
  items: SavedRecipeRow[],
  pick: (r: SavedRecipeRow) => {
    id: string | null | undefined;
    label: string;
    emoji: string | null;
  } | null,
  fallbackLabel: string,
): SavedGroup[] => {
  const groups = new Map<string, SavedGroup>();
  for (const row of items) {
    const meta = pick(row);
    const key = meta?.id ?? UNCATEGORIZED_KEY;
    const existing = groups.get(key);
    if (existing) {
      existing.items.push(row);
    } else {
      groups.set(key, {
        key,
        label: meta?.label ?? fallbackLabel,
        emoji: meta?.emoji ?? null,
        items: [row],
      });
    }
  }
  // Stable alphabetical order, with fallback bucket last.
  return [...groups.values()].sort((a, b) => {
    if (a.key === UNCATEGORIZED_KEY) return 1;
    if (b.key === UNCATEGORIZED_KEY) return -1;
    return a.label.localeCompare(b.label);
  });
};

/**
 * Saved-recipes state.
 *
 * Two related slices: `ids` (a `Set<string>` hydrated up-front for the cross-
 * surface `isSaved(id)` lookup) and `items` (the full saved-recipe rows used
 * by the `/recipes/saved` page). `toggleSave` keeps both in sync — page-level
 * UI gets the new card immediately, and the per-recipe `isSaved` computed
 * everywhere else flips on the same tick.
 */
export const SavedStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed(({ items }) => ({
    totalCount: computed(() => items().length),

    /** Saved rows grouped by `MealArea` (cuisine). */
    groupedByCuisine: computed(() =>
      groupBy(
        items(),
        (row) =>
          row.recipe.area
            ? {
                id: row.recipe.area.id,
                label: row.recipe.area.name,
                emoji: row.recipe.area.flag,
              }
            : null,
        'Other',
      ),
    ),

    /** Saved rows grouped by `MealCategory`. */
    groupedByCategory: computed(() =>
      groupBy(
        items(),
        (row) =>
          row.recipe.category
            ? {
                id: row.recipe.category.id,
                label: row.recipe.category.name,
                emoji: row.recipe.category.emoji,
              }
            : null,
        'Uncategorized',
      ),
    ),
  })),

  withMethods((store) => {
    const trpc = inject(SAVED_TRPC);

    /** Cross-surface synchronous lookup — used by the save toggle. */
    const isSaved = (recipeId: string): boolean => store.ids().has(recipeId);

    const isPending = (recipeId: string): boolean =>
      store.pendingIds().has(recipeId);

    return {
      clearError: (): void => {
        patchState(store, { error: null });
      },

      setView: (view: SavedView): void => {
        patchState(store, { view });
      },

      isSaved,
      isPending,

      /**
       * Hydrate the saved-id set. Cheap call invoked from `AuthStore`'s
       * post-login hook so every Save toggle on the page knows its initial
       * state without per-card hidration.
       */
      loadIds: rxMethod<void>(
        pipe(
          switchMap(() =>
            from(trpc.recipeCollection.getSavedIds.query()).pipe(
              tap((ids) => patchState(store, { ids: new Set(ids) })),
              catchError(() => {
                return EMPTY;
              }),
            ),
          ),
        ),
      ),

      /** Full saved list — called by `/recipes/saved`. */
      load: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap(() =>
            from(trpc.recipeCollection.getSaved.query()).pipe(
              tap((rows) =>
                patchState(store, {
                  items: rows,
                  ids: new Set(rows.map((r) => r.recipe.id)),
                  isLoading: false,
                }),
              ),
              catchError((err: unknown) => {
                patchState(store, {
                  isLoading: false,
                  error: errorMessage('load saved recipes', err),
                });
                return EMPTY;
              }),
            ),
          ),
        ),
      ),

      /**
       * Optimistically flip the toggle for `recipeId`, then settle to the
       * server's answer. The optimistic path is necessary because the same
       * toggle drives both the save buttons (where the snap is the entire UX)
       * and the saved page (where the card animates out).
       *
       * `pendingIds` is set on dispatch and cleared on settle so a fast
       * double-click renders the second click as a no-op via the button's
       * `[disabled]` binding.
       */
      toggleSave: rxMethod<{ recipeId: string; recipe?: SavedRecipeRow }>(
        pipe(
          tap(({ recipeId, recipe }) => {
            const ids = new Set(store.ids());
            const items = store.items();
            const wasSaved = ids.has(recipeId);

            if (wasSaved) {
              ids.delete(recipeId);
              patchState(store, {
                ids,
                items: items.filter((i) => i.recipe.id !== recipeId),
                pendingIds: new Set(store.pendingIds()).add(recipeId),
                error: null,
              });
            } else {
              ids.add(recipeId);
              patchState(store, {
                ids,
                items: recipe ? [recipe, ...items] : items,
                pendingIds: new Set(store.pendingIds()).add(recipeId),
                error: null,
              });
            }
          }),
          switchMap(({ recipeId, recipe }) =>
            from(trpc.recipeCollection.toggleSave.mutate({ recipeId })).pipe(
              tap((result) => {
                // Settle: trust the server's `saved` flag. If it diverges
                // from our optimistic guess, rewrite both `ids` and `items`
                // so the two slices stay coherent.
                const ids = new Set(store.ids());
                let items = store.items();
                if (result.saved && !ids.has(recipeId)) {
                  ids.add(recipeId);
                  if (recipe && !items.some((i) => i.recipe.id === recipeId)) {
                    items = [recipe, ...items];
                  }
                } else if (!result.saved && ids.has(recipeId)) {
                  ids.delete(recipeId);
                  items = items.filter((i) => i.recipe.id !== recipeId);
                }
                const pendingIds = new Set(store.pendingIds());
                pendingIds.delete(recipeId);
                patchState(store, { ids, items, pendingIds });
              }),
              catchError((err: unknown) => {
                // Rollback optimistic flip.
                const ids = new Set(store.ids());
                let items = store.items();
                const wasSaved = ids.has(recipeId);
                if (wasSaved) {
                  ids.delete(recipeId);
                  items = items.filter((i) => i.recipe.id !== recipeId);
                } else {
                  ids.add(recipeId);
                  if (recipe && !items.some((i) => i.recipe.id === recipeId)) {
                    items = [recipe, ...items];
                  }
                }
                const pendingIds = new Set(store.pendingIds());
                pendingIds.delete(recipeId);
                patchState(store, {
                  ids,
                  items,
                  pendingIds,
                  error: errorMessage('save recipe', err),
                });
                return EMPTY;
              }),
            ),
          ),
        ),
      ),
    };
  }),

  withHooks((store) => {
    const authStore = inject(AuthStore);
    return {
      onInit: (): void => {
        // Hydrate the saved-id set whenever the session lands in an
        // onboarded state. We track the prior session-uid so the "logout"
        // branch only fires on a real null transition — not on the
        // effect's first run, which would otherwise wipe state set by an
        // earlier `load()` / `loadIds()` call in the same microtask flush.
        let priorUid: string | null = null;
        effect(() => {
          const session = authStore.session();
          const nextUid = session?.uid ?? null;

          if (session && session.onboardingDone) {
            store.loadIds();
          } else if (priorUid !== null && nextUid === null) {
            // Real logout transition (uid → null) — drop the previous
            // user's optimistic state so the next user starts clean.
            patchState(store, {
              ids: new Set<string>(),
              items: [],
              pendingIds: new Set<string>(),
            });
          }

          priorUid = nextUid;
        });
      },
    };
  }),
);
