import * as z from 'zod';
export const RecipeCollectionEntryCreateResultSchema = z.object({
  collectionId: z.string(),
  recipeId: z.string(),
  addedAt: z.date(),
  collection: z.unknown(),
  recipe: z.unknown(),
});
