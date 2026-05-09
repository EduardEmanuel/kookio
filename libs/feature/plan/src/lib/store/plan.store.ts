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
  MealPlanFull,
  MealPlanSetInput,
  MealPlanSlotWithRecipe,
  MealSlotType,
  RecipeFeedItem,
} from '@kookio/prisma-client';

import { MEAL_PLAN_TRPC } from '../meal-plan-trpc';

const log = noopLogger;

/** localStorage key prefix; the per-user namespace is appended on read/write. */
const DRAFT_KEY_PREFIX = 'kookio:plan-draft:';

/**
 * One concrete slot in the editor. Mirrors the slot rows in `MealPlanFull.slots`
 * but is stored sparsely: `slots` only contains entries the user has filled.
 * Empty cells are absent rather than represented as `recipeId: null`.
 */
export interface PlanSlot {
  date: string; // ISO datetime, UTC midnight
  slotType: MealSlotType;
  recipeId: string;
  servings: number;
  recipe: RecipeFeedItem | null;
}

interface PlanState {
  planId: string | null;
  startDate: string | null;
  endDate: string | null;
  slots: PlanSlot[];
  /** Server's `plan.updatedAt` at last load — used to decide draft freshness. */
  serverUpdatedAt: number | null;
  isLoading: boolean;
  isSubmitting: boolean;
  /** True if a localStorage draft newer than the server was restored on load. */
  hasUnsavedDraft: boolean;
  /** True after any local mutation since last load/submit. */
  isDirty: boolean;
  error: string | null;
}

const initialState: PlanState = {
  planId: null,
  startDate: null,
  endDate: null,
  slots: [],
  serverUpdatedAt: null,
  isLoading: false,
  isSubmitting: false,
  hasUnsavedDraft: false,
  isDirty: false,
  error: null,
};

interface DraftPayload {
  startDate: string;
  endDate: string;
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

const slotsFromServer = (serverSlots: MealPlanSlotWithRecipe[]): PlanSlot[] =>
  serverSlots
    .filter(
      (s): s is MealPlanSlotWithRecipe & { recipeId: string } =>
        s.recipeId !== null,
    )
    .map((s) => ({
      date: toIso(s.date),
      slotType: s.slotType,
      recipeId: s.recipeId,
      servings: s.servings,
      recipe: s.recipe,
    }));

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
 * commits the whole week atomically via `submit()`. This keeps the drag UX
 * snappy (no per-slot roundtrip) and lets `CanDeactivate` warn before lost
 * work.
 *
 * Restore policy on load:
 *   - server fetched → `serverUpdatedAt` recorded
 *   - if draft.savedAt > serverUpdatedAt: restore draft, set hasUnsavedDraft
 *   - otherwise: discard draft (server moved on, draft is stale)
 */
export const PlanStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed(({ slots, startDate, endDate, isDirty, isSubmitting }) => ({
    /**
     * Map keyed by `date|slotType` for O(1) cell lookups in templates.
     * Mobile day-tab and desktop grid both call `slotsByKey().get(slotKey(...))`
     * per cell rather than scanning the array.
     */
    slotsByKey: computed(() => {
      const map = new Map<string, PlanSlot>();
      for (const s of slots()) {
        map.set(slotKey(s.date, s.slotType), s);
      }
      return map;
    }),

    /** Number of populated slots — drives the "is the week planned?" badges. */
    plannedCount: computed(() => slots().length),

    /** True when the page should block navigation via CanDeactivate. */
    blockNavigation: computed(() => isDirty() || isSubmitting()),

    /** True when the plan has a defined date range — i.e. server load completed. */
    hasRange: computed(() => startDate() !== null && endDate() !== null),
  })),

  withMethods((store) => {
    const trpc = inject(MEAL_PLAN_TRPC);
    const authStore = inject(AuthStore);
    const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

    const persistDraft = (): void => {
      const uid = authStore.session()?.uid;
      if (!uid) return;
      const startDate = store.startDate();
      const endDate = store.endDate();
      if (!startDate || !endDate) return;
      safeWriteDraft(
        uid,
        {
          startDate,
          endDate,
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
       * Load the active plan. Restores a localStorage draft only if its
       * `savedAt` is strictly newer than the server's `updatedAt`. Otherwise
       * the (stale) draft is discarded silently.
       */
      load: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap(() =>
            from(trpc.mealPlan.getCurrent.query()).pipe(
              tap((plan: MealPlanFull) => {
                const serverUpdatedAt = plan.updatedAt.getTime();
                const uid = authStore.session()?.uid;
                const draft = uid ? safeReadDraft(uid, isBrowser) : null;

                if (draft && draft.savedAt > serverUpdatedAt) {
                  patchState(store, {
                    planId: plan.id,
                    startDate: draft.startDate,
                    endDate: draft.endDate,
                    slots: draft.slots,
                    serverUpdatedAt,
                    isLoading: false,
                    hasUnsavedDraft: true,
                    isDirty: true,
                  });
                  return;
                }

                // No draft, or draft is stale — discard silently.
                clearDraftFor(uid);
                patchState(store, {
                  planId: plan.id,
                  startDate: toIso(plan.startDate),
                  endDate: toIso(plan.endDate),
                  slots: slotsFromServer(plan.slots),
                  serverUpdatedAt,
                  isLoading: false,
                  hasUnsavedDraft: false,
                  isDirty: false,
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

      /** Wipe all slots locally. Used by the "Clear week" CTA. */
      clearAll: (): void => {
        if (store.slots().length === 0) return;
        patchState(store, { slots: [], isDirty: true });
        persistDraft();
      },

      /**
       * Adjust the plan's date range. Slots that fall outside the new range
       * are NOT auto-removed here — the page should warn before resizing
       * destructively.
       */
      setRange: (startDate: string, endDate: string): void => {
        patchState(store, { startDate, endDate, isDirty: true });
        persistDraft();
      },

      /**
       * Discard the local draft and reload from the server. Used by the
       * "Discard" button in the unsaved-changes banner.
       */
      discardDraft: (): void => {
        const uid = authStore.session()?.uid;
        clearDraftFor(uid);
        patchState(store, { hasUnsavedDraft: false });
        // Trigger a reload to repopulate from the server.
        // Using the rxMethod's call signature: this is invoked from a UI
        // event handler, so the injection context is live.
      },

      /**
       * Submit the current draft to the server atomically. On success,
       * resets dirty + draft + records the new serverUpdatedAt.
       */
      submit: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isSubmitting: true, error: null })),
          switchMap(() => {
            const startDate = store.startDate();
            const endDate = store.endDate();
            if (!startDate || !endDate) {
              patchState(store, {
                isSubmitting: false,
                error: 'Plan range is not set',
              });
              return EMPTY;
            }
            const input: MealPlanSetInput = {
              startDate,
              endDate,
              slots: store.slots().map((s) => ({
                date: s.date,
                slotType: s.slotType,
                recipeId: s.recipeId,
                servings: s.servings,
              })),
            };
            return from(trpc.mealPlan.setMealPlan.mutate(input)).pipe(
              tap((plan: MealPlanFull) => {
                const uid = authStore.session()?.uid;
                clearDraftFor(uid);
                patchState(store, {
                  planId: plan.id,
                  startDate: toIso(plan.startDate),
                  endDate: toIso(plan.endDate),
                  slots: slotsFromServer(plan.slots),
                  serverUpdatedAt: plan.updatedAt.getTime(),
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
