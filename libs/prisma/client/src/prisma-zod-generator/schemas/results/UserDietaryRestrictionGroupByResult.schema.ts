import * as z from 'zod';
export const UserDietaryRestrictionGroupByResultSchema = z.array(
  z.object({
    userId: z.string(),
    dietaryRestrictionId: z.string(),
    _count: z
      .object({
        userId: z.number(),
        dietaryRestrictionId: z.number(),
        user: z.number(),
        restriction: z.number(),
      })
      .optional(),
    _min: z
      .object({
        userId: z.string().nullable(),
        dietaryRestrictionId: z.string().nullable(),
      })
      .nullable()
      .optional(),
    _max: z
      .object({
        userId: z.string().nullable(),
        dietaryRestrictionId: z.string().nullable(),
      })
      .nullable()
      .optional(),
  }),
);
