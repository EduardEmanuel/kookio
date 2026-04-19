import * as z from 'zod';
export const UserUtensilFindManyResultSchema = z.object({
  data: z.array(
    z.object({
      userId: z.string(),
      utensilId: z.string(),
      user: z.unknown(),
      utensil: z.unknown(),
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
