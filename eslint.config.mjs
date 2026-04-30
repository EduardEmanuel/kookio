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
            // Server libs must not depend on frontend or web app code
            {
              sourceTag: 'scope:server',
              notDependOnLibsWithTags: ['scope:frontend', 'scope:web'],
            },
            // Prisma lib must not depend on frontend or web app code
            {
              sourceTag: 'scope:prisma',
              notDependOnLibsWithTags: ['scope:frontend', 'scope:web'],
            },
            // Frontend libs must not depend on server-only libs
            {
              sourceTag: 'scope:frontend',
              notDependOnLibsWithTags: ['scope:server'],
            },
            // Permissive fallback for untagged and other scopes
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
  // Force every component to render icons through KookioIconComponent.
  // Banning MatIconModule / MatIcon is equivalent to banning <mat-icon>
  // in templates: a standalone component cannot render the element
  // without one of these in its imports array. MatIconRegistry stays
  // available — it's needed in app.config.ts to set the default font
  // set class. Only the wrapper itself is allowed to import the
  // banned symbols directly.
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['libs/shared/ui/src/lib/components/icon/icon.component.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@angular/material/icon',
              importNames: ['MatIconModule', 'MatIcon'],
              message:
                'Use <kookio-icon name="..." /> from @kookio/shared-ui instead. Only icon.component.ts may import these directly. MatIconRegistry is allowed.',
            },
          ],
        },
      ],
    },
  },
];
