import * as z from 'zod';

export const PantryItemScalarFieldEnumSchema = z.enum([
  'id',
  'userId',
  'ingredientCatalogId',
  'quantity',
  'unit',
  'expiresAt',
  'addedAt',
  'updatedAt',
]);

export type PantryItemScalarFieldEnum = z.infer<
  typeof PantryItemScalarFieldEnumSchema
>;
