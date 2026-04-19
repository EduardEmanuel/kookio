# Prisma + Zod Guidelines

## Stack

- Prisma ORM v6 with CockroachDB
- `prisma-zod-generator` for auto-generating Zod schemas from Prisma models
- Zod v3 for validation across tRPC procedures, API routes, and form inputs

## File Structure

scripts/
└── generate-prisma-zod-repositories.mjs ← CRUD scaffold generator (see below)

libs/
└── prisma/client/
├── prisma/
│ ├── schema.prisma ← single source of truth for data model
│ ├── migrations/ ← auto-generated migration files
│ └── seed.ts ← database seeding script
└── src/
├── lib/
│ ├── prisma-client.ts ← PrismaClient singleton + withTxRetry
│ └── repositories/
│ └── {model}/ ← one folder per model, kebab-case
│ ├── {model}.repository.ts
│ └── {model}.repository.spec.ts
├── dtos/
│ └── {model}.ts ← DTO types derived from Zod schemas
└── prisma-zod-generator/
├── schemas/ ← auto-generated (do not edit)
│ └── results/ ← auto-generated result schemas
└── overrides/
└── {model}.ts ← manual schema overrides

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

- Always use a singleton PrismaClient instance — never instantiate per request:

```typescript
// libs/prisma-client/src/client.ts
import { PrismaClient } from '@prisma/client';

function createPrismaClient() {
  return new PrismaClient({
    log: process.env['NODE_ENV'] === 'development' ? ['query', 'error', 'warn'] : ['error'],
  }).$extends({
    // extensions here
  });
}

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env['NODE_ENV'] !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

- Inject `prisma` via tRPC context — never import it directly in routers or components

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

- Configure generator in `schema.prisma`:

```prisma
  generator zod {
    provider = "prisma-zod-generator"
    output   = "../src/generated/zod"
  }
```

- Run `npx prisma generate` after every schema change to regenerate Zod schemas
- Never edit files in `generated/zod/` — they are overwritten on every generate

### Usage

- Import generated schemas for tRPC input validation:

```typescript
import { UserCreateInputSchema, UserUpdateInputSchema } from '../generated/zod';

