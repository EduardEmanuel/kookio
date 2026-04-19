import * as z from 'zod';

import { MeasureUnitSchema } from '../../enums/MeasureUnit.schema';
// prettier-ignore
export const RecipeIngredientResultSchema = z.object({
    id: z.string(),
    recipeId: z.string(),
    ingredientCatalogId: z.string(),
    quantity: z.number().nullable(),
    unit: MeasureUnitSchema.nullable(),
    notes: z.string().nullable(),
    recipe: z.unknown(),
    ingredient: z.unknown()
}).strict();

export type RecipeIngredientResultType = z.infer<
  typeof RecipeIngredientResultSchema
>;
