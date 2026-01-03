# @kookio/prisma-validator

Type-safe boundary between Prisma and the rest of the workspace. It wraps the Prisma schema with [prisma-zod-generator](https://github.com/omar-dulaimi/prisma-zod-generator) output, adds overrides, and exposes DTO types that tRPC routers and Angular services share.

## Structure

```
src/
├── generated/zod/schemas/   # auto-generated from libs/prisma/client/schema.prisma
├── dtos/ingredient.ts       # re-exports zod outputs as TypeScript DTOs
├── overrides/ingredients.ts # custom schema tweaks (pagination rules, etc.)
└── index.ts                 # package entry (schemas + DTOs + overrides)
```

The build depends on `prisma-client:generate` so regenerated Zod files stay in lockstep with the Prisma schema.

## Usage

```ts
import { IngredientCreateOneSchema, IngredientFindManyResultSchema } from '@kookio/prisma-validator';

ingredientRouter.input(IngredientCreateOneSchema).output(IngredientFindManyResultSchema);
```

DTO helpers (e.g., `CreateIngredientResultDTO`) are consumed throughout the Angular app and Playwright specs to avoid duplicating API contracts.

## Overrides

`src/overrides/ingredients.ts` wraps the generated `IngredientFindManyResultSchema` to enforce stricter pagination fields (`pageSize`, `totalPages`). Extend this pattern whenever a generated schema needs bespoke validation.

## Nx targets

| Command                     | Description                                                                                                                                   |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `nx build prisma-validator` | Runs `@nx/esbuild:esbuild`, emits CJS bundles plus generated assets under `dist/libs/prisma/validator` (depends on `prisma-client:generate`). |
| `nx test prisma-validator`  | Executes Vitest (mostly structural tests today).                                                                                              |
