import z from 'zod';
import { RecipeInputSchema } from '../../prisma-zod-generator/schemas/index';
import { RecipeIngredientSeedRowSchema } from './recipe-ingredient';
import { RecipeTagSeedRowSchema } from './recipe-tag';

export const RecipeSeedRowSchema = RecipeInputSchema.pick({
  externalId: true,
  slug: true,
  title: true,
  imageUrl: true,
  youtubeUrl: true,
  sourceUrl: true,
  instructions: true,
}).extend({
  categoryExternalId: z.string().nullable(),
  areaExternalId: z.string().nullable(),
  tags: z.array(RecipeTagSeedRowSchema),
  ingredients: z.array(RecipeIngredientSeedRowSchema),
});
export type RecipeSeedRow = z.output<typeof RecipeSeedRowSchema>;
