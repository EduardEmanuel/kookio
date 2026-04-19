import * as z from 'zod';
export const MealPlanCreateResultSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  user: z.unknown(),
  slots: z.array(z.unknown()),
});
