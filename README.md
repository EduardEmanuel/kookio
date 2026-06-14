# <img src="./apps/web/public/icons/pwa/source.svg" alt="Kookio Logo" width="320"/>

Let's Kookio it! is an open-source pantry companion built with the PAN stack—Prisma, Analog, and Nx. The repo hosts both the Analog SSR app and the supporting libraries that make end-to-end type safety possible.

## ✨ Highlights

- Full-stack PAN architecture: Analog 20 + Vite + Nitro on the frontend, Prisma + tRPC + CockroachDB on the backend.
- Shared types via `@kookio/prisma-client`, so APIs, seeds, tests, and UI stay in sync.
- Modular Nx workspace with reusable scripts (Vercel env wiring, Prisma migrations, Playwright E2E).
- CI/CD powered by reusable GitHub workflows and composite actions that mirror the local Nx targets.

**Key technologies:** TypeScript · Angular 20 · Analog · Prisma · tRPC · Nx · Vitest · Playwright

## 🧭 Quickstart

```bash
npm ci                                  # install
npm run migrate-dev:prisma-client       # create/apply local migrations
npm run start:web                       # run Analog SSR with env parity via with-vercel-env
```

Prefer pnpm or yarn? Swap `npm run` with `pnpm`/`yarn`—everything delegates to Nx targets.

Prerequisites: Node.js ≥ 20.11.1, npm ≥ 10, CockroachDB (Cloud or local), and the Vercel CLI (used to pull env vars before running Nx targets).

## 📤 Prerequisites (fast path)

