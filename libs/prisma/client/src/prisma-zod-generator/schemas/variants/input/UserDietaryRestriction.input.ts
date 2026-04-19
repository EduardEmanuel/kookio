import * as z from 'zod';

// prettier-ignore
export const UserDietaryRestrictionInputSchema = z.object({
    userId: z.string(),
    dietaryRestrictionId: z.string(),
    user: z.unknown(),
    restriction: z.unknown()
}).strict();

export type UserDietaryRestrictionInputType = z.infer<
  typeof UserDietaryRestrictionInputSchema
>;
