import { getTemplateParserServices } from '@angular-eslint/utils';

import { ICON_NAMES } from './manifest-loaders.mjs';

export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow `<kookio-icon name="...">` literals that are not in the Material Symbols manifest. Run `npm run build:icons` after introducing a new icon.',
    },
    schema: [
      {
        type: 'object',
        additionalProperties: false,
        properties: {
          icons: {
            type: 'array',
            items: { type: 'string' },
            description:
              'Override the icon list (used by tests). When omitted, the manifest at libs/shared/utility/src/lib/material-symbols-icons.ts is used.',
          },
        },
      },
    ],
    messages: {
      unknownIcon:
        '`{{ name }}` is not in the Material Symbols manifest. Run `npm run build:icons` to regenerate the manifest and the subsetted woff2.',
    },
  },

  create: (context) => {
    const opts = context.options[0] ?? {};
    const valid = opts.icons ? new Set(opts.icons) : ICON_NAMES;

    // Empty manifest = loader couldn't read the file. Fail open so the
    // rule never blocks a green build on infrastructure issues.
    if (valid.size === 0) return {};

    const parserServices = getTemplateParserServices(context);

    const visit = (node) => {
      const value = node.value;
      if (typeof value !== 'string' || valid.has(value)) return;

      context.report({
        loc: parserServices.convertNodeSourceSpanToLoc(node.sourceSpan),
        messageId: 'unknownIcon',
        data: { name: value },
      });
    };

    return {
      'Element[name="kookio-icon"] > TextAttribute[name="name"]': visit,
    };
  },
};