| Tool                             | Why                                               | Where                                                         |
| -------------------------------- | ------------------------------------------------- | ------------------------------------------------------------- |
| **Node.js** ≥ 20.11.1 + **npm**  | Run Nx/Analog/Prisma tooling                      | [nodejs.org](https://nodejs.org)                              |
| **CockroachDB** (Cloud or local) | Primary database                                  | [cockroachlabs.com/docs](https://www.cockroachlabs.com/docs/) |
| **Vercel CLI**                   | Pull env vars (`with-vercel-env`) + deploy parity | [vercel.com/docs/cli](https://vercel.com/docs/cli)            |
| _(optional)_ **Docker**          | Spin up Cockroach locally in seconds              | [docker.com](https://www.docker.com/products/docker-desktop)  |

> `with-vercel-env.mjs` relies on the Vercel CLI to hydrate `tmp/kookio.env` before running Nx commands.

### 📌 CockroachDB options

- **Cloud (recommended)** → create a free Serverless cluster, copy the PostgreSQL-style connection string, keep `provider = "cockroachdb"` in `schema.prisma`.
- **Local single-node** → use the Docker snippet below or Homebrew if you’re on macOS.

```bash
# Docker: one-liner for dev
docker run -d --name crdb -p 26257:26257 -p 8080:8080 \
  cockroachdb/cockroach:v24.2 start-single-node --insecure
docker exec -it crdb ./cockroach sql --insecure -e "CREATE DATABASE kookio;"
```

## 🌍 Environments

Kookio runs across three isolated environments, each backed by a dedicated
CockroachDB database and mapped to a Vercel environment and a GitHub branch:

| Branch | Vercel Environment | CockroachDB   | Purpose                                          |
| ------ | ------------------ | ------------- | ------------------------------------------------ |
| `dev`  | Preview (dev)      | `kookio_dev`  | Developer sandbox — quick preview of WIP changes |
| `test` | Preview (test)     | `kookio_test` | E2E validation before promotion to production    |
| `main` | Production         | `kookio_prod` | Public production deployment                     |

Each database has two roles:

- `kookio_app` — runtime role used by the app (SELECT / INSERT / UPDATE / DELETE)
- `kookio_migrate` — migration role used only by CI/CD (full DDL + DML)

Connection URLs are stored as secrets in:

- **Vercel** → Project Settings → Environment Variables (scoped per environment)
- **GitHub** → Settings → Environments (`development` / `testing` / `production`)

For the full database architecture, roles, and migration flow, see
[`libs/prisma-client/README.md`](./libs/prisma-client/README.md).

## 🗂 Workspace map

```text
apps/
  web/          -> Angular + Analog SSR app (see apps/web/README.md)
  web-e2e/      -> Playwright specs + helpers (see apps/web-e2e/README.md)
libs/
  core/
    config/     -> App-wide config constants
    logging/    -> Audit event types + logging contracts
    security/   -> Security utilities
  feature/
    auth/       -> Firebase auth guards, interceptors, AuthStore
    shell/      -> App shell layout components
  prisma/
    client/     -> Prisma schema, migrations, generated Zod schemas, seed (libs/prisma-client/README.md)
  server/
    auth/       -> Firebase Admin SDK token verification
    logger/     -> Shared Pino wrapper for backend + scripts (libs/server/logger/README.md)
    trpc/       -> tRPC router/context/config exports (libs/server/trpc/README.md)
  shared/
    mock/       -> Deterministic fixtures (libs/shared/mock/README.md)
    ui/         -> Reusable UI components
    utility/    -> Labeling helpers consumed by API + client (libs/shared/utility/README.md)
```

Each project README is the source of truth for its targets, environment needs, and usage patterns.

## 📚 Documentation index

| Area                                                        | Where to read                                                                                                                                       |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Analog app architecture, routes, icons                      | `apps/web/README.md`                                                                                                                                |
| Playwright/E2E strategy                                     | `apps/web-e2e/README.md`                                                                                                                            |
| Prisma schema, migrations, seeding, Cockroach SQL bootstrap | `libs/prisma-client/README.md`                                                                                                                      |
| ER diagram (interactive, click-through relationships)       | [dbdocs.io/dinea.eduard/kookio-db](https://dbdocs.io/dinea.eduard/kookio-db?schema=public&view=relationships) — password protected (ask maintainer) |
| ER diagram (offline PDF)                                    | [`Kookio_DB_Diagram.pdf`](./Kookio_DB_Diagram.pdf)                                                                                                  |
| tRPC server/router + configs                                | `libs/server/trpc/README.md`                                                                                                                        |
| Logger + labeling utilities + shared mocks                  | Respective `libs/**/README.md` files                                                                                                                |

For the full list of Nx targets run `npx nx graph` or inspect each `project.json`.

## 🔧 Tooling & workflows

- **Nx orchestration:** `package.json` scripts forward to Nx targets. Use `nx graph` or `nx show project <name>` to inspect configs.
- **Environment parity:** `scripts/with-vercel-env.mjs` pulls Vercel env vars into `tmp/kookio.env` and runs Nx commands with those variables injected. All scripts prefixed with `npm run with:env -- --env=<stage>` rely on it.
- **Prisma/DB:** CockroachDB connection lives in `libs/prisma-client/schema.prisma` (`provider = "cockroachdb"`, `DATABASE_URL`). Run `npm run migrate-dev:prisma-client` to generate + migrate locally, `npm run migrate-deploy:prisma-client` for production/test deploys, and `npm run seed:prisma-client` (requires `SEED_USER_ID`) for fixtures.
- **Monitoring helpers:** `npm run bench:preview` exercises a few queries against the preview DB to measure latency (implemented in `scripts/bench-preview.mjs`). See `scripts/README.md` for script details.

## ✅ Testing & quality

- Unit/feature tests: `nx test <project>` wraps Vitest (`@analogjs/vitest-angular` for the Angular app).
- Linting/formatting: `nx lint <project>` and `nx format:[write|check]`. Husky runs `lint-staged` on commit and `nx affected -t lint test [build]` on push.
- Playwright: `nx e2e web-e2e` (or `npm run e2e:web`) spins up the Analog dev server if needed, ensures Cockroach is reachable, and exercises the public/trpc flows. CI reuses `.github/workflows/_e2e.yml` to run the exact same target against preview URLs.

## 🚀 CI/CD snapshot

`.github/workflows/pipeline.yml` orchestrates the stages:

1. `_ci.yml` reusable workflow runs Nx affected targets.
2. Prisma migrations (`prisma-migrate` composite Action) for dev/test/prod branches.
3. Vercel URL resolution + `/api/health` smoke tests via composite actions.
4. `_e2e.yml` Playwright suite against preview/test environments.
5. Notifications via `dawidd6/action-send-mail` whenever a stage fails.

All actions live under `.github/actions/*` so changes mimic local Nx targets (checkout + setup-node + `npm ci --legacy-peer-deps`).

## 🧩 Future directions

- Harden CockroachDB with backups, changefeeds, and multi-region patterns.
- Layer Redis caches for session storage and search acceleration.

## 📄 Thesis reference

This project is accompanied by a Computer Science bachelor thesis that documents its design and implementation.

➡️ Sources live in [`kookio-thesis`](https://github.com/EduardEmanuel/kookio-thesis), which contains:

- LaTeX source files
- Build automation scripts for Unix, PowerShell, and CMD
- PDF artifacts for milestones/backups

## 📄 License

Licensed under the [Apache License 2.0](LICENSE).
