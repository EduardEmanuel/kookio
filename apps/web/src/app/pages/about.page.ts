import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { RouteMeta } from '@analogjs/router';

import { KookioLinkComponent } from '@kookio/shared-ui';

export const routeMeta: RouteMeta = {
  title: 'About — Kookio',
  meta: [
    {
      name: 'description',
      content:
        'Kookio is a culinary platform that helps reduce food waste by matching recipes to what you already have in your pantry.',
    },
  ],
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-about-page',
  imports: [KookioLinkComponent],
  templateUrl: './about.page.html',
})
export default class AboutPage {}
