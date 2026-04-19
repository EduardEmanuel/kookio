import * as z from 'zod';

// prettier-ignore
export const CookingSessionResultSchema = z.object({
    id: z.string(),
    userId: z.string(),
    recipeId: z.string(),
    servings: z.number().int(),
    completedAt: z.date().nullable(),
    createdAt: z.date(),
    user: z.unknown(),
    recipe: z.unknown()
}).strict();

export type CookingSessionResultType = z.infer<
  typeof CookingSessionResultSchema
>;
