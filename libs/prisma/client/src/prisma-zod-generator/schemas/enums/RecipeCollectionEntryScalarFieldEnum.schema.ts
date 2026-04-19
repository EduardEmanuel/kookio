import * as z from 'zod';

export const RecipeCollectionEntryScalarFieldEnumSchema = z.enum([
  'collectionId',
  'recipeId',
  'addedAt',
]);

export type RecipeCollectionEntryScalarFieldEnum = z.infer<
  typeof RecipeCollectionEntryScalarFieldEnumSchema
>;
