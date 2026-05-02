import { getTemplateParserServices } from '@angular-eslint/utils';

import { EMOJI_CODEPOINTS, toTwemojiCodepoint } from './manifest-loaders.mjs';

export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow `<kookio-emoji char="...">` literals whose Twemoji SVG is missing from apps/web/public/icons/twemoji/. Run `npm run build:twemoji` after introducing a new emoji.',
    },
    schema: [
      {
        type: 'object',
        additionalProperties: false,
        properties: {
          codepoints: {
            type: 'array',
            items: { type: 'string' },
            description:
              'Override the codepoint set (used by tests). When omitted, the SVG directory is scanned at lint time.',
          },
        },
      },
    ],
    messages: {
      unknownEmoji:
        '`{{ char }}` (codepoint `{{ codepoint }}`) has no matching SVG in apps/web/public/icons/twemoji/. Run `npm run build:twemoji` to download the missing asset.',
    },
  },

  create: (context) => {
    const opts = context.options[0] ?? {};
    const valid = opts.codepoints ? new Set(opts.codepoints) : EMOJI_CODEPOINTS;

    if (valid.size === 0) return {};

    const parserServices = getTemplateParserServices(context);

    const visit = (node) => {
      const value = node.value;
      if (typeof value !== 'string') return;

      const codepoint = toTwemojiCodepoint(value);
      if (valid.has(codepoint)) return;

      context.report({
        loc: parserServices.convertNodeSourceSpanToLoc(node.sourceSpan),
        messageId: 'unknownEmoji',
        data: { char: value, codepoint },
      });
    };

    return {
      'Element[name="kookio-emoji"] > TextAttribute[name="char"]': visit,
    };
  },
};
