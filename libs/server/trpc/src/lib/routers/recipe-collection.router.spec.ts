import { afterEach, describe, expect, it, vi } from 'vitest';

import type { AuthSession } from '@kookio/prisma-client';

import type { Context } from '../context';
import { appRouter } from './index';

const USER_ID = 'user-123';
const RECIPE_ID = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
const COLLECTION_ID = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';

type PrismaMock = {
  recipe: {
    findFirst: ReturnType<typeof vi.fn>;
  };
  recipeCollection: {
    findUnique: ReturnType<typeof vi.fn>;
  };
  recipeCollectionEntry: {
    findMany: ReturnType<typeof vi.fn>;
    findUnique: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
};

const makeSession = (overrides: Partial<AuthSession> = {}): AuthSession => ({
  uid: USER_ID,
  email: 'user@example.com',
  name: null,
  amr: ['password'],
  onboardingDone: true,
  ...overrides,
});

const makePrismaMock = (): PrismaMock => ({
  recipe: {
    findFirst: vi.fn(),
  },
  recipeCollection: {
    findUnique: vi.fn(),
  },
  recipeCollectionEntry: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
  },
});

const makeCtx = (
  session: AuthSession | null,
  prismaMock: PrismaMock,
): Context =>
  ({
    token: session ? 'fake-token' : undefined,
    session,
    prisma: prismaMock,
  }) as unknown as Context;

