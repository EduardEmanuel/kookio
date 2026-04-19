import * as z from 'zod';
export const RecipeIngredientFindManyResultSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      recipeId: z.string(),
      ingredientCatalogId: z.string(),
      quantity: z.number().optional(),
      unit: z.unknown().optional(),
      notes: z.string().optional(),
      recipe: z.unknown(),
      ingredient: z.unknown(),
    }),
  ),
  pagination: z.object({
    page: z.number().int().min(1),
    pageSize: z.number().int().min(1),
    total: z.number().int().min(0),
    totalPages: z.number().int().min(0),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
});
