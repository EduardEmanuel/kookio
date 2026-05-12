import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';
import type { AuthSession } from '@kookio/prisma-client';

import {
  GROCERIES_TRPC,
  type GroceriesListResponse,
  type GroceriesTrpcClient,
  type GroceryItem,
} from '../groceries-trpc';
import { GroceriesStore } from './groceries.store';

const flush = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

const TEST_UID = 'user-1';
const CACHE_KEY = `kookio:groceries-bought:${TEST_UID}`;

const buildSession = (overrides: Partial<AuthSession> = {}): AuthSession => ({
  uid: TEST_UID,
  email: 'user@example.com',
  name: null,
  amr: ['password'],
  onboardingDone: true,
  ...overrides,
});

const buildItem = (overrides: Partial<GroceryItem> = {}): GroceryItem => ({
  ingredientCatalogId: 'flour-id',
  ingredientName: 'Flour',
  ingredientImageUrl: null,
  category: 'GRAINS',
  totalQuantity: 200,
  unit: 'G',
  isBought: false,
  ...overrides,
});

const setup = (trpcOverrides?: {
  list?: ReturnType<typeof vi.fn>;
  stats?: ReturnType<typeof vi.fn>;
  toggleBought?: ReturnType<typeof vi.fn>;
}) => {
  const list =
    trpcOverrides?.list ??
    vi.fn().mockResolvedValue({ items: [], boughtAvailable: true });
  const stats =
    trpcOverrides?.stats ??
    vi.fn().mockResolvedValue({ total: 0, remaining: 0 });
  const toggleBought =
    trpcOverrides?.toggleBought ??
    vi.fn().mockResolvedValue({
      isBought: true,
      persisted: true,
      total: 0,
      remaining: 0,
    });

  const trpc: GroceriesTrpcClient = {
    groceries: {
      list: { query: list },
      stats: { query: stats },
      toggleBought: { mutate: toggleBought },
    },
  };

  const authStore = createMockAuthStore({
    authReady: true,
    session: buildSession(),
  });

  TestBed.configureTestingModule({
    providers: [
      provideZonelessChangeDetection(),
      GroceriesStore,
      { provide: GROCERIES_TRPC, useValue: trpc },
      { provide: AuthStore, useValue: authStore },
    ],
  });

  const store = TestBed.inject(GroceriesStore);
  return { store, authStore, trpc, list, stats, toggleBought };
};

const writeCache = (boughtIds: string[]): void => {
  window.localStorage.setItem(CACHE_KEY, JSON.stringify({ boughtIds }));
};

const readCache = (): { boughtIds: string[] } | null => {
  const raw = window.localStorage.getItem(CACHE_KEY);
  return raw ? JSON.parse(raw) : null;
};

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  TestBed.resetTestingModule();
  window.localStorage.clear();
  vi.restoreAllMocks();
});

