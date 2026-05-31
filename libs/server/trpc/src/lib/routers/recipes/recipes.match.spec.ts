import { afterEach, describe, expect, it, vi } from 'vitest';

import { MeasureUnitSchema } from '@kookio/prisma-client';

import type { Context } from '../../context';
import {
  fetchAllRecipesPage,
  scanForMatches,
  type ScanInput,
} from './recipes.match';
import { buildPantryMap } from './recipes.match.helpers';

const Unit = MeasureUnitSchema.enum;

type PrismaMock = {
  recipe: { findMany: ReturnType<typeof vi.fn> };
};

const makePrisma = (): PrismaMock => ({
  recipe: { findMany: vi.fn(() => Promise.resolve([])) },
});

const asPrisma = (mock: PrismaMock): Context['prisma'] =>
  mock as unknown as Context['prisma'];

type Ing = {
  unit: typeof Unit.G | typeof Unit.PIECE | null;
  ingredient: { id: string; name: string };
};

const ing = (id: string, name: string): Ing => ({
  unit: Unit.G,
  ingredient: { id, name },
});

const makeRow = (id: string, ingredients: Ing[]) => ({
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
});

const baseInput = (overrides: Partial<ScanInput> = {}): ScanInput => ({
  level: 'Alright',
  limit: 20,
  ...overrides,
});

const userId = 'user-123';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('scanForMatches', () => {
  it('returns nextCursor=null and partialScan=false when DB exhausts before page fills', async () => {
    const prisma = makePrisma();
    // Single batch < batchSize → DB exhausted.
    prisma.recipe.findMany.mockResolvedValueOnce([
      makeRow('r-1', [ing('flour', 'Flour')]),
      makeRow('r-2', [ing('flour', 'Flour'), ing('eggs', 'Eggs')]),
    ]);
    const pantry = buildPantryMap([
      { ingredientCatalogId: 'flour', quantity: 500, unit: Unit.G },
      { ingredientCatalogId: 'eggs', quantity: 12, unit: Unit.PIECE },
    ]);

    const result = await scanForMatches({
      prisma: asPrisma(prisma),
      pantryMap: pantry,
      userId,
      input: baseInput({ level: 'Alright' }),
      batchSize: 50,
      examinedBudget: 100,
    });

    expect(prisma.recipe.findMany).toHaveBeenCalledTimes(1);
    expect(result.items.map((r) => r.id)).toEqual(['r-1', 'r-2']);
    expect(result.nextCursor).toBeNull();
    expect(result.partialScan).toBe(false);
  });

  it('accumulates across multiple batches when first batch is full', async () => {
    const prisma = makePrisma();
    const pantry = buildPantryMap([
      { ingredientCatalogId: 'flour', quantity: 500, unit: Unit.G },
    ]);

    // First batch: 3 rows, all match (batch.length === batchSize → not exhausted)
    // Second batch: 2 rows, all match (batch.length < batchSize → exhausted)
    prisma.recipe.findMany
      .mockResolvedValueOnce([
        makeRow('r-1', [ing('flour', 'Flour')]),
        makeRow('r-2', [ing('flour', 'Flour')]),
        makeRow('r-3', [ing('flour', 'Flour')]),
      ])
      .mockResolvedValueOnce([
        makeRow('r-4', [ing('flour', 'Flour')]),
        makeRow('r-5', [ing('flour', 'Flour')]),
      ]);

    const result = await scanForMatches({
      prisma: asPrisma(prisma),
      pantryMap: pantry,
      userId,
      input: baseInput({ level: 'Alright', limit: 20 }),
      batchSize: 3,
      examinedBudget: 100,
    });

    expect(prisma.recipe.findMany).toHaveBeenCalledTimes(2);
    // Second call must use cursor from last item of first batch.
    expect(prisma.recipe.findMany).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        cursor: { id: 'r-3' },
        skip: 1,
      }),
    );
    expect(result.items.map((r) => r.id)).toEqual([
      'r-1',
      'r-2',
      'r-3',
      'r-4',
      'r-5',
    ]);
    expect(result.nextCursor).toBeNull();
    expect(result.partialScan).toBe(false);
  });

  it('caps page at limit and returns cursor on last matched id', async () => {
    const prisma = makePrisma();
    const pantry = buildPantryMap([
      { ingredientCatalogId: 'flour', quantity: 500, unit: Unit.G },
    ]);

    // Single batch of 5 all-match rows, limit 3 → break inner loop after r-3.
    prisma.recipe.findMany.mockResolvedValueOnce([
      makeRow('r-1', [ing('flour', 'Flour')]),
      makeRow('r-2', [ing('flour', 'Flour')]),
      makeRow('r-3', [ing('flour', 'Flour')]),
      makeRow('r-4', [ing('flour', 'Flour')]),
      makeRow('r-5', [ing('flour', 'Flour')]),
    ]);

    const result = await scanForMatches({
      prisma: asPrisma(prisma),
      pantryMap: pantry,
      userId,
      input: baseInput({ level: 'Alright', limit: 3 }),
      batchSize: 5,
      examinedBudget: 100,
    });

    expect(prisma.recipe.findMany).toHaveBeenCalledTimes(1);
    expect(result.items.map((r) => r.id)).toEqual(['r-1', 'r-2', 'r-3']);
    // Cursor on last matched, not last examined — items r-4 and r-5 are
    // re-examined on the client's next call.
    expect(result.nextCursor).toBe('r-3');
    expect(result.partialScan).toBe(false);
  });

  it('returns partialScan=true with cursor on last examined when budget is hit', async () => {
    const prisma = makePrisma();
    // Empty pantry → every recipe is rejected at level Alright.
    const pantry = buildPantryMap([]);

    // Three batches of 4 rows each = 12 examined, budget = 10 → budget hit.
    prisma.recipe.findMany
      .mockResolvedValueOnce([
        makeRow('r-1', [ing('a', 'A')]),
        makeRow('r-2', [ing('b', 'B')]),
        makeRow('r-3', [ing('c', 'C')]),
        makeRow('r-4', [ing('d', 'D')]),
      ])
      .mockResolvedValueOnce([
        makeRow('r-5', [ing('e', 'E')]),
        makeRow('r-6', [ing('f', 'F')]),
        makeRow('r-7', [ing('g', 'G')]),
        makeRow('r-8', [ing('h', 'H')]),
      ])
      .mockResolvedValueOnce([
        makeRow('r-9', [ing('i', 'I')]),
        makeRow('r-10', [ing('j', 'J')]),
        makeRow('r-11', [ing('k', 'K')]),
        makeRow('r-12', [ing('l', 'L')]),
      ]);

    const result = await scanForMatches({
      prisma: asPrisma(prisma),
      pantryMap: pantry,
      userId,
      input: baseInput({ level: 'Alright', limit: 5 }),
      batchSize: 4,
      examinedBudget: 10,
    });

    // Loop runs 3 batches before checking budget at top: examined goes 4 → 8 → 12.
    // Budget check (12 >= 10) fires after the 3rd batch finishes.
    expect(result.items).toEqual([]);
    expect(result.partialScan).toBe(true);
    // Cursor on last examined id — last row of last batch.
    expect(result.nextCursor).toBe('r-12');
  });

  it('passes the input cursor to the first findMany call with skip:1', async () => {
    const prisma = makePrisma();
    prisma.recipe.findMany.mockResolvedValue([]);

    await scanForMatches({
      prisma: asPrisma(prisma),
      pantryMap: buildPantryMap([]),
      userId,
      input: baseInput({ level: 'Alright', cursor: 'cursor-id' }),
      batchSize: 50,
      examinedBudget: 100,
    });

    expect(prisma.recipe.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        cursor: { id: 'cursor-id' },
        skip: 1,
      }),
    );
  });

  it('does not request a new batch when the loop already saw a partial batch (DB exhausted)', async () => {
    const prisma = makePrisma();
    // batch.length(2) < batchSize(5) → exhausted, even though limit not filled.
    prisma.recipe.findMany.mockResolvedValueOnce([
      makeRow('r-1', [ing('flour', 'Flour')]),
      makeRow('r-2', [ing('flour', 'Flour')]),
    ]);

    const result = await scanForMatches({
      prisma: asPrisma(prisma),
      pantryMap: buildPantryMap([
        { ingredientCatalogId: 'flour', quantity: 100, unit: Unit.G },
      ]),
      userId,
      input: baseInput({ level: 'Alright', limit: 20 }),
      batchSize: 5,
      examinedBudget: 100,
    });

    expect(prisma.recipe.findMany).toHaveBeenCalledTimes(1);
    expect(result.items).toHaveLength(2);
    expect(result.nextCursor).toBeNull();
    expect(result.partialScan).toBe(false);
  });
});

