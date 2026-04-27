import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import type { RouteMeta } from '@analogjs/router';

import { PageStubComponent } from '@kookio/feature-shell';

export const routeMeta: RouteMeta = {
  title: 'Page not found — Kookio',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'kookio-not-found-page',
  imports: [RouterLink, MatButtonModule, PageStubComponent],
  template: `
    <kookio-page-stub
      icon="error_outline"
      title="Page not found"
      subtitle="404"
      placeholder="The page you are looking for does not exist or has been moved."
      route="/404"
    />
    <div class="flex justify-center mt-4 pb-8">
      <a mat-flat-button color="primary" routerLink="/">Go home</a>
    </div>
  `,
})
export default class NotFoundPage {}
