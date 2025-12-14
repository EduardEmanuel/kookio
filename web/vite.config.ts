/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
// @ts-expect-error @tailwindcss/vite currently uses mts. TypeScript is complaining this, but it works as expected.
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const nitroPreset = process.env.NITRO_PRESET ?? 'node-server';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    cacheDir: `../node_modules/.vite`,
    build: {
      outDir: '../dist/./web/client',
      reportCompressedSize: true,
      target: ['es2020'],
    },
    server: {
      fs: {
        allow: ['.'],
      },
    },
    plugins: [
      tailwindcss(),

      analog({
        ssr:true,
        prerender: {
          routes: [ '/about' ],
        },
        nitro: {
          preset: nitroPreset,
          output: nitroPreset === 'vercel' ? { dir: '.vercel/output' } : undefined,
          serveStatic: true,
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
          modules: ['./nitro-modules/tsconfig-alias'],
          routeRules: { 
            '/assets/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
            '/**': { headers: { 'cache-control': 'no-cache' } },
          }
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
