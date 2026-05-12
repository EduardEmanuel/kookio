import type { IngredientCategory, MeasureUnit } from '@kookio/prisma-client';
import { NEGLIGIBLE_MEASURE_UNITS } from '@kookio/shared-utility/measure-units';

export type SlotForDerivation = {
  readonly recipeId: string | null;
  readonly servings: number;
};

export type RecipeForDerivation = {
  readonly id: string;
  readonly servings: number;
  readonly ingredients: ReadonlyArray<{
    readonly quantity: number | null;
    readonly unit: MeasureUnit | null;
    readonly ingredient: {
      readonly id: string;
      readonly name: string;
      readonly imageUrl: string | null;
      readonly category: IngredientCategory | null;
    };
  }>;
};

export type DerivedGroceryRow = {
  ingredientCatalogId: string;
  ingredientName: string;
  ingredientImageUrl: string | null;
  category: IngredientCategory | null;
  totalQuantity: number | null;
  unit: MeasureUnit | null;
};

/**
 * Derive the grocery list from plan slots minus pantry. Pure function so the
 * algorithm can be exercised without spinning up a TestBed or Prisma stub.
 *
 * Aggregation rule: rows are keyed by `ingredientCatalogId` only. The first
 * encountered unit wins and quantities sum across slots regardless of unit
 * mismatch — same pragmatic compromise as the no-unit-conversion rule on
 * pantry coverage. The user is buying an ingredient; the unit on the row is a
 * hint, not a precise total.
 *
 * Skipped:
 *  - slots with `recipeId === null` (empty cells)
 *  - slot recipes that are no longer in the catalog (defensive, should not happen)
 *  - ingredients whose unit is in `NEGLIGIBLE_MEASURE_UNITS` (salt, pepper, garnish)
 *  - ingredients already present in the pantry (binary set-difference, no unit check)
 */
export const deriveGroceries = (
  slots: ReadonlyArray<SlotForDerivation>,
  recipes: ReadonlyArray<RecipeForDerivation>,
  pantryIngredientIds: ReadonlySet<string>,
): DerivedGroceryRow[] => {
  const recipeById = new Map(recipes.map((r) => [r.id, r]));
  const aggregate = new Map<string, DerivedGroceryRow>();

  for (const slot of slots) {
    if (slot.recipeId === null) continue;
    const recipe = recipeById.get(slot.recipeId);
    if (!recipe) continue;

    // Floor at 1 to avoid div-by-zero if a corrupt seed lands `servings: 0`.
    const recipeServings = Math.max(recipe.servings, 1);
    const slotServings = Math.max(slot.servings, 1);
    const scale = slotServings / recipeServings;

    for (const ri of recipe.ingredients) {
      if (ri.unit !== null && NEGLIGIBLE_MEASURE_UNITS.has(ri.unit)) continue;
      if (pantryIngredientIds.has(ri.ingredient.id)) continue;

      const scaledQty = ri.quantity !== null ? ri.quantity * scale : null;
      const existing = aggregate.get(ri.ingredient.id);

      if (existing) {
        if (existing.totalQuantity !== null && scaledQty !== null) {
          existing.totalQuantity += scaledQty;
        } else if (scaledQty !== null) {
          existing.totalQuantity = scaledQty;
        }
      } else {
        aggregate.set(ri.ingredient.id, {
          ingredientCatalogId: ri.ingredient.id,
          ingredientName: ri.ingredient.name,
          ingredientImageUrl: ri.ingredient.imageUrl,
          category: ri.ingredient.category,
          totalQuantity: scaledQty,
          unit: ri.unit,
        });
      }
    }
  }

  return [...aggregate.values()];
};
