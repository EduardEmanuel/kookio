import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/libs/feature/shell',
  plugins: [
    angular({ jit: true, inlineStylesExtension: 'scss' }),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
  ],
  test: {
    name: 'shell',
    watch: false,
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    // Force per-file isolation; CI runners flip Vitest's default off, collapsing
    // spec files into one shared context and breaking Angular's module-level TestBed.
    fileParallelism: true,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../../coverage/libs/feature/shell',
      provider: 'v8' as const,
    },
  },
}));
