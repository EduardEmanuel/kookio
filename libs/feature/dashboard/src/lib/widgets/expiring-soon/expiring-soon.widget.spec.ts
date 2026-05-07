import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import {
  type WritableSignal,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { PantryStore } from '@kookio/feature-pantry/store';
import {
  IngredientCategorySchema,
  MeasureUnitSchema,
  type PantryItemWithIngredient,
} from '@kookio/prisma-client';

import { ExpiringSoonWidgetComponent } from './expiring-soon.widget';

const Unit = MeasureUnitSchema.enum;
const Category = IngredientCategorySchema.enum;

const NOW = new Date('2026-05-07T12:00:00.000Z');

const buildItem = (
  overrides: Partial<PantryItemWithIngredient> & { id: string; name: string },
): PantryItemWithIngredient => ({
  id: overrides.id,
  userId: 'user-1',
  ingredientCatalogId: `cat-${overrides.id}`,
  quantity: 100,
  unit: Unit.G,
  expiresAt: overrides.expiresAt ?? null,
  addedAt: new Date('2026-05-01T00:00:00.000Z'),
  updatedAt: new Date('2026-05-01T00:00:00.000Z'),
  ingredient: {
    id: `cat-${overrides.id}`,
    name: overrides.name,
    imageUrl: null,
    category: Category.PRODUCE,
  },
});

interface MockPantryStore {
  items: WritableSignal<PantryItemWithIngredient[]>;
  isLoading: WritableSignal<boolean>;
  load: ReturnType<typeof vi.fn>;
}

const createMockStore = (
  items: PantryItemWithIngredient[],
  isLoading = false,
): MockPantryStore => ({
  items: signal(items),
  isLoading: signal(isLoading),
  load: vi.fn(),
});

const setup = async (store: MockPantryStore) => {
  await TestBed.configureTestingModule({
    imports: [ExpiringSoonWidgetComponent],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([]),
      { provide: PantryStore, useValue: store },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(ExpiringSoonWidgetComponent);
  fixture.detectChanges();
  await fixture.whenStable();

  return {
    fixture,
    el: fixture.nativeElement as HTMLElement,
  };
};

describe('ExpiringSoonWidgetComponent', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
    TestBed.resetTestingModule();
  });

  it('renders the empty state when no items are expiring', async () => {
    const store = createMockStore([
      buildItem({
        id: 'fresh',
        name: 'Tomato',
        expiresAt: new Date('2026-06-01T00:00:00.000Z'),
      }),
      buildItem({ id: 'no-expiry', name: 'Salt', expiresAt: null }),
    ]);

    const { el } = await setup(store);

    expect(el.textContent ?? '').toContain('Pantry is healthy');
    expect(el.querySelectorAll('.exp__item')).toHaveLength(0);
  });

  it('returns the top 5 by expiresAt ascending and excludes ok/none statuses', async () => {
    const store = createMockStore([
      buildItem({
        id: 'fresh',
        name: 'Salt',
        expiresAt: new Date('2026-12-01T00:00:00.000Z'),
      }),
      buildItem({ id: 'no-expiry', name: 'Sugar', expiresAt: null }),
      buildItem({
        id: 'soon-3',
        name: 'Lettuce',
        expiresAt: new Date('2026-05-09T00:00:00.000Z'),
      }),
      buildItem({
        id: 'expired-yday',
        name: 'Yogurt',
        expiresAt: new Date('2026-05-06T00:00:00.000Z'),
      }),
      buildItem({
        id: 'soon-1',
        name: 'Bread',
        expiresAt: new Date('2026-05-08T00:00:00.000Z'),
      }),
      buildItem({
        id: 'soon-2',
        name: 'Milk',
        expiresAt: new Date('2026-05-08T12:00:00.000Z'),
      }),
      buildItem({
        id: 'soon-4',
        name: 'Cheese',
        expiresAt: new Date('2026-05-10T00:00:00.000Z'),
      }),
      buildItem({
        id: 'soon-5',
        name: 'Eggs',
        expiresAt: new Date('2026-05-11T00:00:00.000Z'),
      }),
    ]);

    const { el } = await setup(store);

    const names = Array.from(el.querySelectorAll('.exp__name')).map((n) =>
      n.textContent?.trim(),
    );

    expect(names).toEqual(['Yogurt', 'Bread', 'Milk', 'Lettuce', 'Cheese']);
  });

  it('marks expired rows with the modifier class', async () => {
    const store = createMockStore([
      buildItem({
        id: 'expired',
        name: 'Yogurt',
        expiresAt: new Date('2026-05-05T00:00:00.000Z'),
      }),
      buildItem({
        id: 'soon',
        name: 'Bread',
        expiresAt: new Date('2026-05-08T00:00:00.000Z'),
      }),
    ]);

    const { el } = await setup(store);

    const items = Array.from(el.querySelectorAll('.exp__item'));
    expect(items).toHaveLength(2);
    expect(items[0].classList.contains('exp__item--expired')).toBe(true);
    expect(items[1].classList.contains('exp__item--expired')).toBe(false);
  });

  it('renders a spinner while loading with no items yet', async () => {
    const store = createMockStore([], true);

    const { el } = await setup(store);

    expect(
      el.querySelector('mat-spinner, mat-progress-spinner'),
    ).not.toBeNull();
    expect(el.querySelectorAll('.exp__item')).toHaveLength(0);
  });
});
