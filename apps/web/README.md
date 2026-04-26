# web (Analog SSR app)

Feature app built with [Analog](https://analogjs.org/) on top of Angular 20 + Vite. It renders the pantry UI, exposes `/api` routes via Nitro, and ships the tRPC client for browser + server usage.

## Highlights

- SSR-first: `nx serve web` runs the Analog dev server (Vite + Nitro). Production builds output both browser and server bundles (`dist/apps/web/{browser,server}`) for deployment.
- PAN stack integration: consumes `@kookio/prisma-client`, `@kookio/prisma-client/dtos`, `@kookio/server-trpc`, and `@kookio/shared-*` packages for type-safe APIs and shared mocks.
- Icon tooling: scripts under `apps/web/scripts` generate the Kookio SVG icon set via `vite-node`.
- tRPC integration: `src/trpc-client.ts` wires Analog’s tRPC plugin to the router exposed by `libs/server/trpc`.

## Nx targets

| Target                       | Description                                                                                                                             |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `nx serve web`               | Dev server with HMR (uses Vite, automatically starts Nitro SSR server). Use `npm run start:web` to pull env vars via `with-vercel-env`. |
| `nx build web`               | Runs `@analogjs/platform:vite` to produce client + server bundles. Configurations: `development` (sourcemaps) and `production`.         |
| `nx test web`                | Executes Vitest for component/service specs via `@analogjs/vitest-angular`.                                                             |
| `nx lint web`                | Lints through `@nx/eslint:lint`.                                                                                                        |
| `nx extract-i18n web`        | Runs Angular i18n extractor over the SSR entry.                                                                                         |
| `nx serve-static web`        | Serves the built browser bundle on port 4200 (useful for quick QA).                                                                     |
| `nx kookio-icons-filled web` | Regenerates `kookio-icons.ts` from SVGs in `public/icons/kookio` (see `apps/web/scripts`).                                              |
| `nx reset web`               | Convenience target to clean `.vite` caches via `rimraf` after `nx reset`.                                                               |

## Directory tour

```
apps/web/
├── src/
│   ├── app/                 # Angular components, routes, services
│   ├── server/              # Nitro handlers (api/health, trpc, redis wiring)
│   ├── trpc-client.ts       # Analog tRPC client setup
│   ├── main.ts / main.server.ts
│   └── styles.css
├── public/                  # Icons, manifest, static assets
├── scripts/                 # Icon pipelines (vite-node based)
├── nitro-modules/           # Helper for tsconfig paths during Nitro builds
└── vite.config.ts           # Analog/Vite config (SSR + Nitro integration)
```

## Environment

Local development relies on the repo-level `npm run with:env` helper to hydrate Vercel env vars before launching Nx targets. Key variables:

- `DATABASE_URL` (CockroachDB) for SSR routes that hit Prisma.
- `VERCEL_*` + `TRPC_*` values pulled automatically when using `npm run start:web` or `npm run build:web`.

## Testing & E2E

- Component/unit tests live under `src/**/*.spec.ts` and run via `nx test web`.
- Playwright (`apps/web-e2e`) depends on this app as an implicit dependency, so changes here trigger e2e re-runs in CI.

## Deployment notes

The CI pipeline (`.github/workflows/pipeline.yml`) uses `nx build web` followed by Vercel deployments. Prisma migrations run ahead of the previews/production jobs to keep CockroachDB in sync.
