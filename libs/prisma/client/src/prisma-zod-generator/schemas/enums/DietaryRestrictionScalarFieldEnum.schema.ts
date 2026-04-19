import * as z from 'zod';

export const DietaryRestrictionScalarFieldEnumSchema = z.enum([
  'id',
  'slug',
  'label',
  'emoji',
  'description',
]);

export type DietaryRestrictionScalarFieldEnum = z.infer<
  typeof DietaryRestrictionScalarFieldEnumSchema
>;
