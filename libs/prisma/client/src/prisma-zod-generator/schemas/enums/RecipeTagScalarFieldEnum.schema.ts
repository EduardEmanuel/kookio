import * as z from 'zod';

export const RecipeTagScalarFieldEnumSchema = z.enum(['id', 'recipeId', 'tag']);

export type RecipeTagScalarFieldEnum = z.infer<
  typeof RecipeTagScalarFieldEnumSchema
>;
