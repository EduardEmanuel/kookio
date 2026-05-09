# tRPC Guidelines

> **Status: Active (partial)** — tRPC v10 is wired up via `@analogjs/trpc`; routers live in `libs/server/trpc/src/lib/routers/` (auth, profile, user, webauthn, features) and the handler is at `apps/web/src/server/routes/api/trpc/[trpc].ts`. **Diverges** from the documented `src/server/trpc/` layout (routers are in a shared lib, not under the app). Subscriptions are **future direction** — no `subscription(...)` exists in any router today.

## Version & Integration

- tRPC v10 via `@analogjs/trpc`
- Used alongside h3 API routes — tRPC for typed client-server communication,
  h3 API routes for endpoints that don't require type-safe client bindings
  (webhooks, RSS, OG images, public REST endpoints)
- Zod for all input validation on procedures
- SuperJSON as transformer for serialization (dates, Maps, Sets etc.)

## When to Use tRPC vs h3 API Routes

| Use tRPC                                  | Use h3 API Routes                               |
| ----------------------------------------- | ----------------------------------------------- |
| Client → server calls needing type safety | Webhooks from external services                 |
| Authenticated user actions                | RSS feeds, sitemaps                             |
| CRUD operations on domain entities        | OG image generation                             |
| Real-time subscriptions                   | Public REST endpoints consumed by third parties |

## File Structure

src/
└── server/
└── trpc/
├── context.ts ← request context (auth, db, etc.)
├── trpc.ts ← router/procedure factory
├── root.ts ← root router (merges all sub-routers)
└── routers/
├── users.router.ts
├── posts.router.ts
└── ...

## Setup

### Context

- Define context with all shared dependencies injected per request:

```typescript
// src/server/trpc/context.ts
import { inferAsyncReturnType } from '@trpc/server';
import { H3Event } from 'h3';

export async function createContext(event: H3Event) {
  // Add auth, db, logger etc. here
  return {
    event,
    // user: await getAuthUser(event),
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
```

### Procedure Factory

- Define base procedures with shared middleware:

```typescript
// src/server/trpc/trpc.ts
import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { Context } from './context';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({ ctx: { ...ctx, user: ctx.user } });
});
```

### Procedure builder convention

The project ships four procedure builders. Routers MUST import the right
builder rather than composing `procedure.use(<middleware>)` inline at the
call site — same auth guarantee, but a single grep tells a reviewer at a
glance which endpoints are public, authenticated, onboarded, or role-gated.

| Builder                                   | Use case                                                                                                                                                                                                                           |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `publicProcedure` (alias for `procedure`) | Genuinely public surface — content discovery, public registration step (`auth.register`), unauthenticated reads (`recipes.feed`, `recipes.byId`).                                                                                  |
| `protectedProcedure`                      | Auth required, but pre-onboarding access is intentional — `auth.me`, `profile.*`, `onboarding.*`, `onboarding-catalogs.*`.                                                                                                         |
| `onboardedProcedure`                      | Auth + `onboardingDone === true`. Use for any router that touches data which only starts to exist after onboarding (`pantry.*`, `cookingSession.*`, `recipes.match`, future `mealPlan.*`, `shoppingList.*`, `recipeCollection.*`). |
| `roleProcedure([...roles])`               | Auth + at least one of the listed roles. Reserve for admin / staff endpoints.                                                                                                                                                      |

**Decision rule**: if the endpoint reads or writes user-scoped data that
the schema only allows after onboarding (PantryItem, CookingSession,
MealPlan, …), it MUST use `onboardedProcedure`.

**Two carve-outs from that rule** — these stay on `protectedProcedure`
even though the user is authenticated:

- `onboarding.*` and `onboarding-catalogs.*` are called _during_ the
  onboarding flow itself. Gating them on `onboardingDone` would deadlock
  the user — they cannot finish onboarding without already having
  finished it. Annotate the router with an inline `NOTE` comment so the
  reason survives future audits.
- `profile.counts` is called pre-onboarding too (it powers
  `AuthStore.hasProfileSignals`, which loads on every login). It returns
  zeros for users without a profile row — a valid response, not an error
  state.

When you add a new authenticated router, default to `onboardedProcedure`
and only fall back to `protectedProcedure` if you can articulate a
specific reason a non-onboarded user must be able to call it.

### Root Router

- Merge all sub-routers in `root.ts`:

```typescript
// src/server/trpc/root.ts
import { router } from './trpc';
import { usersRouter } from './routers/users.router';
import { postsRouter } from './routers/posts.router';

export const appRouter = router({
  users: usersRouter,
  posts: postsRouter,
});

export type AppRouter = typeof appRouter;
```

