import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { RouteMeta } from '@analogjs/router';

import { PageStubComponent } from '@kookio/feature-shell';

export const routeMeta: RouteMeta = {
  title: 'Kookio',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'kookio-web-home',
  imports: [PageStubComponent],
  template: `
    <kookio-page-stub
      icon="home"
      title="Home"
      subtitle="Public recipe feed"
      route="/"
    />
  `,
})
export default class HomeComponent {}
