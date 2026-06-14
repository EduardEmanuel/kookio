import z from 'zod';
import { RecipeCollectionModelSchema } from '../../prisma-zod-generator/schemas/index';

export const RecipeCollectionMockSchema = RecipeCollectionModelSchema.pick({
  id: true,
  userId: true,
  name: true,
  emoji: true,
});
export type RecipeCollectionMock = z.output<typeof RecipeCollectionMockSchema>;
