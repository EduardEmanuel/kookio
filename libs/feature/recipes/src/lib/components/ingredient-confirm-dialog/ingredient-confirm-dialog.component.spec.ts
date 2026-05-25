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
  },
  pantryAvailable: { quantity: 500, unit: Unit.G },
  ...overrides,
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

    it('leaves rows with a truly incompatible unit mismatch unchecked but enabled', async () => {
      const { fixture, close } = await setup({
        ingredients: [
          makeIngredient('milk', 'Milk', {
            unit: Unit.ML,
            // Weight vs volume — server cannot convert without density data.
            pantryAvailable: { quantity: 500, unit: Unit.G },
          }),
        ],
        ratio: 1,
      });

      const instance = fixture.componentInstance as unknown as {
        onConfirm: () => void;
      };
      instance.onConfirm();

      // Server would silently skip a truly incompatible mismatch on its own;
      // we just don't pre-check the row so the user has to opt in explicitly.
      expect(close).toHaveBeenCalledWith([]);
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
