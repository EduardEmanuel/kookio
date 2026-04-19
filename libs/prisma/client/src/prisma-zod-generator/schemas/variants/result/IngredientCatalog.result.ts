import * as z from 'zod';

import { IngredientCategorySchema } from '../../enums/IngredientCategory.schema';
// prettier-ignore
export const IngredientCatalogResultSchema = z.object({
    id: z.string(),
    externalId: z.string().nullable(),
    name: z.string(),
    normalizedName: z.string(),
    description: z.string().nullable(),
    imageUrl: z.string().nullable(),
    category: IngredientCategorySchema.nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    recipeIngredients: z.array(z.unknown()),
    pantryItems: z.array(z.unknown())
}).strict();

export type IngredientCatalogResultType = z.infer<
  typeof IngredientCatalogResultSchema
>;
