import * as z from 'zod';

// prettier-ignore
export const UserDietaryRestrictionResultSchema = z.object({
    userId: z.string(),
    dietaryRestrictionId: z.string(),
    user: z.unknown(),
    restriction: z.unknown()
}).strict();

export type UserDietaryRestrictionResultType = z.infer<
  typeof UserDietaryRestrictionResultSchema
>;
