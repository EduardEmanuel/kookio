import * as z from 'zod';

export const UserDietaryRestrictionScalarFieldEnumSchema = z.enum([
  'userId',
  'dietaryRestrictionId',
]);

export type UserDietaryRestrictionScalarFieldEnum = z.infer<
  typeof UserDietaryRestrictionScalarFieldEnumSchema
>;
