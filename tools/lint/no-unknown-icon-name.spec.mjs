import { afterAll, describe, it } from 'vitest';
import { RuleTester } from '@typescript-eslint/rule-tester';
import * as templateParser from '@angular-eslint/template-parser';

import noUnknownIconName from './no-unknown-icon-name.mjs';

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;

const tester = new RuleTester({
  languageOptions: { parser: templateParser },
});

const opts = [{ icons: ['add', 'refresh', 'restaurant'] }];
const withOpts = (cases) => cases.map((c) => ({ ...c, options: opts }));

tester.run('no-unknown-icon-name', noUnknownIconName, {
  valid: withOpts([
    { code: '<kookio-icon name="add" />' },
    { code: '<kookio-icon name="refresh" />' },
    { code: '<kookio-icon name="restaurant" iconPositionEnd />' },
    // Bound (dynamic) — never flagged. Cannot resolve at lint time.
    { code: '<kookio-icon [name]="someExpression" />' },
    // Unrelated element with `name=` literal.
    { code: '<input name="email" />' },
  ]),
  invalid: withOpts([
    {
      code: '<kookio-icon name="not_in_manifest" />',
      errors: [{ messageId: 'unknownIcon' }],
    },
    {
      code: '<kookio-icon name="typo_refresh" />',
      errors: [{ messageId: 'unknownIcon' }],
    },
  ]),
});

// Empty options.icons (loader fail-open path) → rule must skip entirely.
tester.run('no-unknown-icon-name (empty manifest)', noUnknownIconName, {
  valid: [
    {
      code: '<kookio-icon name="anything_at_all" />',
      options: [{ icons: [] }],
    },
  ],
  invalid: [],
});
