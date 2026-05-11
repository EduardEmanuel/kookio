import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';
import {
  MealSlotTypeSchema,
  type AuthSession,
  type MealSlotWithRecipe,
  type RecipeFeedItem,
} from '@kookio/prisma-client';

import { MEAL_PLAN_TRPC, type MealPlanTrpcClient } from '../meal-plan-trpc';
import { PlanStore, slotKey } from './plan.store';

const Slot = MealSlotTypeSchema.enum;

const flush = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

const TEST_UID = 'user-1';
const DRAFT_KEY = `kookio:plan-draft:${TEST_UID}`;

const buildSession = (overrides: Partial<AuthSession> = {}): AuthSession => ({
  uid: TEST_UID,
  email: 'user@example.com',
  name: null,
  roles: [],
  amr: ['password'],
  onboardingDone: true,
  ...overrides,
});

const buildRecipe = (id: string): RecipeFeedItem => ({
  id,
  slug: `recipe-${id}`,
  title: `Recipe ${id}`,
  imageUrl: null,
  prepTimeMinutes: 10,
  cookTimeMinutes: 20,
  servings: 4,
  category: null,
  area: null,
});

const buildServerSlot = (overrides: {
  date: Date;
  slotType: MealSlotWithRecipe['slotType'];
  recipeId: string | null;
  recipe: RecipeFeedItem | null;
  updatedAt?: Date;
}): MealSlotWithRecipe => ({
  id: `ms-${overrides.date.toISOString()}-${overrides.slotType}`,
  userId: TEST_UID,
  recipeId: overrides.recipeId,
  date: overrides.date,
  slotType: overrides.slotType,
  servings: 2,
  createdAt: new Date('2026-05-01T00:00:00.000Z'),
  updatedAt: overrides.updatedAt ?? new Date('2026-05-01T00:00:00.000Z'),
  recipe: overrides.recipe,
});

const setup = (trpcOverrides?: {
  getCurrent?: ReturnType<typeof vi.fn>;
  setMealPlan?: ReturnType<typeof vi.fn>;
}) => {
  const getCurrent = trpcOverrides?.getCurrent ?? vi.fn().mockResolvedValue([]);
  const setMealPlan =
    trpcOverrides?.setMealPlan ?? vi.fn().mockResolvedValue([]);

  const trpc: MealPlanTrpcClient = {
    mealPlan: {
      getCurrent: { query: getCurrent },
      setMealPlan: { mutate: setMealPlan },
    },
  };

  const authStore = createMockAuthStore({
    authReady: true,
    session: buildSession(),
  });

  TestBed.configureTestingModule({
    providers: [
      provideZonelessChangeDetection(),
      PlanStore,
      { provide: MEAL_PLAN_TRPC, useValue: trpc },
      { provide: AuthStore, useValue: authStore },
    ],
  });

  const store = TestBed.inject(PlanStore);
  return { store, authStore, trpc, getCurrent, setMealPlan };
};

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  TestBed.resetTestingModule();
  window.localStorage.clear();
  vi.restoreAllMocks();
});

