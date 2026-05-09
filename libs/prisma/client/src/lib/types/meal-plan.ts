import z from 'zod';
import { MealPlanModelSchema } from '../../prisma-zod-generator/schemas/index';

import {
  MealPlanSlotEntrySchema,
  MealPlanSlotWithRecipeSchema,
} from './meal-plan-slot';

export const MealPlanMockSchema = MealPlanModelSchema.pick({
  id: true,
  userId: true,
  name: true,
  startDate: true,
  endDate: true,
});
export type MealPlanMock = z.output<typeof MealPlanMockSchema>;

/**
 * Full meal plan + populated slots — output shape of `mealPlan.getCurrent`.
 * Slots are returned sparse: missing (date, slotType) pairs mean the user
 * has not planned a meal there. The client materialises the (N days × M
 * slot types) grid by looking up each cell against this list.
 */
export const MealPlanFullSchema = MealPlanModelSchema.pick({
  id: true,
  userId: true,
  name: true,
  startDate: true,
  endDate: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  slots: z.array(MealPlanSlotWithRecipeSchema),
});
export type MealPlanFull = z.output<typeof MealPlanFullSchema>;

/**
 * Input for `mealPlan.setMealPlan` — replaces the active plan's date range
 * and slot set atomically. The server validates that every `slots[i].date`
 * falls within `[startDate, endDate]`.
 */
export const MealPlanSetInputSchema = z.object({
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  slots: z.array(MealPlanSlotEntrySchema),
});
export type MealPlanSetInput = z.output<typeof MealPlanSetInputSchema>;
