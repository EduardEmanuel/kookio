import * as z from 'zod';
export const MealAreaFindManyResultSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      externalId: z.string(),
      name: z.string(),
      flag: z.string().optional(),
      createdAt: z.date(),
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
