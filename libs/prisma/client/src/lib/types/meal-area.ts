import z from 'zod';
import { MealAreaModelSchema } from '../../prisma-zod-generator/schemas/index';

export const MealAreaSeedRowSchema = MealAreaModelSchema.omit({
  id: true,
  createdAt: true,
  recipes: true,
});
export type MealAreaSeedRow = z.output<typeof MealAreaSeedRowSchema>;
