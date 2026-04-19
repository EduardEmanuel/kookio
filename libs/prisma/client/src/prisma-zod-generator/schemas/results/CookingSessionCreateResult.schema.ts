import * as z from 'zod';
export const CookingSessionCreateResultSchema = z.object({
  id: z.string(),
  userId: z.string(),
  recipeId: z.string(),
  servings: z.number().int(),
  completedAt: z.date().optional(),
  createdAt: z.date(),
  user: z.unknown(),
  recipe: z.unknown(),
});
