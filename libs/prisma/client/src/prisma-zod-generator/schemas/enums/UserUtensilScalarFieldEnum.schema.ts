import * as z from 'zod';

export const UserUtensilScalarFieldEnumSchema = z.enum(['userId', 'utensilId']);

export type UserUtensilScalarFieldEnum = z.infer<
  typeof UserUtensilScalarFieldEnumSchema
>;
