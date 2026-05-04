import { eventHandler, getHeader, getQuery, createError } from 'h3';

import { prisma } from '@kookio/prisma-client/server';

import { h3ApplyRateLimit } from '../../../infra/rate-limit';
import { getRedis } from '../../../infra/redis';

const getClientIp = (event: any): string => {
  const xfwd = getHeader(event, 'x-forwarded-for');
  return (
    xfwd?.split(',')[0]?.trim() ||
    (event.node?.req?.socket?.remoteAddress ?? 'unknown')
  );
};

const percentile = (values: number[], p: number): number => {
  if (!values.length) return 0;

  const sorted = [...values].sort((a, b) => a - b);
  const rank = (p / 100) * (sorted.length - 1);
  const lower = Math.floor(rank);
  const upper = Math.ceil(rank);

  if (lower === upper) return sorted[lower];

  const weight = rank - lower;

  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
};

const toFixed2 = (n: number) => Number(n.toFixed(2));

const timeLoop = async (
  n: number,
  fn: () => Promise<unknown>,
): Promise<number[]> => {
  const timings: number[] = [];

  for (let i = 0; i < n; i++) {
    const t0 = performance.now();

    await fn();
    timings.push(performance.now() - t0);
  }
  return timings;
};

const summarize = (values: number[]) => {
  const total = values.reduce((s, v) => s + v, 0);
  const avg = values.length ? total / values.length : 0;

  return {
    probes: values.length,
    avg_ms: toFixed2(avg),
    p50_ms: toFixed2(percentile(values, 50)),
    p95_ms: toFixed2(percentile(values, 95)),
  };
};

export default eventHandler(async (event) => {
  if (process.env['ALLOW_BENCH'] !== 'true') {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' });
  }

  const benchKey = getHeader(event, 'x-bench-key');

  if (!benchKey || benchKey !== process.env['BENCH_KEY']) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }
  // Rate limit (prod by default; preview can be enabled via flag inside infra/rate-limit)
  await h3ApplyRateLimit(event, {
    bucket: 'bench',
    max: 10,
    windowSeconds: 60,
    identifier: getClientIp(event),
    // onlyInProd default is true inside helper; we pass nothing here to use your infra behavior.
  });

  // Iterations: ?ops=NN wins; fallback to BENCH_ITERATIONS; clamp for safety
  const queryParameter = getQuery(event) as Record<string, string | undefined>;
  const defaultIterations = 100;
  const fromQuery = queryParameter?.['ops']
    ? Number(queryParameter['ops'])
    : defaultIterations;
  const fromEnv = process.env['BENCH_ITERATIONS']
    ? Number(process.env['BENCH_ITERATIONS'])
    : defaultIterations;
  const iterationsRaw =
    Number.isFinite(fromQuery) && fromQuery !== defaultIterations
      ? fromQuery
      : Number.isFinite(fromEnv) && fromEnv !== defaultIterations
        ? fromEnv
        : defaultIterations;
  const iterations = Math.max(0, Math.min(1000, Math.floor(iterationsRaw)));

  // -----------------------------------
  // CockroachDB (Prisma) latency bench
  // -----------------------------------
  // Warm-up
  await prisma.$queryRaw`SELECT 1`;
  const dbTimings = await timeLoop(iterations, async () => {
    await prisma.$queryRaw`SELECT 1`;
  });
  const dbSummary = summarize(dbTimings);

  // ----------------------
  // Redis latency bench
  // ----------------------
  // If Redis isn't configured/available, we skip gracefully.
  let redisSummary:
    | (ReturnType<typeof summarize> & { enabled: true })
    | { enabled: false; probes: 0; avg_ms: 0; p50_ms: 0; p95_ms: 0 };

  try {
    const redis = await getRedis(); // your infra helper; throws if REDIS_URL missing or connection fails
    // Warm-up
    await redis.ping();
    const redisTimings = await timeLoop(iterations, async () => {
      await redis.ping();
    });
    redisSummary = { enabled: true, ...summarize(redisTimings) };
  } catch {
    redisSummary = {
      enabled: false,
      probes: 0,
      avg_ms: 0,
      p50_ms: 0,
      p95_ms: 0,
    };
  }

  return {
    db: dbSummary,
    redis: redisSummary,
    timestamp: new Date().toISOString(),
  };
});
