import * as z from 'zod';

// prettier-ignore
export const RecipeCollectionInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    name: z.string(),
    emoji: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    user: z.unknown(),
    recipes: z.array(z.unknown())
}).strict();

export type RecipeCollectionInputType = z.infer<
  typeof RecipeCollectionInputSchema
>;
