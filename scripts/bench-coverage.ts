import { spawnSync } from 'node:child_process';
import { readFileSync, existsSync, rmSync } from 'node:fs';
import * as path from 'node:path';

import libCoverage from 'istanbul-lib-coverage';

import { logger } from './utils';

const { createCoverageMap } = libCoverage;

/**
 * Whole-workspace unit-test coverage, all-source basis.
 *
 * Runs Vitest directly (not through Nx) in every library that owns a
 * vite/vitest config, with `coverage.all = true` so that source files never
 * imported by any spec are counted as 0% rather than silently excluded. This
 * is the honest "all-source" line-coverage figure (the Nx executor swallows
 * `--coverage.*` CLI args, which is why this calls Vitest directly).
 *
 * Scope is `libs/` only. The `web` application is excluded deliberately: its
 * jsdom + vmThreads test environment (kept for Angular TestBed isolation)
 * times out under coverage instrumentation, so its number would be flaky and
 * non-reproducible. The application shell is thin (route stubs, page
 * composition) and its user flows are validated by the Playwright E2E suite
 * rather than by unit coverage.
 *
 * Reproduce:  npm run bench:coverage
 * Requires:   @vitest/coverage-v8 (devDependency)
 *
 * Output is the per-project and aggregated line/statement/function/branch
 * coverage over the whole monorepo.
 */

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'coverage'); // gitignored

// Source-only inclusion; everything that is not hand-written product code is
// excluded so the denominator reflects code we are responsible for testing.
const INCLUDE = 'src/**/*.{ts,mts}';
const EXCLUDE = [
  'src/**/*.spec.ts',
  'src/**/*.test.ts',
  'src/test-setup.ts',
  'src/**/testing/**',
  'src/**/*.mock.ts',
  'src/index.ts', // barrel re-exports, no executable logic
  'src/testing.ts',
  'src/**/*.config.{ts,mts}',
  '**/generated/**',
  '**/prisma-zod-generator/**',
];

// Discover every project that owns a Vitest-compatible config.
const discover = (): string[] => {
  const res = spawnSync(
    'find',
    ['libs', '-name', 'vite.config.*', '-o', '-name', 'vitest.config.*'],
    { cwd: ROOT, encoding: 'utf8' },
  );
  return res.stdout
    .trim()
    .split('\n')
    .filter((f) => f && !f.includes('node_modules'))
    .map((f) => path.dirname(path.join(ROOT, f)))
    .filter((d, i, a) => a.indexOf(d) === i)
    .sort();
};

const flags = (reportsDir: string): string[] => [
  'vitest',
  'run',
  '--coverage',
  '--coverage.provider=v8',
  '--coverage.all',
  `--coverage.include=${INCLUDE}`,
  ...EXCLUDE.map((e) => `--coverage.exclude=${e}`),
  '--coverage.reporter=json',
  `--coverage.reportsDirectory=${reportsDir}`,
];

const run = (dir: string): string | null => {
  const rel = path.relative(ROOT, dir);
  const reportsDir = path.join(OUT, rel);
  const r = spawnSync('npx', flags(reportsDir), {
    cwd: dir,
    encoding: 'utf8',
    stdio: ['ignore', 'ignore', 'inherit'],
  });
  const file = path.join(reportsDir, 'coverage-final.json');
  if (r.status !== 0) logger.warn(`  ⚠ ${rel} exited ${r.status} (flaky env?)`);
  return existsSync(file) ? file : null;
};

if (existsSync(OUT)) rmSync(OUT, { recursive: true, force: true });

const projects = discover();
logger.info(
  `Measuring all-source coverage across ${projects.length} projects…\n`,
);

const map = createCoverageMap({});
const perProject: Array<[string, number, number, number]> = [];

for (const dir of projects) {
  const file = run(dir);
  if (!file) continue;
  const data = JSON.parse(readFileSync(file, 'utf8'));
  const pm = createCoverageMap(data);
  const s = pm.getCoverageSummary();
  if (s.lines.total > 0) {
    perProject.push([
      path.relative(ROOT, dir),
      s.lines.pct as number,
      s.lines.covered,
      s.lines.total,
    ]);
  }
  map.merge(data);
}

const t = map.getCoverageSummary();
const pct = (c: number, total: number): string =>
  total ? `${((100 * c) / total).toFixed(2)}%` : 'n/a';

logger.info('\n=== Per-project line coverage (size desc) ===');
perProject
  .sort((a, b) => b[3] - a[3])
  .forEach(([name, p, c, total]) =>
    logger.info(
      `  ${name.padEnd(28)} ${`${(p as number).toFixed(1)}%`.padStart(7)}  ${c}/${total}`,
    ),
  );

logger.info('\n=== WORKSPACE TOTALS (all-source) ===');
for (const k of ['lines', 'statements', 'functions', 'branches'] as const) {
  const m = t[k];
  logger.info(
    `  ${k.padEnd(11)} ${pct(m.covered, m.total).padStart(8)} (${m.covered}/${m.total})`,
  );
}
logger.info(`\n  files measured: ${map.files().length}`);
