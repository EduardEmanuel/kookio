import * as z from 'zod';

// prettier-ignore
export const RecipeCollectionModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    name: z.string(),
    emoji: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    user: z.unknown(),
    recipes: z.array(z.unknown())
}).strict();

export type RecipeCollectionPureType = z.infer<
  typeof RecipeCollectionModelSchema
>;
