import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { RouteMeta } from '@analogjs/router';

import { roleGuard } from '@kookio/feature-auth';
import { PageStubComponent } from '@kookio/feature-shell';

export const routeMeta: RouteMeta = {
  canActivate: [roleGuard('ADMIN')],
  title: 'Admin — Kookio',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-admin-page',
  imports: [PageStubComponent],
  template: `
    <kookio-page-stub
      icon="admin_panel_settings"
      title="Admin"
      subtitle="Administration panel"
      route="/admin"
    />
  `,
})
export default class AdminPage {}
