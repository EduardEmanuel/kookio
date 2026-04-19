import * as z from 'zod';
export const MealPlanFindManyResultSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      userId: z.string(),
      name: z.string().optional(),
      startDate: z.date(),
      endDate: z.date(),
      createdAt: z.date(),
      updatedAt: z.date(),
      user: z.unknown(),
      slots: z.array(z.unknown()),
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
