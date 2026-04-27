import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { RouteMeta } from '@analogjs/router';

import { PageStubComponent } from '@kookio/feature-shell';

export const routeMeta: RouteMeta = {
  title: 'About — Kookio',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-about-page',
  imports: [PageStubComponent],
  template: `
    <kookio-page-stub
      icon="info"
      title="About Kookio"
      subtitle="Minimal SSG page prerendered by Analog"
      route="/about"
    />
  `,
})
export default class AboutPage {}
