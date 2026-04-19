import * as z from 'zod';
export const MealCategoryAggregateResultSchema = z.object({
  _count: z
    .object({
      id: z.number(),
      externalId: z.number(),
      name: z.number(),
      imageUrl: z.number(),
      description: z.number(),
      createdAt: z.number(),
      recipes: z.number(),
    })
    .optional(),
  _min: z
    .object({
      id: z.string().nullable(),
      externalId: z.string().nullable(),
      name: z.string().nullable(),
      imageUrl: z.string().nullable(),
      description: z.string().nullable(),
      createdAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
  _max: z
    .object({
      id: z.string().nullable(),
      externalId: z.string().nullable(),
      name: z.string().nullable(),
      imageUrl: z.string().nullable(),
      description: z.string().nullable(),
      createdAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
});
