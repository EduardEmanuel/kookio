import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: [
      '**/dist/**',
      '**/.vercel/**',
      '**/.nitro/**',
      '**/.analog/**',
      '**/.output/**',
      '**/tmp/**',
      '**/coverage/**',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
            {
              sourceTag: 'scope:server',
              onlyDependOnLibsWithTags: [
                'scope:server',
                'scope:shared',
                'scope:prisma',
              ],
            },
            {
              sourceTag: 'scope:prisma',
              onlyDependOnLibsWithTags: [
                'scope:prisma',
                'scope:server',
                'scope:shared',
              ],
            },
            {
              sourceTag: 'scope:web',
              onlyDependOnLibsWithTags: [
                'scope:web',
                'scope:shared',
                'scope:server',
                'scope:prisma',
              ],
            },
            {
              sourceTag: 'type:mock',
              onlyDependOnLibsWithTags: ['type:mock', 'type:utility'],
            },
            {
              sourceTag: 'type:utility',
              onlyDependOnLibsWithTags: ['type:utility'],
            },
            {
              sourceTag: 'type:validator',
              onlyDependOnLibsWithTags: [
                'type:validator',
                'type:client',
                'type:utility',
              ],
            },
            {
              sourceTag: 'type:trpc',
              onlyDependOnLibsWithTags: [
                'type:trpc',
                'type:logger',
                'type:validator',
                'type:client',
                'type:utility',
              ],
            },
            {
              sourceTag: 'type:logger',
              onlyDependOnLibsWithTags: ['type:logger', 'type:utility'],
            },
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: [
                'type:app',
                'type:trpc',
                'type:mock',
                'type:logger',
                'type:validator',
                'type:client',
                'type:utility',
              ],
            },
            {
              sourceTag: 'type:e2e',
              onlyDependOnLibsWithTags: [
                'type:e2e',
                'type:app',
                'type:trpc',
                'type:mock',
                'type:logger',
                'type:validator',
                'type:client',
                'type:utility',
              ],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    rules: {},
  },
];
