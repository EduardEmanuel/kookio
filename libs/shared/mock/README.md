# @kookio/shared-mock

Deterministic fixtures shared across the workspace. Today it exposes a single `mockIngredients` array that mirrors the Prisma `Ingredient` model and gives tests, seeds, and demos the same predictable dataset.

## What lives here?

- `src/lib/ingredient.ts` &rarr; exported `mockIngredients` list with timestamps, units, and `userId` markers.
- `src/lib/ingredient.spec.ts` &rarr; Vitest coverage to ensure the fixture stays in sync with the prisma schema shape.

Consumers:

- `apps/web` uses the data to render pantry examples on the landing flow.
- `apps/web/src/app/services/ingredient/ingredient.service.spec.ts` relies on the list when validating service logic.
- `libs/prisma-client/src/scripts/seed.ts` seeds CockroachDB with the same sample rows when running `nx seed prisma-client`.

## Usage

```ts
import { mockIngredients } from '@kookio/shared-mock';

await prisma.ingredient.createMany({ data: mockIngredients });
```

Keep additions deterministic (fixed timestamps + `userId`s) so downstream snapshot tests remain stable.

## Nx targets

| Command                | Description                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| `nx build shared-mock` | Bundles the library with `@nx/esbuild:esbuild` (CommonJS output under `dist/libs/shared/mock`). |
| `nx test shared-mock`  | Executes Vitest via `@nx/vite:test`.                                                            |

Both targets are dependency-free and run quickly, so they are safe to include in `nx affected`.
