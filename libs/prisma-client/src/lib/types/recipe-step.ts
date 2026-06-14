import z from 'zod';

import { RecipeStepModelSchema } from '../../prisma-zod-generator/schemas/index';

/**
 * Shape of a single step in the seed snapshot (recipes.json). Carries the
 * editorial fields only — `id` and `recipeId` are assigned by the database
 * at insert time.
 */
export const RecipeStepSeedRowSchema = RecipeStepModelSchema.pick({
  order: true,
  title: true,
  content: true,
});
export type RecipeStepSeedRow = z.output<typeof RecipeStepSeedRowSchema>;

/**
 * Row shape served as part of the recipes.byId tRPC query response.
 * Includes `id` so the UI can use it as a stable list key.
 */
export const RecipeStepDetailSchema = RecipeStepModelSchema.pick({
  id: true,
  order: true,
  title: true,
  content: true,
});
export type RecipeStepDetail = z.output<typeof RecipeStepDetailSchema>;
