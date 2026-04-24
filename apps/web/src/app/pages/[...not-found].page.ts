import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import type { RouteMeta } from '@analogjs/router';

export const routeMeta: RouteMeta = {
  title: 'Page not found — Kookio',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'kookio-not-found-page',
  imports: [RouterLink],
  template: `
    <section class="prose mx-auto p-6 max-w-sm text-center">
      <h1>404</h1>
      <p>This page does not exist.</p>
      <a routerLink="/">Go home</a>
    </section>
  `,
})
export default class NotFoundPage {}
