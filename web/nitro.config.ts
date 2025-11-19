import { defineNitroConfig } from 'nitropack/config';

export default defineNitroConfig({
  externals: {
    inline: [/^@kookio\//],
  },
  modules: ['./nitro-modules/tsconfig-alias'],
  esbuild: {
    options: {
      platform: 'node',
      target: 'node20',
      format: 'esm',
    },
  },
});
