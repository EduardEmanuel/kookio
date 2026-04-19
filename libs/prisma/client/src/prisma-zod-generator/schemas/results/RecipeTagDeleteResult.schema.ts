import * as z from 'zod';
export const RecipeTagDeleteResultSchema = z.nullable(
  z.object({
    id: z.string(),
    recipeId: z.string(),
    tag: z.string(),
    recipe: z.unknown(),
  }),
);
