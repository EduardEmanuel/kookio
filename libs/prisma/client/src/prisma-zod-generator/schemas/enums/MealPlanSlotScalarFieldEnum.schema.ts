import * as z from 'zod';

export const MealPlanSlotScalarFieldEnumSchema = z.enum([
  'id',
  'mealPlanId',
  'recipeId',
  'date',
  'slotType',
  'servings',
]);

export type MealPlanSlotScalarFieldEnum = z.infer<
  typeof MealPlanSlotScalarFieldEnumSchema
>;