## Routers

### Structure

- One router file per domain entity
- Export `AppRouter` type from `root.ts` — import it in client code for type inference
- Keep routers focused on a single domain — never cross domains within a router:

```typescript
// src/server/trpc/routers/users.router.ts
import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';

export const usersRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return []; // fetch from db
  }),

  getById: publicProcedure.input(z.object({ id: z.string().uuid() })).query(async ({ ctx, input }) => {
    return null; // fetch by input.id
  }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return null; // create user
    }),

  delete: protectedProcedure.input(z.object({ id: z.string().uuid() })).mutation(async ({ ctx, input }) => {
    return { success: true };
  }),
});
```

## Subscriptions

- Use subscriptions for real-time updates — powered by Nitro WebSockets:

```typescript
  onActivity: publicProcedure
    .input(z.object({ userId: z.string().uuid() }))
    .subscription(async function* ({ input, ctx }) {
      // yield events as they occur
      while (true) {
        const event = await waitForEvent(input.userId);
        yield event;
      }
    }),
```

- Only use subscriptions where real-time is genuinely required —
  prefer polling or server-sent events for simpler use cases

## Input Validation

- Always use Zod for input validation on every procedure that accepts input
- Prefer specific Zod schemas over generic ones:

```typescript
// ✅ correct — specific and descriptive
z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  role: z.enum(['admin', 'user', 'guest']),
});

// ❌ avoid — too permissive
z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
});
```

- Reuse Zod schemas generated by `prisma-zod-generator` where applicable —
  do not duplicate schema definitions manually

## Client Usage (Angular + AnalogJS)

- Inject tRPC client via `injectTrpcClient()` from `@analogjs/trpc`:

```typescript
import { injectTrpcClient } from '@analogjs/trpc/client';
import { toSignal } from '@angular/core/rxjs-interop';

export default class UsersPage {
  private readonly trpc = injectTrpcClient();

  readonly users = toSignal(this.trpc.users.getAll.query(), { initialValue: [] });
}
```

- Convert tRPC observables to signals with `toSignal()` — do not subscribe manually
- Use `injectLoad()` for server-side data fetching instead of tRPC queries
  when data is needed at page load time (SSR/SSG)

### Procedures return Observables — never `await` a procedure call directly

`@analogjs/trpc`'s `createTrpcClient` wraps every procedure to return an
**RxJS Observable**, not a `Promise`. The injection-token interfaces in
this codebase (`PantryTrpcClient`, `RecipesTrpcClient`,
`MealPlanTrpcClient`, …) all declare `Promise<TOutput>` for ergonomics —
that is a deliberate type-only fiction so consumers can choose between
`from(...).pipe(...)` and `await firstValueFrom(...)`. **The runtime
return value is always an Observable.**

**The trap.** Because `Observable` does not implement `.then`, awaiting
a bare procedure call resolves to the Observable instance itself,
_not_ the unwrapped data:

```typescript
// ❌ subtly wrong — resolves to the Observable, not the page data
const page = await this.trpc.recipes.feed.query({ limit: 20 });
this.items.update((prev) => [...prev, ...page.items]);
//                                    ^^^^^^^^^^^^^ TypeError: page.items is not iterable
```

`page.items` is `undefined` (Observable instances do not have an
`items` property), and V8 reports the spread failure as
`page.items is not iterable`. TypeScript does not catch this because
the interface said `Promise<RecipeFeedPage>`.

**The fix — pick one.** Both are battle-tested in this repo:

```typescript
// ✅ stream-style: matches PantryStore, RecipesFeedComponent
return from(this.trpc.recipes.feed.query({ limit: 20 })).pipe(
  tap((page) => this.items.update((prev) => [...prev, ...page.items])),
  catchError(...),
);

// ✅ imperative-style: when you need a single value inside an async
//   handler (bottom sheet's `loadPage`, a one-shot button click, etc.)
const page = await firstValueFrom(
  from(this.trpc.recipes.feed.query({ limit: 20 })),
);
this.items.update((prev) => [...prev, ...page.items]);
```

The redundant `from(...)` around an already-Observable call is
deliberate: it makes the snippet robust if `@analogjs/trpc` ever
switches the return type back to `Promise` (or if you swap
`MEAL_PLAN_TRPC` for a hand-rolled mock that returns a Promise from a
spec). `from(observable)` is a no-op; `from(promise)` upgrades. Keep
the wrapper.

