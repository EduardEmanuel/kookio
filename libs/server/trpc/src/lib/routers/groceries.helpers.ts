import type { IngredientCategory, MeasureUnit } from '@kookio/prisma-client';
import {
  isFlavourOnlyUnit,
  toGrams,
} from '@kookio/shared-utility/measure-units';

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
      readonly pieceGrams: number | null;
    };
  }>;
};

export type DerivedGroceryRow = {
  ingredientCatalogId: string;
  ingredientName: string;
  ingredientImageUrl: string | null;
  category: IngredientCategory | null;
  /** Aggregated quantity in the first-encountered recipe unit (display only). */
  totalQuantity: number | null;
  unit: MeasureUnit | null;
  /**
   * Cross-unit aggregate in grams via the shared `toGrams` helper. Used by
   * `addBoughtToPantry` to merge into existing pantry rows whose unit may
   * differ from `unit` above. Null when the unit was missing on every
   * contributing slot — defensive.
   */
  totalGrams: number | null;
  /**
   * Per-ingredient mass-of-one-piece passed through from the catalog. Stored
   * on the aggregate so `addBoughtToPantry` has it without a second lookup;
   * the wire shape strips it.
   */
  pieceGrams: number | null;
};

/**
 * Derive the grocery list from plan slots minus pantry. Pure function so the
 * algorithm can be exercised without spinning up a TestBed or Prisma stub.
 *
 * Aggregation rule: rows are keyed by `ingredientCatalogId` only. The first
 * encountered unit wins for `totalQuantity` (display), while `totalGrams`
 * sums across slots via the shared `toGrams` helper for cross-unit
 * reconciliation downstream (used by `addBoughtToPantry`).
 *
 * Skipped:
 *  - slots with `recipeId === null` (empty cells)
 *  - slot recipes that are no longer in the catalog (defensive, should not happen)
 *  - ingredients whose unit is flavour-only (TO_TASTE/TO_SERVE/GARNISH) —
 *    aggregating "3 garnish" on a shopping list is meaningless. PINCH stays
 *    in (0.5 g real mass, user might genuinely need to buy salt).
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
      if (ri.unit !== null && isFlavourOnlyUnit(ri.unit)) continue;
      if (pantryIngredientIds.has(ri.ingredient.id)) continue;

      const scaledQty = ri.quantity !== null ? ri.quantity * scale : null;
      const piece = ri.ingredient.pieceGrams ?? null;
      // Convert this slot's contribution to grams once, then accumulate.
      // `allowDefault: true` lets piece-class units without a catalog
      // pieceGrams still produce a number (DEFAULT_PIECE_GRAMS) — matches
      // the dialog + decrement contract.
      const slotGrams =
        ri.unit !== null && scaledQty !== null
          ? toGrams(scaledQty, ri.unit, piece, { allowDefault: true })
          : null;

      const existing = aggregate.get(ri.ingredient.id);

      if (existing) {
        if (existing.totalQuantity !== null && scaledQty !== null) {
          existing.totalQuantity += scaledQty;
        } else if (scaledQty !== null) {
          existing.totalQuantity = scaledQty;
        }
        if (slotGrams !== null) {
          existing.totalGrams = (existing.totalGrams ?? 0) + slotGrams;
        }
      } else {
        aggregate.set(ri.ingredient.id, {
          ingredientCatalogId: ri.ingredient.id,
          ingredientName: ri.ingredient.name,
          ingredientImageUrl: ri.ingredient.imageUrl,
          category: ri.ingredient.category,
          totalQuantity: scaledQty,
          unit: ri.unit,
          totalGrams: slotGrams,
          pieceGrams: piece,
        });
      }
    }
  }

  return [...aggregate.values()];
};
