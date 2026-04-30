# Scripts

Helper utilities that support local development and CI.

## with-vercel-env.mjs

Wrapper around the Vercel CLI that pulls environment variables into `tmp/kookio.env` and then runs whatever Nx command you pass through. Key flags:

- `--env=<development|preview|production>` (default `development`)
- `--team`, `--token`, `--no-yes` mirror the Vercel CLI options
- Everything after `--` is treated as the command to run (e.g., `nx serve web`)

We use this from npm scripts such as `npm run start:web`, `npm run migrate-dev:prisma-client`, and `npm run e2e:web` to guarantee local runs match the Vercel environment configuration.

## bench-preview.mjs

Preview-database latency probe invoked via `npm run bench:preview`. It:

1. Calls `with-vercel-env.mjs --env=preview` to pull preview credentials.
2. Runs a short battery of CockroachDB queries (N=100 by default).
3. Prints aggregate metrics (avg, p50, p95) for quick diagnostics.

Sample output:

```text
Vercel CLI 50.x — downloading preview env...
OK — running DB latency sample (N=100)
avg=4.1ms p50=3.6ms p95=7.8ms
```

Notes:

- Ensure preview env variables exist in Vercel and the CLI is linked locally.
- Keep this helper out of hot paths; it is meant for ad-hoc checks or CI diagnostics.

## build-material-symbols-icons.ts

Generates a subsetted [Material Symbols Outlined](https://fonts.google.com/icons) variable font, scoped to the icons actually used in the codebase. The full font ships ~3500 glyphs at 3.9 MB; we use 24 ligatures, so the subset weighs ~29 KB without giving up any of the variable axes (`FILL`, `GRAD`, `opsz`, `wght`).

Run it via the npm scripts:

- `npm run build:icons` — regenerate the manifest and woff2 when the set of icons changes.
- `npm run build:icons:check` — read-only audit. Exits non-zero if a regen would change either output. Intended for CI.

### Inputs and outputs

| Path                                                                            | Role                                                                                                                                                                                            |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apps/web/src/**`, `libs/**`                                                    | Scanned for icon usage. `*.spec.ts`, `node_modules`, `dist`, `.nx`, and the manifest itself are excluded.                                                                                       |
| `libs/shared/utility/src/lib/material-symbols-icons.ts`                         | Auto-generated manifest. Exports `MATERIAL_SYMBOLS_ICONS` (sorted readonly tuple) and `MaterialSymbolName` (union derived as `(typeof MATERIAL_SYMBOLS_ICONS)[number]`). Committed to the repo. |
| `apps/web/public/fonts/material-symbols/MaterialSymbolsOutlined-variable.woff2` | Subsetted variable font, served at `/fonts/material-symbols/...`. Committed.                                                                                                                    |

### Why auto-scan instead of a hand-maintained manifest

The codebase is the manifest. Adding an icon is just writing it in a template or a config — the next `npm run build:icons` picks it up, regenerates the typed manifest, and re-fetches a fresh subset. Removing one works the same way. There is no separate JSON or list to keep in sync, and no risk of drift between "icons we ship" and "icons we render".

The script collects icons by matching four patterns across HTML and TypeScript files:

| Pattern                       | Matches                                                                  |
| ----------------------------- | ------------------------------------------------------------------------ |
| `<mat-icon>name</mat-icon>`   | Static template usage of Angular Material's icon component.              |
| `<kookio-icon name="name" />` | The typed wrapper introduced after Phase 2 of the migration.             |
| `icon: 'name'`                | Config arrays such as the nav items in `bottom-tabs` and `sidenav-menu`. |
| `icon="name"`                 | Inline-template attributes such as `<kookio-page-stub icon="..." />`.    |

Anything outside these patterns — for example an icon name assembled at runtime via string concatenation or fetched from an API — is invisible to the scanner. If that case shows up, the cleanest fix is to push the icon name through one of the recognised patterns (e.g. a typed config array) rather than to expand the scanner.

### Why Google Fonts CSS instead of a local subsetting tool

Google Fonts exposes an `icon_names` query parameter on the [CSS API](https://fonts.googleapis.com/css2). Calling it with the comma-joined icon list returns a `@font-face` whose `src` URL points at a pre-subsetted woff2 — done server-side with harfbuzz, with the variable axes preserved. The script just curls the CSS, parses out the woff2 URL, and downloads the binary.

The alternative — subsetting locally with `subset-font` (Wasm harfbuzz) or `pyftsubset` (Python fonttools) — produces the same output but adds either an npm dependency tree or a Python toolchain. Since the script only runs when icons change (not on every build), depending on Google Fonts at script-run time is an acceptable trade-off.

A modern desktop User-Agent header is sent on the CSS request: Google serves a static font to older agents and only returns the variable woff2 to ones that declare support.

### How idempotency works

There is no separate hash file. The committed manifest TypeScript file _is_ the hash — it lists the icons we expect, in deterministic alphabetical order. Each run:

1. Scans the codebase into a `Set<string>`.
2. Parses the committed manifest into another `Set<string>`.
3. If the sets are equal and the woff2 file exists on disk, exits with no work done.
4. Otherwise regenerates the manifest, fetches a fresh subset, and writes both files.

In `--check` mode the script never reaches step 4 — if the sets diverge it prints the diff (added/removed icons), reports whether the woff2 is missing, and exits with code 1 so CI fails the PR. Because `--check` only reads files, it does not need network access.

### Sample output

```text
Scanning codebase for icon usage...
✓ Icons up-to-date (24 icons)
```

```text
Scanning codebase for icon usage...
Writing manifest (25 icons)...
Fetching subset woff2 from Google Fonts...
✓ Wrote subset woff2 (29.4 KB)
```

```text
Scanning codebase for icon usage...
✗ Icon manifest out of date. Run: npm run build:icons
  Added:   bug_report
  Removed: error
```
