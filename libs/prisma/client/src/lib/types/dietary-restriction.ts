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

/**
 * Client-side row shape served by the onboardingCatalogs.dietaryRestrictions
 * tRPC query. Identical shape to DietaryRestrictionMock today; kept as a
 * separate name to express that one is fixture data and the other is a
 * server response.
 */
export const DietaryRestrictionRowSchema = DietaryRestrictionMockSchema;
export type DietaryRestrictionRow = z.output<
  typeof DietaryRestrictionRowSchema
>;
