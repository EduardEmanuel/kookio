import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';

import { logger } from '@kookio/server-logger';

type Status =
  | 'passed'
  | 'failed'
  | 'skipped'
  | 'timedOut'
  | 'interrupted'
  | string;

interface TestResult {
  status?: Status;
}
interface Test {
  results?: TestResult[];
}
interface Spec {
  tests?: Test[];
}
interface Suite {
  suites?: Suite[];
  specs?: Spec[];
}
interface Report {
  suites?: Suite[];
}

const JSON_PATH =
  process.env['PW_JSON'] ?? 'dist/test/metrics/playwright-report.json';
const OUT_TEX = process.env['OUT_TEX'] ?? 'dist/metrics/e2e_pass_rate.json';

const readReport = (path: string): Report => {
  if (!existsSync(path)) {
    throw new Error(
      `Playwright JSON report not found at: ${path}. Did you enable the JSON reporter?`,
    );
  }
  const raw = readFileSync(path, 'utf8');
  return JSON.parse(raw) as Report;
};

const computeMetrics = (report: Report) => {
  let passed = 0,
    failed = 0,
    skipped = 0,
    flaky = 0;

  const walkSuites = (suites: Suite[] = []): void => {
    for (const s of suites) {
      for (const spec of s.specs ?? []) {
        for (const t of spec.tests ?? []) {
          const results = t.results ?? [];
          if (results.length === 0) {
            skipped++;
            continue;
          }

          const final = results[results.length - 1]?.status ?? 'skipped';
          const hadFail = results.some(
            (r) => r.status && r.status !== 'passed' && r.status !== 'skipped',
          );

          if (final === 'passed') {
            if (hadFail && results.length > 1) flaky++;
            else passed++;
          } else if (final === 'skipped') {
            skipped++;
          } else {
            failed++;
          }
        }
      }
      walkSuites(s.suites ?? []);
    }
  };

  walkSuites(report.suites ?? []);

  const denom = passed + failed + flaky; // exclude skipped
  const num = passed + flaky; // count flakies as passed
  const rate = denom ? (num / denom) * 100 : 0;
  const pct = Math.round(rate * 10) / 10; // one decimal

  return { passed, failed, skipped, flaky, num, denom, pct };
};

const writeTex = (
  outPath: string,
  num: number,
  denom: number,
  pct: number,
  skipped: number,
) => {
  const dir = dirname(outPath);
  mkdirSync(dir, { recursive: true });

  const json = JSON.stringify({
    e2e: { pass_rate: pct, counts: { passed: num, total: denom }, skipped },
  });

  writeFileSync(outPath, json, 'utf8');
};

const main = () => {
  const report = readReport(JSON_PATH);
  const { num, denom, pct, skipped } = computeMetrics(report);
  writeTex(OUT_TEX, num, denom, pct, skipped);
  logger.info(
    `ℹ️ E2E pass rate: ${pct}% (${num}/${denom}), skipped: ${skipped}  →  ${OUT_TEX}`,
  );
};

main();
