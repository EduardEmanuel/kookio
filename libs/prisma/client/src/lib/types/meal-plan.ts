import z from 'zod';
import { MealPlanModelSchema } from '../../prisma-zod-generator/schemas/index';

export const MealPlanMockSchema = MealPlanModelSchema.pick({
  id: true,
  userId: true,
  name: true,
  startDate: true,
  endDate: true,
});
export type MealPlanMock = z.output<typeof MealPlanMockSchema>;
