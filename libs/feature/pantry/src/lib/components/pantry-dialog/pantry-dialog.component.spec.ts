import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {
  IngredientCategorySchema,
  MeasureUnitSchema,
  type PantryItemWithIngredient,
} from '@kookio/prisma-client';

import { PANTRY_TRPC, type PantryTrpcClient } from '../../pantry-trpc';
import {
  PantryDialogComponent,
  type PantryDialogData,
} from './pantry-dialog.component';

const Unit = MeasureUnitSchema.enum;
const Category = IngredientCategorySchema.enum;

const sampleItem: PantryItemWithIngredient = {
  id: 'pi-1',
  userId: 'user-1',
  ingredientCatalogId: 'ing-9',
  quantity: 500,
  unit: Unit.ML,
  expiresAt: new Date('2026-12-01T00:00:00.000Z'),
  addedAt: new Date('2026-05-01T00:00:00.000Z'),
  updatedAt: new Date('2026-05-01T00:00:00.000Z'),
  ingredient: {
    id: 'ing-9',
    name: 'Olive oil',
    imageUrl: null,
    category: Category.GRAINS,
  },
};

const setup = async (data: PantryDialogData) => {
  const close = vi.fn();
  const dialogRef = { close } as unknown as MatDialogRef<PantryDialogComponent>;

  const trpc: PantryTrpcClient = {
    pantry: {
      list: { query: vi.fn() },
      add: { mutate: vi.fn() },
      update: { mutate: vi.fn() },
      remove: { mutate: vi.fn() },
      searchIngredients: { query: vi.fn().mockResolvedValue([]) },
    },
  };

  await TestBed.configureTestingModule({
    imports: [PantryDialogComponent],
    providers: [
      provideZonelessChangeDetection(),
      provideNativeDateAdapter(),
      { provide: MAT_DIALOG_DATA, useValue: data },
      { provide: MatDialogRef, useValue: dialogRef },
      { provide: PANTRY_TRPC, useValue: trpc },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(PantryDialogComponent);
  fixture.detectChanges();
  await fixture.whenStable();

  return {
    fixture,
    el: fixture.nativeElement as HTMLElement,
    close,
  };
};

describe('PantryDialogComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
    vi.restoreAllMocks();
  });

  describe('add mode', () => {
    it('renders the add title', async () => {
      const { el } = await setup({ mode: 'add' });
      expect(el.querySelector('h2')?.textContent).toContain('Add ingredient');
    });

    it('disables the save button until the form becomes valid', async () => {
      const { el } = await setup({ mode: 'add' });
      const buttons = el.querySelectorAll('mat-dialog-actions button');
      const saveBtn = buttons[1] as HTMLButtonElement;
      expect(saveBtn.disabled).toBe(true);
    });

    it('closes with null when cancel is clicked', async () => {
      const { el, close } = await setup({ mode: 'add' });
      const cancelBtn = el.querySelectorAll(
        'mat-dialog-actions button',
      )[0] as HTMLButtonElement;
      cancelBtn.click();
      expect(close).toHaveBeenCalledWith(null);
    });
  });

  describe('edit mode', () => {
    it('renders the edit title', async () => {
      const { el } = await setup({ mode: 'edit', item: sampleItem });
      expect(el.querySelector('h2')?.textContent).toContain('Edit ingredient');
    });

    it('pre-populates the form so save closes with the snapshot', async () => {
      const { el, fixture, close } = await setup({
        mode: 'edit',
        item: sampleItem,
      });
      await fixture.whenStable();

      const saveBtn = el.querySelectorAll(
        'mat-dialog-actions button',
      )[1] as HTMLButtonElement;
      expect(saveBtn.disabled).toBe(false);

      saveBtn.click();
      expect(close).toHaveBeenCalledWith({
        ingredientCatalogId: 'ing-9',
        quantity: 500,
        unit: Unit.ML,
        expiresAt: '2026-12-01T00:00:00.000Z',
      });
    });
  });
});
