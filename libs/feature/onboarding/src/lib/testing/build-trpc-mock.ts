import { vi } from 'vitest';

import type { OnboardingTrpcClient } from '../store/onboarding.store';

/**
 * Builds a fully-mocked OnboardingTrpcClient with sensible defaults for every
 * field. Each catalog returns an empty array; `onboarding.current` returns
 * default selections; `onboarding.commit` resolves with `{ onboardingDone: true }`.
 *
 * Tests that need to assert on a specific call (or stub a different return)
 * can swap in a custom `vi.fn()` via the `overrides` argument or reach into
 * the returned object after construction.
 */
export interface BuildTrpcMockOverrides {
  onboarding?: Partial<OnboardingTrpcClient['onboarding']>;
  onboardingCatalogs?: Partial<OnboardingTrpcClient['onboardingCatalogs']>;
}

export const buildTrpcMock = (
  overrides: BuildTrpcMockOverrides = {},
): OnboardingTrpcClient => ({
  onboarding: {
    commit: { mutate: vi.fn().mockResolvedValue({ onboardingDone: true }) },
    current: {
      query: vi.fn().mockResolvedValue({
        name: null,
        adultsCount: 1,
        childrenCount: 0,
        preferredCategoryIds: [],
        preferredAreaIds: [],
        utensilIds: [],
        dietaryRestrictionIds: [],
      }),
    },
    ...overrides.onboarding,
  },
  onboardingCatalogs: {
    dietaryRestrictions: { query: vi.fn().mockResolvedValue([]) },
    utensils: { query: vi.fn().mockResolvedValue([]) },
    mealCategories: { query: vi.fn().mockResolvedValue([]) },
    mealAreas: { query: vi.fn().mockResolvedValue([]) },
    ...overrides.onboardingCatalogs,
  },
});
