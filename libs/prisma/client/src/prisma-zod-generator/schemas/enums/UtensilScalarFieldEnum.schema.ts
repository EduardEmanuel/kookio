import * as z from 'zod';

export const UtensilScalarFieldEnumSchema = z.enum([
  'id',
  'slug',
  'name',
  'emoji',
  'category',
]);

export type UtensilScalarFieldEnum = z.infer<
  typeof UtensilScalarFieldEnumSchema
>;
