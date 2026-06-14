import z from 'zod';
import { UtensilModelSchema } from '../../prisma-zod-generator/schemas/index';

export const UtensilMockSchema = UtensilModelSchema.pick({
  id: true,
  slug: true,
  name: true,
  emoji: true,
  category: true,
});
export type UtensilMock = z.output<typeof UtensilMockSchema>;

/**
 * Client-side row shape served by the onboardingCatalogs.utensils tRPC query.
 * Identical shape to UtensilMock today; kept as a separate name to express
 * that one is fixture data and the other is a server response.
 */
export const UtensilRowSchema = UtensilMockSchema;
export type UtensilRow = z.output<typeof UtensilRowSchema>;
