import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';
import type { SavedRecipeRow } from '@kookio/prisma-client';

import { SAVED_TRPC, type SavedTrpcClient } from '../saved-trpc';
import { SavedStore } from './saved.store';

const flush = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

const buildRow = (
  overrides: { id?: string; areaId?: string; categoryId?: string } = {},
): SavedRecipeRow => ({
  recipe: {
    id: overrides.id ?? 'r1',
    slug: 'tomato-pasta',
    title: 'Tomato Pasta',
    imageUrl: null,
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    servings: 2,
    category: {
      id: overrides.categoryId ?? 'cat-pasta',
      name: 'Pasta',
      emoji: '🍝',
    },
    area: {
      id: overrides.areaId ?? 'area-italian',
      name: 'Italian',
      flag: '🇮🇹',
    },
  },
  addedAt: new Date('2026-05-10T00:00:00Z'),
});

const setup = (
  trpcOverrides?: Partial<SavedTrpcClient['recipeCollection']>,
) => {
  const getSaved = vi.fn().mockResolvedValue([]);
  const getSavedIds = vi.fn().mockResolvedValue([]);
  const toggleSave = vi.fn();

  const trpc: SavedTrpcClient = {
    recipeCollection: {
      getSaved: { query: getSaved, ...trpcOverrides?.getSaved },
      getSavedIds: { query: getSavedIds, ...trpcOverrides?.getSavedIds },
      toggleSave: { mutate: toggleSave, ...trpcOverrides?.toggleSave },
    },
  };

  // Default to "not onboarded" so the hooks effect does NOT auto-trigger
  // loadIds at construction — every test asserts the behavior of the
  // method it calls, not the auto-hydration side-effect.
  const authStore = createMockAuthStore({ session: null });

  TestBed.configureTestingModule({
    providers: [
      provideZonelessChangeDetection(),
      SavedStore,
      { provide: SAVED_TRPC, useValue: trpc },
      { provide: AuthStore, useValue: authStore },
    ],
  });

  const store = TestBed.inject(SavedStore);
  return { store, trpc, getSaved, getSavedIds, toggleSave, authStore };
};

