// context.ts
import { prisma } from '@kookio/prisma-client/server';
import type { AuthSession, MealSlotType } from '@kookio/prisma-client';

/**
 * Per-user "bought" markers for the derived groceries list.
 *
 * The list itself is recomputed from plan-minus-pantry on every read, but
 * the bought-state is ephemeral cross-device preference: it survives
 * refresh and follows the user from desktop to phone, but expires after a
 * shopping week. Backed by Redis in production; the lib exposes only the
 * interface so the trpc router stays infrastructure-agnostic.
 */
export type GroceriesBoughtStore = {
  get(userId: string): Promise<readonly string[]>;
  set(userId: string, ids: readonly string[]): Promise<void>;
};

/**
 * Per-user persisted draft of the meal-plan editor. Sits alongside the
 * client-side localStorage write — Redis owns cross-device sync (start
 * planning on desktop, finish on phone), localStorage owns offline +
 * zero-latency-write. The trpc lib only sees the interface; concrete
 * Redis-backed impl is wired from the app at request-handler bootstrap.
 *
 * Server treats the slots payload as opaque JSON — validation lives at
 * the procedure boundary (zod) so the storage layer doesn't need to
 * know the slot shape.
 */
export type MealPlanDraftRecord = {
  // Mutable Array (not ReadonlyArray) so the zod-inferred input type
  // from the router's `setDraft` schema assigns into this shape
  // without a structural-readonly mismatch. The storage layer is a
  // JSON pass-through anyway — no readonly invariant to enforce.
  slots: Array<{
    date: string;
    slotType: MealSlotType;
    recipeId: string;
    servings: number;
    // Optional + opaque on the storage layer — the router's zod schema
    // is `z.unknown().nullable()`, which TypeScript infers as
    // `recipe?: unknown` (the `null` collapses into `unknown`).
    // The client side defines the concrete RecipeFeedItem shape; the
    // server only persists it as a JSON pass-through.
    recipe?: unknown;
  }>;
  savedAt: number;
};

export type MealPlanDraftStore = {
  get(userId: string): Promise<MealPlanDraftRecord | null>;
  set(userId: string, payload: MealPlanDraftRecord): Promise<void>;
  clear(userId: string): Promise<void>;
};

export type Context = {
  token?: string;
  session: AuthSession | null;
  prisma: typeof prisma;
  groceriesBought: GroceriesBoughtStore;
  mealPlanDraft: MealPlanDraftStore;
};

// Adapter hook (set from a real adapter later)
export type SessionAdapter = (token?: string) => Promise<AuthSession | null>;
let resolveSession: SessionAdapter = async () => null;
export const setSessionResolver = (fn: SessionAdapter) => {
  resolveSession = fn;
};

// In-memory fallback used in tests and any environment where Redis isn't
// wired. Per-process, lost on restart — fine for a non-persistence-critical
// preference. Production wiring overrides this via setGroceriesBoughtStore.
const memoryGroceriesBought = (() => {
  const store = new Map<string, readonly string[]>();
  return {
    get: async (userId: string) => store.get(userId) ?? [],
    set: async (userId: string, ids: readonly string[]) => {
      if (ids.length === 0) store.delete(userId);
      else store.set(userId, ids);
    },
  } satisfies GroceriesBoughtStore;
})();

let groceriesBoughtStore: GroceriesBoughtStore = memoryGroceriesBought;
export const setGroceriesBoughtStore = (s: GroceriesBoughtStore) => {
  groceriesBoughtStore = s;
};

// Same in-memory pattern as `groceriesBought` — per-process, lost on
// restart. Tests inject this directly via the default; production wires
// the Redis-backed impl at handler bootstrap.
const memoryMealPlanDraft = (() => {
  const store = new Map<string, MealPlanDraftRecord>();
  return {
    get: async (userId: string) => store.get(userId) ?? null,
    set: async (userId: string, payload: MealPlanDraftRecord) => {
      store.set(userId, payload);
    },
    clear: async (userId: string) => {
      store.delete(userId);
    },
  } satisfies MealPlanDraftStore;
})();

let mealPlanDraftStore: MealPlanDraftStore = memoryMealPlanDraft;
export const setMealPlanDraftStore = (s: MealPlanDraftStore) => {
  mealPlanDraftStore = s;
};

type HeaderValue = string | string[] | undefined;
type HeaderMap =
  | { get?: (name: string) => string | null }
  | Record<string, HeaderValue>;
type ContextOptions = {
  req?: { headers?: HeaderMap };
  node?: { req?: { headers?: Record<string, HeaderValue> } };
};

type HeadersWithGet = { get: (name: string) => string | null };

const hasGet = (h: HeaderMap): h is HeadersWithGet =>
  typeof (h as Record<string, unknown>)['get'] === 'function';

const getHeaderValue = (headers: HeaderMap | undefined, name: string) => {
  if (!headers) return undefined;
  if (hasGet(headers)) return headers.get(name) ?? undefined;
  const v = (headers as Record<string, HeaderValue>)[name];
  return Array.isArray(v) ? v[0] : v;
};

export const createContext = async (opts: ContextOptions): Promise<Context> => {
  const headers = opts.node?.req?.headers ?? opts?.req?.headers;
  const tokenHeader = getHeaderValue(headers, 'authorization');
  const token = tokenHeader?.replace(/^Bearer\s+/i, '');
  const session = await resolveSession(token);

  return {
    token,
    session,
    prisma,
    groceriesBought: groceriesBoughtStore,
    mealPlanDraft: mealPlanDraftStore,
  };
};
