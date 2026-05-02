import { getTemplateParserServices } from '@angular-eslint/utils';

const MAPPING = {
  'mat-button': 'matButton',
  'mat-flat-button': 'matButton="filled"',
  'mat-stroked-button': 'matButton="outlined"',
  'mat-raised-button': 'matButton="elevated"',
  'mat-icon-button': 'matIconButton',
  'mat-fab': 'matFab',
  'mat-mini-fab': 'matMiniFab',
};

const LEGACY_NAMES = new Set(Object.keys(MAPPING));

export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow legacy mat-*-button selectors; use the unified [matButton]/matIconButton/matFab API.',
    },
    fixable: 'code',
    schema: [],
    messages: {
      legacyMatButton:
        'Use `{{ replacement }}` instead of the legacy `{{ legacy }}` selector. The unified Material 3 API resolves to the same internal directive.',
    },
  },

  create: (context) => {
    const parserServices = getTemplateParserServices(context);

    const visit = (node) => {
      if (!node || !LEGACY_NAMES.has(node.name)) return;
      const replacement = MAPPING[node.name];
      const { sourceSpan } = node;

      context.report({
        loc: parserServices.convertNodeSourceSpanToLoc(sourceSpan),
        messageId: 'legacyMatButton',
        data: { legacy: node.name, replacement },
        fix: (fixer) =>
          fixer.replaceTextRange(
            [sourceSpan.start.offset, sourceSpan.end.offset],
            replacement,
          ),
      });
    };

    return {
      TextAttribute: visit,
      BoundAttribute: visit,
    };
  },
};
