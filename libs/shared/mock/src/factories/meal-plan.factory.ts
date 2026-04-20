import type { MealPlanMock, MealPlanSlotMock } from '@kookio/prisma-client';

let _mealPlanCounter = 0;
let _slotCounter = 0;

export const resetMealPlanCounter = () => {
  _mealPlanCounter = 0;
};

export const resetMealPlanSlotCounter = () => {
  _slotCounter = 0;
};

// Fixed reference week: 2026-01-05 (Monday) → 2026-01-11 (Sunday)
const WEEK_START = new Date('2026-01-05T00:00:00.000Z');
const WEEK_END = new Date('2026-01-11T23:59:59.000Z');

export const createMockMealPlan = (
  userId: string,
  overrides?: Partial<MealPlanMock>,
): MealPlanMock => {
  _mealPlanCounter += 1;
  return {
    id: `mp_mock_${_mealPlanCounter.toString().padStart(4, '0')}`,
    userId,
    name: `Week ${_mealPlanCounter}`,
    startDate: WEEK_START,
    endDate: WEEK_END,
    ...overrides,
  };
};

export const createMockMealPlanSlot = (
  mealPlanId: string,
  recipeId: string | null,
  date: Date,
  slotType: MealPlanSlotMock['slotType'],
  overrides?: Partial<MealPlanSlotMock>,
): MealPlanSlotMock => {
  _slotCounter += 1;
  return {
    id: `mps_mock_${_slotCounter.toString().padStart(4, '0')}`,
    mealPlanId,
    recipeId,
    date,
    slotType,
    servings: 2,
    ...overrides,
  };
};
