import * as z from 'zod';
export const UserGroupByResultSchema = z.array(
  z.object({
    id: z.string(),
    email: z.string(),
    firebaseUid: z.string(),
    name: z.string(),
    amr: z.array(z.string()),
    isDisabled: z.boolean(),
    deletedAt: z.date(),
    createdAt: z.date(),
    updatedAt: z.date(),
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
  }),
);
