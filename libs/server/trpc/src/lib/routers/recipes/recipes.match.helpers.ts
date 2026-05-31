import type {
  MeasureUnit,
  RecipeFeedItem,
  RecipeMatchInfo,
} from '@kookio/prisma-client';
import { NEGLIGIBLE_MEASURE_UNITS } from '@kookio/shared-utility/measure-units';
import type { RecipeMatchLevel } from '@kookio/shared-utility/recipe-match-level';

const MAX_MISSING_NAMES = 3;

export type PantryMap = Map<string, { quantity: number; unit: MeasureUnit }>;

export type ScannedRecipeIngredient = {
  unit: MeasureUnit | null;
  ingredient: { id: string; name: string };
};

export type ScannedRecipe = RecipeFeedItem & {
  ingredients: ScannedRecipeIngredient[];
};

/**
 * Build a userId-scoped lookup map from raw pantry rows. The map is keyed by
 * IngredientCatalog id so the match check is an O(1) lookup per recipe ingredient.
 */
export const buildPantryMap = (
  rows: ReadonlyArray<{
    ingredientCatalogId: string;
    quantity: number;
    unit: MeasureUnit;
  }>,
): PantryMap =>
  new Map(
    rows.map((p) => [
      p.ingredientCatalogId,
      { quantity: p.quantity, unit: p.unit },
    ]),
  );

/**
 * Compute the missing-ingredient summary for one recipe, given the caller's
 * pantry. A null `unit` on a recipe ingredient is treated as a real ingredient:
 * absent unit data is ambiguous, and assuming the user has it (skipping the
 * check) would inflate the A bucket with unverifiable matches.
 */
export const enrichWithMatchInfo = (
  recipe: ScannedRecipe,
  pantryMap: PantryMap,
): { recipe: ScannedRecipe; matchInfo: RecipeMatchInfo } => {
  const totalIngredients = recipe.ingredients.length;
  const missingNames: string[] = [];
  let missingCount = 0;

  for (const ri of recipe.ingredients) {
    if (ri.unit !== null && NEGLIGIBLE_MEASURE_UNITS.has(ri.unit)) continue;
    if (pantryMap.has(ri.ingredient.id)) continue;

    missingCount += 1;
    if (missingNames.length < MAX_MISSING_NAMES) {
      missingNames.push(ri.ingredient.name);
    }
  }

  return {
    recipe,
    matchInfo: { missingCount, totalIngredients, missingNames },
  };
};

/**
 * Level filter for the match procedure.
 *  - Alright: pantry covers everything (0 missing)
 *  - Almost: 1 to 3 missing — "almost there" bucket
 *  - All: no filter — used for the "browse all" surface
 */
export const passesLevel = (
  matchInfo: RecipeMatchInfo,
  level: RecipeMatchLevel,
): boolean => {
  if (level === 'Alright') return matchInfo.missingCount === 0;
  if (level === 'Almost')
    return matchInfo.missingCount >= 1 && matchInfo.missingCount <= 3;
  return true;
};
