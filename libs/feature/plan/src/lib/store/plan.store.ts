import { computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

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
import { noopLogger } from '@kookio/core-logging';
import type {
  MealPlanSetInput,
  MealSlotType,
  MealSlotWithRecipe,
  RecipeFeedItem,
} from '@kookio/prisma-client';

import { MEAL_PLAN_TRPC } from '../meal-plan-trpc';

const log = noopLogger;

/** localStorage key prefix; the per-user namespace is appended on read/write. */
const DRAFT_KEY_PREFIX = 'kookio:plan-draft:';

/**
 * One concrete slot in the editor. Mirrors the slot rows returned by
 * `mealPlan.getCurrent` but is stored sparsely: `slots` only contains
 * entries the user has filled. Empty cells are absent rather than
 * represented as `recipeId: null`.
 */
export interface PlanSlot {
  date: string; // ISO datetime, UTC midnight
  slotType: MealSlotType;
  recipeId: string;
  servings: number;
  recipe: RecipeFeedItem | null;
}

interface PlanState {
  slots: PlanSlot[];
  /**
   * Epoch ms of the most recent slot.updatedAt observed from the server,
   * used to decide draft freshness on restore. `null` until first load.
   */
  serverUpdatedAt: number | null;
  isLoading: boolean;
  isSubmitting: boolean;
  /** True if a localStorage draft newer than the server was restored on load. */
  hasUnsavedDraft: boolean;
  /** True after any local mutation since last load/submit. */
  isDirty: boolean;
  /** True once the first server load has resolved (success or empty). */
  hasLoadedOnce: boolean;
  error: string | null;
}

const initialState: PlanState = {
  slots: [],
  serverUpdatedAt: null,
  isLoading: false,
  isSubmitting: false,
  hasUnsavedDraft: false,
  isDirty: false,
  hasLoadedOnce: false,
  error: null,
};

interface DraftPayload {
  slots: PlanSlot[];
  savedAt: number;
}

const slotKey = (date: string, slotType: MealSlotType): string =>
  `${date}|${slotType}`;

const errorMessage = (action: string, err: unknown): string => {
  const fallback = `Could not ${action} meal plan`;
  if (typeof err === 'object' && err !== null && 'message' in err) {
    const msg = (err as { message?: unknown }).message;
    return typeof msg === 'string' && msg.length > 0 ? msg : fallback;
  }
  return fallback;
};

const toIso = (d: Date): string => d.toISOString();

const slotsFromServer = (serverSlots: MealSlotWithRecipe[]): PlanSlot[] =>
  serverSlots
    .filter(
      (s): s is MealSlotWithRecipe & { recipeId: string } =>
        s.recipeId !== null,
    )
    .map((s) => ({
      date: toIso(s.date),
      slotType: s.slotType,
      recipeId: s.recipeId,
      servings: s.servings,
      recipe: s.recipe,
    }));

const serverFreshnessTimestamp = (
  serverSlots: MealSlotWithRecipe[],
): number => {
  let max = 0;
  for (const s of serverSlots) {
    const ms = s.updatedAt.getTime();
    if (ms > max) max = ms;
  }
  return max;
};

const draftKeyFor = (uid: string): string => `${DRAFT_KEY_PREFIX}${uid}`;

const safeReadDraft = (
  uid: string,
  isBrowser: boolean,
): DraftPayload | null => {
  if (!isBrowser) return null;
  try {
    const raw = window.localStorage.getItem(draftKeyFor(uid));
    if (!raw) return null;
    return JSON.parse(raw) as DraftPayload;
  } catch {
    return null;
  }
};

const safeWriteDraft = (
  uid: string,
  payload: DraftPayload,
  isBrowser: boolean,
): void => {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(draftKeyFor(uid), JSON.stringify(payload));
  } catch {
    // Quota / Safari private browsing / disabled storage. Mutations still
    // work in-memory for this session — losing the draft on refresh is the
    // worst case.
  }
};

const safeClearDraft = (uid: string, isBrowser: boolean): void => {
  if (!isBrowser) return;
  try {
    window.localStorage.removeItem(draftKeyFor(uid));
  } catch {
    // ignored — see safeWriteDraft.
  }
};

/**
 * Plan editor state — the single source of truth for the `/plan` page.
 *
 * The planner is a draft-and-submit UI: every mutation patches local state
 * (and writes a localStorage draft) without hitting the server. The user
 * commits the whole timeline atomically via `submit()`. This keeps the
 * drag UX snappy (no per-slot roundtrip) and lets `CanDeactivate` warn
 * before lost work.
 *
 * The data model is flat — there is no plan entity, just a user-scoped
 * collection of `MealSlot` rows. The store mirrors that shape: `slots`
 * is the entire planner state.
 *
 * Restore policy on load:
 *   - server fetched → `serverUpdatedAt` = max(slot.updatedAt)
 *   - if draft.savedAt > serverUpdatedAt: restore draft, set hasUnsavedDraft
 *   - otherwise: discard draft (server moved on, draft is stale)
 */
