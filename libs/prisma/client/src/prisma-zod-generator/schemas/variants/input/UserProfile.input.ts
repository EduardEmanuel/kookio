import * as z from 'zod';

// prettier-ignore
export const UserProfileInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    adultsCount: z.number().int(),
    childrenCount: z.number().int(),
    onboardingDone: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    user: z.unknown(),
    dietaryRestrictions: z.array(z.unknown()),
    utensils: z.array(z.unknown())
}).strict();

export type UserProfileInputType = z.infer<typeof UserProfileInputSchema>;
