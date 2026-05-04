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

### Code is English-only

All identifiers, doc-comments, inline comments, log messages, and
strings checked into the repo must be written in English. Task briefs,
PR descriptions, and chat may be in any language; the source must not
inherit that language. The project is open-source and contributor-facing,
and mixed-language code is harder to grep, search, and review.

When a task brief is in Romanian, treat it as author-private context —
translate identifiers, comments, and field labels to English in the
actual edit. Romanian phrasing in a brief (model field comments, log
messages, slugs that look like Romanian labels, etc.) is a hint, not a
literal spec. This applies even when a file already contains
diacritic-laden comments from earlier work; new edits are still English.

### Custom workspace ESLint rules live at `tools/lint/`

Workspace-local rule plugins are at **`tools/lint/<rule>.mjs`** and
registered as a local plugin in `eslint.config.mjs`. Active rules:

- `@kookio/no-legacy-mat-button` — bans legacy `mat-*-button` selectors
  (autofix to the unified M3 `[matButton]` API).
- `@kookio/no-unknown-icon-name` — flags `<kookio-icon name="X">`
  literals not in the Material Symbols manifest at
  `libs/shared/utility/src/lib/material-symbols-icons.ts`.
- `@kookio/no-unknown-emoji-char` — flags `<kookio-emoji char="X">`
  literals whose Twemoji SVG is missing from
  `apps/web/public/icons/twemoji/`.

Tests live under `tools/lint/` and run as a focused vitest project
(`tools/lint/vitest.config.mjs`) using `RuleTester` from
`@typescript-eslint/rule-tester` plus `@angular-eslint/template-parser`.

**Do NOT use `tools/eslint-rules/`** — that path is auto-detected by
`@nx/eslint-plugin` and expects a TypeScript build pipeline with
`tools/eslint-rules/tsconfig.json`. Plain ESM rules placed there break
`nx lint` with `ENOENT: tools/eslint-rules/tsconfig.json`.

Rule objects must use arrow function syntax (`create: (context) => {…}`),
not method shorthand — `prefer-arrow/prefer-arrow-functions` is enforced
workspace-wide and blocks the commit otherwise. Manifest-loader rules
should fail open (return no visitors) when the manifest is missing
rather than flagging every literal as invalid; otherwise a fresh clone
without `npm run build:icons` reports false positives on every line.

### Angular template linting

`*.html` files and inline `template:` strings are linted via
`@angular-eslint` v20 flat config wired in `eslint.config.mjs`:

- HTML files: `angular.templateParser` +
  `angular.configs.templateRecommended` (banana-in-box, eqeqeq,
  no-negated-async).
- TS files: `angular.tsPlugin` + `angular.configs.tsRecommended` +
  `angular.processInlineTemplates` so HTML rules apply to inline
  `template:` strings as well.

`angular.configs.templateAccessibility` is **not** activated yet — it
exists but switching it on surfaces a backlog of violations the project
hasn't paid down. Leave it for a focused PR with bandwidth to fix what
it reports.

The two manifest rules above complement (do **not** replace) the CI
gates `npm run build:icons:check` and `npm run build:twemoji:check`.
ESLint catches the common case (forgot to regenerate the manifest after
adding a name); the CI scripts catch inverse drift (manifest entries
that no longer have any consumer, manual edits that desync the woff2 or
SVG output).
