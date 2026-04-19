import * as z from 'zod';

// prettier-ignore
export const UserDietaryRestrictionModelSchema = z.object({
    userId: z.string(),
    dietaryRestrictionId: z.string(),
    user: z.unknown(),
    restriction: z.unknown()
}).strict();

export type UserDietaryRestrictionPureType = z.infer<
  typeof UserDietaryRestrictionModelSchema
>;
