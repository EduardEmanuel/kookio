import z from 'zod';
import { MealCategoryModelSchema } from '../../prisma-zod-generator/schemas/index';

export const MealCategorySeedRowSchema = MealCategoryModelSchema.omit({
  id: true,
  createdAt: true,
  recipes: true,
});
export type MealCategorySeedRow = z.output<typeof MealCategorySeedRowSchema>;
