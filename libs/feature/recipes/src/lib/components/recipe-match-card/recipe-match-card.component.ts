import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

import type { RecipeMatchItem } from '@kookio/prisma-client';
import { KookioEmojiComponent, KookioIconComponent } from '@kookio/shared-ui';
import { URLS } from '@kookio/shared-utility';

/** A "B" match keeps recipes that need at most this many missing ingredients;
 * anything beyond falls into the "browse" bucket. Mirrors the server filter
 * in passesLevel(). */
const ALMOST_MAX_MISSING = 3;

@Component({
  selector: 'kookio-recipe-match-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    KookioEmojiComponent,
    KookioIconComponent,
  ],
  templateUrl: './recipe-match-card.component.html',
  styleUrl: './recipe-match-card.component.scss',
})
export class RecipeMatchCardComponent {
  readonly item = input.required<RecipeMatchItem>();

  private readonly router = inject(Router);

  protected readonly recipeUrl = computed(() => URLS.RECIPE(this.item().id));

  protected readonly isComplete = computed(
    () => this.item().matchInfo.missingCount === 0,
  );
  protected readonly isAlmost = computed(() => {
    const m = this.item().matchInfo.missingCount;
    return m >= 1 && m <= ALMOST_MAX_MISSING;
  });
  protected readonly isBrowse = computed(
    () => this.item().matchInfo.missingCount > ALMOST_MAX_MISSING,
  );

  /** "tomato, basil" if every missing ingredient is named, or
   * "tomato, basil +2 more" when the server returned a truncated list. */
  protected readonly formattedMissing = computed(() => {
    const names = this.item().matchInfo.missingNames;
    const total = this.item().matchInfo.missingCount;
    if (names.length === 0) return '';
    if (names.length === total) return names.join(', ');
    return `${names.join(', ')} +${total - names.length} more`;
  });

  protected readonly ariaLabel = computed(() => {
    const i = this.item();
    if (this.isComplete()) return `${i.title} — ready to cook`;
    if (this.isAlmost()) {
      const n = i.matchInfo.missingCount;
      return `${i.title} — missing ${n} ingredient${n === 1 ? '' : 's'}`;
    }
    return `View recipe ${i.title}`;
  });

  // Card wrapper is an anchor to the recipe details page; the Cook now button
  // must navigate elsewhere, so the wrapper navigation has to be cancelled
  // before the programmatic push.
  protected readonly onCookNow = (event: MouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate([URLS.COOK(this.item().id)]);
  };
}
