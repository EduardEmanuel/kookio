import z from 'zod';

export const OnboardingCommitInputSchema = z.object({
  adultsCount: z.number().int().min(1).max(20),
  childrenCount: z.number().int().min(0).max(20),
  preferredCategoryIds: z.array(z.string().uuid()).default([]),
  preferredAreaIds: z.array(z.string().uuid()).default([]),
  utensilIds: z.array(z.string().uuid()).default([]),
  dietaryRestrictionIds: z.array(z.string().uuid()).default([]),
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
