import * as z from 'zod';
export const MealAreaCreateResultSchema = z.object({
  id: z.string(),
  externalId: z.string(),
  name: z.string(),
  flag: z.string().optional(),
  createdAt: z.date(),
  recipes: z.array(z.unknown()),
});
