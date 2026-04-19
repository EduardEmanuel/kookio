import * as z from 'zod';
export const RecipeCollectionCreateResultSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  emoji: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  user: z.unknown(),
  recipes: z.array(z.unknown()),
});
