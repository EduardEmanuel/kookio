import * as z from 'zod';
export const RecipeTagCreateResultSchema = z.object({
  id: z.string(),
  recipeId: z.string(),
  tag: z.string(),
  recipe: z.unknown(),
});
