import z from 'zod';

/**
 * Catalog IDs (utensils, dietary restrictions, meal categories, meal areas)
 * are stored as plain `String` in the schema. The seed fixtures intentionally
 * use semantic IDs (`utensil_chef_knife`, `dr_vegetarian`, …) instead of
 * UUIDs so dev/E2E logs grep cleanly and the DB rows stay self-describing.
 *
 * Validating these as `z.string().uuid()` rejected every onboarding submit
 * in dev because the seeded IDs are not UUID-shaped. The server already
 * enforces the real boundary by failing on the DB write when an ID does
 * not exist, so a permissive `min(1)` is enough here — UUID format would
 * be a false sense of security anyway.
 */
const CatalogIdSchema = z.string().min(1);

export const OnboardingCommitInputSchema = z.object({
  adultsCount: z.number().int().min(1).max(20),
  childrenCount: z.number().int().min(0).max(20),
  preferredCategoryIds: z.array(CatalogIdSchema).default([]),
  preferredAreaIds: z.array(CatalogIdSchema).default([]),
  utensilIds: z.array(CatalogIdSchema).default([]),
  dietaryRestrictionIds: z.array(CatalogIdSchema).default([]),
});
export type OnboardingCommitInput = z.input<typeof OnboardingCommitInputSchema>;

export const OnboardingCurrentSchema = z.object({
  adultsCount: z.number().int(),
  childrenCount: z.number().int(),
  preferredCategoryIds: z.array(z.string()),
  preferredAreaIds: z.array(z.string()),
  utensilIds: z.array(z.string()),
  dietaryRestrictionIds: z.array(z.string()),
});
export type OnboardingCurrent = z.output<typeof OnboardingCurrentSchema>;
