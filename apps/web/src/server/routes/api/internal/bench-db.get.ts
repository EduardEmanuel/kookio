import { defineEventHandler, getHeader, createError } from 'h3';

import { prisma } from '@kookio/prisma-client';

function percentile(values: number[], p: number) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const rank = (p / 100) * (sorted.length - 1);
  const lower = Math.floor(rank);
  const upper = Math.ceil(rank);
  if (lower === upper) return sorted[lower];
  const weight = rank - lower;
  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

export default defineEventHandler(async (event) => {
  if (process.env['ALLOW_BENCH'] !== 'true') {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' });
  }

  const key = getHeader(event, 'x-bench-key');
  if (!key || key !== process.env['BENCH_KEY']) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const benchIterations = Number(process.env['BENCH_ITERATIONS'] ?? 5);
  const n = Math.max(1, Math.min(benchIterations, 10));

  await prisma.$queryRaw`SELECT 1`;

  const timings: number[] = [];
  for (let i = 0; i < n; i++) {
    const t0 = performance.now();
    await prisma.$queryRaw`SELECT 1`;
    timings.push(performance.now() - t0);
  }

  const total = timings.reduce((s, v) => s + v, 0);
  const avg = timings.length ? total / timings.length : 0;

  return {
    n,
    avg_ms: Number(avg.toFixed(2)),
    p50_ms: Number(percentile(timings, 50).toFixed(2)),
    p95_ms: Number(percentile(timings, 95).toFixed(2)),
    timestamp: new Date().toISOString(),
  };
});
