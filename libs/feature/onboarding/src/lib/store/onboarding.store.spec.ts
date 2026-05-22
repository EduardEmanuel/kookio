import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Router, provideRouter } from '@angular/router';

import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';

import {
  ONBOARDING_TRPC,
  OnboardingStore,
  TOTAL_STEPS,
  type OnboardingTrpcClient,
} from './onboarding.store';

const flush = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

const setup = (trpcOverrides?: Partial<OnboardingTrpcClient['onboarding']>) => {
  // Defaults are kept as standalone mocks so the `commit` / `current` aliases
  // returned to the test always point at the *default* spy, even when the
  // caller swaps in an override via `trpcOverrides`. This lets a test
  // assert e.g. `expect(current).not.toHaveBeenCalled()` after providing a
  // distinct mock for `current.query`.
  const commit = vi.fn().mockResolvedValue({ onboardingDone: true });
  const current = vi.fn().mockResolvedValue({
    name: null,
    adultsCount: 1,
    childrenCount: 0,
    preferredCategoryIds: [],
    preferredAreaIds: [],
    utensilIds: [],
    dietaryRestrictionIds: [],
  });

  const trpc: OnboardingTrpcClient = {
    onboarding: {
      commit: { mutate: commit, ...trpcOverrides?.commit },
      current: { query: current, ...trpcOverrides?.current },
    },
    onboardingCatalogs: {
      dietaryRestrictions: { query: vi.fn().mockResolvedValue([]) },
      utensils: { query: vi.fn().mockResolvedValue([]) },
      mealCategories: { query: vi.fn().mockResolvedValue([]) },
      mealAreas: { query: vi.fn().mockResolvedValue([]) },
    },
  };

  const authStore = createMockAuthStore({ authReady: true });

  TestBed.configureTestingModule({
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([]),
      OnboardingStore,
      { provide: ONBOARDING_TRPC, useValue: trpc },
      { provide: AuthStore, useValue: authStore },
    ],
  });

  const store = TestBed.inject(OnboardingStore);
  const router = TestBed.inject(Router);
  const navSpy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

  return { store, authStore, trpc, commit, current, navSpy };
};

