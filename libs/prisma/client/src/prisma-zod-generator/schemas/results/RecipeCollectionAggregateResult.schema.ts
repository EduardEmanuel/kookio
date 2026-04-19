import * as z from 'zod';
export const RecipeCollectionAggregateResultSchema = z.object({
  _count: z
    .object({
      id: z.number(),
      userId: z.number(),
      name: z.number(),
      emoji: z.number(),
      createdAt: z.number(),
      updatedAt: z.number(),
      user: z.number(),
      recipes: z.number(),
    })
    .optional(),
  _min: z
    .object({
      id: z.string().nullable(),
      userId: z.string().nullable(),
      name: z.string().nullable(),
      emoji: z.string().nullable(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
  _max: z
    .object({
      id: z.string().nullable(),
      userId: z.string().nullable(),
      name: z.string().nullable(),
      emoji: z.string().nullable(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
});
