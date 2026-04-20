import z from 'zod';
import { RecipeTagInputSchema } from '../../prisma-zod-generator/schemas/index';

export const RecipeTagSeedRowSchema = RecipeTagInputSchema.pick({ tag: true });
export type RecipeTagSeedRow = z.output<typeof RecipeTagSeedRowSchema>;
