# Prisma + Zod Guidelines

> **Status: Active.** Prisma v6 + CockroachDB schema lives at `libs/prisma/client/schema.prisma`, migrations at `libs/prisma/client/migrations/`, seed scripts at `scripts/seeds/`, seed data at `libs/prisma/client/seed-data/`. `prisma-zod-generator` is wired up; per-model zod overrides live in `libs/prisma/client/src/lib/prisma-zod-overrides/`. Per-model derived types (e.g. `*SeedRow` shapes) live in `libs/prisma/client/src/lib/types/{model}.ts`, derived from generated schemas via `.pick()` / `.omit()` / `.extend()` and `z.output<typeof X>` — **never hand-written interfaces that duplicate the Prisma shape**. Shared ID schemas (`SemanticIdSchema`, `UuidIdSchema`) live in `libs/prisma/client/src/lib/types/ids.ts`. The Prisma client instance + retry / pagination helpers are isolated behind the `@kookio/prisma-client/server` sub-path; the root barrel is browser-safe (types + zod schemas only) and ESLint blocks `/server` imports from front-end globs. tRPC routers consume `ctx.prisma.*` directly; retry-on-conflict for CockroachDB is implemented once as a Prisma client extension in [prisma-client.ts](../libs/prisma/client/src/lib/prisma-client.ts) and applied globally to every mutation.
>
> **Deliberately rejected — do not reintroduce.** A repository layer (`libs/prisma/client/src/lib/repositories/{model}/`), a `src/dtos/` folder mirroring CRUD operations (`CreateOneXDTO`, `FindManyXResultDTO`, etc.), and a `scripts/generate-prisma-zod-repositories.mjs` scaffold generator have all been considered and rejected. **Rationale baked in here so future readers don't have to dig:** Prisma Client is already a type-safe DB abstraction; tRPC is already the business-logic / transport layer. A repository class wrapping `prisma.<model>.<op>()` adds boilerplate without isolation benefit, mirrors a Java/Spring-style architecture that doesn't fit AnalogJS + tRPC + Prisma, and would force every consumer (routers, seeds, scripts) through a redundant indirection. If you find yourself wanting one, the right move is almost always: (a) put the logic in a tRPC procedure with `ctx.prisma`, (b) put a multi-step write inside an interactive transaction (`ctx.prisma.$transaction(async tx => ...)`) — not a separate class.

## Stack

- Prisma ORM v6 with CockroachDB
- `prisma-zod-generator` for auto-generating Zod schemas from Prisma models
- Zod v3 for validation across tRPC procedures, API routes, and form inputs

## File Structure

```text
scripts/
├── bootstrap-cockroach.ts        ← initial DB bootstrap helper
├── migration-guard.ts            ← migration safety checks
└── seeds/                        ← seed scripts run via `nx seed prisma-client`
    ├── seed-users.ts
    ├── seed-catalog.ts
    └── ...

libs/prisma/client/
├── schema.prisma                 ← single source of truth for the data model
├── migrations/                   ← prisma-managed, do not edit by hand
├── seed-data/                    ← static seed datasets (JSON / TS)
└── src/
    ├── index.ts                  ← public barrel — re-exports prisma + types + schemas
    └── lib/
        ├── prisma-client.ts      ← PrismaClient singleton + retry extension
        ├── types/                ← per-model derived types (see "Type derivation")
        │   ├── recipe.ts
        │   └── {model}.ts        ← uses z.output<typeof X> over generated schemas
        └── prisma-zod-overrides/ ← per-model zod schema overrides
            └── {model}.ts        ← shadows generated FindManyResultSchema, etc.
```

There is intentionally **no** `repositories/` folder, **no** `src/dtos/` folder, and **no** repository-scaffold generator. See the status banner above for the rationale.

## Schema Design

### General Rules

- Use `camelCase` for field names, `PascalCase` for model names
- Always define `createdAt` and `updatedAt` on every model:

