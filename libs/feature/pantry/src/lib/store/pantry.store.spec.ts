import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';
import {
  IngredientCategorySchema,
  MeasureUnitSchema,
  type PantryItemWithIngredient,
} from '@kookio/prisma-client';

import { PANTRY_TRPC, type PantryTrpcClient } from '../pantry-trpc';
import { PantryStore } from './pantry.store';

const Unit = MeasureUnitSchema.enum;
const Category = IngredientCategorySchema.enum;

const flush = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

const buildItem = (
  overrides: Partial<PantryItemWithIngredient> = {},
): PantryItemWithIngredient => ({
  id: overrides.id ?? 'pi-1',
  userId: 'user-1',
  ingredientCatalogId: overrides.ingredientCatalogId ?? 'ing-1',
  quantity: overrides.quantity ?? 100,
  unit: overrides.unit ?? Unit.G,
  expiresAt: overrides.expiresAt ?? null,
  addedAt: overrides.addedAt ?? new Date('2026-05-01T00:00:00Z'),
  updatedAt: overrides.updatedAt ?? new Date('2026-05-01T00:00:00Z'),
  ingredient: overrides.ingredient ?? {
    id: overrides.ingredientCatalogId ?? 'ing-1',
    name: 'Tomato',
    imageUrl: null,
    category: Category.VEGETABLES,
  },
});

const setup = (trpcOverrides?: Partial<PantryTrpcClient['pantry']>) => {
  const list = vi.fn().mockResolvedValue([]);
  const add = vi.fn();
  const update = vi.fn();
  const remove = vi.fn();
  const searchIngredients = vi.fn().mockResolvedValue([]);

  const trpc: PantryTrpcClient = {
    pantry: {
      list: { query: list, ...trpcOverrides?.list },
      add: { mutate: add, ...trpcOverrides?.add },
      update: { mutate: update, ...trpcOverrides?.update },
      remove: { mutate: remove, ...trpcOverrides?.remove },
      searchIngredients: {
        query: searchIngredients,
        ...trpcOverrides?.searchIngredients,
      },
    },
  };

  const authStore = createMockAuthStore({ authReady: true });

  TestBed.configureTestingModule({
    providers: [
      provideZonelessChangeDetection(),
      PantryStore,
      { provide: PANTRY_TRPC, useValue: trpc },
      { provide: AuthStore, useValue: authStore },
    ],
  });

  const store = TestBed.inject(PantryStore);

  return { store, authStore, trpc, list, add, update, remove };
};

