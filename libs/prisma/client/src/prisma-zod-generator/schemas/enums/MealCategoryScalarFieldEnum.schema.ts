import * as z from 'zod';

export const MealCategoryScalarFieldEnumSchema = z.enum([
  'id',
  'externalId',
  'name',
  'imageUrl',
  'description',
  'createdAt',
]);

export type MealCategoryScalarFieldEnum = z.infer<
  typeof MealCategoryScalarFieldEnumSchema
>;
