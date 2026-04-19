import * as z from 'zod';
export const RecipeCollectionEntryGroupByResultSchema = z.array(
  z.object({
    collectionId: z.string(),
    recipeId: z.string(),
    addedAt: z.date(),
    _count: z
      .object({
        collectionId: z.number(),
        recipeId: z.number(),
        addedAt: z.number(),
        collection: z.number(),
        recipe: z.number(),
      })
      .optional(),
    _min: z
      .object({
        collectionId: z.string().nullable(),
        recipeId: z.string().nullable(),
        addedAt: z.date().nullable(),
      })
      .nullable()
      .optional(),
    _max: z
      .object({
        collectionId: z.string().nullable(),
        recipeId: z.string().nullable(),
        addedAt: z.date().nullable(),
      })
      .nullable()
      .optional(),
  }),
);
