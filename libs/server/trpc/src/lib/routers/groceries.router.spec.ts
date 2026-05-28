import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  IngredientCategorySchema,
  MeasureUnitSchema,
  type AuthSession,
} from '@kookio/prisma-client';

import type { Context, GroceriesBoughtStore } from '../context';
import { appRouter } from './index';

const Unit = MeasureUnitSchema.enum;
const Category = IngredientCategorySchema.enum;

const USER_ID = 'user-123';
const RECIPE_ID = '11111111-1111-4111-8111-111111111111';
const ING_TOMATO = '44444444-4444-4444-8444-444444444444';
const ING_FLOUR = '55555555-5555-4555-8555-555555555555';
const ING_OIL = '66666666-6666-4666-8666-666666666666';
const PANTRY_ID_TOMATO = '77777777-7777-4777-8777-777777777777';

type SlotRow = { recipeId: string | null; servings: number };
type PantryRow = {
  id: string;
  ingredientCatalogId: string;
  quantity: number;
  unit: ReturnType<typeof MeasureUnitSchema.parse>;
};

type TxMock = {
  mealSlot: { findMany: ReturnType<typeof vi.fn> };
  pantryItem: {
    findMany: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
  };
  recipe: { findMany: ReturnType<typeof vi.fn> };
};

type PrismaMock = TxMock & {
  $transaction: ReturnType<typeof vi.fn>;
};