describe('fetchAllRecipesPage', () => {
  it('runs a single findMany with take = limit + 1 and slices the sentinel', async () => {
    const prisma = makePrisma();
    const pantry = buildPantryMap([]);
    // 4 rows = limit (3) + 1 sentinel.
    prisma.recipe.findMany.mockResolvedValueOnce([
      makeRow('r-1', [ing('a', 'A')]),
      makeRow('r-2', [ing('b', 'B')]),
      makeRow('r-3', [ing('c', 'C')]),
      makeRow('r-4', [ing('d', 'D')]),
    ]);

    const result = await fetchAllRecipesPage({
      prisma: asPrisma(prisma),
      pantryMap: pantry,
      input: { limit: 3 },
    });

    expect(prisma.recipe.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.recipe.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ take: 4 }),
    );
    expect(result.items).toHaveLength(3);
    expect(result.nextCursor).toBe('r-3');
    expect(result.partialScan).toBe(false);
  });

  it('returns nextCursor=null when results fit in one page', async () => {
    const prisma = makePrisma();
    prisma.recipe.findMany.mockResolvedValueOnce([
      makeRow('r-1', [ing('a', 'A')]),
    ]);

    const result = await fetchAllRecipesPage({
      prisma: asPrisma(prisma),
      pantryMap: buildPantryMap([]),
      input: { limit: 5 },
    });

    expect(result.items).toHaveLength(1);
    expect(result.nextCursor).toBeNull();
  });

  it('enriches every returned item with matchInfo', async () => {
    const prisma = makePrisma();
    prisma.recipe.findMany.mockResolvedValueOnce([
      makeRow('r-1', [ing('flour', 'Flour'), ing('eggs', 'Eggs')]),
    ]);

    const result = await fetchAllRecipesPage({
      prisma: asPrisma(prisma),
      pantryMap: buildPantryMap([
        { ingredientCatalogId: 'flour', quantity: 500, unit: Unit.G },
      ]),
      input: { limit: 5 },
    });

    expect(result.items[0]?.matchInfo).toEqual({
      missingCount: 1,
      totalIngredients: 2,
      missingNames: ['Eggs'],
    });
  });
});
