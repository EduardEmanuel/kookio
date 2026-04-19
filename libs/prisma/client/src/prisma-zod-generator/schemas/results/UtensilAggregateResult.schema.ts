import * as z from 'zod';
export const UtensilAggregateResultSchema = z.object({
  _count: z
    .object({
      id: z.number(),
      slug: z.number(),
      name: z.number(),
      emoji: z.number(),
      category: z.number(),
      users: z.number(),
    })
    .optional(),
  _min: z
    .object({
      id: z.string().nullable(),
      slug: z.string().nullable(),
      name: z.string().nullable(),
      emoji: z.string().nullable(),
      category: z.string().nullable(),
    })
    .nullable()
    .optional(),
  _max: z
    .object({
      id: z.string().nullable(),
      slug: z.string().nullable(),
      name: z.string().nullable(),
      emoji: z.string().nullable(),
      category: z.string().nullable(),
    })
    .nullable()
    .optional(),
});