export const PlanStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed(({ slots, isDirty, isSubmitting }) => ({
    /**
     * Map keyed by `date|slotType` for O(1) cell lookups in templates.
     * The calendar's day columns and the dashboard widget both call
     * `slotsByKey().get(slotKey(...))` per cell rather than scanning
     * the array.
     */
    slotsByKey: computed(() => {
      const map = new Map<string, PlanSlot>();
      for (const s of slots()) {
        map.set(slotKey(s.date, s.slotType), s);
      }
      return map;
    }),

    /** Number of populated slots — drives "is anything planned?" badges. */
    plannedCount: computed(() => slots().length),

    /** True when the page should block navigation via CanDeactivate. */
    blockNavigation: computed(() => isDirty() || isSubmitting()),
  })),

  withMethods((store) => {
    const trpc = inject(MEAL_PLAN_TRPC);
    const authStore = inject(AuthStore);
    const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

    const persistDraft = (): void => {
      const uid = authStore.session()?.uid;
      if (!uid) return;
      safeWriteDraft(
        uid,
        {
          slots: store.slots(),
          savedAt: Date.now(),
        },
        isBrowser,
      );
    };

    const clearDraftFor = (uid: string | undefined): void => {
      if (!uid) return;
      safeClearDraft(uid, isBrowser);
    };

    return {
      clearError: (): void => {
        patchState(store, { error: null });
      },

      /**
       * Load the user's slots. Restores a localStorage draft only if its
       * `savedAt` is strictly newer than the latest server slot's
       * `updatedAt`. Otherwise the (stale) draft is discarded silently.
       */
      load: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap(() =>
            from(trpc.mealPlan.getCurrent.query()).pipe(
              tap((serverSlots: MealSlotWithRecipe[]) => {
                const serverUpdatedAt = serverFreshnessTimestamp(serverSlots);
                const uid = authStore.session()?.uid;
                const draft = uid ? safeReadDraft(uid, isBrowser) : null;

                if (draft && draft.savedAt > serverUpdatedAt) {
                  patchState(store, {
                    slots: draft.slots,
                    serverUpdatedAt,
                    isLoading: false,
                    hasUnsavedDraft: true,
                    isDirty: true,
                    hasLoadedOnce: true,
                  });
                  return;
                }

                clearDraftFor(uid);
                patchState(store, {
                  slots: slotsFromServer(serverSlots),
                  serverUpdatedAt,
                  isLoading: false,
                  hasUnsavedDraft: false,
                  isDirty: false,
                  hasLoadedOnce: true,
                });
              }),
              catchError((err: unknown) => {
                log.warn({ err }, 'mealPlan.getCurrent failed');
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

      /** Plant or replace a slot. Marks dirty + persists draft. */
      setSlot: (input: {
        date: string;
        slotType: MealSlotType;
        recipeId: string;
        servings?: number;
        recipe?: RecipeFeedItem | null;
      }): void => {
        const next: PlanSlot = {
          date: input.date,
          slotType: input.slotType,
          recipeId: input.recipeId,
          servings: input.servings ?? 2,
          recipe: input.recipe ?? null,
        };
        const key = slotKey(input.date, input.slotType);
        const filtered = store
          .slots()
          .filter((s) => slotKey(s.date, s.slotType) !== key);
        patchState(store, {
          slots: [...filtered, next],
          isDirty: true,
        });
        persistDraft();
      },

      /** Remove the slot at (date, slotType). Marks dirty + persists draft. */
      clearSlot: (date: string, slotType: MealSlotType): void => {
        const key = slotKey(date, slotType);
        const before = store.slots();
        const after = before.filter((s) => slotKey(s.date, s.slotType) !== key);
        if (after.length === before.length) return;
        patchState(store, { slots: after, isDirty: true });
        persistDraft();
      },

      /** Wipe all slots locally. Used by the "Clear all" CTA. */
      clearAll: (): void => {
        if (store.slots().length === 0) return;
        patchState(store, { slots: [], isDirty: true });
        persistDraft();
      },

      /**
       * Discard the local draft and reset the banner flag. The page
       * should follow up with a `load()` to repopulate from the server.
       */
      discardDraft: (): void => {
        const uid = authStore.session()?.uid;
        clearDraftFor(uid);
        patchState(store, { hasUnsavedDraft: false });
      },

      /**
       * Submit the current draft to the server atomically. On success,
       * resets dirty + draft + records the new serverUpdatedAt.
       */
      submit: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isSubmitting: true, error: null })),
          switchMap(() => {
            const input: MealPlanSetInput = {
              slots: store.slots().map((s) => ({
                date: s.date,
                slotType: s.slotType,
                recipeId: s.recipeId,
                servings: s.servings,
              })),
            };
            return from(trpc.mealPlan.setMealPlan.mutate(input)).pipe(
              tap((serverSlots: MealSlotWithRecipe[]) => {
                const uid = authStore.session()?.uid;
                clearDraftFor(uid);
                patchState(store, {
                  slots: slotsFromServer(serverSlots),
                  serverUpdatedAt: serverFreshnessTimestamp(serverSlots),
                  isSubmitting: false,
                  isDirty: false,
                  hasUnsavedDraft: false,
                });
              }),
              catchError((err: unknown) => {
                log.warn({ err }, 'mealPlan.setMealPlan failed');
                patchState(store, {
                  isSubmitting: false,
                  error: errorMessage('save', err),
                });
                return EMPTY;
              }),
            );
          }),
        ),
      ),
    };
  }),
);

// Re-exported so callers (template lookups, specs) share the same key shape.
export { slotKey };
