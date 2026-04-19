import * as z from 'zod';
export const RecipeDeleteManyResultSchema = z.object({
  count: z.number(),
});