const buildSavedEntry = (overrides: { recipeId?: string } = {}) => ({
  addedAt: new Date('2026-05-10T00:00:00.000Z'),
  recipe: {
    id: overrides.recipeId ?? RECIPE_ID,
    slug: 'tomato-pasta',
    title: 'Tomato Pasta',
    imageUrl: null,
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    servings: 2,
    difficulty: null,
    category: { id: 'cat-1', name: 'Pasta', emoji: '🍝' },
    area: { id: 'area-1', name: 'Italian', flag: '🇮🇹' },
  },
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('recipeCollection router', () => {
  describe('getSaved', () => {
    it('returns saved rows for the favorites collection', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.recipeCollection.findUnique.mockResolvedValue({
        id: COLLECTION_ID,
      });
      const entry = buildSavedEntry();
      prismaMock.recipeCollectionEntry.findMany.mockResolvedValue([entry]);

      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));
      const result = await caller.recipeCollection.getSaved();

      expect(prismaMock.recipeCollection.findUnique).toHaveBeenCalledWith({
        where: { userId_name: { userId: USER_ID, name: 'favorites' } },
        select: { id: true },
      });
      expect(prismaMock.recipeCollectionEntry.findMany).toHaveBeenCalledWith({
        where: { collectionId: COLLECTION_ID },
        orderBy: { addedAt: 'desc' },
        select: expect.objectContaining({
          addedAt: true,
          recipe: expect.objectContaining({
            select: expect.objectContaining({
              id: true,
              title: true,
              category: { select: { id: true, name: true, emoji: true } },
              area: { select: { id: true, name: true, flag: true } },
            }),
          }),
        }),
      });
      expect(result).toEqual([
        { recipe: entry.recipe, addedAt: entry.addedAt },
      ]);
    });

    it('returns [] if the favorites collection is missing (defensive)', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.recipeCollection.findUnique.mockResolvedValue(null);

      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));
      const result = await caller.recipeCollection.getSaved();

      expect(result).toEqual([]);
      expect(prismaMock.recipeCollectionEntry.findMany).not.toHaveBeenCalled();
    });

    it('rejects when the caller is not onboarded', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(
        makeCtx(makeSession({ onboardingDone: false }), prismaMock),
      );

      await expect(caller.recipeCollection.getSaved()).rejects.toMatchObject({
        code: 'PRECONDITION_FAILED',
      });
    });
  });

  describe('getSavedIds', () => {
    it('returns the flat array of saved recipe ids', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.recipeCollection.findUnique.mockResolvedValue({
        id: COLLECTION_ID,
      });
      const ID_1 = 'cccccccc-cccc-4ccc-8ccc-cccccccccccc';
      const ID_2 = 'dddddddd-dddd-4ddd-8ddd-dddddddddddd';
      prismaMock.recipeCollectionEntry.findMany.mockResolvedValue([
        { recipeId: ID_1 },
        { recipeId: ID_2 },
      ]);

      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));
      const result = await caller.recipeCollection.getSavedIds();

      expect(result).toEqual([ID_1, ID_2]);
      expect(prismaMock.recipeCollectionEntry.findMany).toHaveBeenCalledWith({
        where: { collectionId: COLLECTION_ID },
        select: { recipeId: true },
      });
    });

    it('returns [] when the favorites collection is missing', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.recipeCollection.findUnique.mockResolvedValue(null);

      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));
      const result = await caller.recipeCollection.getSavedIds();

      expect(result).toEqual([]);
    });
  });

  describe('toggleSave', () => {
    it('creates an entry and returns saved=true when none exists', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.recipe.findFirst.mockResolvedValue({ id: RECIPE_ID });
      prismaMock.recipeCollection.findUnique.mockResolvedValue({
        id: COLLECTION_ID,
      });
      prismaMock.recipeCollectionEntry.findUnique.mockResolvedValue(null);
      prismaMock.recipeCollectionEntry.create.mockResolvedValue({
        collectionId: COLLECTION_ID,
        recipeId: RECIPE_ID,
      });

      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));
      const result = await caller.recipeCollection.toggleSave({
        recipeId: RECIPE_ID,
      });

      expect(prismaMock.recipeCollectionEntry.create).toHaveBeenCalledWith({
        data: { collectionId: COLLECTION_ID, recipeId: RECIPE_ID },
      });
      expect(prismaMock.recipeCollectionEntry.delete).not.toHaveBeenCalled();
      expect(result).toEqual({ recipeId: RECIPE_ID, saved: true });
    });

    it('deletes the entry and returns saved=false when one exists', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.recipe.findFirst.mockResolvedValue({ id: RECIPE_ID });
      prismaMock.recipeCollection.findUnique.mockResolvedValue({
        id: COLLECTION_ID,
      });
      prismaMock.recipeCollectionEntry.findUnique.mockResolvedValue({
        recipeId: RECIPE_ID,
      });
      prismaMock.recipeCollectionEntry.delete.mockResolvedValue({
        collectionId: COLLECTION_ID,
        recipeId: RECIPE_ID,
      });

      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));
      const result = await caller.recipeCollection.toggleSave({
        recipeId: RECIPE_ID,
      });

      expect(prismaMock.recipeCollectionEntry.delete).toHaveBeenCalledWith({
        where: {
          collectionId_recipeId: {
            collectionId: COLLECTION_ID,
            recipeId: RECIPE_ID,
          },
        },
      });
      expect(prismaMock.recipeCollectionEntry.create).not.toHaveBeenCalled();
      expect(result).toEqual({ recipeId: RECIPE_ID, saved: false });
    });

    it('throws NOT_FOUND when the recipe id does not resolve', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.recipe.findFirst.mockResolvedValue(null);

      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(
        caller.recipeCollection.toggleSave({ recipeId: RECIPE_ID }),
      ).rejects.toMatchObject({ code: 'NOT_FOUND' });
      expect(prismaMock.recipeCollection.findUnique).not.toHaveBeenCalled();
    });

    it('throws PRECONDITION_FAILED when the favorites collection is missing', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.recipe.findFirst.mockResolvedValue({ id: RECIPE_ID });
      prismaMock.recipeCollection.findUnique.mockResolvedValue(null);

      const caller = appRouter.createCaller(makeCtx(makeSession(), prismaMock));

      await expect(
        caller.recipeCollection.toggleSave({ recipeId: RECIPE_ID }),
      ).rejects.toMatchObject({ code: 'PRECONDITION_FAILED' });
    });
  });
});
