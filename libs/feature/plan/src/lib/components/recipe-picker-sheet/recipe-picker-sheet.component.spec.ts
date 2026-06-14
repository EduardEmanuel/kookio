import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import {
  Component,
  input,
  provideZonelessChangeDetection,
  type Signal,
} from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

import {
  RECIPES_TRPC,
  RecipeMatchCardCompactComponent,
  type RecipesTrpcClient,
} from '@kookio/feature-recipes';
import type { RecipeMatchItem } from '@kookio/prisma-client';
import type { RecipeMatchLevel } from '@kookio/shared-utility/recipe-match-level';

import { RecipePickerSheetComponent } from './recipe-picker-sheet.component';

type MatchPage = { items: RecipeMatchItem[]; nextCursor: string | null };

const makeRecipe = (id: string): RecipeMatchItem =>
  ({ id, title: `Recipe ${id}` }) as unknown as RecipeMatchItem;

// Stub the match card so the sheet test isn't coupled to the card's data shape
// (the real card reads fields like `missingCount` off a full RecipeMatchItem).
@Component({ selector: 'kookio-recipe-match-card-compact', template: '' })
class StubMatchCard {
  readonly item = input<unknown>();
}

/** The protected surface we drive/read in the tests. */
type TestableSheet = {
  items: Signal<RecipeMatchItem[]>;
  hasLoadedOnce: Signal<boolean>;
  errorMessage: Signal<string | null>;
  onLevelChange: (l: RecipeMatchLevel) => void;
  onSelect: (r: RecipeMatchItem) => void;
  onCancel: () => void;
};

const flush = async (fixture: {
  whenStable: () => Promise<unknown>;
  detectChanges: () => void;
}) => {
  await fixture.whenStable();
  await new Promise((r) => setTimeout(r, 0));
  fixture.detectChanges();
  await fixture.whenStable();
};

const setup = async (opts: { page?: MatchPage; reject?: unknown } = {}) => {
  const query = vi.fn(() =>
    opts.reject !== undefined
      ? Promise.reject(opts.reject)
      : Promise.resolve(opts.page ?? { items: [], nextCursor: null }),
  );
  const trpc = {
    recipes: { match: { query } },
  } as unknown as RecipesTrpcClient;
  const dismiss = vi.fn();

  await TestBed.configureTestingModule({
    imports: [RecipePickerSheetComponent],
    providers: [
      provideZonelessChangeDetection(),
      { provide: RECIPES_TRPC, useValue: trpc },
      { provide: MatBottomSheetRef, useValue: { dismiss } },
    ],
  })
    .overrideComponent(RecipePickerSheetComponent, {
      remove: { imports: [RecipeMatchCardCompactComponent] },
      add: { imports: [StubMatchCard] },
    })
    .compileComponents();

  const fixture = TestBed.createComponent(RecipePickerSheetComponent);
  fixture.detectChanges();
  await flush(fixture);

  return {
    fixture,
    el: fixture.nativeElement as HTMLElement,
    inst: fixture.componentInstance as unknown as TestableSheet,
    query,
    dismiss,
  };
};

describe('RecipePickerSheetComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
    vi.restoreAllMocks();
  });

  it('fetches the Alright level on init and renders the loaded items', async () => {
    const page = {
      items: [makeRecipe('a'), makeRecipe('b')],
      nextCursor: null,
    };
    const { inst, query } = await setup({ page });

    expect(query).toHaveBeenCalledTimes(1);
    expect(query.mock.calls[0][0]).toMatchObject({
      level: 'Alright',
      limit: 20,
    });
    expect(inst.items().map((r) => r.id)).toEqual(['a', 'b']);
    expect(inst.hasLoadedOnce()).toBe(true);
  });

  it('resets and refetches with the new level when the toggle changes', async () => {
    const { fixture, inst, query } = await setup({
      page: { items: [makeRecipe('a')], nextCursor: null },
    });

    inst.onLevelChange('Almost');
    fixture.detectChanges();
    await flush(fixture);

    expect(query).toHaveBeenCalledTimes(2);
    expect(query.mock.calls[1][0]).toMatchObject({ level: 'Almost' });
  });

  it('surfaces an error when the fetch fails', async () => {
    const { el, inst } = await setup({ reject: new Error('network down') });

    expect(inst.errorMessage()).toBe('network down');
    expect(el.querySelector('.sheet__error')?.textContent).toContain(
      'network down',
    );
  });

  it('dismisses with the chosen recipe on select', async () => {
    const recipe = makeRecipe('chosen');
    const { inst, dismiss } = await setup();
    inst.onSelect(recipe);
    expect(dismiss).toHaveBeenCalledWith(recipe);
  });

  it('dismisses with null on cancel', async () => {
    const { inst, dismiss } = await setup();
    inst.onCancel();
    expect(dismiss).toHaveBeenCalledWith(null);
  });

  it('shows the empty state when a level returns no recipes', async () => {
    const { el } = await setup({ page: { items: [], nextCursor: null } });
    expect(el.querySelector('.sheet__empty')?.textContent).toContain(
      'No recipes match this level',
    );
  });
});
