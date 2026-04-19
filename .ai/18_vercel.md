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
