import { afterAll, describe, it } from 'vitest';
import { RuleTester } from '@typescript-eslint/rule-tester';
import * as templateParser from '@angular-eslint/template-parser';

import noUnknownEmojiChar from './no-unknown-emoji-char.mjs';
import { toTwemojiCodepoint } from './manifest-loaders.mjs';

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;

const tester = new RuleTester({
  languageOptions: { parser: templateParser },
});

// Build the test set from real emoji literals so the codepoint mapping
// stays in sync with the loader's helper.
const VALID_EMOJI = ['👋', '🥫', '🎉', '⚠️'];
const opts = [{ codepoints: VALID_EMOJI.map(toTwemojiCodepoint) }];
const withOpts = (cases) => cases.map((c) => ({ ...c, options: opts }));

tester.run('no-unknown-emoji-char', noUnknownEmojiChar, {
  valid: withOpts([
    { code: '<kookio-emoji char="👋" />' },
    { code: '<kookio-emoji char="🥫" matChipAvatar />' },
    { code: '<kookio-emoji char="🎉" [size]="56" />' },
    // ⚠️ has fe0f variation selector — rule must strip it before lookup.
    { code: '<kookio-emoji char="⚠️" />' },
    // Bound (dynamic) — never flagged.
    { code: '<kookio-emoji [char]="chip.emoji" />' },
    // Unrelated element with `char=` literal.
    { code: '<x-other char="anything" />' },
  ]),
  invalid: withOpts([
    {
      code: '<kookio-emoji char="🦄" />',
      errors: [{ messageId: 'unknownEmoji' }],
    },
  ]),
});

tester.run('no-unknown-emoji-char (empty set)', noUnknownEmojiChar, {
  valid: [
    {
      code: '<kookio-emoji char="🦄" />',
      options: [{ codepoints: [] }],
    },
  ],
  invalid: [],
});
