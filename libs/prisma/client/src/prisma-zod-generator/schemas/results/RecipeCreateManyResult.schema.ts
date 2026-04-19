import * as z from 'zod';
export const RecipeCreateManyResultSchema = z.object({
  count: z.number(),
});
