import { spawnSync } from 'node:child_process';
import { readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import * as path from 'node:path';

import { logger } from './utils';

/**
 * Lighthouse performance audit of the live site, median of N runs per preset.
 *
 * Drives Google Chrome (must be installed) headlessly via the Lighthouse CLI
 * (fetched on demand with `npx`, so no extra dependency is committed). The
 * first run after an idle period pays the Vercel serverless cold start; the
 * median of several warm runs is the representative figure.
 *
 * Reproduce:  npm run bench:lighthouse              (defaults to https://kookio.app)
 *             npm run bench:lighthouse -- <url> <runs>
 * Requires:   Google Chrome installed locally.
 */

const URL = process.argv[2] ?? 'https://kookio.app';
const RUNS = Number(process.argv[3] ?? 4);
const PRESETS = ['mobile', 'desktop'] as const;

const METRICS = [
  'first-contentful-paint',
  'largest-contentful-paint',
  'total-blocking-time',
  'cumulative-layout-shift',
  'speed-index',
] as const;

interface Sample {
  score: number;
  metrics: Record<string, number>;
}

const median = (xs: number[]): number => {
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

const runOnce = (
  preset: (typeof PRESETS)[number],
  outDir: string,
  i: number,
): Sample | null => {
  const out = path.join(outDir, `${preset}-${i}.json`);
  const args = [
    '--yes',
    'lighthouse',
    URL,
    '--only-categories=performance',
    '--output=json',
    `--output-path=${out}`,
    '--quiet',
    '--chrome-flags=--headless=new',
    '--max-wait-for-load=60000',
  ];
  if (preset === 'desktop') args.push('--preset=desktop');
  const r = spawnSync('npx', args, {
    encoding: 'utf8',
    stdio: ['ignore', 'ignore', 'inherit'],
  });
  if (r.status !== 0) return null;
  const j = JSON.parse(readFileSync(out, 'utf8'));
  const metrics: Record<string, number> = {};
  for (const m of METRICS) metrics[m] = j.audits[m].numericValue;
  return { score: Math.round(j.categories.performance.score * 100), metrics };
};

const fmt = (key: string, value: number): string =>
  key === 'cumulative-layout-shift'
    ? value.toFixed(3)
    : key === 'total-blocking-time'
      ? `${Math.round(value)} ms`
      : `${(value / 1000).toFixed(1)} s`;

const tmp = mkdtempSync(path.join(tmpdir(), 'kookio-lh-'));
logger.info(`Lighthouse: ${URL} — ${RUNS} runs per preset (median reported)\n`);

for (const preset of PRESETS) {
  const samples: Sample[] = [];
  for (let i = 1; i <= RUNS; i++) {
    const s = runOnce(preset, tmp, i);
    if (s) {
      samples.push(s);
      logger.info(`  ${preset} run ${i}: score=${s.score}`);
    } else {
      logger.warn(`  ${preset} run ${i}: failed`);
    }
  }
  if (samples.length === 0) {
    logger.warn(`  ${preset}: no successful runs\n`);
    continue;
  }
  logger.info(`\n  ${preset.toUpperCase()} median (n=${samples.length}):`);
  logger.info(`    performance score : ${median(samples.map((s) => s.score))}`);
  for (const m of METRICS) {
    logger.info(
      `    ${m.padEnd(26)}: ${fmt(m, median(samples.map((s) => s.metrics[m])))}`,
    );
  }
  logger.info('');
}

rmSync(tmp, { recursive: true, force: true });
