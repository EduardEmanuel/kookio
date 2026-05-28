import { describe, expect, it } from 'vitest';

import {
  IngredientCategorySchema,
  MeasureUnitSchema,
} from '@kookio/prisma-client';

import {
  deriveGroceries,
  type RecipeForDerivation,
  type SlotForDerivation,
} from './groceries.helpers';

const Unit = MeasureUnitSchema.enum;
const IngCategory = IngredientCategorySchema.enum;

const slot = (recipeId: string | null, servings = 2): SlotForDerivation => ({
  recipeId,
  servings,
});

type IngredientArg = {
  id: string;
  name: string;
  quantity?: number | null;
  unit?:
    | typeof Unit.G
    | typeof Unit.PIECE
    | typeof Unit.CLOVE
    | typeof Unit.TO_TASTE
    | typeof Unit.PINCH
    | null;
  category?: ReturnType<typeof IngredientCategorySchema.parse> | null;
  imageUrl?: string | null;
  pieceGrams?: number | null;
};

const recipe = (
  id: string,
  ingredients: IngredientArg[],
  servings = 4,
): RecipeForDerivation => ({
  id,
  servings,
  ingredients: ingredients.map((i) => ({
    quantity: i.quantity ?? null,
    unit: i.unit ?? Unit.G,
    ingredient: {
      id: i.id,
      name: i.name,
      imageUrl: i.imageUrl ?? null,
      category: i.category ?? null,
      pieceGrams: i.pieceGrams ?? null,
    },
  })),
});

