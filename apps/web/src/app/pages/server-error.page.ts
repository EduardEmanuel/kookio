import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { RouteMeta } from '@analogjs/router';

import { ErrorPageComponent, type ErrorCta } from '@kookio/feature-shell';

export const routeMeta: RouteMeta = {
  title: 'Something went wrong — Kookio',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-server-error-page',
  imports: [ErrorPageComponent],
  template: `
    <kookio-error-page
      [code]="500"
      title="Something went wrong"
      icon="error"
      description="An unexpected error occurred on our end. Try reloading the page in a moment."
      [primaryCta]="primaryCta"
      [secondaryCta]="{ label: 'Go home', route: '/' }"
    />
  `,
})
export default class ServerErrorPage {
  protected readonly primaryCta: ErrorCta = {
    label: 'Retry',
    action: () => window.location.reload(),
  };
}
