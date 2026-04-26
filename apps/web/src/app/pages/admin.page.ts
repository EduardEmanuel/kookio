import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { RouteMeta } from '@analogjs/router';

import { roleGuard } from '@kookio/feature-auth';

export const routeMeta: RouteMeta = {
  canActivate: [roleGuard('ADMIN')],
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'kookio-admin-page',
  template: `
    <section class="prose mx-auto p-6">
      <h1>Admin</h1>
      <p>Administration panel. — coming soon</p>
    </section>
  `,
})
export default class AdminPage {}
