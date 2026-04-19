import * as z from 'zod';

export const RecipeIngredientScalarFieldEnumSchema = z.enum([
  'id',
  'recipeId',
  'ingredientCatalogId',
  'quantity',
  'unit',
  'notes',
]);

export type RecipeIngredientScalarFieldEnum = z.infer<
  typeof RecipeIngredientScalarFieldEnumSchema
>;
