import * as z from 'zod';
export const RecipeIngredientUpsertResultSchema = z.object({
  id: z.string(),
  recipeId: z.string(),
  ingredientCatalogId: z.string(),
  quantity: z.number().optional(),
  unit: z.unknown().optional(),
  notes: z.string().optional(),
  recipe: z.unknown(),
  ingredient: z.unknown(),
});
