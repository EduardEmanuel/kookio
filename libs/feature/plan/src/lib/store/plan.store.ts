import { computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { EMPTY, firstValueFrom, forkJoin, from, of, pipe } from 'rxjs';
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
import type {
  MealPlanSetInput,
  MealSlotType,
  MealSlotWithRecipe,
  RecipeFeedItem,
} from '@kookio/prisma-client';
import { reportError } from '@kookio/shared-observability';
import { messageFromError } from '@kookio/shared-utility';

import {
  MEAL_PLAN_TRPC,
  type MealPlanDraftPayload,
  type MealPlanDraftSlot,
  type MealPlanTrpcClient,
} from '../meal-plan-trpc';

/** localStorage key prefix; the per-user namespace is appended on read/write. */
const DRAFT_KEY_PREFIX = 'kookio:plan-draft:';

/**
 * One concrete slot in the editor. Mirrors the slot rows returned by
 * `mealPlan.getCurrent` but is stored sparsely: `slots` only contains
 * entries the user has filled. Empty cells are absent rather than
 * represented as `recipeId: null`.
 *
 * Aliased to `MealPlanDraftSlot` (the wire shape exported from
 * `meal-plan-trpc.ts`) so the local store and the persisted draft on
 * Redis share a single source of truth.
 */
export type PlanSlot = MealPlanDraftSlot;

interface PlanState {
  slots: PlanSlot[];
  /**
   * Epoch ms of the most recent slot.updatedAt observed from the server,
   * used to decide draft freshness on restore. `null` until first load.
   */
  serverUpdatedAt: number | null;
  isLoading: boolean;
  isSubmitting: boolean;
  /** True if a draft newer than the server was restored on load. */
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

const slotKey = (date: string, slotType: MealSlotType): string =>
  `${date}|${slotType}`;

/**
 * Convert a JS `Date` (in local timezone) to a UTC-midnight ISO string
 * with the *same calendar day* as the source. Used when:
 *  - the user picks a date in `MatDatepicker` (which speaks local Date)
 *    and we need to align with the planner's UTC-midnight slot keys
 *  - we need "today" — `new Date()` is local, the timeline keys are UTC
 *
 * Without this helper, a user in a negative-UTC timezone (e.g. NY, -5)
 * sees a 1-day skew between what they pick and what the calendar
 * highlights, because UTC-midnight of the picked day is the *previous*
 * day in their local time.
 */
export const localDateToUtcMidnightIso = (date: Date): string =>
  new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  ).toISOString();

/**
 * Inverse of `localDateToUtcMidnightIso` — round-trip safe. Takes a
 * UTC-midnight ISO and returns a local-timezone `Date` whose Y/M/D
 * matches. Use this when binding `centerDate` into `MatDatepicker`'s
 * `[value]`.
 */
export const utcMidnightIsoToLocalDate = (iso: string): Date => {
  const d = new Date(iso);
  return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
};

/** UTC-midnight ISO for today's *local* calendar day. */
export const todayUtcMidnightIso = (): string =>
  localDateToUtcMidnightIso(new Date());

const errorMessage = (action: string, err: unknown): string =>
  messageFromError(err, `Could not ${action} meal plan`);

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
): MealPlanDraftPayload | null => {
  if (!isBrowser) return null;
  try {
    const raw = window.localStorage.getItem(draftKeyFor(uid));
    if (!raw) return null;
    return JSON.parse(raw) as MealPlanDraftPayload;
  } catch {
    return null;
  }
};

