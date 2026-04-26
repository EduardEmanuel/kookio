import type { UserProfileMock } from '@kookio/prisma-client';

let _profileCounter = 0;

export const resetProfileCounter = () => {
  _profileCounter = 0;
};

export const createMockUserProfile = (
  userId: string,
  overrides?: Partial<UserProfileMock>,
): UserProfileMock => {
  _profileCounter += 1;
  const n = _profileCounter.toString().padStart(4, '0');
  return {
    id: `prf_mock_${n}`,
    userId,
    adultsCount: 1,
    childrenCount: 0,
    onboardingDone: false,
    ...overrides,
  };
};
