import {
  MeasureUnitSchema,
  type MeasureUnit,
  type RecipeFeedItem,
  type RecipeMatchInfo,
  type RecipeMatchLevel,
} from '@kookio/prisma-client';

const Unit = MeasureUnitSchema.enum;

/**
 * Recipe-ingredient units that bypass the pantry check. These cover kitchen
 * staples (sare, piper, garnish) that users are assumed to have on hand;
 * counting them as "missing" would knock real candidates out of the A bucket
 * for trivial reasons.
 */
export const NEGLIGIBLE_UNITS: ReadonlySet<MeasureUnit> = new Set([
  Unit.TO_TASTE,
  Unit.TO_SERVE,
  Unit.GARNISH,
  Unit.PINCH,
]);

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
    if (ri.unit !== null && NEGLIGIBLE_UNITS.has(ri.unit)) continue;
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
 *  - A: pantry covers everything (0 missing)
 *  - B: 1 to 3 missing — "almost there" bucket
 *  - C: no filter — used for the "browse all" surface
 */
export const passesLevel = (
  matchInfo: RecipeMatchInfo,
  level: RecipeMatchLevel,
): boolean => {
  if (level === 'A') return matchInfo.missingCount === 0;
  if (level === 'B')
    return matchInfo.missingCount >= 1 && matchInfo.missingCount <= 3;
  return true;
};
