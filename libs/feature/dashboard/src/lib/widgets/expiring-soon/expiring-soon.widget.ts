import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  computed,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';

import {
  getExpirationLabel,
  getExpirationStatus,
  isPastExpiry,
} from '@kookio/feature-pantry/expiration';
import { PantryStore } from '@kookio/feature-pantry/store';
import type { PantryItemWithIngredient } from '@kookio/prisma-client';
import { KookioEmojiComponent, KookioIconComponent } from '@kookio/shared-ui';

const TOP_N = 5;

const expiresAtMs = (item: PantryItemWithIngredient): number => {
  const value = item.expiresAt;
  if (value === null) return Number.POSITIVE_INFINITY;
  const date = typeof value === 'string' ? new Date(value) : value;
  return date.getTime();
};

@Component({
  selector: 'kookio-expiring-soon-widget',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    RouterLink,
    KookioEmojiComponent,
    KookioIconComponent,
  ],
  templateUrl: './expiring-soon.widget.html',
  styleUrl: './expiring-soon.widget.scss',
})
export class ExpiringSoonWidgetComponent {
  protected readonly store = inject(PantryStore);

  protected readonly topItems = computed<PantryItemWithIngredient[]>(() =>
    this.store
      .items()
      .filter((item) => {
        const status = getExpirationStatus(item.expiresAt);
        return status === 'expired' || status === 'soon';
      })
      .sort((a, b) => expiresAtMs(a) - expiresAtMs(b))
      .slice(0, TOP_N),
  );

  protected readonly getLabel = (
    expiresAt: PantryItemWithIngredient['expiresAt'],
  ): string => getExpirationLabel(expiresAt);

  protected readonly isExpired = (
    expiresAt: PantryItemWithIngredient['expiresAt'],
  ): boolean => isPastExpiry(expiresAt);

  constructor() {
    // Mirrors `/pantry`: load is client-only — both dashboard and pantry
    // are gated by `authGuard` + `onboardingGuard`, so SSR redirects
    // before this widget bootstraps for real.
    afterNextRender(() => this.store.load());
  }
}
