import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';
import {
  MealSlotTypeSchema,
  type AuthSession,
  type MealPlanFull,
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

const buildPlan = (overrides: Partial<MealPlanFull> = {}): MealPlanFull => ({
  id: 'mp-1',
  userId: TEST_UID,
  name: null,
  startDate: new Date('2026-05-04T00:00:00.000Z'),
  endDate: new Date('2026-05-10T23:59:59.999Z'),
  createdAt: new Date('2026-05-01T00:00:00.000Z'),
  updatedAt: new Date('2026-05-01T00:00:00.000Z'),
  slots: [],
  ...overrides,
});

const setup = (trpcOverrides?: {
  getCurrent?: ReturnType<typeof vi.fn>;
  setMealPlan?: ReturnType<typeof vi.fn>;
}) => {
  const getCurrent =
    trpcOverrides?.getCurrent ?? vi.fn().mockResolvedValue(buildPlan());
  const setMealPlan =
    trpcOverrides?.setMealPlan ?? vi.fn().mockResolvedValue(buildPlan());
  const feed = vi.fn().mockResolvedValue({ items: [], nextCursor: null });

  const trpc: MealPlanTrpcClient = {
    mealPlan: {
      getCurrent: { query: getCurrent },
      setMealPlan: { mutate: setMealPlan },
    },
    recipes: {
      feed: { query: feed },
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
      expect(store.startDate()).toBeNull();
      expect(store.endDate()).toBeNull();
      expect(store.isLoading()).toBe(false);
      expect(store.isSubmitting()).toBe(false);
      expect(store.isDirty()).toBe(false);
      expect(store.hasUnsavedDraft()).toBe(false);
      expect(store.error()).toBeNull();
      expect(store.blockNavigation()).toBe(false);
      expect(store.hasRange()).toBe(false);
    });
  });

  describe('load', () => {
    it('populates plan + slots and records serverUpdatedAt', async () => {
      const recipe = buildRecipe('r1');
      const plan = buildPlan({
        slots: [
          {
            id: 's1',
            mealPlanId: 'mp-1',
            recipeId: 'r1',
            date: new Date('2026-05-04T00:00:00.000Z'),
            slotType: Slot.LUNCH,
            servings: 2,
            recipe,
          },
        ],
      });
      const { store } = setup({
        getCurrent: vi.fn().mockResolvedValue(plan),
      });

      store.load();
      await flush();

      expect(store.startDate()).toBe('2026-05-04T00:00:00.000Z');
      expect(store.slots()).toHaveLength(1);
      expect(
        store.slotsByKey().get(slotKey('2026-05-04T00:00:00.000Z', Slot.LUNCH)),
      ).toMatchObject({
        recipeId: 'r1',
        servings: 2,
      });
      expect(store.isDirty()).toBe(false);
      expect(store.hasUnsavedDraft()).toBe(false);
    });

    it('drops slots whose recipeId is null (server SET NULL aftermath)', async () => {
      const plan = buildPlan({
        slots: [
          {
            id: 's-orphan',
            mealPlanId: 'mp-1',
            recipeId: null,
            date: new Date('2026-05-04T00:00:00.000Z'),
            slotType: Slot.LUNCH,
            servings: 2,
            recipe: null,
          },
        ],
      });
      const { store } = setup({
        getCurrent: vi.fn().mockResolvedValue(plan),
      });

      store.load();
      await flush();

      expect(store.slots()).toEqual([]);
    });

    it('restores a draft strictly newer than the server and flags it', async () => {
      const serverPlan = buildPlan({
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
          startDate: '2026-05-04T00:00:00.000Z',
          endDate: '2026-05-10T23:59:59.999Z',
          slots: draftSlots,
          savedAt: new Date('2026-05-02T00:00:00.000Z').getTime(),
        }),
      );
      const { store } = setup({
        getCurrent: vi.fn().mockResolvedValue(serverPlan),
      });

      store.load();
      await flush();

      expect(store.hasUnsavedDraft()).toBe(true);
      expect(store.isDirty()).toBe(true);
      expect(store.slots()).toEqual(draftSlots);
    });

    it('discards a stale draft (server moved on) and clears it from storage', async () => {
      const serverPlan = buildPlan({
        updatedAt: new Date('2026-05-10T00:00:00.000Z'),
      });
      window.localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({
          startDate: '2026-05-04T00:00:00.000Z',
          endDate: '2026-05-10T23:59:59.999Z',
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
        getCurrent: vi.fn().mockResolvedValue(serverPlan),
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
        getCurrent: vi.fn().mockResolvedValue(buildPlan()),
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

      // Clearing a different (date, slotType) is a no-op
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
    it('sends current draft, clears dirty, drops localStorage draft on success', async () => {
      const setMealPlan = vi
        .fn()
        .mockResolvedValue(
          buildPlan({ updatedAt: new Date('2026-05-09T00:00:00.000Z') }),
        );
      const { store } = setup({
        getCurrent: vi.fn().mockResolvedValue(buildPlan()),
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
        startDate: '2026-05-04T00:00:00.000Z',
        endDate: '2026-05-10T23:59:59.999Z',
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
        getCurrent: vi.fn().mockResolvedValue(buildPlan()),
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

    it('refuses to submit when range is unset', async () => {
      const setMealPlan = vi.fn();
      const { store } = setup({ setMealPlan });
      // Note: load() not called → range stays null
      store.submit();
      await flush();

      expect(setMealPlan).not.toHaveBeenCalled();
      expect(store.error()).toBe('Plan range is not set');
    });
  });

  describe('discardDraft', () => {
    it('clears the localStorage entry and resets the banner flag', async () => {
      window.localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({
          startDate: '2026-05-04T00:00:00.000Z',
          endDate: '2026-05-10T23:59:59.999Z',
          slots: [],
          savedAt: Date.now() + 86_400_000,
        }),
      );
      const { store } = setup({
        getCurrent: vi.fn().mockResolvedValue(buildPlan()),
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
