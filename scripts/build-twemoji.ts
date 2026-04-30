import { promises as fs } from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import { logger } from './utils';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, '..');

const TWEMOJI_VERSION = '15.1.0';
const SVG_DIR = path.join(REPO_ROOT, 'apps/web/public/icons/twemoji');
const CDN_BASE = `https://cdn.jsdelivr.net/gh/jdecked/twemoji@${TWEMOJI_VERSION}/assets/svg`;

const SCAN_ROOTS = [
  path.join(REPO_ROOT, 'apps/web/src'),
  path.join(REPO_ROOT, 'libs'),
];

const SCAN_EXTENSIONS = new Set(['.html', '.ts']);

const EXCLUDE_PATTERNS: readonly RegExp[] = [
  /\.spec\.ts$/,
  /[\\/]node_modules[\\/]/,
  /[\\/]\.nx[\\/]/,
  /[\\/]dist[\\/]/,
  /[\\/]prisma-zod-generator[\\/]/,
];

// TS: explicit emoji-literal patterns only — never scan raw Extended_Pictographic
// in .ts files, otherwise server log strings ('🌱 Seeding…') would be subset
// even though they never reach the browser.
const TS_PATTERNS: readonly RegExp[] = [
  /\bemoji:\s*'([^']+)'/g,
  /<kookio-emoji[^>]*\bchar="([^"]+)"/g,
];

// HTML: any Extended_Pictographic sequence (with optional VS16 and ZWJ chains)
// is a real on-screen emoji, plus the same kookio-emoji attribute pattern for
// when the wrapper is used inline.
const HTML_PICTOGRAPHIC =
  /\p{Extended_Pictographic}(?:\u{FE0F})?(?:\u{200D}\p{Extended_Pictographic}(?:\u{FE0F})?)*/gu;
const HTML_KOOKIO_EMOJI = /<kookio-emoji[^>]*\bchar="([^"]+)"/g;

const VARIATION_SELECTOR_16 = 0xfe0f;
const ZERO_WIDTH_JOINER = 0x200d;

type Args = { check: boolean };

const parseArgs = (): Args => ({
  check: process.argv.includes('--check'),
});

// Match jdecked/twemoji's filename convention: hex-lowercase codepoints joined
// by `-`, with U+FE0F stripped unless the sequence contains a ZWJ (in which
// case all selectors are kept verbatim — required for ZWJ joiner sequences
// like 👨‍👩‍👧).
export const toTwemojiCodepoint = (emoji: string): string => {
  const codepoints = Array.from(emoji)
    .map((c) => c.codePointAt(0))
    .filter((cp): cp is number => cp !== undefined);
  const hasZWJ = codepoints.includes(ZERO_WIDTH_JOINER);
  const filtered = hasZWJ
    ? codepoints
    : codepoints.filter((cp) => cp !== VARIATION_SELECTOR_16);
  return filtered.map((cp) => cp.toString(16)).join('-');
};

const walk = async (dir: string): Promise<string[]> => {
  const entries = await fs.readdir(dir, {
    withFileTypes: true,
    recursive: true,
  });
  return entries
    .filter((e) => e.isFile())
    .map((e) => path.join(e.parentPath ?? dir, e.name))
    .filter((f) => SCAN_EXTENSIONS.has(path.extname(f)))
    .filter((f) => !EXCLUDE_PATTERNS.some((p) => p.test(f)));
};

const collectMatches = (
  content: string,
  pattern: RegExp,
  found: Set<string>,
): void => {
  pattern.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(content)) !== null) {
    const value = match[1] ?? match[0];
    if (value) found.add(value);
  }
};

const scanFile = async (file: string): Promise<Set<string>> => {
  const content = await fs.readFile(file, 'utf8');
  const found = new Set<string>();
  const isHtml = path.extname(file) === '.html';

  if (isHtml) {
    collectMatches(content, HTML_PICTOGRAPHIC, found);
    collectMatches(content, HTML_KOOKIO_EMOJI, found);
  } else {
    for (const pattern of TS_PATTERNS) {
      collectMatches(content, pattern, found);
    }
  }

  return found;
};

const scanCodebase = async (): Promise<Set<string>> => {
  const fileLists = await Promise.all(SCAN_ROOTS.map(walk));
  const allFiles = fileLists.flat();
  const all = new Set<string>();
  for (const file of allFiles) {
    const fromFile = await scanFile(file);
    for (const emoji of fromFile) all.add(emoji);
  }
  return all;
};

interface RawEmojiViolation {
  file: string;
  line: number;
  emoji: string;
}