```prisma
  model User {
    id        String   @id @default(cuid())
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  }
```

- Use `cuid()` for primary keys — CockroachDB is distributed,
  avoid sequential integers to prevent hotspots
- Define explicit `@map` and `@@map` for snake_case column/table names in DB:

```prisma
  model UserProfile {
    id        String @id @default(cuid())
    firstName String @map("first_name")

    @@map("user_profiles")
  }
```

- Always define relations explicitly with `@relation`:

```prisma
  model Post {
    id       String @id @default(cuid())
    authorId String @map("author_id")
    author   User   @relation(fields: [authorId], references: [id], onDelete: Cascade)

    @@map("posts")
  }
```

- Use `onDelete: Cascade` deliberately — document why when used
- Add `@@index` for all foreign keys and frequently queried fields:

```prisma
  model Post {
    @@index([authorId])
    @@index([createdAt])
  }
```

### CockroachDB Specifics

- Never use `@default(autoincrement())` — use `@default(cuid())` or
  `@default(uuid())` to avoid distributed sequence hotspots
- Prefer `String` over `Int` for IDs
- Be aware that CockroachDB uses serializable isolation by default —
  design transactions to be idempotent where possible
- Use `@db.String` type annotations when mapping to CockroachDB-specific types

## PrismaClient

### Singleton

- Always use the singleton instance exported from
  `libs/prisma/client/src/lib/prisma-client.ts` — never call `new PrismaClient()`
  directly in app code or scripts.
- The singleton applies a retry extension that wraps every mutation
  (`create`, `createMany`, `update`, `updateMany`, `delete`, `deleteMany`,
  `upsert`) with retry-on-conflict logic for CockroachDB serializable errors
  (`P2034`, `P2036`, `40001`, "restart transaction"). Reads are not retried.
- Inject `prisma` via the tRPC context (`ctx.prisma`) — never import it
  directly in tRPC routers. Seed scripts and other server-side scripts
  import it from the **`@kookio/prisma-client/server`** sub-path (the
  root barrel is browser-safe and does not re-export the instance — see
  "Browser-safe imports" under Zod Integration for the rationale).

### Extensions

- Use Prisma Client Extensions for cross-cutting concerns:

```typescript
export const prisma = new PrismaClient().$extends({
  query: {
    $allModels: {
      async findMany({ args, query }) {
        // e.g. enforce soft delete filter globally
        args.where = { ...args.where, deletedAt: null };
        return query(args);
      },
    },
  },
  result: {
    user: {
      fullName: {
        needs: { firstName: true, lastName: true },
        compute(user) {
          return `${user.firstName} ${user.lastName}`;
        },
      },
    },
  },
});
```

- Define extensions in `client.ts` — never inline in routers or services
- Document each extension with a comment explaining its purpose

### Middleware

- Use Prisma middleware for logging, auditing, or soft deletes:

```typescript
// libs/prisma-client/src/middleware.ts
import { Prisma } from '@prisma/client';

export function loggingMiddleware(): Prisma.Middleware {
  return async (params, next) => {
    const before = Date.now();
    const result = await next(params);
    const after = Date.now();
    console.log(`Query ${params.model}.${params.action} took ${after - before}ms`);
    return result;
  };
}
```

- Register middleware in `client.ts` before the singleton is exported
- Prefer Extensions over Middleware for new code — Middleware is legacy in Prisma v5+

## Transactions

### When to Use

- Use transactions for operations that must succeed or fail together:
  - Creating related records across multiple models
  - Transfer operations (debit + credit)
  - Any multi-step write that must be atomic

### Interactive Transactions

- Prefer interactive transactions for complex logic:

```typescript
const result = await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({
    data: { name: input.name, email: input.email },
  });

  const profile = await tx.userProfile.create({
    data: { userId: user.id, bio: input.bio },
  });

  return { user, profile };
});
```

