import * as z from 'zod';

export const MealPlanScalarFieldEnumSchema = z.enum([
  'id',
  'userId',
  'name',
  'startDate',
  'endDate',
  'createdAt',
  'updatedAt',
]);

export type MealPlanScalarFieldEnum = z.infer<
  typeof MealPlanScalarFieldEnumSchema
>;
