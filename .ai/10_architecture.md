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

## General Rules

- All route components are default exports — never named exports
- Never import `.server.ts` files in client code — AnalogJS tree-shakes them automatically
- Use `HttpClient` with `requestContextInterceptor` for all internal API calls
- Use `withComponentInputBinding()` in `provideFileRouter()` to access route params as inputs
- Use `withDebugRoutes()` in development to inspect the route tree at `/__analog/routes`
- Keep API routes thin — delegate business logic to services in `data-access` libs
- Use `TransferState` automatically via AnalogJS — do not duplicate SSR requests
