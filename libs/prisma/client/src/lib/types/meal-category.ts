import z from 'zod';
import { MealCategoryModelSchema } from '../../prisma-zod-generator/schemas/index';

export const MealCategorySeedRowSchema = MealCategoryModelSchema.omit({
  id: true,
  createdAt: true,
  recipes: true,
});
export type MealCategorySeedRow = z.output<typeof MealCategorySeedRowSchema>;

/** Client-side row shape served by the onboardingCatalogs.mealCategories tRPC query. */
export const MealCategoryRowSchema = MealCategoryModelSchema.pick({
  id: true,
  name: true,
  emoji: true,
  imageUrl: true,
  description: true,
});
export type MealCategoryRow = z.output<typeof MealCategoryRowSchema>;