const safeWriteDraft = (
  uid: string,
  payload: MealPlanDraftPayload,
  isBrowser: boolean,
): void => {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(draftKeyFor(uid), JSON.stringify(payload));
  } catch {
    // Quota / Safari private browsing / disabled storage. Mutations still
    // work in-memory for this session — losing the local draft on refresh
    // is the worst case (the Redis copy still covers cross-device).
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
 * Three-way reconciliation: the freshest draft (local OR remote) wins
 * IF it is strictly newer than the server's last update. Otherwise the
 * server data is canonical and both drafts are discarded.
 *
 * Why both can be in play simultaneously: the user might have started a
 * draft on desktop (writes to Redis + this device's localStorage), then
 * opened the planner on a phone (Redis-only — phone has no local
 * draft), then back on desktop. Each device's localStorage is
 * independent; Redis is the cross-device truth. Picking the latest
 * timestamp handles every interleaving.
 */
const pickFreshestDraft = (
  local: MealPlanDraftPayload | null,
  remote: MealPlanDraftPayload | null,
  serverUpdatedAt: number,
): MealPlanDraftPayload | null => {
  const candidates: MealPlanDraftPayload[] = [];
  if (local && local.savedAt > serverUpdatedAt) candidates.push(local);
  if (remote && remote.savedAt > serverUpdatedAt) candidates.push(remote);
  if (candidates.length === 0) return null;
  return candidates.reduce((a, b) => (a.savedAt > b.savedAt ? a : b));
};

/**
 * Plan editor state — the single source of truth for the `/plan` page.
 *
 * The planner is a draft-and-submit UI: every mutation patches local state
 * (and writes a draft to BOTH localStorage and Redis) without hitting the
 * meal-plan write endpoint. The user commits the whole timeline atomically
 * via `submit()`. This keeps the drag UX snappy (no per-slot roundtrip) and
 * lets `CanDeactivate` warn before lost work.
 *
 * The data model is flat — there is no plan entity, just a user-scoped
 * collection of `MealSlot` rows. The store mirrors that shape: `slots`
 * is the entire planner state.
 *
 * Draft persistence is belt-and-suspenders:
 *   - localStorage owns offline mode and zero-latency writes
 *   - Redis (via mealPlan.setDraft) owns cross-device sync
 *   - Each mutation writes both; load reads both and picks the freshest
 *   - Redis failures are non-blocking — localStorage covers the gap
 *
 * Restore policy on load:
 *   - server fetched → `serverUpdatedAt` = max(slot.updatedAt)
 *   - both drafts compared against serverUpdatedAt; freshest wins
 *   - if neither beats the server, both are discarded as stale
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

    const writeRemoteDraft = (payload: MealPlanDraftPayload): void => {
      // Fire-and-forget — failure is non-blocking for the UI. The store
      // still has the in-memory state and localStorage still holds the
      // draft, so the user's session continues unaffected.
      firstValueFrom(from(trpc.mealPlan.setDraft.mutate(payload))).catch(
        () => undefined,
      );
    };

    const clearRemoteDraft = (): void => {
      firstValueFrom(from(trpc.mealPlan.clearDraft.mutate())).catch(
        () => undefined,
      );
    };

    const persistDraft = (): void => {
      const uid = authStore.session()?.uid;
      if (!uid) return;
      const payload: MealPlanDraftPayload = {
        slots: store.slots(),
        savedAt: Date.now(),
      };
      // Sync localStorage write covers offline + zero-latency UX. Async
      // Redis write covers cross-device sync; failure is silently
      // absorbed.
      safeWriteDraft(uid, payload, isBrowser);
      writeRemoteDraft(payload);
    };

    const clearDraftFor = (uid: string | undefined): void => {
      if (!uid) return;
      safeClearDraft(uid, isBrowser);
      clearRemoteDraft();
    };

    return {
      clearError: (): void => {
        patchState(store, { error: null });
      },

      /**
       * Load the user's slots. Fetches the server slots and the remote
       * draft in parallel, then picks the freshest available draft
       * (local OR remote, both compared against serverUpdatedAt). A
       * stale draft from either source is silently discarded.
       */
      load: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap(() =>
            forkJoin({
              serverSlots: from(trpc.mealPlan.getCurrent.query()),
              // Remote-draft failure must not poison the load — fall
              // back to localStorage-only reconciliation if Redis is
              // down.
              remoteDraft: from(trpc.mealPlan.getDraft.query()).pipe(
                catchError(() => {
                  return of(null as MealPlanDraftPayload | null);
                }),
              ),
            }).pipe(
              tap(({ serverSlots, remoteDraft }) => {
                const serverUpdatedAt = serverFreshnessTimestamp(serverSlots);
                const uid = authStore.session()?.uid;
                const localDraft = uid ? safeReadDraft(uid, isBrowser) : null;

                const winner = pickFreshestDraft(
                  localDraft,
                  remoteDraft,
                  serverUpdatedAt,
                );

                if (winner) {
                  patchState(store, {
                    slots: winner.slots,
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
                reportError(err, 'plan.load');
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
       * Discard the local + remote draft and reset the banner flag. The
       * page should follow up with a `load()` to repopulate from the
       * server.
       */
      discardDraft: (): void => {
        const uid = authStore.session()?.uid;
        clearDraftFor(uid);
        patchState(store, { hasUnsavedDraft: false });
      },

      /**
       * Submit the current draft to the server atomically. On success,
       * resets dirty + clears both local + remote draft + records the
       * new serverUpdatedAt.
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
                reportError(err, 'plan.submit');
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

// Re-exported via the trpc-aware alias so consumers that want the wire
// shape (e.g. cross-tab sync prototypes) land on the same type.
export type { MealPlanTrpcClient };
