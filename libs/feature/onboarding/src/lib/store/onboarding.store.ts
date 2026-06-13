import { InjectionToken, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

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
import type { PantryItemView } from '@kookio/feature-pantry';
import type {
  DietaryRestrictionRow,
  MealAreaRow,
  MealCategoryRow,
  OnboardingCommitInput,
  OnboardingCurrent,
  UtensilRow,
} from '@kookio/prisma-client';
import { URLS } from '@kookio/shared-utility';

// Re-exported so existing consumers (the feature-onboarding barrel and step
// component specs) keep their import paths. The canonical home for these row
// shapes is `@kookio/prisma-client/types/<model>.ts`, derived from the
// generated `<Model>ModelSchema` via `.pick()` — see the pure-schemas rule
// in CLAUDE.md / pinned memory.
export type { DietaryRestrictionRow, MealAreaRow, MealCategoryRow, UtensilRow };

export const TOTAL_STEPS = 6;
const LAST_STEP = TOTAL_STEPS - 1;
const MIN_ADULTS = 1;
const MAX_ADULTS = 20;
const MIN_CHILDREN = 0;
const MAX_CHILDREN = 20;

/** Minimal tRPC surface required by OnboardingStore and step components. */
export interface OnboardingTrpcClient {
  onboarding: {
    current: { query(): Promise<OnboardingCurrent> };
    commit: {
      mutate(
        input: OnboardingCommitInput,
      ): Promise<{ onboardingDone: boolean }>;
    };
  };
  onboardingCatalogs: {
    dietaryRestrictions: { query(): Promise<DietaryRestrictionRow[]> };
    utensils: { query(): Promise<UtensilRow[]> };
    mealCategories: { query(): Promise<MealCategoryRow[]> };
    mealAreas: { query(): Promise<MealAreaRow[]> };
  };
}

export const ONBOARDING_TRPC = new InjectionToken<OnboardingTrpcClient>(
  'ONBOARDING_TRPC',
);

interface OnboardingState {
  /** Stepper position. Range: [0, TOTAL_STEPS - 1]. */
  currentStep: number;

  /**
   * High-water mark of the furthest step the user has reached so far.
   * Monotonic — `next()` and `loadCurrent` (returning user) can advance
   * it; `prev()` and direct `goToStep` calls never move it backward.
   * Drives the rail's reachability gating so the user can revisit any
   * step they've already seen but cannot skip ahead past validation.
   */
  maxStepReached: number;

  /** Display name collected on the start step; required to submit. */
  name: string;

  /**
   * Selection sets are kept as Set<string> for O(1) toggle.
   * Each toggle replaces the reference (`new Set(prev)`) so signal computeds
   * re-evaluate — mutating in place would not trigger updates.
   */
  preferredCategoryIds: Set<string>;
  preferredAreaIds: Set<string>;
  utensilIds: Set<string>;
  dietaryRestrictionIds: Set<string>;

  adultsCount: number;
  childrenCount: number;

  /**
   * Initial pantry items the user added during the fridge step. Held
   * client-side until `submit()` ships them as part of the onboarding
   * commit transaction — pantry.add itself is `onboardedProcedure` and
   * would 403 mid-onboarding.
   */
  stagedPantryItems: PantryItemView[];

  isSubmitting: boolean;
  submitError: string | null;
}

const initialState: OnboardingState = {
  currentStep: 0,
  maxStepReached: 0,
  name: '',
  preferredCategoryIds: new Set<string>(),
  preferredAreaIds: new Set<string>(),
  utensilIds: new Set<string>(),
  dietaryRestrictionIds: new Set<string>(),
  adultsCount: MIN_ADULTS,
  childrenCount: MIN_CHILDREN,
  stagedPantryItems: [],
  isSubmitting: false,
  submitError: null,
};

const toggleInSet = (prev: Set<string>, id: string): Set<string> => {
  const next = new Set(prev);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
};

const clamp = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, value));

/**
 * Onboarding stepper state.
 *
 * Provided at the component level (NOT `providedIn: 'root'`). The store holds
 * the user's in-progress selections; with a root-scoped instance, those would
 * persist across login/logout transitions and bleed between users sharing a
 * browser session. Component scope guarantees the store is torn down on
 * navigation away from `/onboarding`, so the next user starts clean.
 *
 * Consumers must include `OnboardingStore` in the component's `providers`
 * array (typically the stepper component itself).
 */
