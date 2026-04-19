import * as z from 'zod';
export const RecipeCollectionFindManyResultSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      userId: z.string(),
      name: z.string(),
      emoji: z.string().optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
      user: z.unknown(),
      recipes: z.array(z.unknown()),
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