- Always use the `tx` parameter inside transactions — never use the global `prisma` instance
- Keep transactions short — avoid long-running async operations inside them
- Design for idempotency — CockroachDB may retry transactions automatically

### Batch Transactions

- Use batch transactions for independent parallel operations:

```typescript
const [users, posts] = await prisma.$transaction([prisma.user.findMany(), prisma.post.findMany()]);
```

## Migrations

### Workflow

```bash
# Create a new migration (development)
npm run migrate-dev:prisma-client

# Create migration file only without applying
npm run migrate-dev-create-only:prisma-client

# Apply migrations (production/CI)
npm run migrate-deploy:prisma-client
```

### Rules

- Never edit migration files after they have been committed
- Always review auto-generated migrations before committing —
  check for unintended destructive operations (`DROP`, `ALTER`)
- Name migrations descriptively: `add_user_profile`, `add_posts_index`
- Never use `prisma db push` in production — always use `migrate deploy`
- Run `migrate deploy` as part of CI/CD before starting the server

### CockroachDB: spurious `DROP TYPE` on new enums

When adding a new Prisma enum to a CockroachDB schema, Prisma may generate a
spurious `DROP TYPE "public"."crdb_internal_region"` line in the migration SQL.
`crdb_internal_region` is a CockroachDB-internal multi-region enum — dropping it
causes Prisma error **P3018** ("a migration failed to apply"), with underlying
database error code `2BP01`.

**Prevention — always use `create-only` first:**

```bash
npm run migrate-dev-create-only:prisma-client
# Review migration.sql — delete the DROP TYPE "public"."crdb_internal_region"; line if present
npm run migrate-deploy:prisma-client
```

**Recovery — if the migration already ran and failed (P3018):**

1. Mark it as rolled back:
   `prisma migrate resolve --rolled-back <migration_name>`
2. Drop any partially-created enum from the DB:
   `prisma db execute --stdin` with `DROP TYPE IF EXISTS "YourEnum";`
3. Delete the local migration directory.
4. Re-create with `migrate-dev-create-only`, remove the line, then `migrate deploy`.

## Seeding

- Define seed data in `prisma/seed.ts`
- Use `upsert` in seed scripts to make them idempotent:

```typescript
await prisma.user.upsert({
  where: { email: 'admin@example.com' },
  update: {},
  create: {
    email: 'admin@example.com',
    name: 'Admin User',
  },
});
```

- Never use seed data in production — guard with environment check:

```typescript
if (process.env['NODE_ENV'] === 'production') {
  throw new Error('Seeding is not allowed in production');
}
```

## Zod Integration (prisma-zod-generator)

### Setup

- The generator is already configured in [schema.prisma](../libs/prisma/client/schema.prisma):

```prisma
  generator zod {
    provider         = "prisma-zod-generator"
    output           = "./src/prisma-zod-generator"
    useMultipleFiles = true  // one file per model
  }
```

- Run `nx generate prisma-client` (which calls `prisma generate`) after every schema change
- Never edit files under `src/prisma-zod-generator/` — they are overwritten on every generate. To customize a schema, add an override in `src/lib/prisma-zod-overrides/{model}.ts` (see "Zod Schema Overrides" below)

### Usage

- Import generated schemas via the public barrel `@kookio/prisma-client` for tRPC input validation:

```typescript
import { UserCreateInputSchema, UserUpdateInputSchema } from '@kookio/prisma-client';

export const users = router({
  create: protectedProcedure.input(UserCreateInputSchema).mutation(async ({ ctx, input }) => {
    return ctx.prisma.user.create({ data: input });
  }),
});
```

- Compose generated schemas with `.pick()`, `.omit()`, `.extend()` for partial inputs:

```typescript
const UpdateProfileSchema = UserUpdateInputSchema.pick({
  name: true,
  bio: true,
});
```

- Do NOT duplicate Prisma model shapes manually in Zod — always derive from generated schemas
- Use generated schemas as the single source of truth for data shapes across
  tRPC procedures, API route validation, and form validation

