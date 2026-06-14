import z from 'zod';
import {
  MealSlotModelSchema,
  MealSlotTypeSchema,
} from '../../prisma-zod-generator/schemas/index';

import { UuidIdSchema } from './ids';
import { RecipeFeedItemSchema } from './recipe';

export const MealSlotMockSchema = MealSlotModelSchema.pick({
  userId: true,
  recipeId: true,
  date: true,
  slotType: true,
  servings: true,
});
export type MealSlotMock = z.output<typeof MealSlotMockSchema>;

/**
 * A populated meal slot as served by `mealPlan.getCurrent`. `recipe` is
 * null only if the referenced recipe has since been removed (FK is SET
 * NULL) — the planner never persists empty slots (clearing one deletes
 * the row), so the null branch is rare in practice.
 */
export const MealSlotWithRecipeSchema = MealSlotModelSchema.pick({
  id: true,
  userId: true,
  recipeId: true,
  date: true,
  slotType: true,
  servings: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  recipe: RecipeFeedItemSchema.nullable(),
});
export type MealSlotWithRecipe = z.output<typeof MealSlotWithRecipeSchema>;

/** Input row for `mealPlan.setMealPlan` — one slot the caller wants to keep. */
export const MealSlotEntrySchema = z.object({
  date: z.string().datetime(),
  slotType: MealSlotTypeSchema,
  recipeId: UuidIdSchema,
  servings: z.number().int().min(1).max(20),
});
export type MealSlotEntry = z.output<typeof MealSlotEntrySchema>;

/**
 * Bulk-set input for `mealPlan.setMealPlan`. The whole timeline is
 * replaced atomically: any prior slot for the user that isn't in `slots`
 * is deleted, and the entries in `slots` are upserted by (userId, date,
 * slotType). The schema does not constrain how many slots or what date
 * range — the planner UI navigates the timeline freely with no enforced
 * bounds.
 */
export const MealPlanSetInputSchema = z.object({
  slots: z.array(MealSlotEntrySchema),
});
export type MealPlanSetInput = z.output<typeof MealPlanSetInputSchema>;
