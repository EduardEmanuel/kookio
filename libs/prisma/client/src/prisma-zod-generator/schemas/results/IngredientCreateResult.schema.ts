import * as z from 'zod';
export const IngredientCreateResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.number().int(),
  unit: z.string(),
  optional: z.boolean(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
