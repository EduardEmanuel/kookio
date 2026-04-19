import * as z from 'zod';
export const UtensilFindManyResultSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      slug: z.string(),
      name: z.string(),
      emoji: z.string().optional(),
      category: z.string().optional(),
      users: z.array(z.unknown()),
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
