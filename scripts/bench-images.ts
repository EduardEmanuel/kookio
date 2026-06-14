import { readFileSync } from 'node:fs';
import * as path from 'node:path';

import { logger } from './utils';

/**
 * Image-payload report for the Vercel image optimization, across the whole
 * recipe catalog (594 images), not a single sample.
 *
 * For every recipe image in the seed catalog it compares the original
 * full-resolution JPEG (what would ship with no optimization) against the
 * bytes actually delivered by the Vercel optimizer (`/_vercel/image`) as
 * AVIF and WEBP at the largest configured render width. Width and quality
 * mirror `vercel.json` (`images.sizes`, `images.qualities`).
 *
 * Reproduce:  npm run bench:images                       (w=960 on production)
 *             npm run bench:images -- <host> <width>
 * Requires:   network access to the kookio host and themealdb.
 */

const ROOT = path.resolve(import.meta.dirname, '..');
const HOST = process.argv[2] ?? 'https://kookio.app';
const WIDTH = Number(process.argv[3] ?? 960);
const QUALITY = 75; // vercel.json images.qualities
const CONCURRENCY = 16;

const catalog = JSON.parse(
  readFileSync(
    path.join(ROOT, 'libs/prisma-client/seed-data/recipes.json'),
    'utf8',
  ),
) as { recipes: Array<{ imageUrl?: string }> };
const sources = [
  ...new Set(
    catalog.recipes.map((r) => r.imageUrl).filter((u): u is string => !!u),
  ),
];

const measure = async (
  url: string,
  accept?: string,
): Promise<number | null> => {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(30_000),
      ...(accept ? { headers: { Accept: accept } } : {}),
    });
    if (!res.ok) return null;
    const cl = res.headers.get('content-length');
    if (cl) {
      // Drain the body so the connection frees up, but trust Content-Length.
      await res.arrayBuffer();
      return Number(cl);
    }
    return (await res.arrayBuffer()).byteLength;
  } catch {
    return null;
  }
};

const optimized = (format: 'avif' | 'webp', src: string): string =>
  `${HOST}/_vercel/image?url=${encodeURIComponent(src)}&w=${WIDTH}&q=${QUALITY}`;

interface Row {
  original: number;
  avif: number;
  webp: number;
}

const rows: Row[] = [];
let failures = 0;

// Bounded-concurrency worker pool over the source list.
let cursor = 0;
const worker = async (): Promise<void> => {
  while (cursor < sources.length) {
    const src = sources[cursor++];
    const [original, avif, webp] = await Promise.all([
      measure(src),
      measure(optimized('avif', src), 'image/avif'),
      measure(optimized('webp', src), 'image/webp'),
    ]);
    if (original && avif && webp) {
      rows.push({ original, avif, webp });
    } else {
      failures++;
    }
    if ((rows.length + failures) % 50 === 0) {
      logger.info(`  …${rows.length + failures}/${sources.length}`);
    }
  }
};

logger.info(
  `\nMeasuring ${sources.length} catalog images at w=${WIDTH}, q=${QUALITY} via ${HOST}…\n`,
);
await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

const sum = (xs: number[]): number => xs.reduce((a, b) => a + b, 0);
const median = (xs: number[]): number => {
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
const mb = (bytes: number): string => `${(bytes / 1024 / 1024).toFixed(1)} MB`;
const kb = (bytes: number): string => `${(bytes / 1024).toFixed(1)} KB`;

const totalOrig = sum(rows.map((r) => r.original));
const totalAvif = sum(rows.map((r) => r.avif));
const totalWebp = sum(rows.map((r) => r.webp));
const avifReductions = rows.map(
  (r) => (100 * (r.original - r.avif)) / r.original,
);

logger.info(
  `\n=== Catalog image-payload report (n=${rows.length}, ${failures} failed) ===`,
);
logger.info(`width=${WIDTH}px  quality=${QUALITY}  host=${HOST}\n`);
logger.info('Aggregate payload (sum over all images):');
logger.info(`  original JPEG : ${mb(totalOrig)}`);
logger.info(
  `  AVIF          : ${mb(totalAvif)}  (−${((100 * (totalOrig - totalAvif)) / totalOrig).toFixed(1)}%)`,
);
logger.info(
  `  WEBP          : ${mb(totalWebp)}  (−${((100 * (totalOrig - totalWebp)) / totalOrig).toFixed(1)}%)`,
);
logger.info('\nPer-image (original → AVIF):');
logger.info(`  mean original : ${kb(totalOrig / rows.length)}`);
logger.info(`  mean AVIF     : ${kb(totalAvif / rows.length)}`);
logger.info(
  `  mean reduction: ${(sum(avifReductions) / rows.length).toFixed(1)}%`,
);
logger.info(`  median reduction: ${median(avifReductions).toFixed(1)}%`);
logger.info(
  `  min / max reduction: ${Math.min(...avifReductions).toFixed(1)}% / ${Math.max(...avifReductions).toFixed(1)}%`,
);
