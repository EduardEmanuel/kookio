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
