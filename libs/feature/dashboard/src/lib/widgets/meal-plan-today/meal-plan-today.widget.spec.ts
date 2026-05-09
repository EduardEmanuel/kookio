import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import {
  type WritableSignal,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { type PlanSlot, PlanStore, slotKey } from '@kookio/feature-plan/store';
import { MealSlotTypeSchema, type MealSlotType } from '@kookio/prisma-client';

import { MealPlanTodayWidgetComponent } from './meal-plan-today.widget';

const Slot = MealSlotTypeSchema.enum;
const NOW = new Date('2026-05-07T12:00:00.000Z');
// Today at UTC midnight — must match the widget's `todayUtcMidnightIso()`.
const TODAY_ISO = '2026-05-07T00:00:00.000Z';

const buildSlot = (type: MealSlotType, title: string): PlanSlot => ({
  date: TODAY_ISO,
  slotType: type,
  recipeId: `recipe-${type}`,
  servings: 2,
  recipe: {
    id: `recipe-${type}`,
    slug: `recipe-${type}`,
    title,
    imageUrl: null,
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    servings: 4,
    category: null,
    area: null,
  },
});

interface MockPlanStore {
  slotsByKey: WritableSignal<Map<string, PlanSlot>>;
  isLoading: WritableSignal<boolean>;
  hasLoadedOnce: WritableSignal<boolean>;
  load: ReturnType<typeof vi.fn>;
}

const createMockStore = (init: {
  slots?: PlanSlot[];
  isLoading?: boolean;
  hasLoadedOnce?: boolean;
}): MockPlanStore => {
  const slotMap = new Map<string, PlanSlot>();
  for (const s of init.slots ?? []) {
    slotMap.set(slotKey(s.date, s.slotType), s);
  }
  return {
    slotsByKey: signal(slotMap),
    isLoading: signal(init.isLoading ?? false),
    hasLoadedOnce: signal(init.hasLoadedOnce ?? true),
    load: vi.fn(),
  };
};

const setup = async (store: MockPlanStore) => {
  await TestBed.configureTestingModule({
    imports: [MealPlanTodayWidgetComponent],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([]),
      { provide: PlanStore, useValue: store },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(MealPlanTodayWidgetComponent);
  fixture.detectChanges();
  await fixture.whenStable();

  return {
    fixture,
    el: fixture.nativeElement as HTMLElement,
  };
};

describe('MealPlanTodayWidgetComponent', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
    TestBed.resetTestingModule();
  });

  it('renders a spinner while loading and before the first response lands', async () => {
    const store = createMockStore({ isLoading: true, hasLoadedOnce: false });

    const { el } = await setup(store);

    expect(
      el.querySelector('mat-spinner, mat-progress-spinner'),
    ).not.toBeNull();
    expect(el.querySelectorAll('.mpt__item')).toHaveLength(0);
  });

  it('shows the empty-day placeholder when no slots are planned for today', async () => {
    const store = createMockStore({});

    const { el } = await setup(store);

    expect(el.textContent ?? '').toContain('No meals planned for today');
    expect(el.querySelectorAll('.mpt__item')).toHaveLength(0);
  });

  it("renders today's three slots with planned titles and 'Not planned' for empty ones", async () => {
    const store = createMockStore({
      slots: [
        buildSlot(Slot.BREAKFAST, 'Oatmeal'),
        buildSlot(Slot.DINNER, 'Lasagna'),
      ],
    });

    const { el } = await setup(store);

    const items = Array.from(el.querySelectorAll('.mpt__item'));
    expect(items).toHaveLength(3);

    const text = items.map((i) => i.textContent?.trim().replace(/\s+/g, ' '));
    expect(text[0]).toContain('Breakfast');
    expect(text[0]).toContain('Oatmeal');
    expect(text[1]).toContain('Lunch');
    expect(text[1]).toContain('Not planned');
    expect(text[2]).toContain('Dinner');
    expect(text[2]).toContain('Lasagna');
  });

  it('always shows the "Plan your week" CTA pointing at /plan', async () => {
    const store = createMockStore({});

    const { el } = await setup(store);

    const cta = el.querySelector('a.mpt__cta');
    expect(cta).not.toBeNull();
    expect(cta?.getAttribute('href')).toBe('/plan');
    expect(cta?.textContent ?? '').toContain('Plan your week');
  });
});
