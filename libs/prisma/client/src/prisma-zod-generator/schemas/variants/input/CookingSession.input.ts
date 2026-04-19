import * as z from 'zod';

// prettier-ignore
export const CookingSessionInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    recipeId: z.string(),
    servings: z.number().int(),
    completedAt: z.date().optional().nullable(),
    createdAt: z.date(),
    user: z.unknown(),
    recipe: z.unknown()
}).strict();

export type CookingSessionInputType = z.infer<typeof CookingSessionInputSchema>;
