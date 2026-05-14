import type { MealSlotMock } from '@kookio/prisma-client';

export const createMockMealSlot = (
  userId: string,
  recipeId: string | null,
  date: Date,
  slotType: MealSlotMock['slotType'],
  overrides?: Partial<MealSlotMock>,
): MealSlotMock => ({
  userId,
  recipeId,
  date,
  slotType,
  servings: 2,
  ...overrides,
});
