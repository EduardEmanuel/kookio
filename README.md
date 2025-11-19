# <img src="./web/public/icons/kookio/filled/logo.svg" alt="Kookio Logo" width="320"/>

Let's Kookio it! is an open-source, full-stack web application that helps home cooks curate ingredient inventories and discover recipes through interactive, real-time exploration. The stack follows the PAN architecture—Prisma for CockroachDB access, Analog for Angular 20 SSR, and Nx for scalable orchestration—delivering a modern developer experience with type safety and automation baked in.

## ✨ Highlights

- Full-stack PAN architecture (Prisma + Analog + Nx) with end-to-end type sharing through tRPC and Zod.
- Interactive pantry and recipe discovery flows built on Angular 20 with Analog SSR and streaming.
- Modular Nx workspace that encourages contributions via focused libraries and tooling.

**Key technologies:** TypeScript · Angular 20 · Analog · Prisma · tRPC · Nx · Vitest · Playwright

## 🛠 Architecture

- **Analog SSR + Angular 20** renders the UI, handles routing, and executes server-side logic in the same project for fast iteration.
- **tRPC** exposes strongly-typed endpoints that reuse the Prisma schema, so both client and server share a single contract.
- **Prisma** manages migrations, database access, and derived Zod types via code generation.
- **Nx** keeps projects, libraries, scripts, and executors cohesive, while Analog/Vite handle local dev and builds.
- **Vitest** and **Playwright** provide lightweight yet complete test automation across unit, integration, and end-to-end suites.

## 📦 Packages

```text
.
├── web/                         # Analog SSR Angular 20 app with tRPC client and feature modules
├── web-e2e/                     # Playwright spec suite targeting the web application
├── libs/
│   ├── data-access/prisma/      # Prisma schema, migrations, Zod generation, env-aware scripts
│   └── shared/
│       ├── mock/                # Mock fixtures (e.g., mockIngredients) for demos and seeding
│       └── utils/               # Reusable TypeScript helpers shared across apps
├── dist/                        # Build artifacts produced by Nx targets
├── nx.json                      # Workspace-wide Nx configuration and target defaults
└── vitest.workspace.ts          # Root Vitest configuration federating project test setups
```

## 📤 Prerequisites

In order to run the project make sure the following tools are installed:

