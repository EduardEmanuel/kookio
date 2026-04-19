import * as z from 'zod';
export const RecipeCollectionCreateManyResultSchema = z.object({
  count: z.number(),
});