describe('SavedStore', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
    vi.restoreAllMocks();
  });

  describe('initial state', () => {
    it('starts empty with FLAT view selected', () => {
      const { store } = setup();
      expect(store.items()).toEqual([]);
      expect(store.totalCount()).toBe(0);
      expect(store.view()).toBe('FLAT');
      expect(store.isSaved('anything')).toBe(false);
      expect(store.isPending('anything')).toBe(false);
    });
  });

  describe('loadIds', () => {
    it('hydrates the id set so isSaved can answer synchronously', async () => {
      const { store } = setup({
        getSavedIds: { query: vi.fn().mockResolvedValue(['r1', 'r2']) },
      });

      store.loadIds();
      await flush();

      expect(store.isSaved('r1')).toBe(true);
      expect(store.isSaved('r2')).toBe(true);
      expect(store.isSaved('r3')).toBe(false);
    });

    it('swallows errors silently — the user sees no skeleton for the id hydrate', async () => {
      const { store } = setup({
        getSavedIds: { query: vi.fn().mockRejectedValue(new Error('net')) },
      });

      store.loadIds();
      await flush();

      expect(store.error()).toBeNull();
      expect(store.isSaved('r1')).toBe(false);
    });
  });

  describe('load', () => {
    it('populates items, refreshes ids, and clears loading on success', async () => {
      const rows = [buildRow({ id: 'r1' }), buildRow({ id: 'r2' })];
      const { store } = setup({
        getSaved: { query: vi.fn().mockResolvedValue(rows) },
      });

      store.load();
      await flush();

      expect(store.items()).toEqual(rows);
      expect(store.totalCount()).toBe(2);
      expect(store.isSaved('r1')).toBe(true);
      expect(store.isLoading()).toBe(false);
    });

    it('records the error and resets isLoading on failure', async () => {
      const { store } = setup({
        getSaved: { query: vi.fn().mockRejectedValue(new Error('boom')) },
      });

      store.load();
      await flush();

      expect(store.items()).toEqual([]);
      expect(store.isLoading()).toBe(false);
      expect(store.error()).toBe('boom');
    });
  });

  describe('grouping', () => {
    it('groups by cuisine with stable alphabetical order', async () => {
      const italian1 = buildRow({ id: 'r1', areaId: 'a-it' });
      italian1.recipe.area = { id: 'a-it', name: 'Italian', flag: '🇮🇹' };
      const mexican = buildRow({ id: 'r2', areaId: 'a-mx' });
      mexican.recipe.area = { id: 'a-mx', name: 'Mexican', flag: '🇲🇽' };
      const italian2 = buildRow({ id: 'r3', areaId: 'a-it' });
      italian2.recipe.area = { id: 'a-it', name: 'Italian', flag: '🇮🇹' };

      const { store } = setup({
        getSaved: {
          query: vi.fn().mockResolvedValue([italian1, mexican, italian2]),
        },
      });

      store.load();
      await flush();

      const groups = store.groupedByCuisine();
      expect(groups.map((g) => g.label)).toEqual(['Italian', 'Mexican']);
      expect(groups[0].items.map((i) => i.recipe.id)).toEqual(['r1', 'r3']);
    });

    it('places null-area items in an "Other" bucket at the end', async () => {
      const italian = buildRow({ id: 'r1' });
      const noArea = buildRow({ id: 'r2' });
      noArea.recipe.area = null;

      const { store } = setup({
        getSaved: { query: vi.fn().mockResolvedValue([italian, noArea]) },
      });

      store.load();
      await flush();

      const groups = store.groupedByCuisine();
      expect(groups[groups.length - 1].label).toBe('Other');
      expect(groups[groups.length - 1].items[0].recipe.id).toBe('r2');
    });

    it('groups by category symmetrically', async () => {
      const pasta = buildRow({ id: 'r1', categoryId: 'c-pasta' });
      pasta.recipe.category = { id: 'c-pasta', name: 'Pasta', emoji: '🍝' };
      const beef = buildRow({ id: 'r2', categoryId: 'c-beef' });
      beef.recipe.category = { id: 'c-beef', name: 'Beef', emoji: '🥩' };

      const { store } = setup({
        getSaved: { query: vi.fn().mockResolvedValue([pasta, beef]) },
      });

      store.load();
      await flush();

      const groups = store.groupedByCategory();
      expect(groups.map((g) => g.label)).toEqual(['Beef', 'Pasta']);
    });
  });

  describe('toggleSave', () => {
    it('optimistically adds a recipe and settles on server confirmation', async () => {
      const row = buildRow({ id: 'r1' });
      const toggleSave = vi
        .fn()
        .mockResolvedValue({ recipeId: 'r1', saved: true });
      const { store } = setup({
        toggleSave: { mutate: toggleSave },
      });

      store.toggleSave({ recipeId: 'r1', recipe: row });
      // Optimistic flip is synchronous (the `tap` runs before await).
      expect(store.isSaved('r1')).toBe(true);
      expect(store.items()).toEqual([row]);
      expect(store.isPending('r1')).toBe(true);

      await flush();

      expect(store.isSaved('r1')).toBe(true);
      expect(store.items()).toEqual([row]);
      expect(store.isPending('r1')).toBe(false);
      expect(toggleSave).toHaveBeenCalledWith({ recipeId: 'r1' });
    });

    it('optimistically removes a recipe when unsaving and settles', async () => {
      const row = buildRow({ id: 'r1' });
      const toggleSave = vi
        .fn()
        .mockResolvedValue({ recipeId: 'r1', saved: false });
      const { store } = setup({
        getSaved: { query: vi.fn().mockResolvedValue([row]) },
        toggleSave: { mutate: toggleSave },
      });

      store.load();
      await flush();
      expect(store.items()).toEqual([row]);

      store.toggleSave({ recipeId: 'r1' });
      expect(store.isSaved('r1')).toBe(false);
      expect(store.items()).toEqual([]);
      expect(store.isPending('r1')).toBe(true);

      await flush();

      expect(store.isPending('r1')).toBe(false);
    });

    it('rolls back the optimistic flip when the mutation fails', async () => {
      const row = buildRow({ id: 'r1' });
      const { store } = setup({
        toggleSave: {
          mutate: vi.fn().mockRejectedValue(new Error('forbidden')),
        },
      });

      store.toggleSave({ recipeId: 'r1', recipe: row });
      expect(store.isSaved('r1')).toBe(true);

      await flush();

      expect(store.isSaved('r1')).toBe(false);
      expect(store.items()).toEqual([]);
      expect(store.error()).toBe('forbidden');
      expect(store.isPending('r1')).toBe(false);
    });
  });

  describe('setView', () => {
    it('records the active view', () => {
      const { store } = setup();
      store.setView('CUISINES');
      expect(store.view()).toBe('CUISINES');
      store.setView('CATEGORIES');
      expect(store.view()).toBe('CATEGORIES');
    });
  });
});
