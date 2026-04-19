import * as z from 'zod';

// prettier-ignore
export const RecipeCollectionEntryInputSchema = z.object({
    collectionId: z.string(),
    recipeId: z.string(),
    addedAt: z.date(),
    collection: z.unknown(),
    recipe: z.unknown()
}).strict();

export type RecipeCollectionEntryInputType = z.infer<
  typeof RecipeCollectionEntryInputSchema
>;
