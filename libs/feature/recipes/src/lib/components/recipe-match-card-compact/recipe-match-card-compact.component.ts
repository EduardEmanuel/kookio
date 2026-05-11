import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

import type { RecipeMatchItem } from '@kookio/prisma-client';
import { KookioIconComponent } from '@kookio/shared-ui';

/**
 * Compact, single-row match card for narrow surfaces (~280px sidebar).
 * Sibling of `RecipeMatchCardComponent`; same data shape, no
 * `Cook now`, no routerLink (consumer wires drag instead of click).
 *
 * Kept as a separate component rather than a `[compact]` flag on the
 * original — the two layouts diverge enough (image position, chip
 * style, no actions row) that flagging would mean two parallel
 * templates inside one file. Two components keep each layout focused
 * and let consumers pick the right surface for their context.
 */
const ALMOST_MAX_MISSING = 3;

@Component({
  selector: 'kookio-recipe-match-card-compact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, MatChipsModule, KookioIconComponent],
  templateUrl: './recipe-match-card-compact.component.html',
  styleUrl: './recipe-match-card-compact.component.scss',
})
export class RecipeMatchCardCompactComponent {
  readonly item = input.required<RecipeMatchItem>();

  protected readonly isComplete = computed(
    () => this.item().matchInfo.missingCount === 0,
  );
  protected readonly isAlmost = computed(() => {
    const m = this.item().matchInfo.missingCount;
    return m >= 1 && m <= ALMOST_MAX_MISSING;
  });

  protected readonly totalMinutes = computed(() => {
    const i = this.item();
    const total = (i.prepTimeMinutes ?? 0) + (i.cookTimeMinutes ?? 0);
    return total > 0 ? total : null;
  });

  protected readonly ariaLabel = computed(() => {
    const i = this.item();
    if (this.isComplete()) return `${i.title} — ready to cook`;
    if (this.isAlmost()) {
      const n = i.matchInfo.missingCount;
      return `${i.title} — missing ${n} ingredient${n === 1 ? '' : 's'}`;
    }
    return i.title;
  });
}
