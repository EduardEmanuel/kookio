# <img src="./web/public/icons/kookio/filled/logo.svg" alt="Kookio Logo" width="320"/>

Let's Kookio it! is an open-source, full-stack web application that helps home cooks curate ingredient inventories, laying the groundwork for future recipe discovery through interactive, real-time exploration. The stack follows the PAN architecture—Prisma for CockroachDB access, Analog for Angular 20 SSR, and Nx for scalable orchestration—delivering a modern developer experience with type safety and automation baked in.

## ✨ Highlights

- Full-stack PAN architecture (Prisma + Analog + Nx) with end-to-end type sharing through tRPC and Zod.
- Interactive pantry flows built on Angular 20 with Analog SSR and streaming.
- Modular Nx workspace that encourages contributions via focused libraries and tooling.

**Key technologies:** TypeScript · Angular 20 · Analog · Prisma · tRPC · Nx · Vitest · Playwright

## 🛠 Architecture

- **Analog SSR + Angular 20** renders the UI, handles routing, and executes server-side logic in the same project for fast iteration.
- **tRPC** exposes strongly-typed endpoints derived from the Prisma data model.
- **Prisma** manages migrations, database access, and derived Zod types via code generation.
- **Nx** keeps projects, libraries, scripts, and executors cohesive, while Analog/Vite handle local dev and builds.
- **Vitest** and **Playwright** provide the foundation for unit and end-to-end testing, with coverage expanding iteratively.

## 📦 Packages

```text
├── web/                         # Analog SSR Angular 20 app with tRPC client and feature modules
├── web-e2e/                     # Playwright spec suite targeting the web application
├── libs/
│   ├── prisma/
│   │   ├── client        # Prisma schema, migrations, env-aware scripts
│   │   └── validator     # Zod schemas from Prisma, DTOs from Zod, Zod overrides
│   └── shared/
│       ├── mock/                # Mock fixtures (e.g., mockIngredients) for demos and seeding
│       └── utils/               # Reusable TypeScript helpers shared across apps
├── dist/                        # Build artifacts produced by Nx targets
├── nx.json                      # Workspace-wide Nx configuration and target defaults
└── vitest.workspace.ts          # Root Vitest configuration federating project test setups
```

## 📤 Prerequisites

In order to run the project, make sure the following tools are installed:

| Tool | Purpose | How to Install |
|------|---------|----------------|
| **Node.js** `>= 20.11.1` + **npm** | Runtime & package manager | [nodejs.org](https://nodejs.org) |
| **CockroachDB** (Cloud or local single-node) | Database | [cockroachlabs.com/docs](https://www.cockroachlabs.com/docs/) |
| **Vercel CLI** | Environment management & deployment parity | [vercel.com/docs/cli](https://vercel.com/docs/cli) |
| *(optional)* **Docker** | Containerized local DB setup | [docker.com](https://www.docker.com/products/docker-desktop) |

> The Vercel CLI is used to synchronize environment variables locally with the cloud configuration, ensuring parity between local development and deployed environments.

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

> CockroachDB speaks the PostgreSQL wire protocol, so the URL scheme is `postgresql://…`, but the Prisma provider **must** be `cockroachdb`.

## 🧭 Quickstart

> Prerequisites: Node.js `>= 20.11.1` (LTS recommended) and npm `>= 10`. The workspace also works with pnpm (`pnpm dlx nx ...`) or yarn (`yarn nx ...`) if you prefer.
> The first time, you may need to run `vercel link` to connect this repo to the Vercel project.

### Serve locally

```bash
npm install
npm run migrate-dev:client # applies dev migrations and regenerates Prisma clients
npm run start:web                 # equivalent to nx serve web
```

### Build and bundle

```bash
npm run build:web                 # runs nx build web (configured in web/project.json)
```

## 🔐 Environment & Database

- Environment variables are managed centrally through Vercel. For local development, the Vercel CLI is used to pull the active environment configuration and inject it temporarily into the runtime, ensuring parity between local and deployed environments without committing secrets to the repository.
- Run `npx nx run client:generate` (or `npm run migrate-dev:client`, which depends on generation) whenever the schema changes.
- To apply migrations against your local database: `npm run migrate-dev:client`. For production-ready deploys, use `npm run migrate-deploy:client`.
- Seed the database with sample data:

```bash
npm run seed:client
```

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
| `npm run reset:web` | Resets the `web` application in NX context. |
| `npm run kookio-icons-filled:web` | Generates a custom icon module for `web`. |
| `npm run material-icons-filled:web` | Imports and optimizes the Material Icons set. |

### Prisma

| Script | Description |
|--------|-------------|
| `npm run bench-latency:client` | Checks the latency of `Cockroach Labs`. |
| `npm run migrate-dev:client` | Creates and applies local migrations using `Vercel CLI`. |
| `npm run migrate-deploy:client` | Applies production migrations using `Vercel CLI`. |
| `npm run seed:client` | Executes the initial seed script. |
| `npm run studio:client` | Launches Prisma Studio to explore and edit data. |
| `npm run test:client` | Runs unit tests (`Vitest`) for the `client` library. |

### General

| Script | Description |
|--------|-------------|
| `npm run affected` | Lists projects affected by the current Git changes. |
| `npm run format` | Applies formatting rules using `nx format:write`. |
| `npm run vercel:env:tmp` | Pulls Vercel environment variables into a temporary file. |

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
