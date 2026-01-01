import nx from '@nx/eslint-plugin';
import preferArrow from 'eslint-plugin-prefer-arrow';

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
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.{ts,tsx,cts,js,jsx,mjs,cjs}'],
    plugins: { 'prefer-arrow': preferArrow },
    rules: {
      'func-style': ['error', 'expression', { allowArrowFunctions: true }],
      'prefer-arrow/prefer-arrow-functions': [
        'error',
        {
          disallowPrototype: true,
          singleReturnOnly: false,
          classPropertiesAllowed: true,
        },
      ],
      'prefer-arrow-callback': [
        'error',
        {
          allowNamedFunctions: false,
          allowUnboundThis: false,
        },
      ],
      'no-var': 'error',
      'prefer-const': ['error', { destructuring: 'all' }],
    },
  },
  {
    files: ['**/*.{ts,tsx,cts}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
];