describe('OnboardingStore', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
    vi.restoreAllMocks();
  });

  describe('initial state', () => {
    it('starts at step 0 with default counts and empty selections', () => {
      const { store } = setup();
      expect(store.currentStep()).toBe(0);
      expect(store.adultsCount()).toBe(1);
      expect(store.childrenCount()).toBe(0);
      expect(store.preferredCategoryIds().size).toBe(0);
      expect(store.preferredAreaIds().size).toBe(0);
      expect(store.utensilIds().size).toBe(0);
      expect(store.dietaryRestrictionIds().size).toBe(0);
      expect(store.isSubmitting()).toBe(false);
      expect(store.submitError()).toBeNull();
    });

    it('exposes consistent computed flags at step 0', () => {
      const { store } = setup();
      expect(store.isFirstStep()).toBe(true);
      expect(store.isLastStep()).toBe(false);
      expect(store.canGoPrev()).toBe(false);
      expect(store.canGoNext()).toBe(true);
      expect(store.totalSteps()).toBe(TOTAL_STEPS);
      expect(store.hasAnySelection()).toBe(false);
    });
  });

  describe('navigation', () => {
    it('next() advances by one and stops at the last step', () => {
      const { store } = setup();
      for (let i = 0; i < TOTAL_STEPS + 2; i++) store.next();
      expect(store.currentStep()).toBe(TOTAL_STEPS - 1);
      expect(store.isLastStep()).toBe(true);
      expect(store.canGoNext()).toBe(false);
    });

    it('prev() decrements by one and stops at 0', () => {
      const { store } = setup();
      // Advance to step 3 via next() so the reachability gate lets us
      // come back; goToStep() is now refused on unreached indices.
      for (let i = 0; i < 3; i++) store.next();
      store.prev();
      expect(store.currentStep()).toBe(2);
      for (let i = 0; i < 5; i++) store.prev();
      expect(store.currentStep()).toBe(0);
    });

    it('goToStep() ignores out-of-range indices', () => {
      const { store } = setup();
      for (let i = 0; i < 2; i++) store.next();
      store.goToStep(-1);
      expect(store.currentStep()).toBe(2);
      store.goToStep(99);
      expect(store.currentStep()).toBe(2);
    });

    it('goToStep() accepts boundary values 0 and TOTAL_STEPS - 1 once reached', () => {
      const { store } = setup();
      // Walk to the end via next() so the whole rail is reachable.
      for (let i = 0; i < TOTAL_STEPS; i++) store.next();
      store.goToStep(TOTAL_STEPS - 1);
      expect(store.isLastStep()).toBe(true);
      store.goToStep(0);
      expect(store.isFirstStep()).toBe(true);
    });
  });

  describe('reachability gate', () => {
    it('maxStepReached starts at 0 and only step 0 is reachable', () => {
      const { store } = setup();
      expect(store.maxStepReached()).toBe(0);
      expect(store.isReachable(0)).toBe(true);
      expect(store.isReachable(1)).toBe(false);
    });

    it('next() bumps maxStepReached monotonically', () => {
      const { store } = setup();
      store.next();
      store.next();
      expect(store.maxStepReached()).toBe(2);
      expect(store.isReachable(2)).toBe(true);
      expect(store.isReachable(3)).toBe(false);
    });

    it('prev() leaves maxStepReached untouched', () => {
      const { store } = setup();
      store.next();
      store.next();
      store.prev();
      expect(store.currentStep()).toBe(1);
      expect(store.maxStepReached()).toBe(2);
      expect(store.isReachable(2)).toBe(true);
    });

    it('goToStep() refuses to jump past maxStepReached', () => {
      const { store } = setup();
      store.next();
      // Max is 1; trying to land on step 3 should be ignored.
      store.goToStep(3);
      expect(store.currentStep()).toBe(1);
    });

    it('goToStep() accepts previously-reached steps (review path)', () => {
      const { store } = setup();
      for (let i = 0; i < 3; i++) store.next();
      // Now at step 3; go back to step 1 and forward to step 2 — both
      // already reached.
      store.goToStep(1);
      expect(store.currentStep()).toBe(1);
      store.goToStep(2);
      expect(store.currentStep()).toBe(2);
    });
  });

  describe('selection toggles', () => {
    it('togglePreferredCategory adds then removes', () => {
      const { store } = setup();
      store.togglePreferredCategory('cat-a');
      expect([...store.preferredCategoryIds()]).toEqual(['cat-a']);
      store.togglePreferredCategory('cat-a');
      expect(store.preferredCategoryIds().size).toBe(0);
    });

    it('replaces the Set reference on every toggle (so computeds re-fire)', () => {
      const { store } = setup();
      const before = store.preferredCategoryIds();
      store.togglePreferredCategory('x');
      expect(store.preferredCategoryIds()).not.toBe(before);
    });

    it('hasAnySelection flips once any of the four sets has at least one entry', () => {
      const { store } = setup();
      expect(store.hasAnySelection()).toBe(false);
      store.toggleUtensil('u-1');
      expect(store.hasAnySelection()).toBe(true);
      store.toggleUtensil('u-1');
      expect(store.hasAnySelection()).toBe(false);
      store.toggleDietaryRestriction('d-1');
      expect(store.hasAnySelection()).toBe(true);
    });
  });

  describe('counts', () => {
    it('clamps adultsCount into [1, 20] and truncates fractions', () => {
      const { store } = setup();
      store.setAdultsCount(0);
      expect(store.adultsCount()).toBe(1);
      store.setAdultsCount(99);
      expect(store.adultsCount()).toBe(20);
      store.setAdultsCount(3.7);
      expect(store.adultsCount()).toBe(3);
    });

    it('clamps childrenCount into [0, 20]', () => {
      const { store } = setup();
      store.setChildrenCount(-5);
      expect(store.childrenCount()).toBe(0);
      store.setChildrenCount(50);
      expect(store.childrenCount()).toBe(20);
    });
  });

  describe('reset', () => {
    it('restores initial state', () => {
      const { store } = setup();
      store.next();
      store.toggleUtensil('u-1');
      store.setAdultsCount(4);
      store.reset();
      expect(store.currentStep()).toBe(0);
      expect(store.utensilIds().size).toBe(0);
      expect(store.adultsCount()).toBe(1);
    });
  });

  describe('pantry staging', () => {
    const TOMATO = {
      id: 'ing-1',
      ingredient: { name: 'Tomato', imageUrl: null },
      quantity: 250,
      unit: 'G' as const,
      expiresAt: new Date('2026-12-01T00:00:00.000Z'),
    };
    const ONION = {
      id: 'ing-2',
      ingredient: { name: 'Onion', imageUrl: null },
      quantity: 3,
      unit: 'PIECE' as const,
      expiresAt: null,
    };

    it('stages an item and exposes it in stagedPantryItems', () => {
      const { store } = setup();
      store.stagePantryItem(TOMATO);
      expect(store.stagedPantryItems()).toEqual([TOMATO]);
    });

    it('replaces an existing item with the same id (dedup)', () => {
      const { store } = setup();
      store.stagePantryItem(TOMATO);
      const updated = { ...TOMATO, quantity: 500 };
      store.stagePantryItem(updated);
      expect(store.stagedPantryItems()).toEqual([updated]);
    });

    it('removeStagedPantryItem strips by id', () => {
      const { store } = setup();
      store.stagePantryItem(TOMATO);
      store.stagePantryItem(ONION);
      store.removeStagedPantryItem('ing-1');
      expect(store.stagedPantryItems().map((it) => it.id)).toEqual(['ing-2']);
    });

    it('submit() forwards staged items as pantrySeed in ISO format', async () => {
      vi.useRealTimers();
      const { store, commit } = setup();
      store.setName('Ana');
      store.stagePantryItem(TOMATO);
      store.stagePantryItem(ONION);
      store.submit();
      await flush();

      expect(commit).toHaveBeenCalledWith(
        expect.objectContaining({
          pantrySeed: [
            {
              ingredientCatalogId: 'ing-1',
              quantity: 250,
              unit: 'G',
              expiresAt: '2026-12-01T00:00:00.000Z',
            },
            {
              ingredientCatalogId: 'ing-2',
              quantity: 3,
              unit: 'PIECE',
              expiresAt: null,
            },
          ],
        }),
      );
    });
  });

  describe('loadCurrent', () => {
    it('populates state from the server payload', async () => {
      const { store, current } = setup({
        current: {
          query: vi.fn().mockResolvedValue({
            name: 'Ana',
            adultsCount: 3,
            childrenCount: 2,
            preferredCategoryIds: ['c-1', 'c-2'],
            preferredAreaIds: ['a-1'],
            utensilIds: ['u-1'],
            dietaryRestrictionIds: ['d-1', 'd-2', 'd-3'],
          }),
        },
      });

      store.loadCurrent();
      await flush();

      expect(store.name()).toBe('Ana');
      expect(store.adultsCount()).toBe(3);
      expect(store.childrenCount()).toBe(2);
      expect([...store.preferredCategoryIds()]).toEqual(['c-1', 'c-2']);
      expect([...store.dietaryRestrictionIds()]).toHaveLength(3);
      // Returning user: the whole rail unlocks so they can jump
      // straight to any step they want to review.
      expect(store.maxStepReached()).toBe(TOTAL_STEPS - 1);
      expect(store.isReachable(TOTAL_STEPS - 1)).toBe(true);
      // The default mock `current` isn't called when we override.
      expect(current).not.toHaveBeenCalled();
    });

    it('swallows errors so the user can proceed with defaults', async () => {
      const { store } = setup({
        current: { query: vi.fn().mockRejectedValue(new Error('network')) },
      });

      store.loadCurrent();
      await flush();

      expect(store.adultsCount()).toBe(1);
      expect(store.submitError()).toBeNull();
    });
  });

  describe('submit', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('on success: clears submitting, marks onboarding done, navigates to /dashboard', async () => {
      vi.useRealTimers();
      const { store, authStore, navSpy, commit } = setup();

      store.setName('Ana');
      store.toggleUtensil('u-1');
      store.setAdultsCount(2);
      store.submit();
      await flush();

      expect(commit).toHaveBeenCalledWith({
        name: 'Ana',
        adultsCount: 2,
        childrenCount: 0,
        preferredCategoryIds: [],
        preferredAreaIds: [],
        utensilIds: ['u-1'],
        dietaryRestrictionIds: [],
        pantrySeed: [],
      });
      expect(store.isSubmitting()).toBe(false);
      expect(store.submitError()).toBeNull();
      expect(authStore.markOnboardingDone).toHaveBeenCalledOnce();
      expect(authStore.markOnboardingDone).toHaveBeenCalledWith('Ana');
      expect(authStore.fetchSession).not.toHaveBeenCalled();
      expect(navSpy).toHaveBeenCalledWith('/dashboard');
    });

    it('on error: clears submitting and surfaces the message', async () => {
      vi.useRealTimers();
      const { store, authStore, navSpy } = setup({
        commit: { mutate: vi.fn().mockRejectedValue(new Error('boom')) },
      });

      store.submit();
      await flush();

      expect(store.isSubmitting()).toBe(false);
      expect(store.submitError()).toBe('boom');
      expect(authStore.markOnboardingDone).not.toHaveBeenCalled();
      expect(navSpy).not.toHaveBeenCalled();
    });
  });
});
