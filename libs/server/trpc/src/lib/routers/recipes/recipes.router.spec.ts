import { afterEach, describe, expect, it, vi } from 'vitest';

import { MeasureUnitSchema, type AuthSession } from '@kookio/prisma-client';

import type { Context } from '../../context';
import { appRouter } from '../index';

const Unit = MeasureUnitSchema.enum;

type PrismaMock = {
  recipe: {
    findMany: ReturnType<typeof vi.fn>;
    findFirst: ReturnType<typeof vi.fn>;
  };
  pantryItem: {
    findMany: ReturnType<typeof vi.fn>;
  };
};

const makeSession = (overrides: Partial<AuthSession> = {}): AuthSession => ({
  uid: 'user-123',
  email: 'user@example.com',
  name: null,
  amr: ['password'],
  onboardingDone: true,
  ...overrides,
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

const makePrismaMock = (): PrismaMock => ({
  recipe: {
    findMany: vi.fn(() => Promise.resolve([])),
    findFirst: vi.fn(() => Promise.resolve(null)),
  },
  pantryItem: {
    findMany: vi.fn(() => Promise.resolve([])),
  },
});

type MatchIngredient = {
  unit: typeof Unit.G | typeof Unit.PIECE | typeof Unit.TO_TASTE | null;
  ingredient: { id: string; name: string };
};

const makeMatchRow = (
  id: string,
  ingredients: MatchIngredient[],
  overrides: Record<string, unknown> = {},
) => ({
  id,
  slug: `recipe-${id}`,
  title: `Recipe ${id}`,
  imageUrl: null,
  prepTimeMinutes: null,
  cookTimeMinutes: null,
  servings: 4,
  category: null,
  area: null,
  ingredients,
  ...overrides,
});

const ing = (
  id: string,
  name: string,
  unit: MatchIngredient['unit'] = Unit.G,
): MatchIngredient => ({
  unit,
  ingredient: { id, name },
});

const makeFeedRow = (id: string, overrides: Record<string, unknown> = {}) => ({
  id,
  slug: `recipe-${id}`,
  title: `Recipe ${id}`,
  imageUrl: null,
  prepTimeMinutes: null,
  cookTimeMinutes: null,
  servings: 4,
  category: null,
  area: null,
  ...overrides,
});

const baseDetail = {
  id: 'recipe-1',
  externalId: '52772',
  slug: 'teriyaki-chicken',
  title: 'Teriyaki Chicken',
  description: null,
  imageUrl: null,
  youtubeUrl: null,
  sourceUrl: null,
  instructions: 'Step 1.\n\nStep 2.',
  status: 'PUBLIC' as const,
  servings: 4,
  prepTimeMinutes: null,
  cookTimeMinutes: null,
  categoryId: null,
  areaId: null,
  authorId: null,
  createdAt: new Date('2024-01-01T00:00:00.000Z'),
  updatedAt: new Date('2024-01-02T00:00:00.000Z'),
  category: null,
  area: null,
  ingredients: [],
  tags: [],
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('recipes router', () => {
  describe('feed', () => {
    it('returns the first page with nextCursor when more results exist', async () => {
      const prismaMock = makePrismaMock();
      // 21 rows = limit (20 default) + 1 sentinel row → hasMore
      const rows = Array.from({ length: 21 }, (_, i) =>
        makeFeedRow(`r-${i + 1}`),
      );
      prismaMock.recipe.findMany.mockResolvedValue(rows);
      const caller = appRouter.createCaller(makeCtx(null, prismaMock));

      const result = await caller.recipes.feed({});

      expect(prismaMock.recipe.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { status: 'PUBLIC' },
          take: 21,
          orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        }),
      );
      expect(result.items).toHaveLength(20);
      expect(result.nextCursor).toBe('r-20');
    });

    it('returns nextCursor null when results fit in one page', async () => {
      const prismaMock = makePrismaMock();
      const rows = [makeFeedRow('only-one')];
      prismaMock.recipe.findMany.mockResolvedValue(rows);
      const caller = appRouter.createCaller(makeCtx(null, prismaMock));

      const result = await caller.recipes.feed({});

      expect(result.items).toHaveLength(1);
      expect(result.nextCursor).toBeNull();
    });

    it('applies cursor with skip:1 when continuing pagination', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.recipe.findMany.mockResolvedValue([]);
      const caller = appRouter.createCaller(makeCtx(null, prismaMock));

      await caller.recipes.feed({
        cursor: '11111111-1111-1111-1111-111111111111',
      });

      expect(prismaMock.recipe.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          cursor: { id: '11111111-1111-1111-1111-111111111111' },
          skip: 1,
        }),
      );
    });

    it('honours a custom limit and detects hasMore against it', async () => {
      const prismaMock = makePrismaMock();
      const rows = Array.from({ length: 6 }, (_, i) =>
        makeFeedRow(`r-${i + 1}`),
      );
      prismaMock.recipe.findMany.mockResolvedValue(rows);
      const caller = appRouter.createCaller(makeCtx(null, prismaMock));

      const result = await caller.recipes.feed({ limit: 5 });

      expect(prismaMock.recipe.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ take: 6 }),
      );
      expect(result.items).toHaveLength(5);
      expect(result.nextCursor).toBe('r-5');
    });

    it('rejects out-of-range limits via Zod validation', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(makeCtx(null, prismaMock));

      await expect(caller.recipes.feed({ limit: 0 })).rejects.toMatchObject({
        code: 'BAD_REQUEST',
      });
      await expect(caller.recipes.feed({ limit: 51 })).rejects.toMatchObject({
        code: 'BAD_REQUEST',
      });
      expect(prismaMock.recipe.findMany).not.toHaveBeenCalled();
    });

    it('translates Prisma failures to INTERNAL_SERVER_ERROR', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.recipe.findMany.mockRejectedValue(new Error('db down'));
      const caller = appRouter.createCaller(makeCtx(null, prismaMock));

      await expect(caller.recipes.feed({})).rejects.toMatchObject({
        code: 'INTERNAL_SERVER_ERROR',
      });
    });
  });

  describe('byId', () => {
    const validId = '22222222-2222-2222-2222-222222222222';

    it('returns the recipe when it exists and is PUBLIC', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.recipe.findFirst.mockResolvedValue(baseDetail);
      const caller = appRouter.createCaller(makeCtx(null, prismaMock));

      const result = await caller.recipes.byId({ id: validId });

      expect(prismaMock.recipe.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: validId, status: 'PUBLIC' },
        }),
      );
      expect(result.id).toBe('recipe-1');
      expect(result.title).toBe('Teriyaki Chicken');
    });

    it('returns NOT_FOUND when the recipe does not exist or is PRIVATE', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.recipe.findFirst.mockResolvedValue(null);
      const caller = appRouter.createCaller(makeCtx(null, prismaMock));

      await expect(caller.recipes.byId({ id: validId })).rejects.toMatchObject({
        code: 'NOT_FOUND',
      });
    });

    it('rejects malformed ids via Zod validation', async () => {
      const prismaMock = makePrismaMock();
      const caller = appRouter.createCaller(makeCtx(null, prismaMock));

      await expect(
        caller.recipes.byId({ id: 'not-a-uuid' }),
      ).rejects.toMatchObject({ code: 'BAD_REQUEST' });
      expect(prismaMock.recipe.findFirst).not.toHaveBeenCalled();
    });

    it('translates Prisma failures to INTERNAL_SERVER_ERROR', async () => {
      const prismaMock = makePrismaMock();
      prismaMock.recipe.findFirst.mockRejectedValue(new Error('db down'));
      const caller = appRouter.createCaller(makeCtx(null, prismaMock));

      await expect(caller.recipes.byId({ id: validId })).rejects.toMatchObject({
        code: 'INTERNAL_SERVER_ERROR',
      });
    });
  });

  describe('match', () => {
    describe('auth gates', () => {
      it('rejects calls without a session as UNAUTHORIZED', async () => {
        const prismaMock = makePrismaMock();
        const caller = appRouter.createCaller(makeCtx(null, prismaMock));

        await expect(
          caller.recipes.match({ level: 'A' }),
        ).rejects.toMatchObject({ code: 'UNAUTHORIZED' });
        expect(prismaMock.pantryItem.findMany).not.toHaveBeenCalled();
      });

      it('rejects calls without onboarding as PRECONDITION_FAILED', async () => {
        const prismaMock = makePrismaMock();
        const caller = appRouter.createCaller(
          makeCtx(makeSession({ onboardingDone: false }), prismaMock),
        );

        await expect(
          caller.recipes.match({ level: 'A' }),
        ).rejects.toMatchObject({ code: 'PRECONDITION_FAILED' });
        expect(prismaMock.pantryItem.findMany).not.toHaveBeenCalled();
      });
    });

    describe('input validation', () => {
      it('rejects unknown levels via Zod', async () => {
        const prismaMock = makePrismaMock();
        const caller = appRouter.createCaller(
          makeCtx(makeSession(), prismaMock),
        );

        await expect(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          caller.recipes.match({ level: 'D' as any }),
        ).rejects.toMatchObject({ code: 'BAD_REQUEST' });
        expect(prismaMock.recipe.findMany).not.toHaveBeenCalled();
      });

      it('rejects out-of-range limits via Zod', async () => {
        const prismaMock = makePrismaMock();
        const caller = appRouter.createCaller(
          makeCtx(makeSession(), prismaMock),
        );

        await expect(
          caller.recipes.match({ level: 'A', limit: 0 }),
        ).rejects.toMatchObject({ code: 'BAD_REQUEST' });
        await expect(
          caller.recipes.match({ level: 'A', limit: 51 }),
        ).rejects.toMatchObject({ code: 'BAD_REQUEST' });
      });
    });

    describe('level dispatch', () => {
      it('level C runs a single fetch with take = limit + 1 (loop bypass)', async () => {
        const prismaMock = makePrismaMock();
        prismaMock.pantryItem.findMany.mockResolvedValue([]);
        // 6 rows = limit (5) + 1 sentinel → hasMore
        const rows = Array.from({ length: 6 }, (_, i) =>
          makeMatchRow(`r-${i + 1}`, [
            ing(`i-${i + 1}`, `Ingredient ${i + 1}`),
          ]),
        );
        prismaMock.recipe.findMany.mockResolvedValue(rows);
        const caller = appRouter.createCaller(
          makeCtx(makeSession(), prismaMock),
        );

        const result = await caller.recipes.match({ level: 'C', limit: 5 });

        expect(prismaMock.recipe.findMany).toHaveBeenCalledTimes(1);
        expect(prismaMock.recipe.findMany).toHaveBeenCalledWith(
          expect.objectContaining({
            take: 6,
            where: { status: 'PUBLIC' },
            orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
          }),
        );
        expect(result.items).toHaveLength(5);
        expect(result.nextCursor).toBe('r-5');
        expect(result.partialScan).toBe(false);
        // Every C item still gets matchInfo enriched.
        expect(result.items[0]?.matchInfo).toEqual({
          missingCount: 1,
          totalIngredients: 1,
          missingNames: ['Ingredient 1'],
        });
      });

      it('level A returns only recipes whose ingredients are entirely covered', async () => {
        const prismaMock = makePrismaMock();
        // Pantry has flour + eggs.
        prismaMock.pantryItem.findMany.mockResolvedValue([
          { ingredientCatalogId: 'flour', quantity: 500, unit: Unit.G },
          { ingredientCatalogId: 'eggs', quantity: 12, unit: Unit.PIECE },
        ]);
        // Three recipes: r-1 fully covered, r-2 missing milk, r-3 fully covered.
        prismaMock.recipe.findMany.mockResolvedValue([
          makeMatchRow('r-1', [ing('flour', 'Flour'), ing('eggs', 'Eggs')]),
          makeMatchRow('r-2', [ing('flour', 'Flour'), ing('milk', 'Milk')]),
          makeMatchRow('r-3', [ing('eggs', 'Eggs')]),
        ]);
        const caller = appRouter.createCaller(
          makeCtx(makeSession(), prismaMock),
        );

        const result = await caller.recipes.match({ level: 'A', limit: 20 });

        expect(result.items.map((r) => r.id)).toEqual(['r-1', 'r-3']);
        expect(result.items.every((r) => r.matchInfo.missingCount === 0)).toBe(
          true,
        );
        expect(result.partialScan).toBe(false);
      });

      it('level B returns recipes with 1 to 3 missing ingredients', async () => {
        const prismaMock = makePrismaMock();
        prismaMock.pantryItem.findMany.mockResolvedValue([
          { ingredientCatalogId: 'flour', quantity: 500, unit: Unit.G },
        ]);
        prismaMock.recipe.findMany.mockResolvedValue([
          makeMatchRow('r-full', [ing('flour', 'Flour')]),
          makeMatchRow('r-1miss', [ing('flour', 'Flour'), ing('eggs', 'Eggs')]),
          makeMatchRow('r-3miss', [
            ing('flour', 'Flour'),
            ing('eggs', 'Eggs'),
            ing('milk', 'Milk'),
            ing('butter', 'Butter'),
          ]),
          makeMatchRow('r-4miss', [
            ing('flour', 'Flour'),
            ing('eggs', 'Eggs'),
            ing('milk', 'Milk'),
            ing('butter', 'Butter'),
            ing('sugar', 'Sugar'),
          ]),
        ]);
        const caller = appRouter.createCaller(
          makeCtx(makeSession(), prismaMock),
        );

        const result = await caller.recipes.match({ level: 'B', limit: 20 });

        expect(result.items.map((r) => r.id)).toEqual(['r-1miss', 'r-3miss']);
      });
    });

    describe('cursor handling', () => {
      it('forwards the cursor input to the first findMany with skip:1', async () => {
        const prismaMock = makePrismaMock();
        prismaMock.pantryItem.findMany.mockResolvedValue([]);
        prismaMock.recipe.findMany.mockResolvedValue([]);
        const caller = appRouter.createCaller(
          makeCtx(makeSession(), prismaMock),
        );

        await caller.recipes.match({
          level: 'C',
          cursor: '11111111-1111-1111-1111-111111111111',
        });

        expect(prismaMock.recipe.findMany).toHaveBeenCalledWith(
          expect.objectContaining({
            cursor: { id: '11111111-1111-1111-1111-111111111111' },
            skip: 1,
          }),
        );
      });
    });

    describe('error handling', () => {
      it('translates Prisma failures during pantry lookup to INTERNAL_SERVER_ERROR', async () => {
        const prismaMock = makePrismaMock();
        prismaMock.pantryItem.findMany.mockRejectedValue(new Error('db down'));
        const caller = appRouter.createCaller(
          makeCtx(makeSession(), prismaMock),
        );

        await expect(
          caller.recipes.match({ level: 'A' }),
        ).rejects.toMatchObject({ code: 'INTERNAL_SERVER_ERROR' });
      });

      it('translates Prisma failures during recipe scan to INTERNAL_SERVER_ERROR', async () => {
        const prismaMock = makePrismaMock();
        prismaMock.pantryItem.findMany.mockResolvedValue([]);
        prismaMock.recipe.findMany.mockRejectedValue(new Error('db down'));
        const caller = appRouter.createCaller(
          makeCtx(makeSession(), prismaMock),
        );

        await expect(
          caller.recipes.match({ level: 'C' }),
        ).rejects.toMatchObject({ code: 'INTERNAL_SERVER_ERROR' });
      });
    });
  });
});
