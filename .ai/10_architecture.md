# Architecture Guidelines

> **Status: Active (partial)** — AnalogJS file-based routing under `apps/web/src/app/pages/` with `*.page.ts` is in use; tRPC handler at `apps/web/src/server/routes/api/trpc/[trpc].ts` and h3 routes (`health.get.ts`, `internal/bench-db.get.ts`) are live. **Diverges** from the described layout: actual lib tree is `libs/{core,feature,prisma,server,shared}` with sub-areas `core/{config,logging,security}`, `feature/{auth,shell}`, `server/{auth,logger,trpc}`, `shared/{mock,ui,utility}` — there is no `libs/shared/{ui,data-access,util,types}` split, no `libs/shared/types/`, and no `data-access` libs. Server-side data fetching via `injectLoad()` / `*.server.ts` is **future direction** (no `*.server.ts` page loaders exist yet).

## Stack

- **Framework:** AnalogJS (meta-framework on top of Angular v20+)
- **Monorepo:** NX
- **Deployment:** Vercel (Production: `main`, Preview E2E: `test`, Preview Dev: `dev`)

## Project Structure (NX + AnalogJS)

apps/
└── app-name/
└── src/
├── app/
│ ├── pages/ ← filesystem-based routing (AnalogJS)
│ ├── components/ ← shared presentational components
│ ├── layout/ ← shell, header, sidebar, footer
│ └── app.config.ts
├── server/
│ └── routes/
│ └── api/ ← API routes (h3/Nitro)
├── styles/ ← global SCSS (see SCSS guidelines)
└── environments/
libs/
└── shared/ ← shared libs across NX apps
├── ui/ ← reusable UI components
├── data-access/ ← services, stores, API clients
├── util/ ← pure functions, helpers, pipes
└── types/ ← shared TypeScript interfaces/types

## Filesystem-based Routing (AnalogJS)

Only files ending in `.page.ts` are collected as routes. All route components
must be the **default export** and are **lazy-loaded** automatically.

### Route File Conventions

| File                             | Route             | Notes                          |
| -------------------------------- | ----------------- | ------------------------------ |
| `(home).page.ts`                 | `/`               | Index route                    |
| `about.page.ts`                  | `/about`          | Static route                   |
| `about/team.page.ts`             | `/about/team`     | Nested static route            |
| `about.team.page.ts`             | `/about/team`     | Dot notation alternative       |
| `[productId].page.ts`            | `/:productId`     | Dynamic route                  |
| `[...not-found].page.ts`         | `**`              | Catch-all / 404                |
| `products.page.ts` + `products/` | layout + children | Layout route                   |
| `(auth).page.ts` + `(auth)/`     | pathless layout   | Route group with shared layout |

### All-numeric filenames silently fall through to the catch-all

A `*.page.ts` whose stem is entirely digits (e.g. `500.page.ts`) is
discovered by `provideFileRouter()` and appears in the transformed
`ANALOG_ROUTE_FILES` map, but Angular Router empirically fails to match
the corresponding URL — the request falls through to the
`[...not-found]` catch-all.

`toRawPath` + `toSegment` (in
`node_modules/@analogjs/router/fesm2022/analogjs-router.mjs`) produce a
literal `'500'` segment and the priority sort places it ahead of `**`,
so by the algorithm it should match. It doesn't. The issue is scoped to
all-numeric stems; ordinary letter-containing slugs (`/about`,
`/login`) work fine.

**How to apply**: don't use digit-only filenames for page routes. The
Next.js convention `pages/500.js` → `/500` is not a working pattern
under AnalogJS. Use a letter-containing slug instead, e.g.
`server-error.page.ts` → `/server-error`. The kookio 500 page lives at
`apps/web/src/app/pages/server-error.page.ts` for this reason.

### Route Groups

- Wrap folder names in parentheses to group routes without adding a path segment:

pages/
└── (auth)/
├── login.page.ts → /login
└── signup.page.ts → /signup

### Layout Routes

- A parent `.page.ts` file paired with a same-name folder defines a shared layout:

pages/
├── products.page.ts ← layout with <router-outlet>
└── products/
├── (products-list).page.ts → /products
└── [productId].page.ts → /products/:productId

- Always include `<router-outlet>` in layout page components

### Server-side Data Fetching

- Colocate `.server.ts` files alongside `.page.ts` files:

pages/
├── index.page.ts
└── index.server.ts ← async load() function

- Use `injectLoad()` in the page component to access server data:

```typescript
export default class IndexPage {
  data = toSignal(injectLoad<typeof load>(), { requireSync: true });
}
```

- Use `toSignal()` with `requireSync: true` — load is resolved before component instantiation

## API Routes (Nitro/h3)

- Define API routes in `src/server/routes/api/`
- Routes are filesystem-based, exposed under `/api` prefix
- Suffix filenames with HTTP method: `.get.ts`, `.post.ts`, `.put.ts`, `.delete.ts`
- Use `defineEventHandler` for all handlers:

```typescript
// src/server/routes/api/v1/users.get.ts
import { defineEventHandler } from 'h3';

export default defineEventHandler(async () => {
  return { users: [] };
});
```