| Tool | Purpose | How to Install |
|------|---------|----------------|
| **Node.js** `>= 20.11.1` + **npm** | Runtime & package manager | [nodejs.org](https://nodejs.org) |
| **CockroachDB** (Cloud or local single-node) | Database | [cockroachlabs.com/docs](https://www.cockroachlabs.com/docs/) |
| *(optional)* **Docker** | Containerized DB setup | [docker.com](https://www.docker.com/products/docker-desktop) |

### 📌 CockroachDB Note

You can use **CockroachDB Cloud** (recommended) or run a **local single-node** for development.

**Cloud (Serverless, recommended for dev/staging):**

- Create a free cluster in CockroachDB Cloud.
- Obtain the connection string (PostgreSQL wire protocol), which looks like:

  ```bash
  postgresql://USER:PASS@HOST:26257/kookio?sslmode=require&options=--cluster%3DCLUSTER_NAME
  ```

- Ensure your Prisma datasource uses `provider = "cockroachdb"`.

**Local (single-node, insecure) via Docker:**

```bash
docker run -d --name crdb -p 26257:26257 -p 8080:8080 \
  cockroachdb/cockroach:v24.2 start-single-node --insecure
docker exec -it crdb ./cockroach sql --insecure -e "CREATE DATABASE kookio;"
```

**Local via Homebrew (macOS):**

```bash
brew install cockroachdb/tap/cockroach
cockroach start-single-node --insecure --listen-addr=localhost:26257 --http-addr=localhost:8080
cockroach sql --insecure -e "CREATE DATABASE kookio;"
```

**`.env.local` example (insecure dev):**

  ```bash
  DATABASE_URL="postgresql://root@localhost:26257/kookio?sslmode=disable"
  ```

**`.env.cloud` example:**

  ```bash
  DATABASE_URL="postgresql://USER:PASS@HOST:26257/kookio?sslmode=require&options=--cluster%3DCLUSTER_NAME"
  ```

> CockroachDB speaks the PostgreSQL wire protocol, so the URL scheme is `postgresql://…`, but the Prisma provider **must** be `cockroachdb`.

## 🧭 Quickstart

> Prerequisites: Node.js `>= 20.11.1` (LTS recommended) and npm `>= 10`. The workspace also works with pnpm (`pnpm dlx nx ...`) or yarn (`yarn nx ...`) if you prefer.

### Unix/macOS/Linux

```bash
npm install
cp libs/data-access/prisma/.env.example libs/data-access/prisma/.env.local
npm run prisma:migrate-dev        # applies dev migrations and regenerates Prisma clients
npm run start:web                 # equivalent to nx serve web
```

### Windows (PowerShell)

```powershell
npm install
Copy-Item libs\data-access\prisma\.env.example libs\data-access\prisma\.env.local
npm run prisma:migrate-dev
npm run start:web
```

### Build and bundle

```bash
npm run build:web                 # runs nx build web (configured in web/project.json)
```

> If peer-dependency conflicts arise, use `npm run safe-install` to install with `--legacy-peer-deps`.

## 🔐 Environment & Database

- Environment templates live in `libs/data-access/prisma/.env.example`. Copy to `.env.local` for local development or `.env.cloud` for hosted environments.
- `scripts/prisma-with-env.ts` ensures Prisma CLI commands load variables from the chosen file via `dotenv-safe`.
- Run `npx nx run prisma:generate-local` (or `npm run prisma:migrate-dev`, which depends on generation) whenever the schema changes.
- To apply migrations against your local database: `npm run prisma:migrate-dev`. For production-ready deploys, use `npm run prisma:migrate-deploy`.
- Seed data using the bundled fixtures:
  1. Start Prisma Studio: `npm run prisma:studio`.
  2. Open the `Ingredient` model and insert the entries exported as `mockIngredients` from `libs/shared/mock/src/lib/ingredient.ts`.
  3. Save. The application now boots with meaningful sample content. (Or simply run the seed script: `npm run prisma:seed`.)

## 🎯 Nx Targets

Key targets are defined per project in their `project.json` files:

| Command | Purpose | Configuration |
| --- | --- | --- |
| `nx serve web` | Dev server with Analog SSR and HMR. | `web/project.json` |
| `nx build web` | Production build via `@analogjs/platform:vite`, outputs to `dist/web`. | `web/project.json` |
| `nx test web` | Runs Angular-aware Vitest suite (`@analogjs/vitest-angular`). | `web/project.json` |
| `nx lint web` | Lints via ESLint executor. | `web/project.json` |
| `nx kookio-icons-filled web` / `nx material-icons-filled web` | Generates SVG icon bundles with vite-node scripts. | `web/project.json` |
| `nx run prisma:migrate-dev` / `nx run prisma:migrate-deploy` | Wrap Prisma CLI with environment-aware script. | `libs/data-access/prisma/project.json` |
| `nx run prisma:studio` | Opens Prisma Studio after generating the client. | `libs/data-access/prisma/project.json` |
| `nx run prisma:seed` | Seeds the database with sample data. | `libs/data-access/prisma/project.json` |
| `nx e2e web-e2e` | Executes Playwright E2E specs. | `web-e2e/project.json` |

Workspace-wide defaults, caching, and plugin wiring (Angular, Playwright, Vite) live in `nx.json`.

## ✅ Testing

- **Unit & component tests (Vitest):** `npm run test:web` composes Angular test harnesses via `@analogjs/vitest-angular`. Shared options live in `vitest.workspace.ts`.
- **End-to-end tests (Playwright):** `npm run e2e:web` launches the Playwright runner configured in `web-e2e/playwright.config.ts`. It targets the SSR dev server, so ensure `nx serve web` is running or let Nx manage the lifecycle.
- Coverage reporting is available through Vitest's V8 instrumentation (`@vitest/coverage-v8`) if you pass `--coverage` to the test target.

## 📜 Scripts

### Web

| Script | Description |
|--------|-------------|
| `npm run start:web` | Serves the `web` application locally using SSR. |
| `npm run build:web` | Builds the `web` application (both client and SSR output). |
| `npm run test:web` | Runs unit tests (`Vitest`) for the `web` app. |
| `npm run lint:web` | Runs `ESLint` to lint the `web` app codebase. |
| `npm run e2e:web` | Executes end-to-end tests (`Playwright`) for the `web` app. |
| `npm run kookio-icons-filled:web` | Generates a custom icon module for `web`. |
| `npm run material-icons-filled:web` | Imports and optimizes the Material Icons set. |

### Prisma

| Script | Description |
|--------|-------------|
| `npm run prisma:migrate-dev` | Creates and applies local migrations using `.env.local`. |
| `npm run prisma:migrate-deploy` | Applies production migrations using `.env.cloud`. |
| `npm run prisma:push-local` | Pushes the Prisma schema to the local DB without migrations. |
| `npm run prisma:push-cloud` | Pushes the schema directly to the cloud database. |
| `npm run prisma:resel-local` | Resets the local DB and reruns the seed script. |
| `npm run prisma:seed` | Executes the initial seed script. |
| `npm run prisma:studio` | Launches Prisma Studio to explore and edit data. |

### General

| Script | Description |
|--------|-------------|
| `npm run affected` | Lists projects affected by the current Git changes. |
| `npm run format` | Applies formatting rules using `nx format:write`. |
| `npm run safe-install` | Installs dependencies with `--legacy-peer-deps` for compatibility. |

All scripts are defined in `package.json` and delegate to the corresponding Nx target for consistency across package managers (`npx nx`, `pnpm nx`, or `yarn nx`).

## 🚀 Future Directions

- Harden CockroachDB usage (backup/restore, multi-region patterns, changefeeds).
- Introduce AI-powered microservices that propose recipes and pantry optimisations.
- Integrate Firebase Authentication for passwordless and social login flows.
- Add Redis caching layers for session storage and recipe search acceleration.

## 📄 Thesis Context

This project is accompanied by a Computer Science bachelor thesis that documents its design and implementation.

➡️ The thesis source files are maintained separately in [`kookio-thesis`](https://github.com/EduardEmanuel/kookio-thesis), which contains:

- Source code written in LaTeX
- Build automation scripts for Unix, PowerShell, and CMD
- PDF artifacts for milestone backups

> Note: All LaTeX-specific instructions, prerequisites, and bibliography management are now documented exclusively in the [kookio-thesis repository](https://github.com/EduardEmanuel/kookio-thesis/blob/main/README.md).

## 📄 License

Licensed under the [Apache License 2.0](LICENSE).
