import z from 'zod';
import { DietaryRestrictionModelSchema } from '../../prisma-zod-generator/schemas/index';

export const DietaryRestrictionMockSchema = DietaryRestrictionModelSchema.pick({
  id: true,
  slug: true,
  label: true,
  emoji: true,
  description: true,
});
export type DietaryRestrictionMock = z.output<
  typeof DietaryRestrictionMockSchema
>;
