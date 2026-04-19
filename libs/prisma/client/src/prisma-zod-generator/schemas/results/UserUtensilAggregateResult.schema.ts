import * as z from 'zod';
export const UserUtensilAggregateResultSchema = z.object({
  _count: z
    .object({
      userId: z.number(),
      utensilId: z.number(),
      user: z.number(),
      utensil: z.number(),
    })
    .optional(),
  _min: z
    .object({
      userId: z.string().nullable(),
      utensilId: z.string().nullable(),
    })
    .nullable()
    .optional(),
  _max: z
    .object({
      userId: z.string().nullable(),
      utensilId: z.string().nullable(),
    })
    .nullable()
    .optional(),
});
