import * as z from 'zod';

export const UserProfileScalarFieldEnumSchema = z.enum([
  'id',
  'userId',
  'adultsCount',
  'childrenCount',
  'onboardingDone',
  'createdAt',
  'updatedAt',
]);

export type UserProfileScalarFieldEnum = z.infer<
  typeof UserProfileScalarFieldEnumSchema
>;