// After Phase 3 migration, the only legal location for a raw emoji in any
// .html template is inside `<kookio-emoji char="…" />`. This pass strips every
// kookio-emoji element from the file (preserving line breaks for accurate line
// numbers in error output) and reports any pictographic char that survives.
const KOOKIO_EMOJI_TAG =
  /<kookio-emoji[\s\S]*?\/?>(?:[\s\S]*?<\/kookio-emoji>)?/g;

const scanForRawEmojiViolations = async (): Promise<RawEmojiViolation[]> => {
  const fileLists = await Promise.all(SCAN_ROOTS.map(walk));
  const htmlFiles = fileLists.flat().filter((f) => path.extname(f) === '.html');
  const violations: RawEmojiViolation[] = [];

  for (const file of htmlFiles) {
    const content = await fs.readFile(file, 'utf8');
    const stripped = content.replace(KOOKIO_EMOJI_TAG, (m) =>
      m.replace(/[^\n]/g, ' '),
    );

    HTML_PICTOGRAPHIC.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = HTML_PICTOGRAPHIC.exec(stripped)) !== null) {
      const line = stripped.slice(0, match.index).split('\n').length;
      violations.push({
        file: path.relative(REPO_ROOT, file),
        line,
        emoji: match[0],
      });
    }
  }

  return violations;
};

const readPresentSvgs = async (): Promise<Set<string>> => {
  try {
    const entries = await fs.readdir(SVG_DIR);
    return new Set(
      entries
        .filter((f) => f.endsWith('.svg'))
        .map((f) => f.replace(/\.svg$/, '')),
    );
  } catch {
    return new Set();
  }
};

const fetchSvg = async (codepoint: string): Promise<string> => {
  const url = `${CDN_BASE}/${codepoint}.svg`;
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(`Twemoji fetch failed for ${codepoint}: ${resp.status}`);
  }
  return resp.text();
};

const main = async (): Promise<void> => {
  const { check } = parseArgs();

  logger.info('Scanning codebase for emoji usage…');
  const emojis = await scanCodebase();
  const expected = new Map<string, string>();
  for (const emoji of emojis) {
    const codepoint = toTwemojiCodepoint(emoji);
    if (codepoint) expected.set(codepoint, emoji);
  }

  if (check) {
    const violations = await scanForRawEmojiViolations();
    if (violations.length) {
      logger.error(
        `✗ Raw emoji in templates outside <kookio-emoji> (${violations.length}):`,
      );
      for (const v of violations) {
        logger.error(`  ${v.file}:${v.line}  ${v.emoji}`);
      }
      logger.error(
        '  Wrap each in <kookio-emoji char="…" /> from @kookio/shared-ui.',
      );
      process.exit(1);
    }
  }

  const present = await readPresentSvgs();

  const missing = [...expected.keys()].filter((cp) => !present.has(cp)).sort();
  const orphans = [...present].filter((cp) => !expected.has(cp)).sort();

  if (missing.length === 0 && orphans.length === 0) {
    logger.info(`✓ Twemoji SVGs up-to-date (${expected.size} emojis)`);
    return;
  }

  if (check) {
    logger.error('✗ Twemoji SVGs out of date. Run: npm run build:twemoji');
    if (missing.length) {
      const sample = missing
        .slice(0, 10)
        .map((cp) => `${cp} (${expected.get(cp)})`)
        .join(', ');
      logger.error(
        `  Missing (${missing.length}): ${sample}${missing.length > 10 ? '…' : ''}`,
      );
    }
    if (orphans.length) {
      logger.error(`  Orphans (${orphans.length}): ${orphans.join(', ')}`);
    }
    process.exit(1);
  }

  await fs.mkdir(SVG_DIR, { recursive: true });

  if (missing.length) {
    logger.info(`Fetching ${missing.length} missing SVG(s) from jsDelivr…`);
    for (const codepoint of missing) {
      const svg = await fetchSvg(codepoint);
      await fs.writeFile(path.join(SVG_DIR, `${codepoint}.svg`), svg, 'utf8');
      logger.info(`  + ${codepoint}.svg (${expected.get(codepoint)})`);
    }
  }

  if (orphans.length) {
    logger.info(`Removing ${orphans.length} orphan SVG(s)…`);
    for (const codepoint of orphans) {
      await fs.unlink(path.join(SVG_DIR, `${codepoint}.svg`));
      logger.info(`  - ${codepoint}.svg`);
    }
  }

  logger.info(`✓ Twemoji SVGs synced (${expected.size} emojis)`);
};

(async () => {
  try {
    await main();
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
})();