describe('PlanStore', () => {
  describe('initial state', () => {
    it('starts empty, idle, and without error', () => {
      const { store } = setup();
      expect(store.slots()).toEqual([]);
      expect(store.plannedCount()).toBe(0);
      expect(store.isLoading()).toBe(false);
      expect(store.isSubmitting()).toBe(false);
      expect(store.isDirty()).toBe(false);
      expect(store.hasUnsavedDraft()).toBe(false);
      expect(store.hasLoadedOnce()).toBe(false);
      expect(store.error()).toBeNull();
      expect(store.blockNavigation()).toBe(false);
    });
  });

  describe('load', () => {
    it('populates slots and records serverUpdatedAt', async () => {
      const recipe = buildRecipe('r1');
      const slot = buildServerSlot({
        date: new Date('2026-05-04T00:00:00.000Z'),
        slotType: Slot.LUNCH,
        recipeId: 'r1',
        recipe,
        updatedAt: new Date('2026-05-09T12:00:00.000Z'),
      });
      const { store } = setup({
        getCurrent: vi.fn().mockResolvedValue([slot]),
      });

      store.load();
      await flush();

      expect(store.slots()).toHaveLength(1);
      expect(
        store.slotsByKey().get(slotKey('2026-05-04T00:00:00.000Z', Slot.LUNCH)),
      ).toMatchObject({
        recipeId: 'r1',
        servings: 2,
      });
      expect(store.isDirty()).toBe(false);
      expect(store.hasUnsavedDraft()).toBe(false);
      expect(store.hasLoadedOnce()).toBe(true);
    });

    it('drops slots whose recipeId is null (server SET NULL aftermath)', async () => {
      const slot = buildServerSlot({
        date: new Date('2026-05-04T00:00:00.000Z'),
        slotType: Slot.LUNCH,
        recipeId: null,
        recipe: null,
      });
      const { store } = setup({
        getCurrent: vi.fn().mockResolvedValue([slot]),
      });

      store.load();
      await flush();

      expect(store.slots()).toEqual([]);
      expect(store.hasLoadedOnce()).toBe(true);
    });

    it('handles an empty server response (no slots ever planned)', async () => {
      const { store } = setup({
        getCurrent: vi.fn().mockResolvedValue([]),
      });

      store.load();
      await flush();

      expect(store.slots()).toEqual([]);
      expect(store.hasLoadedOnce()).toBe(true);
      expect(store.isLoading()).toBe(false);
    });

    it('restores a draft strictly newer than the latest server slot', async () => {
      const serverSlot = buildServerSlot({
        date: new Date('2026-05-04T00:00:00.000Z'),
        slotType: Slot.LUNCH,
        recipeId: 'r-server',
        recipe: buildRecipe('r-server'),
        updatedAt: new Date('2026-05-01T00:00:00.000Z'),
      });
      const draftSlots = [
        {
          date: '2026-05-05T00:00:00.000Z',
          slotType: Slot.DINNER,
          recipeId: 'r-draft',
          servings: 3,
          recipe: null,
        },
      ];
      window.localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({
          slots: draftSlots,
          savedAt: new Date('2026-05-02T00:00:00.000Z').getTime(),
        }),
      );
      const { store } = setup({
        getCurrent: vi.fn().mockResolvedValue([serverSlot]),
      });

      store.load();
      await flush();

      expect(store.hasUnsavedDraft()).toBe(true);
      expect(store.isDirty()).toBe(true);
      expect(store.slots()).toEqual(draftSlots);
    });

    it('discards a stale draft (server moved on) and clears it from storage', async () => {
      const serverSlot = buildServerSlot({
        date: new Date('2026-05-04T00:00:00.000Z'),
        slotType: Slot.LUNCH,
        recipeId: 'r-server',
        recipe: buildRecipe('r-server'),
        updatedAt: new Date('2026-05-10T00:00:00.000Z'),
      });
      window.localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({
          slots: [
            {
              date: '2026-05-05T00:00:00.000Z',
              slotType: Slot.DINNER,
              recipeId: 'r-old',
              servings: 2,
              recipe: null,
            },
          ],
          savedAt: new Date('2026-05-02T00:00:00.000Z').getTime(),
        }),
      );
      const { store } = setup({
        getCurrent: vi.fn().mockResolvedValue([serverSlot]),
      });

      store.load();
      await flush();

      expect(store.hasUnsavedDraft()).toBe(false);
      expect(store.isDirty()).toBe(false);
      expect(window.localStorage.getItem(DRAFT_KEY)).toBeNull();
    });

    it('surfaces a getCurrent failure as an error message', async () => {
      const { store } = setup({
        getCurrent: vi.fn().mockRejectedValue(new Error('network down')),
      });

      store.load();
      await flush();

      expect(store.error()).toBe('network down');
      expect(store.isLoading()).toBe(false);
    });
  });

  describe('setSlot / clearSlot', () => {
    const setupLoaded = async () => {
      const ctx = setup({
        getCurrent: vi.fn().mockResolvedValue([]),
      });
      ctx.store.load();
      await flush();
      return ctx;
    };

    it('adds a new slot, marks dirty, and persists a draft', async () => {
      const { store } = await setupLoaded();

      store.setSlot({
        date: '2026-05-04T00:00:00.000Z',
        slotType: Slot.LUNCH,
        recipeId: 'r1',
        recipe: buildRecipe('r1'),
      });

      expect(store.slots()).toHaveLength(1);
      expect(store.isDirty()).toBe(true);
      expect(store.blockNavigation()).toBe(true);
      expect(window.localStorage.getItem(DRAFT_KEY)).not.toBeNull();
    });

    it('replaces an existing slot at the same (date, slotType)', async () => {
      const { store } = await setupLoaded();
      store.setSlot({
        date: '2026-05-04T00:00:00.000Z',
        slotType: Slot.LUNCH,
        recipeId: 'r1',
      });
      store.setSlot({
        date: '2026-05-04T00:00:00.000Z',
        slotType: Slot.LUNCH,
        recipeId: 'r2',
        servings: 5,
      });

      expect(store.slots()).toHaveLength(1);
      expect(store.slots()[0].recipeId).toBe('r2');
      expect(store.slots()[0].servings).toBe(5);
    });

    it('clearSlot removes the cell and stays clean if it did not exist', async () => {
      const { store } = await setupLoaded();
      store.setSlot({
        date: '2026-05-04T00:00:00.000Z',
        slotType: Slot.LUNCH,
        recipeId: 'r1',
      });

      store.clearSlot('2026-05-04T00:00:00.000Z', Slot.DINNER);
      expect(store.slots()).toHaveLength(1);

      store.clearSlot('2026-05-04T00:00:00.000Z', Slot.LUNCH);
      expect(store.slots()).toEqual([]);
    });

    it('clearAll wipes slots and marks dirty', async () => {
      const { store } = await setupLoaded();
      store.setSlot({
        date: '2026-05-04T00:00:00.000Z',
        slotType: Slot.LUNCH,
        recipeId: 'r1',
      });
      store.setSlot({
        date: '2026-05-05T00:00:00.000Z',
        slotType: Slot.DINNER,
        recipeId: 'r2',
      });

      store.clearAll();
      expect(store.slots()).toEqual([]);
      expect(store.isDirty()).toBe(true);
    });
  });

  describe('submit', () => {
    it('sends the slot collection, clears dirty, drops the draft on success', async () => {
      const setMealPlan = vi.fn().mockResolvedValue([]);
      const { store } = setup({
        getCurrent: vi.fn().mockResolvedValue([]),
        setMealPlan,
      });
      store.load();
      await flush();

      store.setSlot({
        date: '2026-05-04T00:00:00.000Z',
        slotType: Slot.LUNCH,
        recipeId: 'r1',
        servings: 3,
      });
      expect(window.localStorage.getItem(DRAFT_KEY)).not.toBeNull();

      store.submit();
      await flush();

      expect(setMealPlan).toHaveBeenCalledWith({
        slots: [
          {
            date: '2026-05-04T00:00:00.000Z',
            slotType: Slot.LUNCH,
            recipeId: 'r1',
            servings: 3,
          },
        ],
      });
      expect(store.isDirty()).toBe(false);
      expect(store.isSubmitting()).toBe(false);
      expect(window.localStorage.getItem(DRAFT_KEY)).toBeNull();
    });

    it('surfaces a setMealPlan failure as an error and keeps the draft', async () => {
      const { store } = setup({
        getCurrent: vi.fn().mockResolvedValue([]),
        setMealPlan: vi.fn().mockRejectedValue(new Error('save failed')),
      });
      store.load();
      await flush();
      store.setSlot({
        date: '2026-05-04T00:00:00.000Z',
        slotType: Slot.LUNCH,
        recipeId: 'r1',
      });
      store.submit();
      await flush();

      expect(store.error()).toBe('save failed');
      expect(store.isDirty()).toBe(true);
      expect(window.localStorage.getItem(DRAFT_KEY)).not.toBeNull();
    });
  });

  describe('discardDraft', () => {
    it('clears the localStorage entry and resets the banner flag', async () => {
      window.localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({
          slots: [],
          savedAt: Date.now() + 86_400_000,
        }),
      );
      const { store } = setup({
        getCurrent: vi.fn().mockResolvedValue([]),
      });
      store.load();
      await flush();
      expect(store.hasUnsavedDraft()).toBe(true);

      store.discardDraft();
      expect(store.hasUnsavedDraft()).toBe(false);
      expect(window.localStorage.getItem(DRAFT_KEY)).toBeNull();
    });
  });
});
