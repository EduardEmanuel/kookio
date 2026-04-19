import * as z from 'zod';
export const MealCategoryUpsertResultSchema = z.object({
  id: z.string(),
  externalId: z.string(),
  name: z.string(),
  imageUrl: z.string().optional(),
  description: z.string().optional(),
  createdAt: z.date(),
  recipes: z.array(z.unknown()),
});
