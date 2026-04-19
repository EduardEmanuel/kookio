import * as z from 'zod';
export const UserProfileFindManyResultSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      userId: z.string(),
      adultsCount: z.number().int(),
      childrenCount: z.number().int(),
      onboardingDone: z.boolean(),
      createdAt: z.date(),
      updatedAt: z.date(),
      user: z.unknown(),
      dietaryRestrictions: z.array(z.unknown()),
      utensils: z.array(z.unknown()),
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