export const usersRouter = router({
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

## CRUD Repositories

Every Prisma model has a matching repository under `src/lib/repositories/{kebab}/`.
Repositories are the only place that imports `prisma` and `withTxRetry` directly —
tRPC routers and services consume repositories, never raw Prisma.

### Interface + Implementation

```typescript
// src/lib/repositories/recipe/recipe.repository.ts
import type { ... } from '../../../dtos/recipe';
import { prisma, withTxRetry } from '../../prisma-client';

export interface RecipeRepository {
  create(data: CreateOneRecipeDTO): Promise<CreateRecipeResultDTO>;
  createMany(data: CreateManyRecipeDTO): Promise<CreateManyRecipeResultDTO>;
  delete(clause: DeleteOneRecipeDTO): Promise<DeleteRecipeResultDTO>;
  deleteMany(clause: DeleteManyRecipeDTO): Promise<DeleteManyRecipeResultDTO>;
  findUnique(clause: FindUniqueRecipeDTO): Promise<FindUniqueRecipeResultDTO>;
  findMany(clause: FindManyRecipeDTO): Promise<FindManyRecipeResultDTO>;
  update(clause: UpdateOneRecipeDTO): Promise<UpdateRecipeResultDTO>;
  updateMany(clause: UpdateManyRecipeDTO): Promise<UpdateManyRecipeResultDTO>;
}

export class PrismaRecipeRepository implements RecipeRepository {
  create = (clause: CreateOneRecipeDTO) =>
    withTxRetry(prisma, (tx) => tx.recipe.create(clause) as unknown as Promise<CreateRecipeResultDTO>);

  findMany = async (clause: FindManyRecipeDTO) => {
    const items = await prisma.recipe.findMany(clause);
    return {
      data: items,
      pagination: { page: 1, pageSize: items.length, total: items.length, totalPages: 1, hasNext: false, hasPrev: false },
    } as FindManyRecipeResultDTO;
  };

  // ... delete, deleteMany, findUnique, update, updateMany follow the same pattern
}
```

- `findMany` always wraps results in a pagination envelope — never returns a bare array
- Mutations (`create`, `update`, `delete`) always go through `withTxRetry` for CockroachDB
  serializable conflict handling
- `findUnique` and `findMany` bypass `withTxRetry` — reads don't need retry logic

### Composite Primary Keys

Models with `@@id([fieldA, fieldB])` (e.g. `UserDietaryRestriction`, `UserUtensil`,
`RecipeCollectionEntry`) use a compound `where` clause generated by Prisma:

```typescript
// findUnique on UserDietaryRestriction
repo.findUnique({
  where: { userId_dietaryRestrictionId: { userId, dietaryRestrictionId } },
});
```

The repository code is identical to single-ID models — only the DTO shape differs,
handled automatically by the generated Zod schemas.

## DTOs

DTOs live in `src/dtos/{model}.ts` and are pure TypeScript type aliases derived from
the generated Zod schemas. **Never write DTO shapes by hand** — always derive with
`z.output<typeof SomeSchema>`.

```typescript
// src/dtos/recipe.ts
import z from 'zod';
import { RecipeCreateOneSchema, RecipeFindManyResultSchema, ... } from '../prisma-zod-generator/index';

export type CreateOneRecipeDTO = z.output<typeof RecipeCreateOneSchema>;
export type FindManyRecipeResultDTO = z.output<typeof RecipeFindManyResultSchema>;
// ... one type per operation
```

- DTO files are the public contract — tRPC routers import from `dtos/`, not from schemas directly
- If a model has extra domain exports (e.g. `User` exports `role` and `Role`), add them
  at the bottom of the DTO file and register them in `scripts/generate-prisma-zod-repositories.mjs` via
  `extraDtoImports` / `extraDtoExports` so they survive regeneration

### Subset types from pure schemas

When a consumer (seed script, service, form handler) needs only a subset of a model's
fields, derive it from the generated pure schema via `.omit()` — never define a local
`interface` that duplicates the Prisma shape.

Pure schemas live in `src/prisma-zod-generator/schemas/variants/pure/{Model}.pure.ts`
and are re-exported through `prisma-zod-generator/index.ts`.
Add the derived type to the model's DTO file so it stays co-located with the rest of
the model's types:

```typescript
// src/dtos/meal-category.ts
import { MealCategoryModelSchema } from '../prisma-zod-generator/index';

export const MealCategorySeedRowSchema = MealCategoryModelSchema.omit({
  id: true,
  createdAt: true,
  recipes: true,
});
export type MealCategorySeedRow = z.output<typeof MealCategorySeedRowSchema>;
```

The consumer then imports the type from the DTO — never from the pure schema directly:

```typescript
// scripts/seeds/seed-catalog.ts
import type { MealCategorySeedRow } from '../../libs/prisma/client/src/dtos/meal-category';
```

This way a schema change in `schema.prisma` → `prisma generate` propagates automatically
to every consumer without touching the local interface.

## Zod Schema Overrides

`prisma-zod-generator` produces `FindManyResultSchema` with `pageSize: min(1)` and
`totalPages: min(0)`. Both are wrong for an empty result page (0 items, 1 total page).
Every model has an override in `src/prisma-zod-generator/overrides/{model}.ts`:

```typescript
// src/prisma-zod-generator/overrides/recipe.ts
import { z } from 'zod';
import { RecipeFindManyResultSchema as Base } from '../schemas/index';

export const RecipeFindManyResultSchema = Base.extend({
  pagination: Base.shape.pagination.extend({
    pageSize: z.number().int().min(0), // 0 items is valid
    totalPages: z.number().int().min(1), // at least page 1 always exists
  }),
});
```

Override exports **must come after** `export * from './schemas/index'` in
`prisma-zod-generator/index.ts` so they shadow the generated schema. The comment
`!! -- Keep this order of exports in order to apply overrides correctly -- !!`
marks this boundary — do not reorder.

## CRUD Scaffold Generator

`scripts/generate-prisma-zod-repositories.mjs` generates the four files per model (override, DTO,
repository, spec). Run it when adding a new model:

```bash
node scripts/generate-prisma-zod-repositories.mjs
```

After running, manually update the three barrel exports:

- `src/dtos/index.ts`
- `src/index.ts`
- `src/prisma-zod-generator/index.ts`

All three use alphabetical order.

### Adding a Model with Extra DTO Exports

If the new model needs extra exports in its DTO (beyond the standard CRUD types),
add `extraDtoImports` and `extraDtoExports` to the model entry in `MODELS`:

```javascript
{
  name: 'User',
  kebab: 'user',
  prismaKey: 'user',
  // ...
  extraDtoImports: `  RoleSchema,`,
  extraDtoExports: `
export const role = RoleSchema.Values;
export type Role = z.output<typeof RoleSchema>;`,
},
```

## General Rules

- Never use `prisma.model.findUnique()` without handling the `null` case explicitly
- Never select more fields than needed — use `select` or `include` explicitly:

```typescript
// ✅ correct — select only what's needed
prisma.user.findMany({ select: { id: true, name: true, email: true } });

// ❌ avoid — fetches all fields including sensitive ones
prisma.user.findMany();
```

- Never expose raw Prisma errors to the client — catch and rethrow as `TRPCError`
- Use `prisma.$queryRaw` only as a last resort — document why ORM queries were insufficient
- Always paginate large queries — never fetch unbounded collections
