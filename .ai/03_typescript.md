# TypeScript Guidelines

> **Status: Active** — strict mode and the conventions described here are enforced across the codebase via `tsconfig.base.json`, ESLint, and CI.

## Compiler

- Always use strict mode (`"strict": true` in `tsconfig.json`)
- No implicit `any` (`"noImplicitAny": true`)
- Strict null checks (`"strictNullChecks": true`)

## Types

- Prefer type inference when the type is obvious — do not annotate unnecessarily
- Avoid `any` — use `unknown` when the type is uncertain, then narrow explicitly
- Use `never` to enforce exhaustive checks in switch/discriminated unions
- Prefer `interface` for object shapes that may be extended
- Prefer `type` for unions, intersections, mapped types, and utility compositions
- Use utility types where appropriate: `Partial<T>`, `Required<T>`, `Readonly<T>`,
  `Pick<T, K>`, `Omit<T, K>`, `ReturnType<T>`, `Parameters<T>`, `NonNullable<T>`
- Use `satisfies` operator to validate types without widening
- Avoid type assertions (`as T`) — prefer type guards or narrowing

## Generics

- Use generics to write reusable, type-safe abstractions
- Constrain generics explicitly when possible: `<T extends object>`
- Avoid overly complex generic chains that reduce readability
- Name generic parameters descriptively beyond single letters for complex types:
  `TEntity`, `TResponse`, `TPayload`

## Patterns

- Use discriminated unions for modeling state variants:

```typescript
type State = { status: 'loading' } | { status: 'success'; data: T } | { status: 'error'; error: string };
```

- Use type guards (`is`) for runtime narrowing:

```typescript
function isUser(value: unknown): value is User {
  return typeof value === 'object' && value !== null && 'id' in value;
}
```

- Use `const` assertions for literal types: `as const`
- Use `readonly` on arrays and object properties where mutation is not intended

## Naming

- Types and interfaces: `PascalCase`
- Enums: `PascalCase` with `PascalCase` members
- Prefer union string literals over enums where possible:
  `type Direction = 'left' | 'right'` instead of `enum Direction`

## Imports

- Use path aliases defined in `tsconfig.json` — avoid deep relative imports (`../../../`)
- Group imports: Angular core → Angular libraries → third party → internal
- Within a file, order import groups as follows, each separated by a blank line:
  1. **External** — `node:*` built-ins and npm packages, alphabetical
  2. **Internal** — relative imports, sorted descending by path depth (`../../` before `../` before `./`);
     alphabetical within the same depth level
- Never mix external and internal imports in the same group

```typescript
// ✅ correct
import * as fs from 'node:fs';
import * as path from 'node:path';

import { prisma, type IngredientCatalogSeedRow, type MealAreaSeedRow } from '@kookio/prisma-client';

import { logger } from './seed-helpers';
```

## Tooling

- ESLint for linting — do not disable rules without a comment explaining why
- Prettier for formatting — do not manually format what Prettier handles
- CI should fail on lint errors and formatting violations
- **Before writing or generating any code**, read the active ESLint config (`eslint.config.*`) and Prettier config (`.prettierrc`) to understand enforced rules — never write code that violates them
