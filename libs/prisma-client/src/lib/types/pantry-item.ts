import z from 'zod';

import {
  IngredientCatalogModelSchema,
  PantryItemModelSchema,
} from '../../prisma-zod-generator/schemas/index';

const PantryIngredientSchema = IngredientCatalogModelSchema.pick({
  id: true,
  name: true,
  imageUrl: true,
  category: true,
});

/** Row shape served by `pantry.list` and returned from `pantry.add` / `pantry.update`. */
export const PantryItemWithIngredientSchema = PantryItemModelSchema.pick({
  id: true,
  userId: true,
  ingredientCatalogId: true,
  quantity: true,
  unit: true,
  expiresAt: true,
  addedAt: true,
  updatedAt: true,
}).extend({
  ingredient: PantryIngredientSchema,
});
export type PantryItemWithIngredient = z.output<
  typeof PantryItemWithIngredientSchema
>;

/** Card-shaped subset served by `pantry.searchIngredients`. */
export const IngredientSearchResultSchema = IngredientCatalogModelSchema.pick({
  id: true,
  name: true,
  imageUrl: true,
  category: true,
});
export type IngredientSearchResult = z.output<
  typeof IngredientSearchResultSchema
>;
