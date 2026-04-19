import * as z from 'zod';

export const MealAreaScalarFieldEnumSchema = z.enum([
  'id',
  'externalId',
  'name',
  'flag',
  'createdAt',
]);

export type MealAreaScalarFieldEnum = z.infer<
  typeof MealAreaScalarFieldEnumSchema
>;
