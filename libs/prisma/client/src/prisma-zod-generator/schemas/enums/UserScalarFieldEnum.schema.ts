import * as z from 'zod';

export const UserScalarFieldEnumSchema = z.enum([
  'id',
  'email',
  'firebaseUid',
  'name',
  'roles',
  'amr',
  'isDisabled',
  'deletedAt',
  'createdAt',
  'updatedAt',
]);

export type UserScalarFieldEnum = z.infer<typeof UserScalarFieldEnumSchema>;
