import * as z from 'zod';
export const RecipeCollectionDeleteManyResultSchema = z.object({
  count: z.number(),
});
