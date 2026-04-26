import z from 'zod';
import { CookingSessionModelSchema } from '../../prisma-zod-generator/schemas/index';

export const CookingSessionMockSchema = CookingSessionModelSchema.pick({
  id: true,
  userId: true,
  recipeId: true,
  servings: true,
  completedAt: true,
});
export type CookingSessionMock = z.output<typeof CookingSessionMockSchema>;
