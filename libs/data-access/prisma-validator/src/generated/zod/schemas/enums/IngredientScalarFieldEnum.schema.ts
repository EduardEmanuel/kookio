import * as z from 'zod';

export const IngredientScalarFieldEnumSchema = z.enum(['id', 'name', 'quantity', 'unit', 'optional', 'userId', 'createdAt'])

export type IngredientScalarFieldEnum = z.infer<typeof IngredientScalarFieldEnumSchema>;