### Browser-safe imports

The root barrel `@kookio/prisma-client` is **browser-safe by construction**:
it exposes types + zod schemas only. The Prisma client instance lives behind
the `@kookio/prisma-client/server` sub-path, and ESLint blocks frontend libs
from importing it.

Rules for any code that ships to the browser (pages, components, stores,
guards — anything in `apps/web/src/app/**`, `libs/feature/**`,
`libs/shared/ui/**`):

- Use `import type { ... }` for type-only imports — types erase at compile
  time, runtime imports don't. A bare `import { X }` for a name that happens
  to be a type today drags the source module into the build for nothing.
- Never reach for `@kookio/prisma-client/server`. ESLint enforces this with
  a glob-scoped `no-restricted-imports` rule.
- For **runtime enum values** in UI code (e.g. a `mat-select` option list),
  use the generated zod schema's `.options` for the array. The schema is
  the source of truth, so the array cannot drift. Centralise the import in
  a single shared module (e.g. `libs/shared/utility/src/lib/labeling/measure-unit-labels.ts`)
  so the `@kookio/prisma-client` runtime dependency stays at one well-known
  import site rather than spreading across every component file.
- **Do NOT expose that module through a wildcard barrel**
  (`export * from './lib/labeling/measure-unit-labels'`). Wildcard re-exports
  evaluate the source eagerly under Vite SSR dev, and the prisma-zod-generator
  output (~2000 wildcard-re-exported schema files) walks slowly enough that
  a barrel-exposed runtime schema import shows up as a route cold-start tax
  on every page that imports anything from the barrel — even pages that do
  not need the enum. Instead, register a sub-path alias and have the handful
  of consumers that need the labels import from it explicitly.
- Pair the array with an exhaustive `Record<EnumType, X>` for any labels,
  policies, or per-value config. The record's exhaustiveness check is the
  schema-change canary — if a value is added or renamed, the record fails
  compilation until updated.

```typescript
// libs/shared/utility/src/lib/labeling/measure-unit-labels.ts
import { MeasureUnitSchema, type MeasureUnit } from '@kookio/prisma-client';

// Pinned to the schema — cannot drift.
export const MEASURE_UNITS = MeasureUnitSchema.options;

// Exhaustive record — schema rename breaks compilation here:
export const MEASURE_UNIT_LABEL: Record<MeasureUnit, string> = {
  G: 'g',
  KG: 'kg',
  ML: 'ml' /* ... every key required */,
};
```

```jsonc
// tsconfig.base.json — sub-path alias
"@kookio/shared-utility/measure-units": [
  "libs/shared/utility/src/lib/labeling/measure-unit-labels.ts"
]
```

```typescript
// callers — explicit sub-path import
import { MEASURE_UNITS } from '@kookio/shared-utility/measure-units';
```

```typescript
// libs/shared/utility/src/index.ts — keep `measure-unit-labels` OUT of the
// wildcard barrel; only the labelers / urls / icon manifest go through the
// barrel.
export * from './lib/labeling/ingredient-labelers';
export * from './lib/labeling/user-labelers';
export * from './lib/material-symbols-icons';
export * from './lib/urls';
```

**Why not hardcode the array** (the rule we used to apply): the original
concern was that `import { MeasureUnitSchema }` from `@kookio/prisma-client`
would drag the Prisma client into the browser bundle and crash on hydration
via `Prisma.defineExtension`. The `/server` sub-path split eliminated that
failure mode structurally — the root barrel does not re-export the client
instance, ESLint blocks the `/server` path from frontend code, and the
remaining cost is bounded by sub-pathing the consuming module so only the
routes that need the enum data pay for it.

**How this interacts with the wildcard-barrel rule above:** the
`@kookio/shared-utility` barrel is wildcard-style for convenience (URLs,
icon manifest, labelers — all pure-data leaves). The moment a leaf imports
a runtime zod schema, the barrel inherits the schema graph's evaluation
cost. Sub-pathing the leaf out of the barrel keeps the barrel cheap.