- Use `createError()` for error responses — never throw raw errors
- Use `getQuery()`, `readBody()`, `getRouterParam()` from h3 for input parsing
- Always version API routes under `v1/`, `v2/` etc.

## Data Flow

Page Component
↓ injectLoad()
Server Load (.server.ts)
↓ HttpClient / fetch
API Route (Nitro/h3)
↓
External API / Database
Page Component
↓ inject(Store)
NgRx Signal Store (data-access lib)
↓ rxMethod / HttpClient
API Route or External API

## Naming Conventions

| Artifact            | Convention             | Example                  |
| ------------------- | ---------------------- | ------------------------ |
| Page component file | `<n>.page.ts`          | `users.page.ts`          |
| Server load file    | `<n>.server.ts`        | `users.server.ts`        |
| API route file      | `<n>.<method>.ts`      | `users.get.ts`           |
| Store               | `<feature>.store.ts`   | `users.store.ts`         |
| Service             | `<feature>.service.ts` | `users.service.ts`       |
| Component           | `<n>.component.ts`     | `user-card.component.ts` |
| NX lib              | `<scope>-<type>-<n>`   | `shared-ui-button`       |

## Page-level concerns belong at the page level

When a UI region is _about the whole page_ (sticky save/cancel
footers, unsaved-changes banners, page-level keyboard shortcuts,
toolbar actions that apply across page sections), it lives directly
under the page component as a **sibling** to the page's primary
content component — not nested inside that component for proximity.

The cost of nesting is silent: visual properties of the inner
component (especially `max-width`, `padding`, `overflow`) cap the
nested concern, even though semantically the concern belongs to the
outer page. The bug surfaces as "the sticky footer's border doesn't
reach the screen edges" or "my full-width banner is mysteriously
indented" — both fixable by lifting the concern up one level to
where it belongs.

Concrete instance: `PlanCalendarComponent` originally owned the
"Clear all / Save plan" footer for proximity. The calendar had
`max-width: 1200px`, so the footer's `border-top` only spanned 1200px
even though it should have stretched edge-to-edge on the page.
Lifting the footer to `<kookio-plan-footer />` as a sibling of
`<kookio-plan-calendar />` under `plan.page.ts` gave the footer the
page's full width, while the inner action buttons stay centered to
their own 1200px column for horizontal alignment with the calendar.

**Rule of thumb:** if the answer to "does this concern _also_ apply
when the user is looking at a _different part_ of the inner
component?" is yes, lift it to the page.

### Sibling collaboration: shared singleton store, not Input/Output drilling

Once page-level concerns sit as siblings under the page, both
components communicate by **injecting the same singleton store**
(`providedIn: 'root'`) — no Inputs piped from a parent, no Outputs
emitted upward.

```typescript
// plan-calendar.component.ts
protected readonly store = inject(PlanStore);
// reads store.slotsByKey, writes via store.setSlot / store.clearSlot

// plan-footer.component.ts
protected readonly store = inject(PlanStore);
// reads store.plannedCount + store.isDirty + store.isSubmitting,
// writes via store.submit / store.clearAll
```

When the user drops a recipe on a calendar cell, the calendar calls
`store.setSlot(...)`. The footer's `isDirty` signal recomputes via the
store's `withComputed`, and the Save button automatically becomes
enabled. The two components never reference each other.

This is the **canonical Angular pattern for sibling collaboration**.
React's idiom is the opposite — lift state up to the common parent
and drill props down as Inputs to children. Both work, but Angular's
DI-driven singleton-store pattern avoids the prop-drilling and
parent-recomputation costs that React mitigates with `useContext` /
`useReducer` / Zustand. Don't mix the two: if you find yourself
adding an `@Input()` between siblings to pass through a value that
already lives in a `providedIn: 'root'` store, the store is the
correct path — the Input is React habit leaking in.

### When a parent-owned signal _is_ correct

The singleton-store pattern is right for **app-domain state** —
data the store already owns (slots, pantry items, user session, etc.).
For **pure UI state** that's scoped to a single page (e.g., "which
day-tab is selected on mobile", "is the recipe picker sheet
currently open"), keep it as a `signal()` inside the component
that owns the interaction. Hoisting transient UI state into a
root-level store inflates the store's surface area for no benefit;
the component is the natural scope.

The split: store owns _what exists_, components own _what's being
shown_.

## General Rules

- All route components are default exports — never named exports
- Never import `.server.ts` files in client code — AnalogJS tree-shakes them automatically
- Use `HttpClient` with `requestContextInterceptor` for all internal API calls
- Use `withComponentInputBinding()` in `provideFileRouter()` to access route params as inputs
- Use `withDebugRoutes()` in development to inspect the route tree at `/__analog/routes`
- Keep API routes thin — delegate business logic to services in `data-access` libs
- Use `TransferState` automatically via AnalogJS — do not duplicate SSR requests
- Page-level concerns (sticky footers, banners, toolbars) live as siblings of
  the page's primary content component, not nested inside it — see
  "Page-level concerns belong at the page level" above
- Sibling components share state via a singleton store
  (`providedIn: 'root'`), not via Input/Output piped through a parent —
  see "Sibling collaboration" above
