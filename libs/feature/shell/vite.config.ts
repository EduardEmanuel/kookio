import * as fs from 'node:fs';
import * as path from 'node:path';

import { defineConfig, type Plugin } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

const angularTemplateInliner = (): Plugin => ({
  name: 'angular-template-inliner',
  transform: (code, id) => {
    if (!id.endsWith('.ts') || !code.includes('templateUrl')) return null;

    let result = code;

    result = result.replace(
      /templateUrl:\s*['"]([^'"]+)['"]/g,
      (_match, relPath) => {
        const absPath = path.resolve(path.dirname(id), relPath);
        const html = fs
          .readFileSync(absPath, 'utf-8')
          .replace(/`/g, '\\`')
          .replace(/\$\{/g, '\\${');
        return `template: \`${html}\``;
      },
    );

    result = result.replace(/styleUrl:\s*['"][^'"]+['"]/g, 'styles: []');
    result = result.replace(/styleUrls:\s*\[[^\]]*\]/g, 'styles: []');

    return result === code ? null : { code: result, map: null };
  },
});

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/libs/feature/shell',
  plugins: [
    angularTemplateInliner(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
  ],
  test: {
    name: 'shell',
    watch: false,
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../../coverage/libs/feature/shell',
      provider: 'v8' as const,
    },
  },
}));