### Validation strictness mirrors data reality

A Zod schema stricter than the data is a latent bug. Validation is a
**faithful representation of the real contract**, not a wishlist.

Before adding `.uuid()`, `.email()`, `.url()`, or any other format
constraint to a schema, ask: do **all** real data sources — production,
seed fixtures, E2E factories, legacy imports — satisfy the constraint?
If the seed does not, real-world data almost certainly will not either.

Floor the schema at what the database itself permits, and rely on the
existence check at write-time for the actual integrity boundary. Format
validation does not stop SQL injection (parameterised queries do), and it
does not stop unauthorised access (auth + ownership checks do); it stops
typos, and only when the data is honest about being typo-shaped.

Concrete pattern — the `Utensil` and `DietaryRestriction` catalog tables
are seeded with semantic IDs (`utensil_chef_knife`, `dr_vegan`) for
grep-able dev/E2E logs. Every other catalog gets Prisma's runtime
`@default(uuid())`. Onboarding's commit input therefore picks per field:

```typescript
// libs/prisma/client/src/lib/types/onboarding.ts
import { SemanticIdSchema, UuidIdSchema } from './ids';

export const OnboardingCommitInputSchema = z.object({
  // … counts …
  preferredCategoryIds: z.array(UuidIdSchema).default([]), // MealCategory.id  → UUID
  preferredAreaIds: z.array(UuidIdSchema).default([]), // MealArea.id      → UUID
  utensilIds: z.array(SemanticIdSchema).default([]), // Utensil.id       → semantic
  dietaryRestrictionIds: z.array(SemanticIdSchema).default([]), // DietaryRestriction.id → semantic
});
```

Use the named schemas from `libs/prisma/client/src/lib/types/ids.ts`
instead of inline `z.string().uuid()` / `z.string().min(1)`. The named
import documents intent — a reader of the router can tell at a glance
whether an endpoint will reject a non-UUID payload, without having to
trace the field back to its source table.

Decision rule: pick by **how the ID is produced**, not what conceptual
bucket the table is in. If a fixture or factory writes the ID by hand
with letters in it, use `SemanticIdSchema`. If only Prisma writes the ID,
use `UuidIdSchema`. When in doubt, look at the seed for that table.

## Type derivation

Per-model derived types live in `libs/prisma/client/src/lib/types/{model}.ts`.
They derive from the generated Zod schemas via `.pick()`, `.omit()`, `.extend()`
and `z.output<typeof X>`. **Never write a local TypeScript interface that
duplicates a Prisma model shape** — a schema change must propagate to every
consumer through one regenerate-and-rebuild cycle, and a hand-written interface
silently breaks that contract.

```typescript
// libs/prisma/client/src/lib/types/recipe.ts
import z from 'zod';
import { RecipeInputSchema } from '../../prisma-zod-generator/schemas/index';
import { RecipeIngredientSeedRowSchema } from './recipe-ingredient';
import { RecipeTagSeedRowSchema } from './recipe-tag';

export const RecipeSeedRowSchema = RecipeInputSchema.pick({
  externalId: true,
  slug: true,
  title: true,
  imageUrl: true,
  videoUrl: true,
  sourceUrl: true,
  instructions: true,
}).extend({
  categoryExternalId: z.string().nullable(),
  areaExternalId: z.string().nullable(),
  tags: z.array(RecipeTagSeedRowSchema),
  ingredients: z.array(RecipeIngredientSeedRowSchema),
});
export type RecipeSeedRow = z.output<typeof RecipeSeedRowSchema>;
```

Consumers import the derived type via the public barrel `@kookio/prisma-client`,
never reaching into the generator output:

```typescript
// scripts/seeds/seed-catalog.ts
import { prisma } from '@kookio/prisma-client/server';
import type { IngredientCatalogSeedRow, MealAreaSeedRow, MealCategorySeedRow } from '@kookio/prisma-client';
```

