import z from 'zod';
import { MealPlanSlotModelSchema } from '../../prisma-zod-generator/schemas/index';

export const MealPlanSlotMockSchema = MealPlanSlotModelSchema.pick({
  id: true,
  mealPlanId: true,
  recipeId: true,
  date: true,
  slotType: true,
  servings: true,
});
export type MealPlanSlotMock = z.output<typeof MealPlanSlotMockSchema>;
