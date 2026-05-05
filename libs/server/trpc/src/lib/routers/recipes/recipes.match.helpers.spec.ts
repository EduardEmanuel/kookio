import { describe, expect, it } from 'vitest';

import { MeasureUnitSchema } from '@kookio/prisma-client';

import {
  buildPantryMap,
  enrichWithMatchInfo,
  passesLevel,
  type PantryMap,
  type ScannedRecipe,
} from './recipes.match.helpers';

const Unit = MeasureUnitSchema.enum;

const makeIngredient = (
  id: string,
  name: string,
  unit:
    | typeof Unit.G
    | typeof Unit.TO_TASTE
    | typeof Unit.PINCH
    | null = Unit.G,
) => ({
  unit,
  ingredient: { id, name },
});

const makeRecipe = (
  ingredients: ScannedRecipe['ingredients'],
): ScannedRecipe => ({
  id: 'r-1',
  slug: 'recipe-1',
  title: 'Recipe 1',
  imageUrl: null,
  prepTimeMinutes: null,
  cookTimeMinutes: null,
  servings: 4,
  category: null,
  area: null,
  ingredients,
});

const emptyPantry: PantryMap = new Map();

describe('recipes.match.helpers', () => {
  describe('buildPantryMap', () => {
    it('keys by ingredientCatalogId and preserves quantity + unit', () => {
      const map = buildPantryMap([
        { ingredientCatalogId: 'ing-1', quantity: 500, unit: Unit.G },
        { ingredientCatalogId: 'ing-2', quantity: 1, unit: Unit.PIECE },
      ]);

      expect(map.size).toBe(2);
      expect(map.get('ing-1')).toEqual({ quantity: 500, unit: Unit.G });
      expect(map.get('ing-2')).toEqual({ quantity: 1, unit: Unit.PIECE });
    });

    it('returns an empty map for an empty pantry list', () => {
      expect(buildPantryMap([]).size).toBe(0);
    });
  });

  describe('enrichWithMatchInfo', () => {
    it('counts every non-negligible ingredient as missing when pantry is empty', () => {
      const recipe = makeRecipe([
        makeIngredient('flour', 'Flour'),
        makeIngredient('eggs', 'Eggs'),
      ]);

      const { matchInfo } = enrichWithMatchInfo(recipe, emptyPantry);

      expect(matchInfo).toEqual({
        missingCount: 2,
        totalIngredients: 2,
        missingNames: ['Flour', 'Eggs'],
      });
    });

    it('returns zero missing when pantry covers every ingredient', () => {
      const recipe = makeRecipe([
        makeIngredient('flour', 'Flour'),
        makeIngredient('eggs', 'Eggs'),
      ]);
      const pantry = buildPantryMap([
        { ingredientCatalogId: 'flour', quantity: 1000, unit: Unit.G },
        { ingredientCatalogId: 'eggs', quantity: 12, unit: Unit.PIECE },
      ]);

      const { matchInfo } = enrichWithMatchInfo(recipe, pantry);

      expect(matchInfo.missingCount).toBe(0);
      expect(matchInfo.totalIngredients).toBe(2);
      expect(matchInfo.missingNames).toEqual([]);
    });

    it('skips ingredients with negligible units (TO_TASTE, PINCH, etc.)', () => {
      const recipe = makeRecipe([
        makeIngredient('salt', 'Salt', Unit.TO_TASTE),
        makeIngredient('pepper', 'Pepper', Unit.PINCH),
      ]);

      const { matchInfo } = enrichWithMatchInfo(recipe, emptyPantry);

      // Both ingredients ignored — recipe matches even with empty pantry.
      expect(matchInfo.missingCount).toBe(0);
      expect(matchInfo.totalIngredients).toBe(2);
    });

    it('treats null unit as a real ingredient (not skipped)', () => {
      const recipe = makeRecipe([makeIngredient('mystery', 'Mystery', null)]);

      const { matchInfo } = enrichWithMatchInfo(recipe, emptyPantry);

      expect(matchInfo.missingCount).toBe(1);
      expect(matchInfo.missingNames).toEqual(['Mystery']);
    });

    it('truncates missingNames to the first 3 missing ingredients', () => {
      const recipe = makeRecipe([
        makeIngredient('a', 'Apple'),
        makeIngredient('b', 'Banana'),
        makeIngredient('c', 'Carrot'),
        makeIngredient('d', 'Dill'),
        makeIngredient('e', 'Egg'),
      ]);

      const { matchInfo } = enrichWithMatchInfo(recipe, emptyPantry);

      expect(matchInfo.missingCount).toBe(5);
      expect(matchInfo.missingNames).toEqual(['Apple', 'Banana', 'Carrot']);
    });

    it('mixes negligible-skip with real-match logic correctly', () => {
      const recipe = makeRecipe([
        makeIngredient('flour', 'Flour'),
        makeIngredient('salt', 'Salt', Unit.TO_TASTE),
        makeIngredient('eggs', 'Eggs'),
      ]);
      const pantry = buildPantryMap([
        { ingredientCatalogId: 'flour', quantity: 500, unit: Unit.G },
      ]);

      const { matchInfo } = enrichWithMatchInfo(recipe, pantry);

      expect(matchInfo.missingCount).toBe(1);
      expect(matchInfo.missingNames).toEqual(['Eggs']);
      expect(matchInfo.totalIngredients).toBe(3);
    });
  });

  describe('passesLevel', () => {
    const info = (missingCount: number) => ({
      missingCount,
      totalIngredients: 10,
      missingNames: [],
    });

    it('level A passes only when nothing is missing', () => {
      expect(passesLevel(info(0), 'A')).toBe(true);
      expect(passesLevel(info(1), 'A')).toBe(false);
      expect(passesLevel(info(5), 'A')).toBe(false);
    });

    it('level B passes for 1 to 3 missing, inclusive on both ends', () => {
      expect(passesLevel(info(0), 'B')).toBe(false);
      expect(passesLevel(info(1), 'B')).toBe(true);
      expect(passesLevel(info(3), 'B')).toBe(true);
      expect(passesLevel(info(4), 'B')).toBe(false);
    });

    it('level C passes for any missingCount', () => {
      expect(passesLevel(info(0), 'C')).toBe(true);
      expect(passesLevel(info(50), 'C')).toBe(true);
    });
  });
});
