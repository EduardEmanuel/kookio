import * as z from 'zod';
export const UserFindManyResultSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      email: z.string(),
      firebaseUid: z.string().optional(),
      name: z.string().optional(),
      roles: z.array(z.unknown()),
      amr: z.array(z.string()),
      isDisabled: z.boolean(),
      deletedAt: z.date().optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
      credentials: z.array(z.unknown()),
      profile: z.unknown().optional(),
      pantryItems: z.array(z.unknown()),
      recipes: z.array(z.unknown()),
      collections: z.array(z.unknown()),
      mealPlans: z.array(z.unknown()),
      cookingSessions: z.array(z.unknown()),
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
