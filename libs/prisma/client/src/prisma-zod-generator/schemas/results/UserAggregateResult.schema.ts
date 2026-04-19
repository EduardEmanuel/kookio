import * as z from 'zod';
export const UserAggregateResultSchema = z.object({
  _count: z
    .object({
      id: z.number(),
      email: z.number(),
      firebaseUid: z.number(),
      name: z.number(),
      roles: z.number(),
      amr: z.number(),
      isDisabled: z.number(),
      deletedAt: z.number(),
      createdAt: z.number(),
      updatedAt: z.number(),
      credentials: z.number(),
      profile: z.number(),
      pantryItems: z.number(),
      recipes: z.number(),
      collections: z.number(),
      mealPlans: z.number(),
      cookingSessions: z.number(),
    })
    .optional(),
  _min: z
    .object({
      id: z.string().nullable(),
      email: z.string().nullable(),
      firebaseUid: z.string().nullable(),
      name: z.string().nullable(),
      amr: z.array(z.string()).nullable(),
      deletedAt: z.date().nullable(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
  _max: z
    .object({
      id: z.string().nullable(),
      email: z.string().nullable(),
      firebaseUid: z.string().nullable(),
      name: z.string().nullable(),
      amr: z.array(z.string()).nullable(),
      deletedAt: z.date().nullable(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
});
