import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';

import {
  IngredientCategorySchema,
  MeasureUnitSchema,
  type IngredientSearchResult,
} from '@kookio/prisma-client';

import { PANTRY_TRPC, type PantryTrpcClient } from '../../pantry-trpc';
import {
  PantryFormComponent,
  type PantryFormInitial,
} from './pantry-form.component';

const Unit = MeasureUnitSchema.enum;
const Category = IngredientCategorySchema.enum;

const buildIngredient = (
  overrides: Partial<IngredientSearchResult> = {},
): IngredientSearchResult => ({
  id: overrides.id ?? 'ing-1',
  name: overrides.name ?? 'Tomato',
  imageUrl: overrides.imageUrl ?? null,
  category: overrides.category ?? Category.PRODUCE,
});

const setup = async (options?: {
  searchResults?: IngredientSearchResult[];
  initial?: PantryFormInitial | null;
  mode?: 'add' | 'edit';
}) => {
  const search = vi.fn().mockResolvedValue(options?.searchResults ?? []);

  const trpc: PantryTrpcClient = {
    pantry: {
      list: { query: vi.fn() },
      add: { mutate: vi.fn() },
      update: { mutate: vi.fn() },
      remove: { mutate: vi.fn() },
      searchIngredients: { query: search },
    },
  };

  await TestBed.configureTestingModule({
    imports: [PantryFormComponent],
    providers: [
      provideZonelessChangeDetection(),
      provideNativeDateAdapter(),
      { provide: PANTRY_TRPC, useValue: trpc },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(PantryFormComponent);
  if (options?.initial) {
    fixture.componentRef.setInput('initial', options.initial);
  }
  if (options?.mode) {
    fixture.componentRef.setInput('mode', options.mode);
  }
  fixture.detectChanges();
  await fixture.whenStable();

  return {
    fixture,
    component: fixture.componentInstance,
    search,
  };
};

const flush = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

describe('PantryFormComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
    vi.restoreAllMocks();
  });

  describe('add mode (default)', () => {
    it('starts with an invalid form because no ingredient is selected', async () => {
      const { component } = await setup();
      expect(component.valid()).toBe(false);
      expect(component.value()).toBeNull();
    });

    it('exposes a normalized value once an ingredient is selected', async () => {
      const { component } = await setup();
      const tomato = buildIngredient();

      // Mimic optionSelected by writing the object directly into the control.
      component['form'].controls.ingredient.setValue(tomato);
      component['form'].controls.quantity.setValue(250);
      component['form'].controls.unit.setValue(Unit.G);
      await flush();

      expect(component.valid()).toBe(true);
      expect(component.value()).toEqual({
        ingredientCatalogId: 'ing-1',
        quantity: 250,
        unit: Unit.G,
        expiresAt: null,
      });
    });

    it('emits an ISO datetime string when an expiry date is picked', async () => {
      const { component } = await setup();
      component['form'].controls.ingredient.setValue(buildIngredient());
      component['form'].controls.expiresAt.setValue(
        new Date('2026-06-01T00:00:00.000Z'),
      );
      await flush();

      expect(component.value()?.expiresAt).toBe('2026-06-01T00:00:00.000Z');
    });

    it('drops back to invalid when the user types over the selection', async () => {
      const { component } = await setup();
      component['form'].controls.ingredient.setValue(buildIngredient());
      await flush();
      expect(component.valid()).toBe(true);

      component['form'].controls.ingredient.setValue('tomato sauce');
      await flush();
      expect(component.valid()).toBe(false);
      expect(component.value()).toBeNull();
    });
  });

  describe('search', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('debounces the query and calls searchIngredients with the trimmed value', async () => {
      const tomato = buildIngredient();
      const { component, search } = await setup({ searchResults: [tomato] });

      component['form'].controls.ingredient.setValue('  to ');
      component['form'].controls.ingredient.setValue('  tom ');
      vi.advanceTimersByTime(299);
      expect(search).not.toHaveBeenCalled();

      vi.advanceTimersByTime(2);
      expect(search).toHaveBeenCalledWith({ query: 'tom', limit: 20 });
    });

    it('skips searches shorter than two characters', async () => {
      const { component, search } = await setup();
      component['form'].controls.ingredient.setValue('t');
      vi.advanceTimersByTime(500);
      expect(search).not.toHaveBeenCalled();
    });
  });

  describe('edit mode', () => {
    const initial: PantryFormInitial = {
      ingredientCatalogId: 'ing-9',
      ingredientName: 'Olive oil',
      ingredientImageUrl: null,
      quantity: 500,
      unit: Unit.ML,
      expiresAt: new Date('2026-12-01T00:00:00.000Z'),
    };

    it('pre-populates the form with the initial values and is valid immediately', async () => {
      const { component } = await setup({ mode: 'edit', initial });

      expect(component.valid()).toBe(true);
      const value = component.value();
      expect(value).toEqual({
        ingredientCatalogId: 'ing-9',
        quantity: 500,
        unit: Unit.ML,
        expiresAt: '2026-12-01T00:00:00.000Z',
      });
    });

    it('disables the ingredient control so the autocomplete cannot fire searches', async () => {
      const { component } = await setup({ mode: 'edit', initial });
      expect(component['form'].controls.ingredient.disabled).toBe(true);
    });
  });
});