**Why we don't change the interface declarations** to
`Observable<T>`. Two reasons: (1) the trpc client object's actual TS
type from `createTrpcClient<AppRouter>` is opaque enough that aligning
our local interfaces with it would require importing it, undoing the
isolation that `*_TRPC` injection tokens provide; (2) declaring
`Promise<T>` keeps the door open for the imperative `await firstValueFrom(...)`
shape inside async event handlers, which reads more naturally than
chaining a one-shot `.subscribe(...)`. The lie is small, the warning
above is the cost of carrying it.

**How to apply.** Whenever you write or review a consumer of any
`*_TRPC` token:

- If the call participates in an Observable pipeline (`PlanStore.load`,
  `PantryStore.add`, anything inside `rxMethod(...)`), wrap with
  `from(...)` and continue with `.pipe(...)`. Never call
  `.subscribe()` directly inside a component — let `toSignal()` or
  `rxMethod()` own the subscription.
- If the call sits inside an `async` event handler and you need a
  single value, write
  `await firstValueFrom(from(this.trpc.x.y.query(...)))`. Do **not**
  drop the `from(...)` even though it looks redundant — see the
  robustness note above.
- A bare `await this.trpc.x.y.query(...)` is always wrong. Reject it
  in review. Errors at runtime as `<expr> is not iterable` (for
  feeds), `Cannot read properties of undefined` (for getters), or
  silently writes the Observable instance into a signal (worst case —
  no error, just dead UI).

### `authAwareFetch` — custom fetch wrapper, with SSR caveat

`apps/web/src/trpc-client.ts` registers a custom `authAwareFetch` for the
tRPC client instead of relying on `@analogjs/trpc`'s built-in fetch. The
wrapper adds two behaviours the library does not expose:

1. Proactive Firebase ID-token refresh when it expires in under 5 minutes.
2. Automatic retry on a `401` response with a freshly minted token.

By replacing the fetch entirely we also took ownership of one piece of
plumbing the library handles internally: **resolving relative URLs in the
SSR context**. Node has no implicit base URL for `fetch('/api/...')`, so
the library's internal `customFetch` rewrites them to absolute. That
helper is **not exported**, so composition (`authAwareFetch` →
`customFetch` → `fetch`) is not possible — `authAwareFetch` has its own
`resolveUrl`:

```typescript
const resolveUrl = (url: string): string => {
  if (typeof window !== 'undefined') return url; // browser: no-op
  const host = process.env['NITRO_HOST'] ?? 'localhost';
  const port = process.env['NITRO_PORT'] ?? '4205';
  return /^https?:/.test(url) ? url : `http://${host}:${port}${url}`;
};
```

**Why:** without `resolveUrl`, every server-side tRPC call (loader,
SSR-rendered page, any `injectLoad`) would throw `TypeError: Failed to
parse URL` at the first hit.

**How to apply:**

- Do not refactor `authAwareFetch` to delegate to `@analogjs/trpc`'s
  fetch — `customFetch` is still not exported as of the version pinned
  in `package.json`. The day it lands as a public export, replace the
  body of `authAwareFetch` with a wrapper around it and delete
  `resolveUrl`. Until then, watch for `@analogjs/trpc` upgrades that
  change SSR URL handling and mirror the change in `resolveUrl`.
- If you change the dev Nitro port, update the `NITRO_PORT` fallback
  alongside the `vite.config.ts` change — the wrapper has no way to
  introspect the dev-server's actual port.

## Error Handling

- Always throw `TRPCError` with the appropriate code — never throw raw errors:

```typescript
import { TRPCError } from '@trpc/server';

throw new TRPCError({
  code: 'NOT_FOUND',
  message: 'User not found',
});
```

- Standard error codes: `BAD_REQUEST`, `UNAUTHORIZED`, `FORBIDDEN`,
  `NOT_FOUND`, `CONFLICT`, `INTERNAL_SERVER_ERROR`
- Handle tRPC errors on the client via the observable's error callback or
  Angular error handling — never swallow errors silently

## General Rules

- Export `AppRouter` type only — never expose server implementation to the client
- Use the right procedure builder for the auth surface — `protectedProcedure`,
  `onboardedProcedure`, or `roleProcedure([...])` from
  `libs/server/trpc/src/lib/middlewares/auth.ts`. Never compose
  `procedure.use(<middleware>)` inline in a router, and never check auth
  manually inside a procedure handler. See "Procedure builder convention"
  above for the decision matrix.
- Keep procedure handlers thin — delegate business logic to services
- Never use tRPC for file uploads — use h3 API routes with multipart handling instead
- Use SuperJSON transformer consistently — never serialize dates or complex
  types manually
