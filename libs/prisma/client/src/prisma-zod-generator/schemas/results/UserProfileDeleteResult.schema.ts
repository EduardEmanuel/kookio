import * as z from 'zod';
export const UserProfileDeleteResultSchema = z.nullable(
  z.object({
    id: z.string(),
    userId: z.string(),
    adultsCount: z.number().int(),
    childrenCount: z.number().int(),
    onboardingDone: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    user: z.unknown(),
    dietaryRestrictions: z.array(z.unknown()),
    utensils: z.array(z.unknown()),
  }),
);
