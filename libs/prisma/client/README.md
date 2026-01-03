# @kookio/prisma-client

Prisma schema + data-access layer shared across the monorepo. It owns:

- `schema.prisma` and migrations (CockroachDB target).
- Generated Prisma client (`npx prisma generate`) and Zod schema output (consumed by `@kookio/prisma-validator`).
- Repository abstractions (`PrismaIngredientRepository`) with Cockroach-friendly retry semantics (`withTxRetry`).
- Operational scripts (e.g., `src/scripts/seed.ts`) and SQL bootstrap helpers (`SQLs/bootstrap_cockroach.sql`).

## Layout

```
libs/prisma/client/
├── schema.prisma         # CockroachDB schema + generator options
├── migrations/           # Prisma migration history
├── SQLs/bootstrap...sql  # Handy SQL script for creating dev/test/prod DBs & roles
├── src/lib/prisma-client # Prisma singleton + tx retry helper
├── src/lib/repositories  # Repository classes (ingredient for now)
├── src/scripts/seed.ts   # Mock ingredient seed using @kookio/shared-mock
└── src/index.ts          # Exposes prisma + repositories
```

## Targets & scripts

| Command                           | Description                                                          |
| --------------------------------- | -------------------------------------------------------------------- |
| `nx generate prisma-client`       | `npx prisma generate` (keeps Prisma client + Zod artifacts current). |
| `nx migrate-dev prisma-client`    | Runs `prisma migrate dev` under the workspace root.                  |
| `nx migrate-deploy prisma-client` | Runs `prisma migrate deploy` (used in CI/production).                |
| `nx seed prisma-client`           | Executes `src/scripts/seed.ts` (requires `SEED_USER_ID`).            |
| `nx studio prisma-client`         | Opens Prisma Studio.                                                 |
| `nx build prisma-client`          | Type-checks/bundles the repo exports via `@nx/js:tsc`.               |
| `nx test prisma-client`           | Vitest harness (lightweight today).                                  |

Every CLI script in `package.json` (`npm run migrate-dev:prisma-client`, etc.) forwards to these Nx targets and automatically passes environment variables via `scripts/with-vercel-env.mjs`.

## Usage

```ts
import { prisma, PrismaIngredientRepository } from '@kookio/prisma-client';

const repo = new PrismaIngredientRepository();
await repo.create({
  data: { userId: 'seed', name: 'Flour', quantity: 1, unit: 'kg', optional: false },
});
```

When adding models:

1. Update `schema.prisma`.
2. Run `npm run migrate-dev:prisma-client` (regenerates Prisma + Zod artifacts).
3. Introduce new repositories/services under `src/lib/repositories/<model>`.
4. Update `@kookio/prisma-validator` DTOs if the API needs to expose the new schema.
