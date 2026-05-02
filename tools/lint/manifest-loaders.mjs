import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..',
);

const ICON_MANIFEST_PATH = path.join(
  REPO_ROOT,
  'libs/shared/utility/src/lib/material-symbols-icons.ts',
);

const TWEMOJI_SVG_DIR = path.join(REPO_ROOT, 'apps/web/public/icons/twemoji');

// Mirror of scripts/build-twemoji.ts → toTwemojiCodepoint. Strips fe0f
// (variation selector-16), lowercase hex, joined by `-`. Replicated here
// rather than imported so the rule has no TS/tsx dependency at lint time.
export const toTwemojiCodepoint = (emoji) =>
  Array.from(emoji)
    .map((c) => c.codePointAt(0).toString(16).toLowerCase())
    .filter((c) => c !== 'fe0f')
    .join('-');

// Format-coupled to writeManifest() in build-material-symbols-icons.ts:
// each icon is on its own line as `  '<name>',`. The regex matches that
// exact shape; if the writer changes, this loader changes too.
const parseIconManifest = (text) =>
  new Set([...text.matchAll(/^\s*'([^']+)',$/gm)].map((m) => m[1]));

const safeLoad = (loader) => {
  try {
    return loader();
  } catch {
    // Manifest missing or unreadable — return empty set so the rule
    // skips validation rather than flagging every literal as invalid.
    return new Set();
  }
};

export const ICON_NAMES = safeLoad(() =>
  parseIconManifest(readFileSync(ICON_MANIFEST_PATH, 'utf8')),
);

export const EMOJI_CODEPOINTS = safeLoad(
  () =>
    new Set(
      readdirSync(TWEMOJI_SVG_DIR)
        .filter((f) => f.endsWith('.svg'))
        .map((f) => f.replace(/\.svg$/, '')),
    ),
);
