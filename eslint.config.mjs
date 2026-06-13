import angular from 'angular-eslint';
import nx from '@nx/eslint-plugin';
import preferArrow from 'eslint-plugin-prefer-arrow';

import noLegacyMatButton from './tools/lint/no-legacy-mat-button.mjs';
import noUnknownEmojiChar from './tools/lint/no-unknown-emoji-char.mjs';
import noUnknownIconName from './tools/lint/no-unknown-icon-name.mjs';

const kookioPlugin = {
  rules: {
    'no-legacy-mat-button': noLegacyMatButton,
    'no-unknown-icon-name': noUnknownIconName,
    'no-unknown-emoji-char': noUnknownEmojiChar,
  },
};

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
  // Frontend code is forbidden from importing the server-only Prisma surface.
  // The root barrel `@kookio/prisma-client` is browser-safe (types + zod
  // schemas only); `/server` re-exports the Prisma instance whose
  // `defineExtension` throws on hydration. NX `enforce-module-boundaries`
  // works at project level, so it cannot tell apart a frontend lib's import
  // of `/server` from the root — this glob-scoped rule handles the sub-path.
  //
  // ESLint flat config replaces `no-restricted-imports` rather than merging,
  // so the MatIcon ban from the block above is replicated here verbatim
  // (with `KookioIconComponent` itself ignored, same as the upstream block).
  {
    files: [
      'apps/web/src/app/**/*.{ts,tsx}',
      'libs/feature/**/*.{ts,tsx}',
      'libs/shared/ui/**/*.{ts,tsx}',
    ],
    ignores: ['libs/shared/ui/src/lib/components/icon/icon.component.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@kookio/prisma-client/server',
              message:
                'Server-only Prisma surface — frontend code must use `@kookio/prisma-client` (types + zod schemas) and route data access through tRPC.',
            },
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
  // Angular TypeScript files: enable @angular-eslint recommended rules and
  // run inline templates through the angular-template parser/processor so
  // template-targeted rules apply to `template:` blocks too.
  {
    files: ['**/*.ts'],
    plugins: { '@angular-eslint': angular.tsPlugin },
    processor: angular.processInlineTemplates,
    rules: {
      ...angular.configs.tsRecommended
        .map((c) => c.rules)
        .reduce((acc, r) => ({ ...acc, ...(r ?? {}) }), {}),
    },
  },
  // Angular HTML templates: parser + recommended template rules + the local
  // ban on legacy mat-*-button selectors.
  {
    files: ['**/*.html'],
    languageOptions: { parser: angular.templateParser },
    plugins: {
      '@angular-eslint/template': angular.templatePlugin,
      '@kookio': kookioPlugin,
    },
    rules: {
      ...angular.configs.templateRecommended
        .map((c) => c.rules)
        .reduce((acc, r) => ({ ...acc, ...(r ?? {}) }), {}),
      ...angular.configs.templateAccessibility
        .map((c) => c.rules)
        .reduce((acc, r) => ({ ...acc, ...(r ?? {}) }), {}),
      '@kookio/no-legacy-mat-button': 'error',
      '@kookio/no-unknown-icon-name': 'error',
      '@kookio/no-unknown-emoji-char': 'error',
    },
  },
];
