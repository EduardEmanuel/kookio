import type { MealSlotMock } from '@kookio/prisma-client';

let _slotCounter = 0;

export const resetMealSlotCounter = () => {
  _slotCounter = 0;
};

export const createMockMealSlot = (
  userId: string,
  recipeId: string | null,
  date: Date,
  slotType: MealSlotMock['slotType'],
  overrides?: Partial<MealSlotMock>,
): MealSlotMock => {
  _slotCounter += 1;
  return {
    id: `ms_mock_${_slotCounter.toString().padStart(4, '0')}`,
    userId,
    recipeId,
    date,
    slotType,
    servings: 2,
    ...overrides,
  };
};
