import { defineEventHandler } from 'h3';

import { prisma } from '@kookio/prisma-client';

export default defineEventHandler(async () => {
  let db: 'ok' | 'down' = 'down';
  let error: string | null = null;
  let latencyMs: number | null = null;
  const started = performance.now();

  try {
    await prisma.$queryRaw`SELECT 1`;
    latencyMs = Number((performance.now() - started).toFixed(2));
    db = 'ok';
  } catch (e) {
    db = 'down';
    if (e instanceof Error) {
      error = e.message;
    } else {
      error = String(e);
    }
  }

  return {
    status: 'ok',
    db,
    error,
    latency_ms: latencyMs,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
});