describe('deriveGroceries', () => {
  it('returns an empty list when there are no slots', () => {
    expect(deriveGroceries([], [], new Set())).toEqual([]);
  });

  it('skips slots whose recipeId is null (empty cells)', () => {
    const result = deriveGroceries([slot(null), slot(null)], [], new Set());
    expect(result).toEqual([]);
  });

  it('skips slots whose recipe is not in the catalog (defensive)', () => {
    const result = deriveGroceries([slot('missing-recipe')], [], new Set());
    expect(result).toEqual([]);
  });

  it('lists every non-negligible, non-pantry ingredient from a single slot', () => {
    const result = deriveGroceries(
      [slot('r1', 4)],
      [
        recipe(
          'r1',
          [
            {
              id: 'flour',
              name: 'Flour',
              quantity: 200,
              category: IngCategory.GRAINS,
            },
            {
              id: 'eggs',
              name: 'Eggs',
              quantity: 3,
              unit: Unit.PIECE,
              category: IngCategory.DAIRY,
            },
          ],
          4,
        ),
      ],
      new Set(),
    );

    expect(result).toHaveLength(2);
    expect(result.find((r) => r.ingredientCatalogId === 'flour')).toMatchObject(
      {
        ingredientName: 'Flour',
        totalQuantity: 200,
        unit: Unit.G,
        category: IngCategory.GRAINS,
      },
    );
    expect(result.find((r) => r.ingredientCatalogId === 'eggs')).toMatchObject({
      ingredientName: 'Eggs',
      totalQuantity: 3,
      unit: Unit.PIECE,
    });
  });

  it('skips flavour-only units (TO_TASTE / TO_SERVE / GARNISH) but keeps PINCH', () => {
    // Old behaviour skipped the whole NEGLIGIBLE set. Under the grams
    // pipeline PINCH = 0.5 g is a real mass, so it stays on the shopping
    // list — the user may genuinely need to buy salt.
    const result = deriveGroceries(
      [slot('r1', 4)],
      [
        recipe('r1', [
          { id: 'flour', name: 'Flour', quantity: 200 },
          { id: 'salt', name: 'Salt', quantity: null, unit: Unit.TO_TASTE },
          { id: 'pepper', name: 'Pepper', quantity: 2, unit: Unit.PINCH },
        ]),
      ],
      new Set(),
    );

    expect(result.map((r) => r.ingredientCatalogId).sort()).toEqual([
      'flour',
      'pepper',
    ]);
    const pepper = result.find((r) => r.ingredientCatalogId === 'pepper')!;
    expect(pepper.unit).toBe(Unit.PINCH);
    expect(pepper.totalGrams).toBe(1); // 2 pinches × 0.5 g
  });

  it('skips ingredients already present in the pantry (binary set-difference)', () => {
    const result = deriveGroceries(
      [slot('r1', 4)],
      [
        recipe('r1', [
          { id: 'flour', name: 'Flour', quantity: 200 },
          { id: 'eggs', name: 'Eggs', quantity: 3, unit: Unit.PIECE },
        ]),
      ],
      new Set(['eggs']),
    );

    expect(result.map((r) => r.ingredientCatalogId)).toEqual(['flour']);
  });

  it('scales ingredient quantities by slot.servings / recipe.servings', () => {
    const result = deriveGroceries(
      [slot('r1', 2)],
      [recipe('r1', [{ id: 'flour', name: 'Flour', quantity: 400 }], 4)],
      new Set(),
    );

    expect(result[0].totalQuantity).toBe(200);
  });

  it('aggregates the same ingredient across multiple slots', () => {
    const result = deriveGroceries(
      [slot('r1', 4), slot('r2', 4)],
      [
        recipe('r1', [{ id: 'flour', name: 'Flour', quantity: 200 }]),
        recipe('r2', [{ id: 'flour', name: 'Flour', quantity: 100 }]),
      ],
      new Set(),
    );

    expect(result).toHaveLength(1);
    expect(result[0].totalQuantity).toBe(300);
  });

  it('keeps the first encountered unit when slots disagree (no unit conversion)', () => {
    const result = deriveGroceries(
      [slot('r1', 4), slot('r2', 4)],
      [
        recipe('r1', [
          { id: 'flour', name: 'Flour', quantity: 200, unit: Unit.G },
        ]),
        recipe('r2', [
          { id: 'flour', name: 'Flour', quantity: 1, unit: Unit.PIECE },
        ]),
      ],
      new Set(),
    );

    expect(result[0].unit).toBe(Unit.G);
    // Sums quantities even though units differ — pragmatic compromise.
    expect(result[0].totalQuantity).toBe(201);
  });

  it('preserves null quantity when no slot contributes a numeric one', () => {
    const result = deriveGroceries(
      [slot('r1', 4)],
      [recipe('r1', [{ id: 'flour', name: 'Flour', quantity: null }])],
      new Set(),
    );

    expect(result[0].totalQuantity).toBeNull();
  });

  it('promotes from null to numeric when a later slot contributes a quantity', () => {
    const result = deriveGroceries(
      [slot('r1', 4), slot('r2', 4)],
      [
        recipe('r1', [{ id: 'flour', name: 'Flour', quantity: null }]),
        recipe('r2', [{ id: 'flour', name: 'Flour', quantity: 100 }]),
      ],
      new Set(),
    );

    expect(result[0].totalQuantity).toBe(100);
  });

  it('floors recipe.servings at 1 to avoid division by zero', () => {
    const result = deriveGroceries(
      [slot('r1', 4)],
      [recipe('r1', [{ id: 'flour', name: 'Flour', quantity: 100 }], 0)],
      new Set(),
    );

    // recipe.servings clamped to 1, slot wants 4 → 4x scale
    expect(result[0].totalQuantity).toBe(400);
  });

  describe('grams aggregate (cross-unit reconciliation)', () => {
    it('computes totalGrams using the shared toGrams heuristic', () => {
      const result = deriveGroceries(
        [slot('r1', 4)],
        [recipe('r1', [{ id: 'flour', name: 'Flour', quantity: 200 }])],
        new Set(),
      );
      // 200 g flour, single slot at scale 4/4 = 1 → 200 g.
      expect(result[0].totalGrams).toBe(200);
    });

    it('uses pieceGrams from the catalog for piece-class units', () => {
      const result = deriveGroceries(
        [slot('r1', 4)],
        [
          recipe('r1', [
            {
              id: 'eggs',
              name: 'Eggs',
              quantity: 3,
              unit: Unit.PIECE,
              pieceGrams: 60,
            },
          ]),
        ],
        new Set(),
      );
      // 3 eggs × 60 g = 180 g
      expect(result[0].totalGrams).toBe(180);
      expect(result[0].pieceGrams).toBe(60);
    });

    it('falls back to DEFAULT_PIECE_GRAMS when pieceGrams is null', () => {
      const result = deriveGroceries(
        [slot('r1', 4)],
        [
          recipe('r1', [
            // pieceGrams omitted → null → DEFAULT_PIECE_GRAMS (100 g) kicks in.
            { id: 'mystery', name: 'Mystery', quantity: 2, unit: Unit.PIECE },
          ]),
        ],
        new Set(),
      );
      expect(result[0].totalGrams).toBe(200);
    });

    it('sums totalGrams across slots even when the display unit stays fixed', () => {
      const result = deriveGroceries(
        [slot('r1', 4), slot('r2', 4)],
        [
          recipe('r1', [
            { id: 'flour', name: 'Flour', quantity: 200, unit: Unit.G },
          ]),
          recipe('r2', [
            { id: 'flour', name: 'Flour', quantity: 1, unit: Unit.PIECE },
          ]),
        ],
        new Set(),
      );

      // Display: first-encountered unit (g), totals are added pragmatically.
      expect(result[0].unit).toBe(Unit.G);
      expect(result[0].totalQuantity).toBe(201);
      // Grams: 200 g + 1 × DEFAULT_PIECE_GRAMS (100 g) = 300 g.
      expect(result[0].totalGrams).toBe(300);
    });
  });
});
