import * as z from 'zod';
export const CookingSessionFindManyResultSchema = z.object({
  data: z.array(
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
  ),
  pagination: z.object({
    page: z.number().int().min(1),
    pageSize: z.number().int().min(1),
    total: z.number().int().min(0),
    totalPages: z.number().int().min(0),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
});
