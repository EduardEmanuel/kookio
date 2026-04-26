# @kookio/server-trpc

Reusable tRPC server package that powers both the Nitro route (`apps/web/src/server/routes/api/trpc/[trpc].ts`) and Playwright tests. It bundles:

- `appRouter` and the ingredient router (CRUD + createMany/updateMany).
- `createContext` wiring Prisma repositories into tRPC procedures.
- Shared config exports (`TRPC_PATH`, `TRPC_TRANSFORMER`) and type helpers (`AppRouter`) for the client to import.

## Architecture

```
libs/server/trpc/
├── src/index.ts           # re-exports appRouter + context
├── src/configs.ts         # TRPC_PATH, transformer (superjson)
├── src/types.ts           # AppRouter + helper inference
└── src/lib/
    ├── trpc.ts            # initializes tRPC server utilities
    ├── context.ts         # injects Prisma repositories
    └── routers/
        └── ingredient.router.ts
```

Each procedure uses schemas from `@kookio/prisma-client/prisma-zod-generator`, logs failures through `@kookio/server-logger`, and derives user-friendly labels via `@kookio/shared-utility`.

## Usage

**Server (Nitro route)**

```ts
import { appRouter, createContext } from '@kookio/server-trpc';

export default createTRPCRouter({
  router: appRouter,
  createContext,
});
```

**Client**

```ts
import { TRPC_PATH, TRPC_TRANSFORMER } from '@kookio/server-trpc/configs';
import type { AppRouter } from '@kookio/server-trpc/types';

createTRPCProxyClient<AppRouter>({
  transformer: TRPC_TRANSFORMER,
  links: [httpBatchLink({ url: new URL(TRPC_PATH, baseUrl).toString() })],
});
```

## Nx targets

| Command                | Description                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| `nx build server-trpc` | Builds CJS bundles via `@nx/esbuild:esbuild` (includes extra entry points for configs/types). |
| `nx test server-trpc`  | Runs Vitest (`libs/server/trpc/vite.config.ts`, currently focused on router behavior).        |

When adding routers, co-locate schemas/imports here so both the server route and Playwright suite benefit automatically.
