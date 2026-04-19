import * as z from 'zod';

// prettier-ignore
export const CookingSessionModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    recipeId: z.string(),
    servings: z.number().int(),
    completedAt: z.date().nullable(),
    createdAt: z.date(),
    user: z.unknown(),
    recipe: z.unknown()
}).strict();

export type CookingSessionPureType = z.infer<typeof CookingSessionModelSchema>;
