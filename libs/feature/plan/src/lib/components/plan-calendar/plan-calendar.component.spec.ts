import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import {
  provideZonelessChangeDetection,
  signal,
  type Signal,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { of } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BreakpointService } from '@kookio/feature-shell';
import { RECIPES_TRPC, type RecipesTrpcClient } from '@kookio/feature-recipes';
import { MealSlotTypeSchema, type MealSlotType } from '@kookio/prisma-client';

import { PlanStore } from '../../store/plan.store';
import { PlanCalendarComponent } from './plan-calendar.component';

const SLOT: MealSlotType = MealSlotTypeSchema.options[0];

type DayCol = { date: string; isToday: boolean };

/** Protected surface the tests drive. */
type TestableCalendar = {
  visibleDays: Signal<DayCol[]>;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onClearSlot: (d: string, s: MealSlotType, e: Event) => void;
  onCellDrop: (d: string, s: MealSlotType, e: unknown) => void;
  onDiscardDraft: () => void;
  onSlotClick: (d: string, s: MealSlotType) => Promise<void>;
};

const makeStore = () => ({
  error: signal<string | null>(null),
  hasLoadedOnce: signal(true),
  hasUnsavedDraft: signal(false),
  isLoading: signal(false),
  slotsByKey: signal(new Map<string, unknown>()),
  load: vi.fn(),
  clearError: vi.fn(),
  clearSlot: vi.fn(),
  setSlot: vi.fn(),
  discardDraft: vi.fn(),
});

const setup = async (opts: { dismissWith?: unknown } = {}) => {
  const store = makeStore();
  const sheetRef = { afterDismissed: () => of(opts.dismissWith ?? null) };
  const sheet = { open: vi.fn(() => sheetRef) };
  const trpc = {
    recipes: {
      match: {
        query: vi.fn(() => Promise.resolve({ items: [], nextCursor: null })),
      },
    },
  } as unknown as RecipesTrpcClient;

  await TestBed.configureTestingModule({
    imports: [PlanCalendarComponent],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([]),
      provideNativeDateAdapter(),
      { provide: PlanStore, useValue: store as unknown as PlanStore },
      { provide: BreakpointService, useValue: { isDesktop: signal(true) } },
      { provide: MatBottomSheet, useValue: sheet },
      { provide: MatSnackBar, useValue: { open: vi.fn() } },
      { provide: RECIPES_TRPC, useValue: trpc },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(PlanCalendarComponent);
  // Intentionally no detectChanges: the heavy calendar + sidebar template (CDK
  // drag/drop, virtual scroll, match cards) isn't needed to exercise the store-
  // mutation handlers and date navigation, and skipping it keeps this focused
  // and stable. The initial load is a constructor microtask, flushed below.
  await new Promise((r) => setTimeout(r, 0));

  return {
    inst: fixture.componentInstance as unknown as TestableCalendar,
    store,
    sheet,
  };
};

describe('PlanCalendarComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
    vi.restoreAllMocks();
  });

  it('loads the plan on init', async () => {
    const { store } = await setup();
    expect(store.load).toHaveBeenCalled();
  });

  describe('date navigation', () => {
    it('centers on today via onToday', async () => {
      const { inst } = await setup();
      inst.onPrev();
      inst.onToday();
      expect(inst.visibleDays()[1].isToday).toBe(true);
    });

    it('onPrev moves the center back a day (today becomes the +1 column)', async () => {
      const { inst } = await setup();
      inst.onToday();
      inst.onPrev();
      expect(inst.visibleDays()[1].isToday).toBe(false);
      expect(inst.visibleDays()[2].isToday).toBe(true);
    });

    it('onNext returns to today after onPrev', async () => {
      const { inst } = await setup();
      inst.onToday();
      inst.onPrev();
      inst.onNext();
      expect(inst.visibleDays()[1].isToday).toBe(true);
    });
  });

  describe('slot mutations', () => {
    it('clears a slot and stops the click from bubbling to the cell', async () => {
      const { inst, store } = await setup();
      const event = { stopPropagation: vi.fn() } as unknown as Event;
      inst.onClearSlot('2026-06-01', SLOT, event);
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(store.clearSlot).toHaveBeenCalledWith('2026-06-01', SLOT);
    });

    it('sets a slot from a dropped recipe payload', async () => {
      const { inst, store } = await setup();
      const recipe = { id: 'r-1', title: 'Soup' };
      inst.onCellDrop('2026-06-02', SLOT, {
        item: { data: { kind: 'sidebar-recipe', recipe } },
      });
      expect(store.setSlot).toHaveBeenCalledWith(
        expect.objectContaining({
          date: '2026-06-02',
          slotType: SLOT,
          recipeId: 'r-1',
        }),
      );
    });

    it('ignores a drop with no payload', async () => {
      const { inst, store } = await setup();
      inst.onCellDrop('2026-06-02', SLOT, { item: { data: undefined } });
      expect(store.setSlot).not.toHaveBeenCalled();
    });

    it('discards the draft and reloads', async () => {
      const { inst, store } = await setup();
      inst.onDiscardDraft();
      expect(store.discardDraft).toHaveBeenCalled();
      expect(store.load).toHaveBeenCalled();
    });

    it('opens the picker and sets the slot with the chosen recipe', async () => {
      const recipe = { id: 'r-9', title: 'Stew' };
      const { inst, store, sheet } = await setup({ dismissWith: recipe });
      await inst.onSlotClick('2026-06-03', SLOT);
      expect(sheet.open).toHaveBeenCalled();
      expect(store.setSlot).toHaveBeenCalledWith(
        expect.objectContaining({
          date: '2026-06-03',
          slotType: SLOT,
          recipeId: 'r-9',
        }),
      );
    });

    it('does not set a slot when the picker is dismissed without a recipe', async () => {
      const { inst, store } = await setup({ dismissWith: null });
      await inst.onSlotClick('2026-06-03', SLOT);
      expect(store.setSlot).not.toHaveBeenCalled();
    });
  });
});
