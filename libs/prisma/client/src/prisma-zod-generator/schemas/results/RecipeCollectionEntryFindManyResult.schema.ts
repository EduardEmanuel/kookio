import * as z from 'zod';
export const RecipeCollectionEntryFindManyResultSchema = z.object({
  data: z.array(
    z.object({
      collectionId: z.string(),
      recipeId: z.string(),
      addedAt: z.date(),
      collection: z.unknown(),
      recipe: z.unknown(),
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
