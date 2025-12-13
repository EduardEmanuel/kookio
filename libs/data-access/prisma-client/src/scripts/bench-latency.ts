import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

async function main() {
  const iterations = Number(process.env['BENCH_ITERATIONS'] ?? 100);
  const timings: number[] = [];
  await prisma.$queryRaw`SELECT 1`; // warmup

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    await prisma.$queryRaw`SELECT 1`;
    const end = performance.now();
    timings.push(end - start);
  }

  const total = timings.reduce((sum, value) => sum + value, 0);
  const avg = timings.length ? total / timings.length : 0;

  console.log(
    JSON.stringify(
      {
        n: timings.length,
        avg_ms: Number(avg.toFixed(2)),
        p50_ms: Number(percentile(timings, 50).toFixed(2)),
        p95_ms: Number(percentile(timings, 95).toFixed(2)),
      },
      null,
      2,
    ),
  );
}

main()
  .catch((error) => {
    console.error('Latency benchmark failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
