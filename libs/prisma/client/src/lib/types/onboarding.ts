import z from 'zod';

import { SemanticIdSchema, UuidIdSchema } from './ids';

/**
 * Onboarding commits IDs from four catalogs. Two of them (`Utensil`,
 * `DietaryRestriction`) are seeded with semantic IDs in dev/E2E
 * (`utensil_chef_knife`, `dr_vegan`); `MealCategory` and `MealArea` come
 * from Prisma's runtime UUIDs. The wire schema follows the source of each
 * ID so a stricter validator never rejects valid seed data — and so a
 * future contributor can tell from the import alone which catalog uses
 * which scheme.
 */
/** Single user-facing display name. Trimmed, 1-50 chars. */
export const DisplayNameSchema = z
  .string()
  .trim()
  .min(1, 'Please enter your name')
  .max(50, 'Max 50 characters');

export const OnboardingCommitInputSchema = z.object({
  name: DisplayNameSchema,
  adultsCount: z.number().int().min(1).max(20),
  childrenCount: z.number().int().min(0).max(20),
  preferredCategoryIds: z.array(UuidIdSchema).default([]),
  preferredAreaIds: z.array(UuidIdSchema).default([]),
  utensilIds: z.array(SemanticIdSchema).default([]),
  dietaryRestrictionIds: z.array(SemanticIdSchema).default([]),
});
export type OnboardingCommitInput = z.input<typeof OnboardingCommitInputSchema>;

export const OnboardingCurrentSchema = z.object({
  /** Pre-fills the start-step input when a user re-enters onboarding. */
  name: z.string().nullable(),
  adultsCount: z.number().int(),
  childrenCount: z.number().int(),
  preferredCategoryIds: z.array(z.string()),
  preferredAreaIds: z.array(z.string()),
  utensilIds: z.array(z.string()),
  dietaryRestrictionIds: z.array(z.string()),
});
export type OnboardingCurrent = z.output<typeof OnboardingCurrentSchema>;
