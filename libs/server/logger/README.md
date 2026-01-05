# @kookio/server-logger

Thin wrapper over [Pino](https://github.com/pinojs/pino) so every server-side package (Nitro routes, Prisma scripts, Playwright helpers, etc.) logs consistently.

```ts
import { logger } from '@kookio/server-logger';

logger.info({ route: 'ingredient.create' }, 'ℹ️ Ingredient created');
```

## Behavior

- Defaults to `level = process.env.LOG_LEVEL ?? 'debug'`.
- Auto-detects production via `process.env.VERCEL === '1'` or `NODE_ENV === 'production'`.
- In non-prod, enables the `pino-pretty` transport with colorized output, timestamp translation, and hidden `pid/hostname` for friendlier local debugging.

Consumers include `libs/server/trpc`, `libs/prisma/client/src/scripts/seed.ts`, `apps/web` Nitro routes, E2E helpers, and build scripts (`apps/web/scripts/*`).

## Nx targets

| Command                  | Description                                                                   |
| ------------------------ | ----------------------------------------------------------------------------- |
| `nx build server-logger` | Bundles the logger with `@nx/esbuild:esbuild` into `dist/libs/server/logger`. |
| `nx test server-logger`  | Executes Vitest (currently minimal, extend as behavior grows).                |
