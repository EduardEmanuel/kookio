import * as z from 'zod';

export const IngredientCatalogScalarFieldEnumSchema = z.enum([
  'id',
  'externalId',
  'name',
  'normalizedName',
  'description',
  'imageUrl',
  'category',
  'createdAt',
  'updatedAt',
]);

export type IngredientCatalogScalarFieldEnum = z.infer<
  typeof IngredientCatalogScalarFieldEnumSchema
>;
