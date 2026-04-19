import * as z from 'zod';
export const CookingSessionFindFirstResultSchema = z.nullable(
  z.object({
    id: z.string(),
    userId: z.string(),
    recipeId: z.string(),
    servings: z.number().int(),
    completedAt: z.date().optional(),
    createdAt: z.date(),
    user: z.unknown(),
    recipe: z.unknown(),
  }),
);
