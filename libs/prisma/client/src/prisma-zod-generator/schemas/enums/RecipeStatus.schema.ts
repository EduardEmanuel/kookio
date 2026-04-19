import * as z from 'zod';

export const RecipeStatusSchema = z.enum(['PUBLIC', 'PRIVATE']);

export type RecipeStatus = z.infer<typeof RecipeStatusSchema>;
