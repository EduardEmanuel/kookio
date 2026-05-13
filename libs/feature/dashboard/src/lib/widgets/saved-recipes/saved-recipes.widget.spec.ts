import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import {
  type WritableSignal,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { SavedStore } from '@kookio/feature-saved/store';
import type { SavedRecipeRow } from '@kookio/prisma-client';

import { SavedRecipesWidgetComponent } from './saved-recipes.widget';

const buildRow = (overrides: {
  id: string;
  title: string;
}): SavedRecipeRow => ({
  recipe: {
    id: overrides.id,
    slug: `r-${overrides.id}`,
    title: overrides.title,
    imageUrl: null,
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    servings: 2,
    category: null,
    area: { id: `area-${overrides.id}`, name: 'Italian', flag: '🇮🇹' },
  },
  addedAt: new Date('2026-05-10T00:00:00.000Z'),
});

interface MockSavedStore {
  items: WritableSignal<SavedRecipeRow[]>;
  isLoading: WritableSignal<boolean>;
  totalCount: WritableSignal<number>;
  load: ReturnType<typeof vi.fn>;
}

const createMockStore = (
  items: SavedRecipeRow[],
  isLoading = false,
): MockSavedStore => ({
  items: signal(items),
  isLoading: signal(isLoading),
  totalCount: signal(items.length),
  load: vi.fn(),
});

const setup = async (store: MockSavedStore) => {
  await TestBed.configureTestingModule({
    imports: [SavedRecipesWidgetComponent],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([]),
      { provide: SavedStore, useValue: store },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(SavedRecipesWidgetComponent);
  fixture.detectChanges();
  await fixture.whenStable();

  return {
    fixture,
    el: fixture.nativeElement as HTMLElement,
  };
};

describe('SavedRecipesWidgetComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
    vi.restoreAllMocks();
  });

  it('renders the empty state with a Browse CTA when no recipes are saved', async () => {
    const store = createMockStore([]);

    const { el } = await setup(store);

    expect(el.textContent ?? '').toContain('No saved recipes yet');
    const cta = el.querySelector(
      'a.sav__more[href="/recipes"]',
    ) as HTMLAnchorElement;
    expect(cta).not.toBeNull();
    expect(cta.textContent).toContain('Browse');
  });

  it('renders up to the top 5 recipes by store order', async () => {
    const rows = Array.from({ length: 7 }, (_, i) =>
      buildRow({ id: `${i + 1}`, title: `Recipe ${i + 1}` }),
    );
    const store = createMockStore(rows);

    const { el } = await setup(store);

    const names = Array.from(el.querySelectorAll('.sav__name')).map((n) =>
      n.textContent?.trim(),
    );
    expect(names).toEqual([
      'Recipe 1',
      'Recipe 2',
      'Recipe 3',
      'Recipe 4',
      'Recipe 5',
    ]);
  });

  it('shows the "View all <N> saved" link when more than 5 exist', async () => {
    const rows = Array.from({ length: 7 }, (_, i) =>
      buildRow({ id: `${i + 1}`, title: `Recipe ${i + 1}` }),
    );
    const store = createMockStore(rows);

    const { el } = await setup(store);

    const more = el.querySelector(
      'a.sav__more[href="/recipes/saved"]',
    ) as HTMLAnchorElement;
    expect(more).not.toBeNull();
    expect(more.textContent).toContain('View all 7 saved');
  });

  it('falls back to "View all saved" when exactly the top N are shown', async () => {
    const rows = Array.from({ length: 3 }, (_, i) =>
      buildRow({ id: `${i + 1}`, title: `Recipe ${i + 1}` }),
    );
    const store = createMockStore(rows);

    const { el } = await setup(store);

    const more = el.querySelector(
      'a.sav__more[href="/recipes/saved"]',
    ) as HTMLAnchorElement;
    expect(more.textContent).toContain('View all saved');
    expect(more.textContent).not.toMatch(/View all 3 saved/);
  });

  it('renders a spinner while loading with no items yet', async () => {
    const store = createMockStore([], true);

    const { el } = await setup(store);

    expect(
      el.querySelector('mat-spinner, mat-progress-spinner'),
    ).not.toBeNull();
    expect(el.querySelectorAll('.sav__item')).toHaveLength(0);
  });
});
