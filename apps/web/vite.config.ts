/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
// @ts-expect-error @tailwindcss/vite currently uses mts. TypeScript is complaining this, but it works as expected.
import tailwindcss from '@tailwindcss/vite';

import { defineConfig } from 'vite';

const nitroPreset = process.env['NITRO_PRESET'] ?? 'node-server';

const CHUNK_RULES: Array<{ pattern: RegExp; chunk: string }> = [
  { pattern: /node_modules\/@angular\/(material|cdk)/, chunk: 'material' },
  { pattern: /node_modules\/@ngrx\//, chunk: 'ngrx' },
  { pattern: /node_modules\/@angular\//, chunk: 'angular' },
  { pattern: /node_modules\/(firebase|@firebase)\//, chunk: 'firebase' },
  { pattern: /node_modules\//, chunk: 'vendor' },
];

const manualChunks = (id: string): string | undefined =>
  CHUNK_RULES.find(({ pattern }) => pattern.test(id))?.chunk;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    cacheDir: `../../node_modules/.vite`,
    build: {
      outDir: '../../dist/./apps/web/client',
      reportCompressedSize: true,
      target: ['es2020'],
      sourcemap: mode !== 'production',
      rollupOptions: {
        output: { manualChunks },
      },
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

      analog({
        ssr: true,
        prerender: {
          routes: ['/about'],
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
          },
          ignore: ['**/*.spec.ts'],
          modules: ['./nitro-modules/tsconfig-alias'],
          routeRules: {
            '/assets/**': {
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
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      reporters: ['default'],
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
