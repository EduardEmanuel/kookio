import { computed, inject } from '@angular/core';

import { EMPTY, from, pipe } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { AuthStore } from '@kookio/feature-auth';
import type { PantryItemWithIngredient } from '@kookio/prisma-client';
import { reportError } from '@kookio/shared-observability';
import { messageFromError } from '@kookio/shared-utility';

import {
  PANTRY_TRPC,
  type PantryAddInput,
  type PantryRemoveInput,
  type PantryUpdateInput,
} from '../pantry-trpc';
import { isPastExpiry } from '../utils/expiration';

interface PantryState {
  items: PantryItemWithIngredient[];

  /** True during the initial list load; drives the page-level skeleton. */
  isLoading: boolean;

  /** True while any add/update/remove is in flight; drives the inline spinners. */
  isMutating: boolean;

  /**
   * Last error message to surface as a snackbar. The page renders it through
   * an effect on this signal and calls `clearError()` to reset — keeping
   * MatSnackBar out of the store mirrors the way `OnboardingStore` keeps
   * `submitError` separate from the UI.
   */
  error: string | null;
}

const initialState: PantryState = {
  items: [],
  isLoading: false,
  isMutating: false,
  error: null,
};

const errorMessage = (action: string, err: unknown): string =>
  messageFromError(err, `Could not ${action} pantry item`);

/**
 * Pantry CRUD state.
 *
 * Provided at the root: `load()` always replaces `items` on every navigation
 * to `/pantry`, so the brief privacy concern of cross-user contamination on
 * shared browsers is bounded by a single fetch round-trip.
 *
 * Per the convention in `AuthStore`, `add` and `remove` call
 * `authStore.loadCounts()` after a successful mutation so `pantryCount` and
 * `hasProfileSignals` stay in sync — `update` does not, since changing a
 * quantity or expiry date does not change the count.
 */
export const PantryStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed(({ items }) => ({
    /** Strictly past-due items, used for the "Expired" section header. */
    expiredItems: computed(() =>
      items().filter((i) => isPastExpiry(i.expiresAt)),
    ),
    totalCount: computed(() => items().length),
  })),

  withMethods((store) => {
    const trpc = inject(PANTRY_TRPC);
    const authStore = inject(AuthStore);

    return {
      clearError: (): void => {
        patchState(store, { error: null });
      },

      load: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap(() =>
            from(trpc.pantry.list.query()).pipe(
              tap((items) => patchState(store, { items, isLoading: false })),
              catchError((err: unknown) => {
                reportError(err, 'pantry.load');
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

      add: rxMethod<PantryAddInput>(
        pipe(
          tap(() => patchState(store, { isMutating: true, error: null })),
          switchMap((input) =>
            from(trpc.pantry.add.mutate(input)).pipe(
              tap((item) => {
                patchState(store, {
                  items: [item, ...store.items()],
                  isMutating: false,
                });
                authStore.loadCounts();
              }),
              catchError((err: unknown) => {
                reportError(err, 'pantry.add');
                patchState(store, {
                  isMutating: false,
                  error: errorMessage('add', err),
                });
                return EMPTY;
              }),
            ),
          ),
        ),
      ),

      update: rxMethod<PantryUpdateInput>(
        pipe(
          tap(() => patchState(store, { isMutating: true, error: null })),
          switchMap((input) =>
            from(trpc.pantry.update.mutate(input)).pipe(
              tap((updated) =>
                patchState(store, {
                  items: store
                    .items()
                    .map((i) => (i.id === updated.id ? updated : i)),
                  isMutating: false,
                }),
              ),
              catchError((err: unknown) => {
                reportError(err, 'pantry.update');
                patchState(store, {
                  isMutating: false,
                  error: errorMessage('update', err),
                });
                return EMPTY;
              }),
            ),
          ),
        ),
      ),

      remove: rxMethod<PantryRemoveInput>(
        pipe(
          tap(() => patchState(store, { isMutating: true, error: null })),
          switchMap((input) =>
            from(trpc.pantry.remove.mutate(input)).pipe(
              tap(({ id }) => {
                patchState(store, {
                  items: store.items().filter((i) => i.id !== id),
                  isMutating: false,
                });
                authStore.loadCounts();
              }),
              catchError((err: unknown) => {
                reportError(err, 'pantry.remove');
                patchState(store, {
                  isMutating: false,
                  error: errorMessage('remove', err),
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
