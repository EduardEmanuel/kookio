import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { RouteMeta } from '@analogjs/router';

export const routeMeta: RouteMeta = {
  title: 'Attributions — Kookio',
  meta: [
    {
      name: 'description',
      content:
        'Open-source assets, fonts, and graphics used by Kookio, with their licenses.',
    },
  ],
};

interface Attribution {
  name: string;
  description: string;
  source: { label: string; href: string };
  license: { label: string; href: string };
  required: boolean;
}

const ATTRIBUTIONS: readonly Attribution[] = [
  {
    name: 'Twemoji',
    description: 'Emoji graphics used throughout the app.',
    source: {
      label: 'jdecked/twemoji v15.1.0',
      href: 'https://github.com/jdecked/twemoji',
    },
    license: {
      label: 'CC BY 4.0',
      href: 'https://creativecommons.org/licenses/by/4.0/',
    },
    required: true,
  },
  {
    name: 'Material Symbols Outlined',
    description:
      'Variable icon font used for all UI icons (self-hosted, subset).',
    source: {
      label: 'Google Fonts — Material Symbols',
      href: 'https://fonts.google.com/icons',
    },
    license: {
      label: 'Apache License 2.0',
      href: 'https://www.apache.org/licenses/LICENSE-2.0',
    },
    required: false,
  },
  {
    name: 'Fredoka',
    description: 'Display typeface used in the Kookio wordmark and logo.',
    source: {
      label: 'Google Fonts — Fredoka',
      href: 'https://fonts.google.com/specimen/Fredoka',
    },
    license: {
      label: 'SIL Open Font License 1.1',
      href: 'https://openfontlicense.org/',
    },
    required: false,
  },
  {
    name: 'Inter',
    description: 'Primary sans-serif typeface used for UI text.',
    source: {
      label: 'Google Fonts — Inter',
      href: 'https://fonts.google.com/specimen/Inter',
    },
    license: {
      label: 'SIL Open Font License 1.1',
      href: 'https://openfontlicense.org/',
    },
    required: false,
  },
  {
    name: 'Roboto',
    description: 'Fallback typeface for UI text and the Material baseline.',
    source: {
      label: 'Google Fonts — Roboto',
      href: 'https://fonts.google.com/specimen/Roboto',
    },
    license: {
      label: 'Apache License 2.0',
      href: 'https://www.apache.org/licenses/LICENSE-2.0',
    },
    required: false,
  },
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-legal-attributions-page',
  template: `
    <article class="prose mx-auto max-w-2xl p-6">
      <header class="mb-8">
        <h1>Attributions</h1>
        <p>
          Kookio is built on top of open-source software, fonts, and graphics.
          The list below names the third-party assets shipped with the app and
          links to the license each one is distributed under. Items marked
          <em>required</em> have a license that explicitly requires this kind of
          visible attribution; the rest are listed as a courtesy.
        </p>
      </header>

      <ul class="list-none p-0">
        @for (item of attributions; track item.name) {
          <li class="mb-6">
            <h2 class="mb-1">
              {{ item.name }}
              @if (item.required) {
                <small
                  class="ml-2 align-middle text-xs uppercase tracking-wide opacity-70"
                  >required</small
                >
              }
            </h2>
            <p class="mb-1">{{ item.description }}</p>
            <p class="m-0 text-sm">
              Source:
              <a [href]="item.source.href" rel="noopener" target="_blank">{{
                item.source.label
              }}</a>
              · Licensed under
              <a [href]="item.license.href" rel="noopener" target="_blank">{{
                item.license.label
              }}</a>
            </p>
          </li>
        }
      </ul>
    </article>
  `,
})
export default class LegalAttributionsPage {
  protected readonly attributions = ATTRIBUTIONS;
}