describe('PantryStore', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
    vi.restoreAllMocks();
  });

  describe('initial state', () => {
    it('starts empty, idle, and without error', () => {
      const { store } = setup();
      expect(store.items()).toEqual([]);
      expect(store.totalCount()).toBe(0);
      expect(store.expiredItems()).toEqual([]);
      expect(store.isLoading()).toBe(false);
      expect(store.isMutating()).toBe(false);
      expect(store.error()).toBeNull();
    });
  });

  describe('clearError', () => {
    it('resets error to null', async () => {
      const { store } = setup({
        list: { query: vi.fn().mockRejectedValue(new Error('boom')) },
      });

      store.load();
      await flush();
      expect(store.error()).toBe('boom');

      store.clearError();
      expect(store.error()).toBeNull();
    });
  });

  describe('load', () => {
    it('populates items on success', async () => {
      const items = [buildItem({ id: 'a' }), buildItem({ id: 'b' })];
      const { store, list } = setup({
        list: { query: vi.fn().mockResolvedValue(items) },
      });

      store.load();
      await flush();

      expect(store.items()).toEqual(items);
      expect(store.totalCount()).toBe(2);
      expect(store.isLoading()).toBe(false);
      expect(store.error()).toBeNull();
      expect(list).not.toHaveBeenCalled();
    });

    it('surfaces the error message and resets isLoading on failure', async () => {
      const { store } = setup({
        list: { query: vi.fn().mockRejectedValue(new Error('network')) },
      });

      store.load();
      await flush();

      expect(store.items()).toEqual([]);
      expect(store.isLoading()).toBe(false);
      expect(store.error()).toBe('network');
    });
  });

  describe('expiredItems', () => {
    it('filters strictly past dates only', async () => {
      const past = buildItem({
        id: 'past',
        expiresAt: new Date(Date.now() - 86_400_000),
      });
      const future = buildItem({
        id: 'future',
        expiresAt: new Date(Date.now() + 86_400_000),
      });
      const { store } = setup({
        list: { query: vi.fn().mockResolvedValue([past, future]) },
      });

      store.load();
      await flush();

      expect(store.expiredItems().map((i) => i.id)).toEqual(['past']);
    });
  });

  describe('add', () => {
    it('prepends the new item, refreshes counts, and clears error', async () => {
      const seed = [buildItem({ id: 'old' })];
      const newItem = buildItem({ id: 'new' });
      const addMock = vi.fn().mockResolvedValue(newItem);
      const { store, authStore } = setup({
        list: { query: vi.fn().mockResolvedValue(seed) },
        add: { mutate: addMock },
      });

      store.load();
      await flush();

      store.add({
        ingredientCatalogId: 'ing-new',
        quantity: 5,
        unit: Unit.PIECE,
        expiresAt: null,
      });
      await flush();

      expect(addMock).toHaveBeenCalledWith({
        ingredientCatalogId: 'ing-new',
        quantity: 5,
        unit: Unit.PIECE,
        expiresAt: null,
      });
      expect(store.items().map((i) => i.id)).toEqual(['new', 'old']);
      expect(store.isMutating()).toBe(false);
      expect(authStore.loadCounts).toHaveBeenCalledOnce();
    });

    it('records the error and leaves the existing list untouched on failure', async () => {
      const seed = [buildItem({ id: 'old' })];
      const { store, authStore } = setup({
        list: { query: vi.fn().mockResolvedValue(seed) },
        add: {
          mutate: vi.fn().mockRejectedValue(new Error('duplicate')),
        },
      });

      store.load();
      await flush();

      store.add({
        ingredientCatalogId: 'ing-x',
        quantity: 1,
        unit: Unit.PIECE,
      });
      await flush();

      expect(store.items().map((i) => i.id)).toEqual(['old']);
      expect(store.isMutating()).toBe(false);
      expect(store.error()).toBe('duplicate');
      expect(authStore.loadCounts).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('replaces the matching item without changing the count', async () => {
      const original = buildItem({ id: 'a', quantity: 100 });
      const other = buildItem({ id: 'b', quantity: 50 });
      const updated = buildItem({ id: 'a', quantity: 250 });
      const updateMock = vi.fn().mockResolvedValue(updated);
      const { store } = setup({
        list: { query: vi.fn().mockResolvedValue([original, other]) },
        update: { mutate: updateMock },
      });

      store.load();
      await flush();

      store.update({ id: 'a', quantity: 250 });
      await flush();

      expect(store.totalCount()).toBe(2);
      expect(store.items().find((i) => i.id === 'a')?.quantity).toBe(250);
      expect(store.items().find((i) => i.id === 'b')?.quantity).toBe(50);
    });

    it('does not refresh counts (quantity changes do not move the badge)', async () => {
      const updated = buildItem({ id: 'a', quantity: 5 });
      const { store, authStore } = setup({
        list: { query: vi.fn().mockResolvedValue([buildItem({ id: 'a' })]) },
        update: { mutate: vi.fn().mockResolvedValue(updated) },
      });

      store.load();
      await flush();

      store.update({ id: 'a', quantity: 5 });
      await flush();

      expect(authStore.loadCounts).not.toHaveBeenCalled();
    });

    it('records the error on failure', async () => {
      const { store } = setup({
        list: { query: vi.fn().mockResolvedValue([buildItem({ id: 'a' })]) },
        update: { mutate: vi.fn().mockRejectedValue(new Error('not found')) },
      });

      store.load();
      await flush();

      store.update({ id: 'a', quantity: 5 });
      await flush();

      expect(store.error()).toBe('not found');
      expect(store.isMutating()).toBe(false);
    });
  });

  describe('remove', () => {
    it('filters out the item and refreshes counts', async () => {
      const seed = [buildItem({ id: 'a' }), buildItem({ id: 'b' })];
      const { store, authStore } = setup({
        list: { query: vi.fn().mockResolvedValue(seed) },
        remove: { mutate: vi.fn().mockResolvedValue({ id: 'a' }) },
      });

      store.load();
      await flush();

      store.remove({ id: 'a' });
      await flush();

      expect(store.items().map((i) => i.id)).toEqual(['b']);
      expect(authStore.loadCounts).toHaveBeenCalledOnce();
    });

    it('records the error and keeps the item on failure', async () => {
      const seed = [buildItem({ id: 'a' })];
      const { store, authStore } = setup({
        list: { query: vi.fn().mockResolvedValue(seed) },
        remove: {
          mutate: vi.fn().mockRejectedValue(new Error('forbidden')),
        },
      });

      store.load();
      await flush();

      store.remove({ id: 'a' });
      await flush();

      expect(store.items().map((i) => i.id)).toEqual(['a']);
      expect(store.error()).toBe('forbidden');
      expect(authStore.loadCounts).not.toHaveBeenCalled();
    });
  });
});
