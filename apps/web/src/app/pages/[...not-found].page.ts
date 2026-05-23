import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { RouteMeta } from '@analogjs/router';

import { ErrorPageComponent } from '@kookio/feature-shell';

export const routeMeta: RouteMeta = {
  title: 'Page not found — Kookio',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-not-found-page',
  imports: [ErrorPageComponent],
  template: `
    <kookio-error-page
      [code]="404"
      title="Page not found"
      icon="warning"
      description="The page you are looking for does not exist or has been moved."
      [primaryCta]="{ label: 'Go home', route: '/' }"
    />
  `,
})
export default class NotFoundPage {}