### Composite primary keys

Models with `@@id([fieldA, fieldB])` (e.g. `UserDietaryRestriction`,
`RecipeCollectionEntry`) use the compound-key shape that Prisma generates
automatically — the same pattern as single-ID models, just with a wider `where`:

```typescript
ctx.prisma.userDietaryRestriction.findUnique({
  where: { userId_dietaryRestrictionId: { userId, dietaryRestrictionId } },
});
```

No special handling is required at the type layer — the generated zod schemas
already encode the compound shape.

## Zod Schema Overrides

`prisma-zod-generator` produces `FindManyResultSchema` with `pageSize: min(1)` and
`totalPages: min(0)`. Both are wrong for an empty result page (0 items, 1 total page).
Every affected model has an override under `libs/prisma/client/src/lib/prisma-zod-overrides/{model}.ts`:

```typescript
// libs/prisma/client/src/lib/prisma-zod-overrides/recipe.ts
import { z } from 'zod';
import { RecipeFindManyResultSchema as Base } from '../../prisma-zod-generator/schemas/index';

export const RecipeFindManyResultSchema = Base.extend({
  pagination: Base.shape.pagination.extend({
    pageSize: z.number().int().min(0), // 0 items is valid
    totalPages: z.number().int().min(1), // at least page 1 always exists
  }),
});
```

Override exports must be re-exported from the public barrel **after** the
generator output, so they shadow the generated schema. The comment
`!! -- Keep this order of exports in order to apply overrides correctly -- !!`
in the barrel marks this boundary — do not reorder.

## Adding a new model

When you add a model to `schema.prisma`, do **not** invoke any scaffold
generator — the project doesn't have one and won't get one. The minimum steps:

1. Add the model to `schema.prisma`, then run `nx generate prisma-client` to
   refresh the generated zod schemas.
2. Create or update a migration (`migrate-dev-create-only` first, review the
   SQL, then `migrate-deploy`). For CockroachDB enum gotchas, see the
   "spurious DROP TYPE" note in the Migrations section.
3. If the model needs derived types (seed rows, subset shapes), add a file at
   `libs/prisma/client/src/lib/types/{model}.ts` and re-export it from
   `src/lib/types/index.ts` and the public barrel `src/index.ts` (alphabetical
   order in both).
4. If the generated schemas need overrides (e.g. pagination floors), add a
   file at `libs/prisma/client/src/lib/prisma-zod-overrides/{model}.ts` and
   re-export it from the public barrel **after** the generator output.
5. Use the new model directly via `ctx.prisma.<model>.<op>()` in the relevant
   tRPC router. Wrap multi-step writes in `ctx.prisma.$transaction(async tx =>
...)`. Do not introduce a wrapper class.

## Prisma 7 (driver adapter) + Zod 4

> **Status: Active.** The Stack table and the `prisma-client-js` /
> `import { ... } from '@prisma/client'` prose earlier in this chapter are
> v6-era. Prisma was upgraded to **v7** and Zod to **v4**; this section is the
> current reality and supersedes those references.

### Prisma 7 is a structural migration, not a version bump

- **Client generator** is `prisma-client` (Rust-free, self-contained) with a
  mandatory `output`, not `prisma-client-js`:

  ```prisma
  generator client {
    provider = "prisma-client"
    output   = "./src/generated/prisma"
  }
  ```

  The generated client imports only `node:*` — it does **not** depend on
  `@prisma/client` at runtime. Consume it from the generated path
  (`prisma-client.ts` imports `PrismaClient` / `Prisma` from
  `../generated/prisma/client`); `Prisma.TransactionClient` replaces the old
  `@prisma/client/runtime/library.js` `ITXClientDenyList` type. The generated
  dir is git-ignored and rebuilt by the `generate` target.