describe('GroceriesStore', () => {
  describe('initial state', () => {
    it('starts empty, idle, and without error', () => {
      const { store } = setup();
      expect(store.items()).toEqual([]);
      expect(store.totalCount()).toBe(0);
      expect(store.remainingCount()).toBe(0);
      expect(store.boughtCount()).toBe(0);
      expect(store.hasItems()).toBe(false);
      expect(store.isLoading()).toBe(false);
      expect(store.isMutating()).toBe(false);
      expect(store.error()).toBeNull();
      expect(store.unpersistedNotice()).toBe(false);
    });
  });

  describe('load (Redis available)', () => {
    it('hydrates items from server and syncs localStorage to match', async () => {
      const items: GroceryItem[] = [
        buildItem({
          ingredientCatalogId: 'flour-id',
          ingredientName: 'Flour',
          isBought: true,
        }),
        buildItem({
          ingredientCatalogId: 'sugar-id',
          ingredientName: 'Sugar',
          isBought: false,
        }),
      ];
      const response: GroceriesListResponse = {
        items,
        boughtAvailable: true,
      };
      const { store } = setup({
        list: vi.fn().mockResolvedValue(response),
      });

      store.load();
      await flush();

      expect(store.items()).toEqual(items);
      expect(store.boughtCount()).toBe(1);
      expect(store.remainingCount()).toBe(1);
      expect(readCache()).toEqual({ boughtIds: ['flour-id'] });
    });

    it('overwrites a stale localStorage cache when the server is canonical', async () => {
      writeCache(['stale-id-not-in-list']);
      const items: GroceryItem[] = [
        buildItem({ ingredientCatalogId: 'flour-id', isBought: false }),
      ];
      const { store } = setup({
        list: vi.fn().mockResolvedValue({ items, boughtAvailable: true }),
      });

      store.load();
      await flush();

      // Cache rewritten to match server (which has nothing bought).
      expect(readCache()).toEqual({ boughtIds: [] });
      expect(store.items()[0].isBought).toBe(false);
    });
  });

  describe('load (Redis unavailable)', () => {
    it('falls back to localStorage cache when boughtAvailable is false', async () => {
      writeCache(['flour-id']);
      const items: GroceryItem[] = [
        buildItem({
          ingredientCatalogId: 'flour-id',
          // Server returned isBought=false because Redis was down (silent
          // fallback inside `safeReadBought`).
          isBought: false,
        }),
        buildItem({
          ingredientCatalogId: 'sugar-id',
          isBought: false,
        }),
      ];
      const { store } = setup({
        list: vi.fn().mockResolvedValue({ items, boughtAvailable: false }),
      });

      store.load();
      await flush();

      // Cache override applied — flour shows as bought even though server
      // (with dead Redis) said false.
      expect(
        store.items().find((i) => i.ingredientCatalogId === 'flour-id')!
          .isBought,
      ).toBe(true);
      expect(
        store.items().find((i) => i.ingredientCatalogId === 'sugar-id')!
          .isBought,
      ).toBe(false);
    });

    it('leaves items as-is when boughtAvailable is false and no cache exists', async () => {
      const items: GroceryItem[] = [
        buildItem({ ingredientCatalogId: 'flour-id', isBought: false }),
      ];
      const { store } = setup({
        list: vi.fn().mockResolvedValue({ items, boughtAvailable: false }),
      });

      store.load();
      await flush();

      expect(store.items()[0].isBought).toBe(false);
      // No cache write either — there's nothing authoritative to record.
      expect(readCache()).toBeNull();
    });
  });

  describe('load (errors)', () => {
    it('surfaces a query failure as an error message', async () => {
      const { store } = setup({
        list: vi.fn().mockRejectedValue(new Error('network down')),
      });

      store.load();
      await flush();

      expect(store.error()).toContain('network down');
      expect(store.isLoading()).toBe(false);
      expect(store.items()).toEqual([]);
    });
  });

  describe('toggleBought (happy path)', () => {
    const setupLoaded = async (items: GroceryItem[]) => {
      const ctx = setup({
        list: vi.fn().mockResolvedValue({ items, boughtAvailable: true }),
      });
      ctx.store.load();
      await flush();
      return ctx;
    };

    it('flips the row optimistically, writes localStorage, and reconciles on persisted=true', async () => {
      const { store, toggleBought } = await setupLoaded([
        buildItem({ ingredientCatalogId: 'flour-id', isBought: false }),
      ]);

      store.toggleBought({ ingredientCatalogId: 'flour-id' });
      await flush();

      expect(store.items()[0].isBought).toBe(true);
      expect(readCache()).toEqual({ boughtIds: ['flour-id'] });
      expect(toggleBought).toHaveBeenCalledWith({
        ingredientCatalogId: 'flour-id',
        intendedState: true,
      });
      expect(store.isMutating()).toBe(false);
    });

    it('keeps the optimistic flip and raises unpersistedNotice when persisted=false', async () => {
      const { store } = await setupLoaded([
        buildItem({ ingredientCatalogId: 'flour-id', isBought: false }),
      ]);

      // Override the toggle response for this specific call.
      const trpc = TestBed.inject(GROCERIES_TRPC);
      (trpc.groceries.toggleBought.mutate as ReturnType<typeof vi.fn>) = vi
        .fn()
        .mockResolvedValue({
          isBought: true,
          persisted: false,
          total: 1,
          remaining: 1,
        });

      store.toggleBought({ ingredientCatalogId: 'flour-id' });
      await flush();

      expect(store.items()[0].isBought).toBe(true);
      expect(store.unpersistedNotice()).toBe(true);
      // localStorage still holds the change — it's the source of truth
      // until Redis recovers.
      expect(readCache()).toEqual({ boughtIds: ['flour-id'] });
    });

    it('rolls back the optimistic flip + localStorage on a real server failure', async () => {
      const { store } = await setupLoaded([
        buildItem({ ingredientCatalogId: 'flour-id', isBought: false }),
      ]);

      const trpc = TestBed.inject(GROCERIES_TRPC);
      (trpc.groceries.toggleBought.mutate as ReturnType<typeof vi.fn>) = vi
        .fn()
        .mockRejectedValue(new Error('500 Internal Server Error'));

      store.toggleBought({ ingredientCatalogId: 'flour-id' });
      await flush();

      // Rolled back to original state, both in memory and in cache.
      expect(store.items()[0].isBought).toBe(false);
      expect(readCache()).toEqual({ boughtIds: [] });
      expect(store.error()).toContain('500');
    });
  });

  describe('clear methods', () => {
    it('clearError resets the error to null', async () => {
      const { store } = setup({
        list: vi.fn().mockRejectedValue(new Error('boom')),
      });
      store.load();
      await flush();
      expect(store.error()).not.toBeNull();

      store.clearError();
      expect(store.error()).toBeNull();
    });

    it('clearUnpersistedNotice resets the flag to false', async () => {
      const items = [buildItem({ ingredientCatalogId: 'flour-id' })];
      const { store } = setup({
        list: vi.fn().mockResolvedValue({ items, boughtAvailable: true }),
        toggleBought: vi.fn().mockResolvedValue({
          isBought: true,
          persisted: false,
          total: 1,
          remaining: 1,
        }),
      });
      store.load();
      await flush();

      store.toggleBought({ ingredientCatalogId: 'flour-id' });
      await flush();
      expect(store.unpersistedNotice()).toBe(true);

      store.clearUnpersistedNotice();
      expect(store.unpersistedNotice()).toBe(false);
    });
  });

  describe('computed signals', () => {
    it('groups items by category in supermarket-aisle order', async () => {
      const items: GroceryItem[] = [
        buildItem({
          ingredientCatalogId: 'milk',
          ingredientName: 'Milk',
          category: 'DAIRY',
        }),
        buildItem({
          ingredientCatalogId: 'pork',
          ingredientName: 'Pork',
          category: 'MEAT',
        }),
        buildItem({
          ingredientCatalogId: 'apple',
          ingredientName: 'Apple',
          category: 'PRODUCE',
        }),
      ];
      const { store } = setup({
        list: vi.fn().mockResolvedValue({ items, boughtAvailable: true }),
      });
      store.load();
      await flush();

      const groups = store.groupedActive();
      expect(groups.map((g) => g.category)).toEqual([
        'PRODUCE',
        'MEAT',
        'DAIRY',
      ]);
    });

    it('splits items into active and bought halves', async () => {
      const items: GroceryItem[] = [
        buildItem({ ingredientCatalogId: 'a', isBought: false }),
        buildItem({ ingredientCatalogId: 'b', isBought: true }),
        buildItem({ ingredientCatalogId: 'c', isBought: false }),
      ];
      const { store } = setup({
        list: vi.fn().mockResolvedValue({ items, boughtAvailable: true }),
      });
      store.load();
      await flush();

      expect(store.activeItems().map((i) => i.ingredientCatalogId)).toEqual([
        'a',
        'c',
      ]);
      expect(store.boughtItems().map((i) => i.ingredientCatalogId)).toEqual([
        'b',
      ]);
      expect(store.totalCount()).toBe(3);
      expect(store.remainingCount()).toBe(2);
      expect(store.boughtCount()).toBe(1);
    });
  });
});
