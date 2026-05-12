/**
 * One-shot Redis health check. Invoked as `npm run ping:redis` (which wraps
 * with `with:env --env=development` so `REDIS_URL` is loaded from Vercel).
 *
 * Standalone on purpose: we want to verify the raw connection works, without
 * the cooldown / retry layers that `apps/web/src/server/infra/redis.ts` adds
 * for runtime resilience. Use `--env=preview` or `--env=production` to ping
 * the other environments.
 */
import { performance } from 'node:perf_hooks';

import { createClient } from 'redis';

const redactUrl = (url: string): string =>
  url.replace(/:\/\/[^@]+@/, '://<redacted>@');

const main = async (): Promise<void> => {
  const url = process.env['REDIS_URL'];
  if (!url) {
    console.error(
      '❌ REDIS_URL is not set. Run `npm run ping:redis` (which wraps `with:env`) ' +
        'or `vercel env pull` first.',
    );
    process.exit(1);
  }

  console.log(`Pinging ${redactUrl(url)} …`);

  const client = createClient({
    url,
    // One-shot health check — no retries, fail fast.
    socket: { reconnectStrategy: false },
  });
  // Suppress the default 'error' event noise — we surface the failure from
  // connect/ping below so the output is clean.
  client.on('error', () => undefined);

  try {
    const t0 = performance.now();
    await client.connect();
    const reply = await client.ping();
    const ms = Math.round(performance.now() - t0);
    console.log(`✅ ${reply} (${ms} ms)`);
    await client.quit();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`❌ ping failed: ${message}`);
    process.exit(1);
  }
};

void main();
