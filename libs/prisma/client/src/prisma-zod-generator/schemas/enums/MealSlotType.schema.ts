import * as z from 'zod';

export const MealSlotTypeSchema = z.enum([
  'BREAKFAST',
  'LUNCH',
  'DINNER',
  'SNACK',
]);

export type MealSlotType = z.infer<typeof MealSlotTypeSchema>;
