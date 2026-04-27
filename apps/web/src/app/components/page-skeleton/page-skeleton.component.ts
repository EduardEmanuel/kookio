import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';

import {
  PAGE_SKELETONS,
  type PageSkeletonConfig,
} from './page-skeleton.config';

@Component({
  selector: 'kookio-page-skeleton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgxSkeletonLoaderComponent],
  template: `
    @if (config) {
      <section class="mx-auto p-6 max-w-sm">
        <ngx-skeleton-loader
          [count]="config.count"
          [animation]="config.animation ?? 'pulse'"
          [appearance]="config.appearance ?? 'line'"
        />
      </section>
    }
  `,
})
export class PageSkeletonComponent {
  protected readonly config: PageSkeletonConfig | null;

  constructor() {
    const url = inject(Router).url.split('?')[0];
    this.config = PAGE_SKELETONS[url] ?? null;
  }
}
