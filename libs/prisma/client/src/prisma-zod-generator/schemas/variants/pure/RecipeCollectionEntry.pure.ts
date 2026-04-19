import * as z from 'zod';

// prettier-ignore
export const RecipeCollectionEntryModelSchema = z.object({
    collectionId: z.string(),
    recipeId: z.string(),
    addedAt: z.date(),
    collection: z.unknown(),
    recipe: z.unknown()
}).strict();

export type RecipeCollectionEntryPureType = z.infer<
  typeof RecipeCollectionEntryModelSchema
>;
