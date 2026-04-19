import * as z from 'zod';
export const UserDietaryRestrictionFindManyResultSchema = z.object({
  data: z.array(
    z.object({
      userId: z.string(),
      dietaryRestrictionId: z.string(),
      user: z.unknown(),
      restriction: z.unknown(),
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
