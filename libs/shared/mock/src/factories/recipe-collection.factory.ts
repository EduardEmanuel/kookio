import type { RecipeCollectionMock } from '@kookio/prisma-client';

let _collectionCounter = 0;

export const resetCollectionCounter = () => {
  _collectionCounter = 0;
};

export const createMockRecipeCollection = (
  userId: string,
  overrides?: Partial<RecipeCollectionMock>,
): RecipeCollectionMock => {
  _collectionCounter += 1;
  const n = _collectionCounter.toString().padStart(4, '0');
  return {
    id: `col_mock_${n}`,
    userId,
    name: `Collection ${n}`,
    emoji: null,
    ...overrides,
  };
};
