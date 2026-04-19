import * as z from 'zod';

export const CookingSessionScalarFieldEnumSchema = z.enum([
  'id',
  'userId',
  'recipeId',
  'servings',
  'completedAt',
  'createdAt',
]);

export type CookingSessionScalarFieldEnum = z.infer<
  typeof CookingSessionScalarFieldEnumSchema
>;
