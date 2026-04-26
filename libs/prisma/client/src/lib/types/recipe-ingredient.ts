import z from 'zod';
import { RecipeIngredientInputSchema } from '../../prisma-zod-generator/schemas/index';

export const RecipeIngredientSeedRowSchema = RecipeIngredientInputSchema.omit({
  id: true,
  recipeId: true,
  ingredientCatalogId: true,
  recipe: true,
  ingredient: true,
}).extend({ ingredientNormalizedName: z.string() });
export type RecipeIngredientSeedRow = z.output<
  typeof RecipeIngredientSeedRowSchema
>;
