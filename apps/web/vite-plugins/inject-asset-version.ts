import { execSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Plugin } from 'vite';

/**
 * Replaces the literal `ASSET_VERSION` placeholder with a build-time
 * version string so PWA-related public assets get a fresh cache key on
 * each deploy without manual version bumping.
 *
 * Targets:
 *   - `<link href="...?v=ASSET_VERSION">` in `index.html` (favicon,
 *     manifest, apple-touch-icon, splash images, font preload).
 *   - Icon URLs inside `manifest.webmanifest` — important so an
 *     already-installed PWA refetches the manifest after a deploy that
 *     touched its icons (the OS may otherwise hold the old manifest
 *     for the lifetime of the install).
 *
 * Version source preference:
 *   1. `VERCEL_GIT_COMMIT_SHA` (set by Vercel during CI builds)
 *   2. Local `git rev-parse --short HEAD`
 *   3. Fallback string `dev` for environments without git
 */
const computeVersion = (): string => {
  const vercelSha = process.env['VERCEL_GIT_COMMIT_SHA'];
  if (vercelSha) return vercelSha.slice(0, 7);
  try {
    return execSync('git rev-parse --short HEAD', {
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
  } catch {
    return 'dev';
  }
};

const PLACEHOLDER = 'ASSET_VERSION';
const MANIFEST_FILE = 'manifest.webmanifest';

export const injectAssetVersion = (): Plugin => {
  const version = computeVersion();

  const transformManifestFromDisk = (publicDir: string): string | null => {
    const manifestPath = join(publicDir, MANIFEST_FILE);
    if (!existsSync(manifestPath)) return null;
    return readFileSync(manifestPath, 'utf-8').replaceAll(PLACEHOLDER, version);
  };

  // Hooks declared as arrow-function fields to satisfy the project's
  // `prefer-arrow/prefer-arrow-functions` rule. The Plugin-typed local
  // gives TypeScript the parameter types via inference.
  const plugin: Plugin = {
    name: 'kookio:inject-asset-version',

    // index.html (both dev and build paths).
    transformIndexHtml: (html): string => html.replaceAll(PLACEHOLDER, version),

    // Dev: intercept manifest requests so the dev server returns the
    // transformed copy (Vite would otherwise serve public/ verbatim).
    // Middleware added inside `configureServer` runs BEFORE Vite's
    // internal static-file middleware, which is what we need.
    configureServer: (server): void => {
      server.middlewares.use((req, res, next) => {
        const url = req.url ?? '';
        if (!url.startsWith('/' + MANIFEST_FILE)) {
          next();
          return;
        }
        const transformed = transformManifestFromDisk(server.config.publicDir);
        if (transformed === null) {
          next();
          return;
        }
        res.setHeader('content-type', 'application/manifest+json');
        res.end(transformed);
      });
    },

    // Build: rewrite the manifest that Vite copied from public/ into
    // the output directory. Skipped for outputs that don't include the
    // manifest (e.g. the SSR bundle pass).
    writeBundle: (options): void => {
      const outDir = options.dir;
      if (!outDir) return;
      const manifestPath = join(outDir, MANIFEST_FILE);
      if (!existsSync(manifestPath)) return;
      const raw = readFileSync(manifestPath, 'utf-8');
      writeFileSync(manifestPath, raw.replaceAll(PLACEHOLDER, version));
    },
  };

  return plugin;
};
