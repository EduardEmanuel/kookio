import { createError, defineEventHandler, getHeader } from 'h3';

import { pingRedis } from '../../../infra/redis';

/**
 * Weekly keepalive ping (Vercel cron — see vercel.json `crons`). The free Redis
 * tier auto-deletes after a long stretch of inactivity; a scheduled PING keeps
 * the instance warm so the groceries / meal-plan-draft features don't silently
 * lose their backing store and hit the manual recovery cycle.
 *
 * Guarded by CRON_SECRET when set (Vercel cron sends it as a Bearer token), and
 * fail-soft: a Redis outage must not mark the cron failed (redis.ts already logs
 * the connection error, deduped).
 */
export default defineEventHandler(async (event) => {
  const secret = process.env['CRON_SECRET'];
  if (secret && getHeader(event, 'authorization') !== `Bearer ${secret}`) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  if (!process.env['REDIS_URL']) {
    return { ok: true, skipped: 'no REDIS_URL configured' };
  }

  try {
    const pong = await pingRedis();
    return { ok: true, pong };
  } catch {
    return { ok: false, error: 'redis unavailable' };
  }
});