const makeTxMock = (): TxMock => ({
  mealSlot: { findMany: vi.fn() },
  pantryItem: {
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
  recipe: { findMany: vi.fn() },
});

const makePrismaMock = (tx?: TxMock): PrismaMock => {
  const inner = tx ?? makeTxMock();
  return {
    ...inner,
    $transaction: vi.fn((fn: (innerTx: TxMock) => Promise<unknown>) =>
      fn(inner),
    ),
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

const makeBoughtStore = (
  state: Map<string, string[]> = new Map(),
  overrides: Partial<GroceriesBoughtStore> = {},
): GroceriesBoughtStore => ({
  get: async (uid) => state.get(uid) ?? [],
  set: async (uid, ids) => {
    if (ids.length === 0) state.delete(uid);
    else state.set(uid, [...ids]);
  },
  ...overrides,
});

const makeCtx = (
  session: AuthSession | null,
  prismaMock: PrismaMock,
  bought: GroceriesBoughtStore,
): Context =>
  ({
    token: session ? 'fake-token' : undefined,
    session,
    prisma: prismaMock,
    groceriesBought: bought,
    mealPlanDraft: {
      get: vi.fn(),
      set: vi.fn(),
      clear: vi.fn(),
    },
  }) as unknown as Context;

const slot = (recipeId: string, servings = 2): SlotRow => ({
  recipeId,
  servings,
});

const recipeWithIngredients = (
  ingredients: Array<{
    id: string;
    name: string;
    qty: number | null;
    unit: ReturnType<typeof MeasureUnitSchema.parse> | null;
    pieceGrams?: number | null;
  }>,
  servings = 2,
) => ({
  id: RECIPE_ID,
  servings,
  ingredients: ingredients.map((i) => ({
    quantity: i.qty,
    unit: i.unit,
    ingredient: {
      id: i.id,
      name: i.name,
      imageUrl: null,
      category: Category.PRODUCE,
      pieceGrams: i.pieceGrams ?? null,
    },
  })),
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('groceries router', () => {
  describe('addBoughtToPantry', () => {
    it('returns zeros when the bought set is empty', async () => {
      const tx = makeTxMock();
      const prismaMock = makePrismaMock(tx);
      const bought = makeBoughtStore();
      const caller = appRouter.createCaller(
        makeCtx(makeSession(), prismaMock, bought),
      );

      const result = await caller.groceries.addBoughtToPantry();

      expect(result).toEqual({ added: 0, merged: 0, skipped: 0 });
      // No transaction when there's nothing to move.
      expect(prismaMock.$transaction).not.toHaveBeenCalled();
    });

    it('creates pantry rows for bought items that are not in the pantry', async () => {
      const tx = makeTxMock();
      tx.mealSlot.findMany.mockResolvedValue([slot(RECIPE_ID, 2)]);
      tx.pantryItem.findMany.mockResolvedValue([]);
      tx.recipe.findMany.mockResolvedValue([
        recipeWithIngredients([
          { id: ING_TOMATO, name: 'Tomato', qty: 300, unit: Unit.G },
          { id: ING_FLOUR, name: 'Flour', qty: 500, unit: Unit.G },
        ]),
      ]);
      const prismaMock = makePrismaMock(tx);
      const boughtState = new Map([[USER_ID, [ING_TOMATO, ING_FLOUR]]]);
      const bought = makeBoughtStore(boughtState);

      const caller = appRouter.createCaller(
        makeCtx(makeSession(), prismaMock, bought),
      );

      const result = await caller.groceries.addBoughtToPantry();

      expect(result).toEqual({ added: 2, merged: 0, skipped: 0 });
      expect(tx.pantryItem.create).toHaveBeenCalledTimes(2);
      expect(tx.pantryItem.create).toHaveBeenCalledWith({
        data: {
          userId: USER_ID,
          ingredientCatalogId: ING_TOMATO,
          quantity: 300,
          unit: Unit.G,
          expiresAt: null,
        },
      });
      // Bought set fully cleared after the move.
      expect(boughtState.get(USER_ID)).toBeUndefined();
    });

    it('skips bought items with null quantity or null unit', async () => {
      const tx = makeTxMock();
      tx.mealSlot.findMany.mockResolvedValue([slot(RECIPE_ID, 2)]);
      tx.pantryItem.findMany.mockResolvedValue([]);
      tx.recipe.findMany.mockResolvedValue([
        recipeWithIngredients([
          { id: ING_TOMATO, name: 'Tomato', qty: null, unit: Unit.G },
          { id: ING_FLOUR, name: 'Flour', qty: 100, unit: null },
        ]),
      ]);
      const prismaMock = makePrismaMock(tx);
      const boughtState = new Map([[USER_ID, [ING_TOMATO, ING_FLOUR]]]);
      const bought = makeBoughtStore(boughtState);

      const caller = appRouter.createCaller(
        makeCtx(makeSession(), prismaMock, bought),
      );

      const result = await caller.groceries.addBoughtToPantry();

      expect(result).toEqual({ added: 0, merged: 0, skipped: 2 });
      expect(tx.pantryItem.create).not.toHaveBeenCalled();
      // Skipped items stay on the bought list — the user can fix the recipe
      // data and try again.
      expect(boughtState.get(USER_ID)).toEqual([ING_TOMATO, ING_FLOUR]);
    });

    it('silently drops bought ids that are no longer derived (stale)', async () => {
      const tx = makeTxMock();
      // Empty plan → derived list is empty.
      tx.mealSlot.findMany.mockResolvedValue([]);
      tx.pantryItem.findMany.mockResolvedValue([]);
      tx.recipe.findMany.mockResolvedValue([]);
      const prismaMock = makePrismaMock(tx);
      const boughtState = new Map([[USER_ID, [ING_TOMATO]]]);
      const bought = makeBoughtStore(boughtState);

      const caller = appRouter.createCaller(
        makeCtx(makeSession(), prismaMock, bought),
      );

      const result = await caller.groceries.addBoughtToPantry();

      // Stale ids are not counted as `skipped` — `skipped` is for items
      // that were derived but unmovable.
      expect(result).toEqual({ added: 0, merged: 0, skipped: 0 });
      expect(tx.pantryItem.create).not.toHaveBeenCalled();
      expect(boughtState.get(USER_ID)).toBeUndefined();
    });

    it('treats an item already in the pantry as stale (drops from bought, not skipped)', async () => {
      // Same single fetch feeds both `deriveGroceries`' pantry-exclusion
      // set and the in-tx pantry map, so an ingredient present in the
      // pantry is excluded from the derived list entirely. The mutation
      // sees it as "bought but not derived" → drop from the bought set
      // silently, count nowhere. The actual merge branch only fires under
      // a true cross-tx race that this unit test cannot reproduce without
      // breaking the abstraction; it's exercised at the integration layer.
      const tx = makeTxMock();
      tx.mealSlot.findMany.mockResolvedValue([slot(RECIPE_ID, 2)]);
      tx.pantryItem.findMany.mockResolvedValue([
        {
          id: PANTRY_ID_TOMATO,
          ingredientCatalogId: ING_TOMATO,
          quantity: 100,
          unit: Unit.G,
          ingredient: { pieceGrams: null },
        },
      ]);
      tx.recipe.findMany.mockResolvedValue([
        recipeWithIngredients([
          { id: ING_TOMATO, name: 'Tomato', qty: 300, unit: Unit.G },
        ]),
      ]);
      const prismaMock = makePrismaMock(tx);
      const boughtState = new Map([[USER_ID, [ING_TOMATO]]]);
      const bought = makeBoughtStore(boughtState);

      const caller = appRouter.createCaller(
        makeCtx(makeSession(), prismaMock, bought),
      );

      const result = await caller.groceries.addBoughtToPantry();

      expect(result).toEqual({ added: 0, merged: 0, skipped: 0 });
      expect(tx.pantryItem.create).not.toHaveBeenCalled();
      expect(tx.pantryItem.update).not.toHaveBeenCalled();
      expect(boughtState.get(USER_ID)).toBeUndefined();
    });

    it('throws INTERNAL_SERVER_ERROR when the bought-state read fails', async () => {
      const tx = makeTxMock();
      const prismaMock = makePrismaMock(tx);
      const bought = makeBoughtStore(new Map(), {
        get: async () => {
          throw new Error('redis down');
        },
      });

      const caller = appRouter.createCaller(
        makeCtx(makeSession(), prismaMock, bought),
      );

      await expect(caller.groceries.addBoughtToPantry()).rejects.toThrow(
        /try again/i,
      );
      expect(prismaMock.$transaction).not.toHaveBeenCalled();
    });

    it('still resolves when clearing the bought-state fails (best-effort)', async () => {
      const tx = makeTxMock();
      tx.mealSlot.findMany.mockResolvedValue([slot(RECIPE_ID, 2)]);
      tx.pantryItem.findMany.mockResolvedValue([]);
      tx.recipe.findMany.mockResolvedValue([
        recipeWithIngredients([
          { id: ING_OIL, name: 'Oil', qty: 200, unit: Unit.ML },
        ]),
      ]);
      const prismaMock = makePrismaMock(tx);
      const boughtState = new Map([[USER_ID, [ING_OIL]]]);
      const bought = makeBoughtStore(boughtState, {
        set: async () => {
          throw new Error('redis down');
        },
      });

      const caller = appRouter.createCaller(
        makeCtx(makeSession(), prismaMock, bought),
      );

      const result = await caller.groceries.addBoughtToPantry();

      // Pantry write succeeded; clearing bought failed silently. The next
      // list/stats call filters bought ids against derived, so the moved
      // item disappears from the UI on reload anyway.
      expect(result).toEqual({ added: 1, merged: 0, skipped: 0 });
      expect(tx.pantryItem.create).toHaveBeenCalledTimes(1);
    });
  });
});
