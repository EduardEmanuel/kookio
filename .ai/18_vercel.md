> **Status: Active** — `vercel.json` is checked in at the repo root with the documented cache headers. The 404-on-missing-assets middleware lives at `apps/web/src/server/middleware/security.ts` (covers the same concern, named differently). The Prisma migration build step and the `NODE_OPTIONS=--max-old-space-size=6144` heap fix for the Nitro bundle pass are both load-bearing — see `feedback_vercel-asset-cache.md` and `feedback_analogjs-build-constraints.md` in memory.

## Asset Serving & Cache Headers

### `vercel.json` Cache-Control

- Always configure `Cache-Control` headers in `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    },
    {
      "source": "/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "no-cache, must-revalidate" }]
    }
  ]
}
```

- `/assets/*` filenames include a content hash — `immutable` is safe and avoids
  re-validation on every request
- HTML and API routes must use `must-revalidate` — without it, browsers serve stale
  HTML after a redeploy that rotates bundle hashes, causing clients to request
  asset URLs that no longer exist on the new deployment

### Missing Assets After Redeploy

- After a redeploy, bundle filenames change (content hash rotation). Clients with
  stale HTML request old asset URLs that no longer exist on the new deployment.
- Without intervention, Nitro's SSR handler catches these missing `/assets/*` requests
  and returns a 200 HTML response — the browser then tries to execute an HTML page
  as JavaScript, producing parse errors.
- Fix: add a Nitro middleware that returns 404 for any `/assets/*` request that
  reaches the SSR handler (meaning the static file was not found):

```typescript
// src/server/middleware/assets.ts
import { defineEventHandler, createError } from 'h3';

export default defineEventHandler((event) => {
  if (event.path.startsWith('/assets/')) {
    throw createError({ statusCode: 404, statusMessage: 'Asset not found' });
  }
});
```

### Diagnosing Vercel Failures

- **Build logs** and **runtime logs** are separate on Vercel:
  - Build logs: Vercel Dashboard → Deployment → Build Logs
  - Runtime logs: `vercel logs <deployment-url>` or Dashboard → Functions tab
- A deployment that shows "Ready" can still fail at runtime — always check runtime
  logs when the app behaves unexpectedly after a deploy
- `vercel logs <url>` streams live function invocation errors — use this first when
  debugging a broken production deployment; do not rely on build logs alone

### Checking Deployment Status

- Monitor deployments at `vercel.com/dashboard`
- Use Vercel CLI for quick status checks:

```bash
  npx vercel ls
  npx vercel logs <deployment-url>
```

- Build logs are available in Vercel Dashboard → Deployment → Build Logs

### Rollback

- Instant rollback available from Vercel Dashboard → Deployments →
  select previous deployment → Promote to Production
- Never manually roll back via git revert on `main` alone —
  always use Vercel's promote feature for immediate production recovery

## Prisma Migrations on Vercel

### Problem

- Vercel serverless functions have no persistent filesystem —
  `prisma migrate deploy` cannot run inside a function
- Solution: run migrations as part of the build step, before the server starts

### Setup

- Add migration to build command in `vercel.json`:

```json
{
  "buildCommand": "npm run migrate-deploy:prisma-client && nx build web"
}
```

- This ensures migrations run against the production database before
  the new server version goes live
- Always ensure `DATABASE_URL` is set in the correct Vercel environment
  before triggering a deployment with schema changes

## Serverless Function Limits

### Cold Starts

- AnalogJS on Vercel runs as a serverless Node.js function —
  cold starts are expected on low-traffic deployments
- Mitigate with Redis caching — warm responses avoid heavy computation on cold starts
- Avoid importing large libraries at the top level in server code —
  use dynamic imports where possible

### Function Size

- Vercel has a 50MB limit for serverless function bundles
- Monitor bundle size with:

```bash
  npx nx build web --analyze
```

- If approaching the limit: externalize large dependencies in `nitro` config:

```typescript
  nitro: {
    preset: 'vercel',
    externals: {
      external: ['some-large-package'],
    },
  }
```

### Timeout

- Default Vercel function timeout: 10s (Hobby), 60s (Pro)
- Long-running operations (heavy DB queries, external API calls) must complete within timeout
- Use Redis caching to avoid repeated expensive operations
- Never perform migrations or seeding inside serverless function handlers

## General Rules

- Never commit `.vercel/` folder — add to `.gitignore`
- Never commit `.env.local` or any `.env.*` files with real values
- Always verify the correct environment variables are set before merging to `main`
- Use `vercel env pull .env.local` to sync local environment with Vercel — never share `.env.local`
- Monitor function invocation errors in Vercel Dashboard → Functions tab
- Set up Vercel spend alerts to avoid unexpected billing on high-traffic events
