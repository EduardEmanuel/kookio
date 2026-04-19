import * as z from 'zod';

import { IngredientCategorySchema } from '../../enums/IngredientCategory.schema';
// prettier-ignore
export const IngredientCatalogInputSchema = z.object({
    id: z.string(),
    externalId: z.string().optional().nullable(),
    name: z.string(),
    normalizedName: z.string(),
    description: z.string().optional().nullable(),
    imageUrl: z.string().optional().nullable(),
    category: IngredientCategorySchema.optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    recipeIngredients: z.array(z.unknown()),
    pantryItems: z.array(z.unknown())
}).strict();

export type IngredientCatalogInputType = z.infer<
  typeof IngredientCatalogInputSchema
>;
