import { defineEventHandler } from 'h3';

import { prisma } from '@kookio/prisma-client/server';

import { pingRedis } from '../../infra/redis';

export default defineEventHandler(async () => {
  let prismaStatus: 'ok' | 'down' = 'down';
  let prismaError: string | null = null;
  let prismaLatencyMs: number | null = null;
  const startedPrisma = performance.now();

  try {
    await prisma.$queryRaw`SELECT 1`;
    prismaLatencyMs = Number((performance.now() - startedPrisma).toFixed(2));
    prismaStatus = 'ok';
  } catch (e) {
    prismaStatus = 'down';
    if (e instanceof Error) {
      prismaError = e.message;
    } else {
      prismaError = String(e);
    }
  }

  // Redis is optional infra. `skipped` when REDIS_URL isn't configured
  // (typical for a local dev shell that hasn't run `vercel env pull`),
  // `down` when configured but the ping fails (cooldown, ENOTFOUND,
  // auth, etc.), `ok` on a successful PING. The defensive layers in
  // getRedis() (cooldown + reconnect cap) keep the failure path fast,
  // so the health endpoint stays responsive even when Redis is dead.
  let redis: 'ok' | 'down' | 'skipped' = 'skipped';
  let redisError: string | null = null;
  let redisLatencyMs: number | null = null;

  if (process.env['REDIS_URL']) {
    const startedRedis = performance.now();
    try {
      await pingRedis();
      redisLatencyMs = Number((performance.now() - startedRedis).toFixed(2));
      redis = 'ok';
    } catch (e) {
      redis = 'down';
      redisError = e instanceof Error ? e.message : String(e);
    }
  }

  return {
    status: 'ok',
    prisma: prismaStatus,
    prisma_error: prismaError,
    prisma_latency_ms: prismaLatencyMs,
    redis,
    redis_error: redisError,
    redis_latency_ms: redisLatencyMs,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
});
