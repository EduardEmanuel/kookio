import z from 'zod';
import {
  MealPlanSlotModelSchema,
  MealSlotTypeSchema,
} from '../../prisma-zod-generator/schemas/index';

import { UuidIdSchema } from './ids';
import { RecipeFeedItemSchema } from './recipe';

export const MealPlanSlotMockSchema = MealPlanSlotModelSchema.pick({
  id: true,
  mealPlanId: true,
  recipeId: true,
  date: true,
  slotType: true,
  servings: true,
});
export type MealPlanSlotMock = z.output<typeof MealPlanSlotMockSchema>;

/**
 * A populated meal-plan slot as served by `mealPlan.getCurrent`.
 * `recipe` is null when the row exists with `recipeId = null` — the planner
 * never persists empty slots (clearing one deletes the row), so in practice
 * this only appears if a referenced recipe is later removed (FK is SET NULL).
 */
export const MealPlanSlotWithRecipeSchema = MealPlanSlotModelSchema.pick({
  id: true,
  mealPlanId: true,
  recipeId: true,
  date: true,
  slotType: true,
  servings: true,
}).extend({
  recipe: RecipeFeedItemSchema.nullable(),
});
export type MealPlanSlotWithRecipe = z.output<
  typeof MealPlanSlotWithRecipeSchema
>;

/** Input row for `mealPlan.setMealPlan` — one slot the caller wants to keep. */
export const MealPlanSlotEntrySchema = z.object({
  date: z.string().datetime(),
  slotType: MealSlotTypeSchema,
  recipeId: UuidIdSchema,
  servings: z.number().int().min(1).max(20),
});
export type MealPlanSlotEntry = z.output<typeof MealPlanSlotEntrySchema>;
