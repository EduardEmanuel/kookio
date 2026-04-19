import * as z from 'zod';
export const MealAreaAggregateResultSchema = z.object({
  _count: z
    .object({
      id: z.number(),
      externalId: z.number(),
      name: z.number(),
      flag: z.number(),
      createdAt: z.number(),
      recipes: z.number(),
    })
    .optional(),
  _min: z
    .object({
      id: z.string().nullable(),
      externalId: z.string().nullable(),
      name: z.string().nullable(),
      flag: z.string().nullable(),
      createdAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
  _max: z
    .object({
      id: z.string().nullable(),
      externalId: z.string().nullable(),
      name: z.string().nullable(),
      flag: z.string().nullable(),
      createdAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
});
