/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { sentryVitePlugin } from '@sentry/vite-plugin';
// @ts-expect-error @tailwindcss/vite currently uses mts. TypeScript is complaining this, but it works as expected.
import tailwindcss from '@tailwindcss/vite';

import { defineConfig } from 'vite';

import { injectAssetVersion } from './vite-plugins/inject-asset-version';

const nitroPreset = process.env['NITRO_PRESET'] ?? 'node-server';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    cacheDir: `../../node_modules/.vite`,
    build: {
      outDir: '../../dist/./apps/web/client',
      reportCompressedSize: true,
      target: ['es2020'],
      // Generate source maps in production too, but `hidden` (no
      // sourceMappingURL comment) so browsers never fetch them — @sentry/vite-
      // plugin uploads them to Sentry for readable stack traces, then deletes
      // the .map files from the bundle (see filesToDeleteAfterUpload below).
      sourcemap: mode === 'production' ? 'hidden' : true,
    },
    css: {
      preprocessorOptions: {
        scss: {
          // Allow @use 'variables', @use 'mixins' etc. in component SCSS files
          // without long relative paths. Does NOT affect the global styles.css entry
          // (which must stay .css due to the nxViteTsPaths ?direct Sass importer bug).
          includePaths: ['src/styles'],
        },
      },
    },
    envPrefix: 'NG_APP_',
    server: {
      fs: {
        allow: ['.'],
      },
      sourcemapIgnoreList: false,
    },
    plugins: [
      tailwindcss(),

      injectAssetVersion(),

      analog({
        ssr: true,
        prerender: {
          routes: ['/about'],
          sitemap: {
            host: 'https://kookio.app',
          },
        },
        nitro: {
          preset: nitroPreset,
          esbuild: {
            options: {
              platform: 'node',
              target: 'node20',
              format: 'esm',
            },
          },
          externals: {
            inline: [/^@kookio\//],
            // Stops Nitro's Rollup from following externalized SSR imports into node_modules during "Building Server...".
            external: [
              /@angular\//,
              /@ngrx\//,
              /^rxjs/,
              /^firebase/,
              /@firebase\//,
              // @sentry/node pulls a large OpenTelemetry graph; keep it out of
              // Nitro's Rollup AST and resolve it at runtime (Vercel traces it
              // into the function), same as firebase above.
              /^@sentry\/node/,
              // sharp ships a native binding; Rollup cannot bundle the `.node`
              // file, so it must resolve at runtime. Consumed only by the local
              // `/api/img` optimizer route (off-Vercel) — see images.ts.
              /^sharp$/,
            ],
          },
          ignore: ['**/*.spec.ts'],
          modules: ['./nitro-modules/tsconfig-alias'],
          routeRules: {
            '/assets/**': {
              headers: {
                'cache-control': 'public, max-age=31536000, immutable',
              },
            },
            '/fonts/**': {
              headers: {
                'cache-control': 'public, max-age=31536000, immutable',
              },
            },
            '/icons/twemoji/**': {
              headers: {
                'cache-control': 'public, max-age=31536000, immutable',
              },
            },
            '/**': { headers: { 'cache-control': 'no-cache' } },
          },
          serveStatic: true,
        },
      }),

      nxViteTsPaths(),

      // Upload source maps to Sentry and tag a release (the git SHA), so
      // production stack traces are readable and errors point at the deploy
      // that introduced them. A no-op without SENTRY_AUTH_TOKEN, so local and
      // PR builds stay green and never attempt an upload. Must come last.
      sentryVitePlugin({
        org: process.env['SENTRY_ORG'],
        project: process.env['SENTRY_PROJECT'],
        authToken: process.env['SENTRY_AUTH_TOKEN'],
        disable: !process.env['SENTRY_AUTH_TOKEN'],
        telemetry: false,
        release: { name: process.env['VERCEL_GIT_COMMIT_SHA'] },
        sourcemaps: {
          // Delete the .map files after upload so they're never served. Glob is
          // resolved from the working directory (the repo root under nx).
          filesToDeleteAfterUpload: ['./dist/apps/web/**/*.map'],
        },
      }),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      reporters: ['default'],
      // Assert per-file isolation explicitly. Vitest's default is `true`, but
      // resource-constrained CI runners flip it off, which collapses every
      // spec file into one shared context — Angular's module-level TestBed
      // then double-inits ("Cannot set base providers...") or loses its env
      // ("Need to call initTestEnvironment() first"). Forcing it here keeps
      // each spec file isolated regardless of the runner.
      fileParallelism: true,
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
