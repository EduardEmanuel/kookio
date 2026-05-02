import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'tools-lint',
    include: ['*.spec.mjs'],
    environment: 'node',
    globals: false,
  },
});
