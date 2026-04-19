import * as z from 'zod';
export const MealPlanAggregateResultSchema = z.object({
  _count: z
    .object({
      id: z.number(),
      userId: z.number(),
      name: z.number(),
      startDate: z.number(),
      endDate: z.number(),
      createdAt: z.number(),
      updatedAt: z.number(),
      user: z.number(),
      slots: z.number(),
    })
    .optional(),
  _min: z
    .object({
      id: z.string().nullable(),
      userId: z.string().nullable(),
      name: z.string().nullable(),
      startDate: z.date().nullable(),
      endDate: z.date().nullable(),
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
      startDate: z.date().nullable(),
      endDate: z.date().nullable(),
      createdAt: z.date().nullable(),
      updatedAt: z.date().nullable(),
    })
    .nullable()
    .optional(),
});
