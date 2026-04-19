import { ChangeDetectionStrategy, Component } from '@angular/core';

import { URLS } from '@kookio/feature-shell';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'kookio-forbidden-page',
  template: `
    <section class="prose mx-auto p-6 text-center">
      <h1>403 — Forbidden</h1>
      <p>You don't have permission to access this page.</p>
      <a [href]="homeUrl">Go home</a>
    </section>
  `,
})
export default class ForbiddenPage {
  protected readonly homeUrl = URLS.HOME;
}
