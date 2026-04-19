import * as z from 'zod';
export const UserUtensilGroupByResultSchema = z.array(
  z.object({
    userId: z.string(),
    utensilId: z.string(),
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
  }),
);
