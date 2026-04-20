import type { CookingSessionMock } from '@kookio/prisma-client';

let _sessionCounter = 0;

export const resetCookingSessionCounter = () => {
  _sessionCounter = 0;
};

export const createMockCookingSession = (
  userId: string,
  recipeId: string,
  overrides?: Partial<CookingSessionMock>,
): CookingSessionMock => {
  _sessionCounter += 1;
  const n = _sessionCounter.toString().padStart(4, '0');
  return {
    id: `cs_mock_${n}`,
    userId,
    recipeId,
    servings: 2,
    completedAt: null,
    ...overrides,
  };
};
