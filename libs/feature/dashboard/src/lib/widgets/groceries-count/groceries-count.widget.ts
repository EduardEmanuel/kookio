import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';

import {
  GROCERIES_TRPC,
  type GroceriesStats,
} from '@kookio/feature-groceries/trpc';
import { KookioEmojiComponent, KookioIconComponent } from '@kookio/shared-ui';
import { URLS } from '@kookio/shared-utility';

import { from, take } from 'rxjs';

@Component({
  selector: 'kookio-groceries-count-widget',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    RouterLink,
    KookioEmojiComponent,
    KookioIconComponent,
  ],
  templateUrl: './groceries-count.widget.html',
  styleUrl: './groceries-count.widget.scss',
})
export class GroceriesCountWidgetComponent {
  private readonly trpc = inject(GROCERIES_TRPC);

  protected readonly stats = signal<GroceriesStats | null>(null);
  protected readonly isLoading = signal(true);
  protected readonly hasError = signal(false);

  protected readonly groceriesUrl = URLS.GROCERIES;

  protected readonly hasItems = computed(() => (this.stats()?.total ?? 0) > 0);
  protected readonly remaining = computed(() => this.stats()?.remaining ?? 0);

  constructor() {
    // Dashboard sits behind `authGuard` + `onboardingGuard` (SSR redirects
    // before bootstrap), so a client-only fetch is safe and avoids paying
    // the round-trip on the SSR critical path.
    afterNextRender(() => {
      from(this.trpc.groceries.stats.query())
        .pipe(take(1))
        .subscribe({
          next: (stats) => {
            this.stats.set(stats);
            this.isLoading.set(false);
          },
          error: () => {
            this.hasError.set(true);
            this.isLoading.set(false);
          },
        });
    });
  }
}
