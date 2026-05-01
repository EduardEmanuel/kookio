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
import { noopLogger } from '@kookio/core-logging';
import type {
  OnboardingCommitInput,
  OnboardingCurrent,
} from '@kookio/prisma-client';
import { URLS } from '@kookio/shared-utility';

const log = noopLogger;

export const TOTAL_STEPS = 6;
const LAST_STEP = TOTAL_STEPS - 1;
const MIN_ADULTS = 1;
const MAX_ADULTS = 20;
const MIN_CHILDREN = 0;
const MAX_CHILDREN = 20;

/** Catalog row shapes — only the fields the onboarding UI consumes. */
export interface DietaryRestrictionRow {
  id: string;
  slug: string;
  label: string;
  emoji: string | null;
  description: string | null;
}

export interface UtensilRow {
  id: string;
  slug: string;
  name: string;
  emoji: string | null;
  category: string | null;
}

export interface MealCategoryRow {
  id: string;
  name: string;
  emoji: string | null;
  imageUrl: string | null;
  description: string | null;
}

export interface MealAreaRow {
  id: string;
  name: string;
  flag: string | null;
}

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

  isSubmitting: boolean;
  submitError: string | null;
}

const initialState: OnboardingState = {
  currentStep: 0,
  preferredCategoryIds: new Set<string>(),
  preferredAreaIds: new Set<string>(),
  utensilIds: new Set<string>(),
  dietaryRestrictionIds: new Set<string>(),
  adultsCount: MIN_ADULTS,
  childrenCount: MIN_CHILDREN,
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

    return {
      goToStep: (step: number): void => {
        if (step >= 0 && step <= LAST_STEP) {
          patchState(store, { currentStep: step });
        }
      },

      next: (): void => {
        if (store.currentStep() < LAST_STEP) {
          patchState(store, { currentStep: store.currentStep() + 1 });
        }
      },

      prev: (): void => {
        if (store.currentStep() > 0) {
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

      reset: (): void => {
        patchState(store, initialState);
      },

      /**
       * Pre-populates state from server selections. Used when a previously
       * onboarded user returns to `/onboarding` after a profile reset.
       * Failures are logged and swallowed — the user can proceed with defaults.
       */
      loadCurrent: rxMethod<void>(
        pipe(
          switchMap(() =>
            from(trpc.onboarding.current.query()).pipe(
              tap((data) =>
                patchState(store, {
                  adultsCount: data.adultsCount,
                  childrenCount: data.childrenCount,
                  preferredCategoryIds: new Set(data.preferredCategoryIds),
                  preferredAreaIds: new Set(data.preferredAreaIds),
                  utensilIds: new Set(data.utensilIds),
                  dietaryRestrictionIds: new Set(data.dietaryRestrictionIds),
                }),
              ),
              catchError((err) => {
                log.warn({ err }, 'onboarding.current failed');
                return EMPTY;
              }),
            ),
          ),
        ),
      ),

      /**
       * Commits all selections, then refreshes the AuthStore session so the
       * `onboardingDone` computed flips to `true` (driven by `session()`).
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
                adultsCount: store.adultsCount(),
                childrenCount: store.childrenCount(),
                preferredCategoryIds: [...store.preferredCategoryIds()],
                preferredAreaIds: [...store.preferredAreaIds()],
                utensilIds: [...store.utensilIds()],
                dietaryRestrictionIds: [...store.dietaryRestrictionIds()],
              }),
            ).pipe(
              tap(() => {
                patchState(store, { isSubmitting: false });
                authStore.fetchSession();
                void router.navigateByUrl(URLS.DASHBOARD);
              }),
              catchError((err: { message?: string }) => {
                const message = err?.message ?? 'Onboarding submit failed';
                log.warn({ err }, 'onboarding.commit failed');
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
