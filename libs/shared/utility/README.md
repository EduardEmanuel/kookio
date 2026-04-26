# @kookio/shared-utility

Cross-cutting helpers shared by both the backend (tRPC) and the Angular app. The initial focus is logging-friendly “labelers” that turn Prisma where/data payloads into readable strings so logs stay actionable without dumping JSON blobs.

## Modules

| Path                                       | Description                                                                                                           |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `src/lib/labeling/make-entity-labelers.ts` | Factory that builds `label`, `fromWhere`, `fromCreateData`, and `fromCreateManyData` helpers based on key-path rules. |
| `src/lib/labeling/ingredient-labelers.ts`  | Instantiation for the Prisma `Ingredient` model, used in both `apps/web` services and `libs/server/trpc`.             |

Vitest specs (`*.spec.ts`) cover custom rules, default fallbacks (`id`/`name`), and createMany summaries.

## Usage

```ts
import { ingredientLabelers } from '@kookio/shared-utility';

const label = ingredientLabelers.fromWhere({
  userId_name: { userId: 'seed-user', name: 'Flour' },
});
// -> "ingredient(user=seed-user, name=Flour)"
```

The same helpers are used inside:

- `apps/web/src/app/services/ingredient/ingredient.service.ts` to annotate client-side logs.
- `libs/server/trpc/src/lib/routers/ingredient.router.ts` to prefix mutations/queries.

When adding new entities, create `<entity>-labelers.ts` next to the ingredient one and keep the deterministic key-path rules in sync with Prisma.

## Nx targets

| Command            | Description                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------- |
| `nx build utility` | Bundles the utilities with `@nx/esbuild:esbuild` and outputs to `dist/libs/shared/utility`. |
| `nx test utility`  | Runs Vitest via `@nx/vite:test` (fast, no DOM).                                             |
