import { logger } from './utils';

/**
 * Persistence-latency benchmark against the deployed bench-db route.
 *
 * Each invocation runs N HTTP calls to `/api/internal/bench-db` (each call
 * itself probes CockroachDB and Redis 100 times). The FIRST call pays the
 * Vercel serverless cold start (cold function instance + cold DB pool); the
 * remaining calls hit the warmed instance. The report separates the cold
 * first-hit from the warm steady-state (median of the subsequent calls), so
 * a single noisy sample is never reported on its own.
 *
 * Reproduce:  npm run bench:preview            (defaults to 6 calls)
 *             BENCH_RUNS=10 npm run bench:preview
 * Requires:   BYPASS_TOKEN, BENCH_KEY (pulled from Vercel preview env).
 */

const url =
  process.env['BENCH_URL'] || 'https://dev.kookio.app/api/internal/bench-db';
const bypass = process.env['BYPASS_TOKEN'];
const key = process.env['BENCH_KEY'];
const RUNS = Number(process.env['BENCH_RUNS'] ?? process.argv[2] ?? 6);

if (!bypass) {
  logger.error('missing BYPASS_TOKEN');
  process.exit(1);
}
if (!key) {
  logger.error('missing BENCH_KEY');
  process.exit(1);
}

interface Store {
  avg_ms: number;
  p50_ms: number;
  p95_ms: number;
}
interface BenchResult {
  db: Store;
  redis: Store & { enabled: boolean };
}

const fetchOnce = async (): Promise<BenchResult> => {
  const res = await fetch(url, {
    headers: { 'x-vercel-protection-bypass': bypass, 'X-Bench-Key': key },
  });
  if (!res.ok) {
    logger.error(`HTTP ${res.status} ${res.statusText}`);
    logger.error((await res.text().catch(() => '')).slice(0, 400));
    process.exit(1);
  }
  return (await res.json()) as BenchResult;
};

const median = (xs: number[]): number => {
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

const medianStore = (stores: Store[]): Store => ({
  avg_ms: Number(median(stores.map((s) => s.avg_ms)).toFixed(2)),
  p50_ms: Number(median(stores.map((s) => s.p50_ms)).toFixed(2)),
  p95_ms: Number(median(stores.map((s) => s.p95_ms)).toFixed(2)),
});

const line = (label: string, s: Store): string =>
  `    ${label.padEnd(13)} avg ${String(s.avg_ms).padStart(5)} ms  p50 ${String(s.p50_ms).padStart(5)} ms  p95 ${String(s.p95_ms).padStart(5)} ms`;

logger.info(
  `\nPersistence latency — ${RUNS} calls to ${url}\n(each call = 100 probes per store)\n`,
);

const samples: BenchResult[] = [];
for (let i = 0; i < RUNS; i++) samples.push(await fetchOnce());

const cold = samples[0];
const warm = samples.slice(1);

logger.info('Cold (first invocation — serverless + DB-pool cold start):');
logger.info(line('CockroachDB', cold.db));
logger.info(line('Redis', cold.redis));

if (warm.length > 0) {
  logger.info(
    `\nWarm steady-state (median of ${warm.length} subsequent calls):`,
  );
  logger.info(line('CockroachDB', medianStore(warm.map((s) => s.db))));
  logger.info(line('Redis', medianStore(warm.map((s) => s.redis))));
}
logger.info('');
