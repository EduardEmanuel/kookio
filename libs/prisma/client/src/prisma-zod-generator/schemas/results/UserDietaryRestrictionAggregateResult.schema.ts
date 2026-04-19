import * as z from 'zod';
export const UserDietaryRestrictionAggregateResultSchema = z.object({
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
});
