import * as z from 'zod';
export const UserDietaryRestrictionFindUniqueResultSchema = z.nullable(
  z.object({
    userId: z.string(),
    dietaryRestrictionId: z.string(),
    user: z.unknown(),
    restriction: z.unknown(),
  }),
);
