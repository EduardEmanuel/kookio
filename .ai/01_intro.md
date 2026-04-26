# AI Development Guidelines

This file is auto-assembled from source files in `.ai/` by running:

```bash
npm run setup:ai
```

Source files are assembled in numeric order. To add a new skill, create
a file following the pattern `NN_skill-name.md` in `.ai/`.

---

## Project: Kookio

Kookio is an open-source project built with a modern full-stack Angular
meta-framework stack. Contributions are welcome — following these guidelines
ensures consistency and quality across the codebase.

## Stack Overview

### Frontend

| Technology        | Version | Purpose                                                   |
| ----------------- | ------- | --------------------------------------------------------- |
| Angular           | v20+    | UI framework                                              |
| AnalogJS          | v1.21   | Meta-framework (SSR, SSG, file-based routing, API routes) |
| Angular Material  | v20     | UI component library                                      |
| Angular CDK       | v20     | Behavior primitives                                       |
| Tailwind CSS      | v4      | Primary utility-first styling                             |
| SCSS              | —       | Complex styles, Material theming, mixins                  |
| NgRx Signal Store | v20     | Global state management                                   |
| RxJS              | v7.8    | Async orchestration (minimal — prefer Signals)            |

### Backend

| Technology    | Version      | Purpose                                   |
| ------------- | ------------ | ----------------------------------------- |
| Nitro / h3    | via AnalogJS | Server runtime, API routes                |
| tRPC          | v10          | Type-safe client-server communication     |
| Prisma        | v6           | ORM                                       |
| CockroachDB   | —            | Primary database                          |
| Firebase Auth | v12          | Authentication                            |
| Redis Cloud   | v5           | Caching, sessions, rate limiting, pub-sub |
| Zod           | v3.25        | Input validation                          |
| Pino          | v9           | Server-side logging                       |

### Content

| Technology           | Version | Purpose                       |
| -------------------- | ------- | ----------------------------- |
| @analogjs/content    | v1.21   | File-based content management |
| Marked               | v15     | Markdown rendering            |
| Prism.js             | v1.30   | Syntax highlighting           |
| front-matter         | v4      | YAML frontmatter parsing      |
| satori + satori-html | —       | OG image generation           |

### Tooling

| Technology          | Version | Purpose             |
| ------------------- | ------- | ------------------- |
| NX                  | v21     | Monorepo management |
| TypeScript          | v5.9    | Language            |
| Vitest              | v3.2    | Unit testing        |
| Playwright          | v1.55   | E2E testing         |
| ESLint              | v9      | Linting             |
| Prettier            | v3.6    | Formatting          |
| Husky + lint-staged | —       | Git hooks           |

### Deployment

| Environment | Branch | Platform       |
| ----------- | ------ | -------------- |
| Production  | `main` | Vercel         |
| E2E Preview | `test` | Vercel Preview |
| Dev Preview | `dev`  | Vercel Preview |

### Internationalization

| Locales                       | Default | Strategy                   |
| ----------------------------- | ------- | -------------------------- |
| en, ro, fr, de, es (+ others) | `en`    | URL-based (`/en/`, `/fr/`) |

---

## Skill Files

### Core Angular & Frontend

| File               | Topic                                                   |
| ------------------ | ------------------------------------------------------- |
| `02_angular.md`    | Angular v20+ best practices, components, signals, forms |
| `03_typescript.md` | TypeScript strict mode, generics, utility types         |
| `04_scss.md`       | SCSS architecture, mixins, Material theming             |
| `05_ngrx.md`       | NgRx Signal Store, Effects, Entity                      |
| `06_rxjs.md`       | RxJS minimal usage, interop with Signals                |
| `14_tailwind.md`   | Tailwind v4, integration with SCSS and Material         |

### Testing

| File                 | Topic                                           |
| -------------------- | ----------------------------------------------- |
| `07_unit-testing.md` | Vitest, Angular Testing Library, marble testing |
| `08_e2e.md`          | Playwright, Page Object Model, CI/CD            |

### Architecture & Workflow

| File                 | Topic                                              |
| -------------------- | -------------------------------------------------- |
| `09_git.md`          | GitHub Flow, Conventional Commits, branch strategy |
| `10_architecture.md` | NX + AnalogJS structure, routing, API routes       |

### Backend & Data

| File               | Topic                                               |
| ------------------ | --------------------------------------------------- |
| `11_trpc.md`       | tRPC v10, procedures, subscriptions, error handling |
| `12_prisma-zod.md` | Prisma v6 + CockroachDB + Zod integration           |
| `13_firebase.md`   | Firebase Auth, client SDK, Admin SDK                |
| `15_redis-pino.md` | Redis Cloud caching/sessions/queues, Pino logging   |

### Content & Media

| File              | Topic                                        |
| ----------------- | -------------------------------------------- |
| `16_content.md`   | @analogjs/content, Marked, Prism, SSG        |
| `22_og-images.md` | OG image generation via API routes + satorio |

### AnalogJS Specific

| File                   | Topic                                                   |
| ---------------------- | ------------------------------------------------------- |
| `17_analog-ssr-ssg.md` | SSR vs SSG, mixed rendering, hydration, Vite config     |
| `18_vercel.md`         | Vercel deployment, NX config, env vars, migrations      |
| `19_analog-i18n.md`    | i18n runtime, URL-based locale routing, translations    |
| `20_analog-forms.md`   | Form Actions (public) vs tRPC mutations (authenticated) |
| `21_websockets-sse.md` | WebSockets, SSE, tRPC subscriptions, Redis pub-sub      |

---

## General Principles

- **Modern APIs over legacy** — use the latest stable APIs for each technology
- **Signals over RxJS** — prefer Angular Signals; use RxJS only where required
- **Type safety everywhere** — strict TypeScript, Zod validation, tRPC end-to-end types
- **Server-first** — leverage SSR/SSG via AnalogJS; minimize client-side data fetching
- **Accessibility** — WCAG AA is a requirement on all UI components
- **i18n by default** — all user-facing strings must use `$localize` or `i18n` attribute
- **Security** — never trust client input; always verify server-side
- **Performance** — cache aggressively with Redis; prerender content with SSG
- **DRY** — single source of truth for schemas (Prisma → Zod), styles, and config
- **Observability** — structured logging with Pino; never use `console.log` on server
- **Progressive enhancement** — public forms work without JavaScript via Form Actions
