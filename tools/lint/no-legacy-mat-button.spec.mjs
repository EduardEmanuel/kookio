import { afterAll, describe, it } from 'vitest';
import { RuleTester } from '@typescript-eslint/rule-tester';
import * as templateParser from '@angular-eslint/template-parser';

import noLegacyMatButton from './no-legacy-mat-button.mjs';

// Bridge vitest's lifecycle hooks to RuleTester (which expects mocha-style globals).
RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;

const tester = new RuleTester({
  languageOptions: { parser: templateParser },
});

tester.run('no-legacy-mat-button', noLegacyMatButton, {
  valid: [
    { code: '<button matButton type="button">Save</button>' },
    { code: '<button matButton="filled" type="button">Save</button>' },
    { code: '<button matButton="outlined" type="button">Cancel</button>' },
    { code: '<button matIconButton aria-label="Search"></button>' },
    { code: '<a matFab routerLink="/dashboard"></a>' },
    // Unrelated attributes that look similar must NOT be flagged.
    { code: '<mat-button-toggle value="x">x</mat-button-toggle>' },
  ],
  invalid: [
    {
      code: '<button mat-flat-button type="button">Save</button>',
      output: '<button matButton="filled" type="button">Save</button>',
      errors: [{ messageId: 'legacyMatButton' }],
    },
    {
      code: '<button mat-button type="button">Cancel</button>',
      output: '<button matButton type="button">Cancel</button>',
      errors: [{ messageId: 'legacyMatButton' }],
    },
    {
      code: '<button mat-stroked-button>Cancel</button>',
      output: '<button matButton="outlined">Cancel</button>',
      errors: [{ messageId: 'legacyMatButton' }],
    },
    {
      code: '<button mat-raised-button>Save</button>',
      output: '<button matButton="elevated">Save</button>',
      errors: [{ messageId: 'legacyMatButton' }],
    },
    {
      code: '<button mat-icon-button aria-label="x"></button>',
      output: '<button matIconButton aria-label="x"></button>',
      errors: [{ messageId: 'legacyMatButton' }],
    },
    {
      code: '<a mat-fab routerLink="/x"></a>',
      output: '<a matFab routerLink="/x"></a>',
      errors: [{ messageId: 'legacyMatButton' }],
    },
    {
      code: '<a mat-mini-fab routerLink="/x"></a>',
      output: '<a matMiniFab routerLink="/x"></a>',
      errors: [{ messageId: 'legacyMatButton' }],
    },
  ],
});
