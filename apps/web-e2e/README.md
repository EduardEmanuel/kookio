# web-e2e (Playwright)

Playwright suite targeting the Analog web app. Runs against the local dev server by default, but CI injects `BASE_URL` pointing to Vercel preview/Test deployments.

## Layout

```
apps/web-e2e/
├── playwright.config.ts   # Nx preset + multi-browser matrix + SSR webServer
├── global-teardown.ts     # Disconnects Prisma client after each run
├── src/
│   ├── home.spec.ts       # Basic smoke for landing page
│   ├── about.spec.ts      # SSG page assertions
│   ├── helpers/wait-for-db.ts   # Ensures Cockroach is reachable
│   └── integration/routers/ingredinet.router.spec.ts
│         - Spins up tRPC client, runs CRUD against live API
```

## Environment expectations

- `BASE_URL` (optional): overrides the Analog dev server URL. CI sets it to the resolved Vercel preview/test URL via `.github/actions/playwright-e2e`.
- `DATABASE_URL`: required for the tRPC suite (`wait-for-db.ts` checks it and exercises Prisma directly). Locally you can run `npm run with:env -- --env=preview -- nx e2e web-e2e` to pull the preview env file.

## Commands

| Command           | Description                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------- |
| `nx e2e web-e2e`  | Runs Playwright using `playwright.config.ts`. `@nx/playwright` handles server startup if needed.         |
| `npm run e2e:web` | Convenience wrapper that pulls Vercel env vars (`scripts/with-vercel-env.mjs`) and then runs the target. |

During CI the reusable workflow `_e2e.yml` re-uses this project: it installs browsers once, injects `PLAYWRIGHT_BASE_URL`, and uploads `dist/.playwright/**/playwright-report` artifacts if any assertions fail.

## Tips

- Tests call `/api/health` before hitting tRPC to avoid noisy failures when the Nitro server is still warming up.
- Use `RUN=dev npx playwright test --project=chromium` locally if you only need a single browser.
- `apps/web-e2e/global-teardown.ts` ensures Prisma disconnects cleanly to avoid handle leaks during `nx e2e`.
