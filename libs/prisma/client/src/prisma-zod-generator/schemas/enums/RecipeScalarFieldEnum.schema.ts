import * as z from 'zod';

export const RecipeScalarFieldEnumSchema = z.enum([
  'id',
  'externalId',
  'slug',
  'title',
  'description',
  'imageUrl',
  'youtubeUrl',
  'sourceUrl',
  'instructions',
  'status',
  'servings',
  'prepTimeMinutes',
  'cookTimeMinutes',
  'categoryId',
  'areaId',
  'authorId',
  'createdAt',
  'updatedAt',
]);

export type RecipeScalarFieldEnum = z.infer<typeof RecipeScalarFieldEnumSchema>;
