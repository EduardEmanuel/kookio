import * as z from 'zod';
export const IngredientGroupByResultSchema = z.array(z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.number().int(),
  unit: z.string(),
  optional: z.boolean(),
  userId: z.string(),
  createdAt: z.date(),
  _count: z.object({
    id: z.number(),
    name: z.number(),
    quantity: z.number(),
    unit: z.number(),
    optional: z.number(),
    userId: z.number(),
    createdAt: z.number()
  }).optional(),
  _sum: z.object({
    quantity: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    quantity: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    quantity: z.number().int().nullable(),
    unit: z.string().nullable(),
    userId: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    quantity: z.number().int().nullable(),
    unit: z.string().nullable(),
    userId: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()
}));