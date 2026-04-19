import * as z from 'zod';

import { MeasureUnitSchema } from '../../enums/MeasureUnit.schema';
// prettier-ignore
export const RecipeIngredientInputSchema = z.object({
    id: z.string(),
    recipeId: z.string(),
    ingredientCatalogId: z.string(),
    quantity: z.number().optional().nullable(),
    unit: MeasureUnitSchema.optional().nullable(),
    notes: z.string().optional().nullable(),
    recipe: z.unknown(),
    ingredient: z.unknown()
}).strict();

export type RecipeIngredientInputType = z.infer<
  typeof RecipeIngredientInputSchema
>;
