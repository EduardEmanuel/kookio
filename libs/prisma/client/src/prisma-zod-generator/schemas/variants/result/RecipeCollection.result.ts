import * as z from 'zod';

// prettier-ignore
export const RecipeCollectionResultSchema = z.object({
    id: z.string(),
    userId: z.string(),
    name: z.string(),
    emoji: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    user: z.unknown(),
    recipes: z.array(z.unknown())
}).strict();

export type RecipeCollectionResultType = z.infer<
  typeof RecipeCollectionResultSchema
>;
