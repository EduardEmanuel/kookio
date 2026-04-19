import * as z from 'zod';

export const RecipeCollectionScalarFieldEnumSchema = z.enum([
  'id',
  'userId',
  'name',
  'emoji',
  'createdAt',
  'updatedAt',
]);

export type RecipeCollectionScalarFieldEnum = z.infer<
  typeof RecipeCollectionScalarFieldEnumSchema
>;
