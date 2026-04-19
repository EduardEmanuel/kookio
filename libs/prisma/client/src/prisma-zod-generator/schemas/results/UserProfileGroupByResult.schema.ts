import * as z from 'zod';
export const UserProfileGroupByResultSchema = z.array(
  z.object({
    id: z.string(),
    userId: z.string(),
    adultsCount: z.number().int(),
    childrenCount: z.number().int(),
    onboardingDone: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    _count: z
      .object({
        id: z.number(),
        userId: z.number(),
        adultsCount: z.number(),
        childrenCount: z.number(),
        onboardingDone: z.number(),
        createdAt: z.number(),
        updatedAt: z.number(),
        user: z.number(),
        dietaryRestrictions: z.number(),
        utensils: z.number(),
      })
      .optional(),
    _sum: z
      .object({
        adultsCount: z.number().nullable(),
        childrenCount: z.number().nullable(),
      })
      .nullable()
      .optional(),
    _avg: z
      .object({
        adultsCount: z.number().nullable(),
        childrenCount: z.number().nullable(),
      })
      .nullable()
      .optional(),
    _min: z
      .object({
        id: z.string().nullable(),
        userId: z.string().nullable(),
        adultsCount: z.number().int().nullable(),
        childrenCount: z.number().int().nullable(),
        createdAt: z.date().nullable(),
        updatedAt: z.date().nullable(),
      })
      .nullable()
      .optional(),
    _max: z
      .object({
        id: z.string().nullable(),
        userId: z.string().nullable(),
        adultsCount: z.number().int().nullable(),
        childrenCount: z.number().int().nullable(),
        createdAt: z.date().nullable(),
        updatedAt: z.date().nullable(),
      })
      .nullable()
      .optional(),
  }),
);
