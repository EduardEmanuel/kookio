import z from 'zod';
import { IngredientCatalogModelSchema } from '../../prisma-zod-generator/schemas/index';

export const IngredientCatalogSeedRowSchema = IngredientCatalogModelSchema.omit(
  {
    id: true,
    createdAt: true,
    updatedAt: true,
    recipeIngredients: true,
    pantryItems: true,
  },
);
export type IngredientCatalogSeedRow = z.output<
  typeof IngredientCatalogSeedRowSchema
>;

export const IngredientCatalogLookupRowSchema =
  IngredientCatalogModelSchema.pick({
    id: true,
    normalizedName: true,
  });
export type IngredientCatalogLookupRow = z.output<
  typeof IngredientCatalogLookupRowSchema
>;