export const OnboardingStore = signalStore(
  withState(initialState),

  withComputed((store) => ({
    canGoNext: computed(() => store.currentStep() < LAST_STEP),
    canGoPrev: computed(() => store.currentStep() > 0),
    isFirstStep: computed(() => store.currentStep() === 0),
    isLastStep: computed(() => store.currentStep() === LAST_STEP),
    totalSteps: computed(() => TOTAL_STEPS),

    /** True when the trimmed name passes the same min(1).max(50) gate as the server. */
    nameIsValid: computed(() => {
      const trimmed = store.name().trim();
      return trimmed.length > 0 && trimmed.length <= 50;
    }),

    hasAnySelection: computed(
      () =>
        store.preferredCategoryIds().size > 0 ||
        store.preferredAreaIds().size > 0 ||
        store.utensilIds().size > 0 ||
        store.dietaryRestrictionIds().size > 0,
    ),
  })),

  withMethods((store) => {
    const trpc = inject(ONBOARDING_TRPC);
    const authStore = inject(AuthStore);
    const router = inject(Router);

    /**
     * Reachability gate for the rail. A step is reachable when it sits
     * at or before the high-water mark — i.e. the user has been there
     * before. Future steps stay locked until validation lets `next()`
     * advance the mark.
     */
    const isReachable = (step: number): boolean =>
      step <= store.maxStepReached();

    return {
      isReachable,

      goToStep: (step: number): void => {
        // Bounds check + reachability: only let the user jump back to
        // steps they've already seen. Forward jumps must go through
        // `next()` so the validation gates in the template (and the
        // skip rule that wraps `next()`) stay authoritative.
        if (step >= 0 && step <= LAST_STEP && isReachable(step)) {
          patchState(store, { currentStep: step });
        }
      },

      next: (): void => {
        if (store.currentStep() < LAST_STEP) {
          const nextStep = store.currentStep() + 1;
          patchState(store, {
            currentStep: nextStep,
            maxStepReached: Math.max(store.maxStepReached(), nextStep),
          });
        }
      },

      prev: (): void => {
        if (store.currentStep() > 0) {
          // `maxStepReached` deliberately stays put — going back never
          // re-locks a future step.
          patchState(store, { currentStep: store.currentStep() - 1 });
        }
      },

      togglePreferredCategory: (id: string): void => {
        patchState(store, {
          preferredCategoryIds: toggleInSet(store.preferredCategoryIds(), id),
        });
      },

      togglePreferredArea: (id: string): void => {
        patchState(store, {
          preferredAreaIds: toggleInSet(store.preferredAreaIds(), id),
        });
      },

      toggleUtensil: (id: string): void => {
        patchState(store, {
          utensilIds: toggleInSet(store.utensilIds(), id),
        });
      },

      toggleDietaryRestriction: (id: string): void => {
        patchState(store, {
          dietaryRestrictionIds: toggleInSet(store.dietaryRestrictionIds(), id),
        });
      },

      setName: (name: string): void => {
        patchState(store, { name });
      },

      setAdultsCount: (n: number): void => {
        patchState(store, {
          adultsCount: clamp(Math.trunc(n), MIN_ADULTS, MAX_ADULTS),
        });
      },

      setChildrenCount: (n: number): void => {
        patchState(store, {
          childrenCount: clamp(Math.trunc(n), MIN_CHILDREN, MAX_CHILDREN),
        });
      },

      /**
       * Stages an item for inclusion in the onboarding commit's pantry seed.
       * If an item with the same id is already staged it is replaced — the
       * id matches `ingredientCatalogId` and PantryItem has
       * `@@unique([userId, ingredientCatalogId])`, so re-adding the same
       * ingredient should overwrite the previous quantity/unit/expiry rather
       * than create a duplicate.
       */
      stagePantryItem: (item: PantryItemView): void => {
        const others = store
          .stagedPantryItems()
          .filter((it) => it.id !== item.id);
        patchState(store, { stagedPantryItems: [...others, item] });
      },

      removeStagedPantryItem: (id: string): void => {
        patchState(store, {
          stagedPantryItems: store
            .stagedPantryItems()
            .filter((it) => it.id !== id),
        });
      },

      reset: (): void => {
        patchState(store, initialState);
      },

      /**
       * Pre-populates state from server selections. Used when a previously
       * onboarded user returns to `/onboarding` after a profile reset.
       * Failures are swallowed — the user can proceed with defaults.
       */
      loadCurrent: rxMethod<void>(
        pipe(
          switchMap(() =>
            from(trpc.onboarding.current.query()).pipe(
              tap((data) =>
                patchState(store, {
                  name: data.name ?? '',
                  adultsCount: data.adultsCount,
                  childrenCount: data.childrenCount,
                  preferredCategoryIds: new Set(data.preferredCategoryIds),
                  preferredAreaIds: new Set(data.preferredAreaIds),
                  utensilIds: new Set(data.utensilIds),
                  dietaryRestrictionIds: new Set(data.dietaryRestrictionIds),
                  // Returning user: every step is already filled in, so
                  // unlock the entire rail so they can jump straight to
                  // whichever step they want to review or edit.
                  maxStepReached: LAST_STEP,
                }),
              ),
              catchError(() => {
                return EMPTY;
              }),
            ),
          ),
        ),
      ),

      /**
       * Commits all selections, then flips `session.onboardingDone` to true
       * locally and refreshes profile counts via `markOnboardingDone()` so
       * `hasProfileSignals` reflects the new selections immediately.
       * On success navigates to the dashboard.
       */
      submit: rxMethod<void>(
        pipe(
          tap(() =>
            patchState(store, { isSubmitting: true, submitError: null }),
          ),
          switchMap(() =>
            from(
              trpc.onboarding.commit.mutate({
                name: store.name(),
                adultsCount: store.adultsCount(),
                childrenCount: store.childrenCount(),
                preferredCategoryIds: [...store.preferredCategoryIds()],
                preferredAreaIds: [...store.preferredAreaIds()],
                utensilIds: [...store.utensilIds()],
                dietaryRestrictionIds: [...store.dietaryRestrictionIds()],
                pantrySeed: store.stagedPantryItems().map((it) => ({
                  ingredientCatalogId: it.id,
                  quantity: it.quantity,
                  unit: it.unit,
                  expiresAt: it.expiresAt ? it.expiresAt.toISOString() : null,
                })),
              }),
            ).pipe(
              tap(() => {
                patchState(store, { isSubmitting: false });
                authStore.markOnboardingDone(store.name());
                void router.navigateByUrl(URLS.DASHBOARD);
              }),
              catchError((err: { message?: string }) => {
                const message = err?.message ?? 'Onboarding submit failed';
                patchState(store, {
                  isSubmitting: false,
                  submitError: message,
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
