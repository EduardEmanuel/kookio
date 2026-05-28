import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {
  type CookingRecipeIngredient,
  IngredientCategorySchema,
  MeasureUnitSchema,
} from '@kookio/prisma-client';

import {
  IngredientConfirmDialogComponent,
  type IngredientConfirmDialogData,
} from './ingredient-confirm-dialog.component';

const Unit = MeasureUnitSchema.enum;
const Category = IngredientCategorySchema.enum;

const makeIngredient = (
  id: string,
  name: string,
  overrides: Partial<CookingRecipeIngredient> = {},
): CookingRecipeIngredient => ({
  id,
  ingredientCatalogId: `cat-${id}`,
  quantity: 100,
  unit: Unit.G,
  notes: null,
  ingredient: {
    id: `cat-${id}`,
    name,
    imageUrl: null,
    category: Category.GRAINS,
    pieceGrams: null,
  },
  pantryAvailable: { quantity: 500, unit: Unit.G },
  ...overrides,
});

const withIngredientPieceGrams = (
  ri: CookingRecipeIngredient,
  pieceGrams: number,
): CookingRecipeIngredient => ({
  ...ri,
  ingredient: { ...ri.ingredient, pieceGrams },
});

const setup = async (data: IngredientConfirmDialogData) => {
  const close = vi.fn();
  const dialogRef = {
    close,
  } as unknown as MatDialogRef<IngredientConfirmDialogComponent>;

  await TestBed.configureTestingModule({
    imports: [IngredientConfirmDialogComponent],
    providers: [
      provideZonelessChangeDetection(),
      { provide: MAT_DIALOG_DATA, useValue: data },
      { provide: MatDialogRef, useValue: dialogRef },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(IngredientConfirmDialogComponent);
  fixture.detectChanges();
  return { fixture, close };
};

describe('IngredientConfirmDialogComponent', () => {
  afterEach(() => TestBed.resetTestingModule());

  describe('default check state', () => {
    it('checks ingredients that are in pantry, have a unit, and unit matches', async () => {
      const { fixture, close } = await setup({
        ingredients: [makeIngredient('a', 'Flour')],
        ratio: 1,
      });

      // The "in pantry, unit matches, non-negligible" row is included by default;
      // submitting without changing anything emits one consumed entry.
      const instance = fixture.componentInstance as unknown as {
        onConfirm: () => void;
      };
      instance.onConfirm();

      expect(close).toHaveBeenCalledTimes(1);
      expect(close).toHaveBeenCalledWith([
        {
          ingredientCatalogId: 'cat-a',
          quantity: 100,
          unit: Unit.G,
        },
      ]);
    });

    it('leaves negligible-unit rows unchecked by default', async () => {
      const { fixture, close } = await setup({
        ingredients: [
          makeIngredient('salt', 'Salt', {
            unit: Unit.TO_TASTE,
            // Even with a pantry row in the same unit, TO_TASTE is policy-skipped.
            pantryAvailable: { quantity: 100, unit: Unit.TO_TASTE },
          }),
        ],
        ratio: 1,
      });

      const instance = fixture.componentInstance as unknown as {
        onConfirm: () => void;
      };
      instance.onConfirm();

      expect(close).toHaveBeenCalledWith([]);
    });

    it('leaves rows missing from pantry unchecked and disables them', async () => {
      const { fixture, close } = await setup({
        ingredients: [
          makeIngredient('rare', 'Saffron', { pantryAvailable: null }),
        ],
        ratio: 1,
      });

      const instance = fixture.componentInstance as unknown as {
        onConfirm: () => void;
      };
      instance.onConfirm();

      expect(close).toHaveBeenCalledWith([]);
    });

    it('keeps a convertible same-family mismatch checked by default (ml vs l)', async () => {
      const { fixture, close } = await setup({
        ingredients: [
          makeIngredient('milk', 'Milk', {
            unit: Unit.ML,
            pantryAvailable: { quantity: 1, unit: Unit.L },
          }),
        ],
        ratio: 1,
      });

      const instance = fixture.componentInstance as unknown as {
        onConfirm: () => void;
      };
      instance.onConfirm();

      // ml ↔ l is a same-family conversion the server now handles; the row
      // stays included by default and the recipe-unit quantity is emitted.
      expect(close).toHaveBeenCalledWith([
        {
          ingredientCatalogId: 'cat-milk',
          quantity: 100,
          unit: Unit.ML,
        },
      ]);
    });

    it('reconciles a weight-vs-volume pantry-vs-recipe pair through grams', async () => {
      // Old behaviour treated ml-recipe-vs-g-pantry as an incompatible
      // mismatch and left the row unchecked. With the grams pipeline both
      // sides reconcile via the water-density assumption (1 ml = 1 g), so
      // the row stays checked-by-default and the server decrement runs in
      // grams internally.
      const { fixture, close } = await setup({
        ingredients: [
          makeIngredient('milk', 'Milk', {
            unit: Unit.ML,
            pantryAvailable: { quantity: 500, unit: Unit.G },
          }),
        ],
        ratio: 1,
      });

      const instance = fixture.componentInstance as unknown as {
        onConfirm: () => void;
      };
      instance.onConfirm();

      expect(close).toHaveBeenCalledWith([
        { ingredientCatalogId: 'cat-milk', quantity: 100, unit: Unit.ML },
      ]);
    });

    it('checks PINCH rows by default when the pantry has the ingredient', async () => {
      // Old behaviour was "negligible = unchecked". Now PINCH = 0.5 g is a
      // real decrement and a pantry row signals "I track this", so default
      // to checked.
      const { fixture, close } = await setup({
        ingredients: [
          makeIngredient('salt', 'Salt', {
            unit: Unit.PINCH,
            quantity: 2,
            pantryAvailable: { quantity: 500, unit: Unit.G },
          }),
        ],
        ratio: 1,
      });

      const instance = fixture.componentInstance as unknown as {
        onConfirm: () => void;
      };
      instance.onConfirm();

      expect(close).toHaveBeenCalledWith([
        { ingredientCatalogId: 'cat-salt', quantity: 2, unit: Unit.PINCH },
      ]);
    });

    it('checks PIECE rows with a catalog pieceGrams value (not approximate)', async () => {
      const onion = withIngredientPieceGrams(
        makeIngredient('onion', 'Onion', {
          unit: Unit.PIECE,
          quantity: 1,
          pantryAvailable: { quantity: 2, unit: Unit.PIECE },
        }),
        150,
      );
      const { fixture, close } = await setup({
        ingredients: [onion],
        ratio: 1,
      });

      const instance = fixture.componentInstance as unknown as {
        onConfirm: () => void;
        rows: ReadonlyArray<{ approximate: boolean; disabled: boolean }>;
      };
      // The row is enabled, checked, and NOT approximate (pieceGrams known).
      expect(instance.rows[0].disabled).toBe(false);
      expect(instance.rows[0].approximate).toBe(false);

      instance.onConfirm();
      expect(close).toHaveBeenCalledWith([
        { ingredientCatalogId: 'cat-onion', quantity: 1, unit: Unit.PIECE },
      ]);
    });

    it('still checks PIECE rows without pieceGrams but flags them as approximate', async () => {
      // pieceGrams = null on the catalog row → DEFAULT_PIECE_GRAMS kicks in,
      // row stays actionable, approximate = true so the template renders an
      // "approx., adjust if needed" hint.
      const { fixture, close } = await setup({
        ingredients: [
          makeIngredient('mystery', 'Mystery fruit', {
            unit: Unit.PIECE,
            quantity: 1,
            pantryAvailable: { quantity: 3, unit: Unit.PIECE },
          }),
        ],
        ratio: 1,
      });

      const instance = fixture.componentInstance as unknown as {
        onConfirm: () => void;
        rows: ReadonlyArray<{ approximate: boolean; disabled: boolean }>;
      };
      expect(instance.rows[0].disabled).toBe(false);
      expect(instance.rows[0].approximate).toBe(true);

      instance.onConfirm();
      expect(close).toHaveBeenCalledWith([
        { ingredientCatalogId: 'cat-mystery', quantity: 1, unit: Unit.PIECE },
      ]);
    });

    it('checks CLOVE rows with a catalog pieceGrams value', async () => {
      const garlic = withIngredientPieceGrams(
        makeIngredient('garlic', 'Garlic', {
          unit: Unit.CLOVE,
          quantity: 2,
          pantryAvailable: { quantity: 5, unit: Unit.CLOVE },
        }),
        5,
      );
      const { fixture, close } = await setup({
        ingredients: [garlic],
        ratio: 1,
      });

      const instance = fixture.componentInstance as unknown as {
        onConfirm: () => void;
      };
      instance.onConfirm();

      expect(close).toHaveBeenCalledWith([
        { ingredientCatalogId: 'cat-garlic', quantity: 2, unit: Unit.CLOVE },
      ]);
    });
  });

  describe('quantity scaling', () => {
    it('multiplies recipe quantity by the ratio for the default value', async () => {
      const { fixture, close } = await setup({
        ingredients: [makeIngredient('a', 'Flour', { quantity: 200 })],
        ratio: 0.5,
      });

      const instance = fixture.componentInstance as unknown as {
        onConfirm: () => void;
      };
      instance.onConfirm();

      expect(close).toHaveBeenCalledWith([
        expect.objectContaining({ quantity: 100 }),
      ]);
    });
  });

  describe('cancel', () => {
    it('closes with null when cancel is invoked', async () => {
      const { fixture, close } = await setup({
        ingredients: [makeIngredient('a', 'Flour')],
        ratio: 1,
      });

      const instance = fixture.componentInstance as unknown as {
        onCancel: () => void;
      };
      instance.onCancel();

      expect(close).toHaveBeenCalledWith(null);
    });
  });
});
