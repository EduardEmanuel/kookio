# Let's Kookio it

Let's Kookio it! is an open-source, full-stack web application that helps home cooks curate ingredient inventories and discover recipes through interactive, real-time exploration. The stack follows the PAN architecture—Prisma for PostgreSQL access, Analog for Angular 20 SSR, and Nx for scalable orchestration—delivering a modern developer experience with type safety and automation baked in.

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

## 📦 Prerequisites

In order to run the project make sure the following tools are installed:

| Tool | Purpose | How to Install |
|------|---------|----------------|
| **Node.js** `>= 20.11.1` + **npm** | Runtime & package manager | [nodejs.org](https://nodejs.org) |
| **PostgreSQL** `>= 14` | Local database | [postgresql.org/download](https://www.postgresql.org/download/) |
| *(optional)* **Docker** | Containerized DB setup | [docker.com](https://www.docker.com/products/docker-desktop) |

### 📌 PostgreSQL Note

You may install PostgreSQL via:

- **Homebrew (macOS):** `brew install postgresql@14`
- **APT (Ubuntu/Debian):** `sudo apt install postgresql`
- **Windows Installer:** via [EnterpriseDB](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

Once installed, create the development database:

```sql
CREATE DATABASE kookio_dev;
```

Update `.env.local` if needed with your PostgreSQL credentials.

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
  3. Save. The application now boots with meaningful sample content. (A dedicated CLI seed target is planned—see *Future directions*.)

## 🎯 Nx Targets

Key targets are defined per project in their `project.json` files:

| Command | Purpose | Configuration |
| --- | --- | --- |
| `nx serve web` | Dev server with Analog SSR, HMR, and icon symlink dependency (`postbuild-ssr-symlink`). | `web/project.json` |
| `nx build web` | Production build via `@analogjs/platform:vite`, outputs to `dist/web`. | `web/project.json` |
| `nx test web` | Runs Angular-aware Vitest suite (`@analogjs/vitest-angular`). | `web/project.json` |
| `nx lint web` | Lints via ESLint executor. | `web/project.json` |
| `nx kookio-icons-filled web` / `nx material-icons-filled web` | Generates SVG icon bundles with vite-node scripts. | `web/project.json` |
| `nx run prisma:migrate-dev` / `nx run prisma:migrate-deploy` | Wrap Prisma CLI with environment-aware script. | `libs/data-access/prisma/project.json` |
| `nx run prisma:studio` | Opens Prisma Studio after generating the client. | `libs/data-access/prisma/project.json` |
| `nx e2e web-e2e` | Executes Playwright E2E specs. | `web-e2e/project.json` |

Workspace-wide defaults, caching, and plugin wiring (Angular, Playwright, Vite) live in `nx.json`.

## ✅ Testing

- **Unit & component tests (Vitest):** `npm run test:web` composes Angular test harnesses via `@analogjs/vitest-angular`. Shared options live in `vitest.workspace.ts`.
- **End-to-end tests (Playwright):** `npm run e2e:web` launches the Playwright runner configured in `web-e2e/playwright.config.ts`. It targets the SSR dev server, so ensure `nx serve web` is running or let Nx manage the lifecycle.
- Coverage reporting is available through Vitest's V8 instrumentation (`@vitest/coverage-v8`) if you pass `--coverage` to the test target.

## 📜 Scripts

| Script | Description |
| --- | --- |
| `npm run start:web` | Alias for `nx serve web`. |
| `npm run build:web` | Alias for `nx build web`. |
| `npm run test:web` | Runs the Vitest suite for the web app. |
| `npm run lint:web` | ESLint for the web project. |
| `npm run e2e:web` | Playwright tests against the `web` app (`web-e2e` project). |
| `npm run kookio-icons-filled:web` | Generates application-specific icon module. |
| `npm run material-icons-filled:web` | Imports Material icon set and builds a tree-shaken bundle. |
| `npm run postbuild-ssr-symlink:web` | Post-build helper that links SSR artifacts with library outputs. |
| `npm run prisma:migrate-dev` | Runs Prisma migrations locally (depends on `generate-local`). |
| `npm run prisma:migrate-deploy` | Applies migrations in a CI/production environment (uses `.env.cloud`). |
| `npm run prisma:studio` | Opens Prisma Studio with the local environment loaded. |
| `npm run affected` | Lists projects affected by your current changes. |
| `npm run format` | Runs `nx format:write` to apply workspace formatting rules. |
| `npm run safe-install` | Installs dependencies with `--legacy-peer-deps` for compatibility. |

All scripts are defined in `package.json` and delegate to the corresponding Nx target for consistency across package managers (`npx nx`, `pnpm nx`, or `yarn nx`).

## 🚀 Future Directions

- Migrate the relational backend to CockroachDB for effortless horizontal scaling.
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
