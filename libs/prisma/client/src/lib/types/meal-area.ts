import z from 'zod';
import { MealAreaModelSchema } from '../../prisma-zod-generator/schemas/index';

export const MealAreaSeedRowSchema = MealAreaModelSchema.omit({
  id: true,
  createdAt: true,
  recipes: true,
});
export type MealAreaSeedRow = z.output<typeof MealAreaSeedRowSchema>;

/** Client-side row shape served by the onboardingCatalogs.mealAreas tRPC query. */
export const MealAreaRowSchema = MealAreaModelSchema.pick({
  id: true,
  name: true,
  flag: true,
});
export type MealAreaRow = z.output<typeof MealAreaRowSchema>;