- **Connection URLs move to `prisma.config.ts`** at the repo root — the
  `datasource` block in `schema.prisma` keeps only `provider`. Use a plain
  `process.env` read with a placeholder fallback, **not** the `env()` helper:
  Prisma 7 resolves the config eagerly on _every_ command, and `env()` throws
  when the variable is absent, which breaks offline `generate` / `build` /
  `test`.

  ```typescript
  datasource: {
    url:
      process.env['DATABASE_URL'] ??
      'postgresql://placeholder:placeholder@localhost:26257/kookio',
  }
  ```

  `directUrl` was removed from the datasource config (migrations now run over
  `url` through the adapter), so `DIRECT_DATABASE_URL` is unused.

- **The client takes a driver adapter.** CockroachDB speaks the Postgres wire
  protocol, so `@prisma/adapter-pg` (which bundles `pg` + `@types/pg`):

  ```typescript
  const adapter = new PrismaPg({
    connectionString: process.env['DATABASE_URL'] ?? '<placeholder>',
  });
  new PrismaClient({ adapter });
  ```

  Because the generated client is self-contained and `adapter-pg` bundles
  `pg`, the `@prisma/client`, `pg`, and `@types/pg` packages were **dropped as
  direct deps** (`@nx/dependency-checks` correctly flags them as unused once
  the import goes through the generated path).

- **Validate the adapter ↔ CockroachDB connection against the live DB** after
  upgrading. `prisma generate` is offline, but the driver-adapter connection
  can only be confirmed with `migrate-deploy` + a real query. A pure
  generator/datasource _config_ change produces no migration, so existing
  migrations stand.

### Zod 4 gotchas

- **`z.uuid()` is now strict RFC-4122** (enforces version + variant bits).
  Zod 3's `.uuid()` accepted any `8-4-4-4-12` hex. Use **`z.guid()`** for the
  loose form — `UuidIdSchema` does, deliberately: per "Validation strictness
  mirrors data reality" above, tightening to strict v4 would reject
  hand-written fixture / E2E IDs the schema accepted before, for no real
  safety gain.
- **`z.unknown()` no longer makes an object key optional** (Zod 3 did). Add
  `.optional()` explicitly where a pass-through field should stay optional.
- **`.Values` was removed** from enum schemas — use `.enum` (e.g.
  `MeasureUnitSchema.enum`). This bit seed scripts and fixtures.

## Conventions

- **Do not introduce a repository layer**, a `src/dtos/` folder, or a CRUD
  scaffold generator. tRPC routers are the business-logic layer; `ctx.prisma`
  is the data layer; per-model derived types live in `src/lib/types/`. See the
  rationale in the status banner at the top of this chapter.
- Multi-step writes go inside `ctx.prisma.$transaction(async tx => ...)` —
  never split a logically atomic write across multiple top-level calls.
- The retry-on-conflict logic is applied globally via the Prisma extension in
  `prisma-client.ts` — it wraps every single-statement mutation (`create`,
  `update`, `upsert`, …). Do not call retry helpers manually in routers. There
  are **no** interactive multi-write transactions in the codebase today (a
  repo-wide grep for `$transaction` in routers returns nothing), so the global
  extension is the only retry mechanism and is sufficient. If a future router
  introduces a genuine multi-step interactive `$transaction` that must restart
  as a unit on a CockroachDB serializable abort (`40001`), add a tx-level retry
  wrapper at that point — the global per-statement extension cannot cover it.
- Never use `prisma.<model>.findUnique()` without handling the `null` case explicitly
- Never select more fields than needed — use `select` or `include` explicitly:

```typescript
// ✅ correct — select only what's needed
ctx.prisma.user.findMany({ select: { id: true, name: true, email: true } });

// ❌ avoid — fetches all fields including sensitive ones
ctx.prisma.user.findMany();
```

- Never expose raw Prisma errors to the client — catch and rethrow as `TRPCError`
- Use `prisma.$queryRaw` only as a last resort — document why ORM queries were insufficient
- Always paginate large queries — never fetch unbounded collections
