import * as z from 'zod';

export const IngredientScalarFieldEnumSchema = z.enum(['id', 'name', 'quantity', 'unit', 'optional', 'userId', 'createdAt', 'updatedAt'])

export type IngredientScalarFieldEnum = z.infer<typeof IngredientScalarFieldEnumSchema>;