import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

import { SaveToggleComponent } from '@kookio/feature-saved';
import type { RecipeFeedItem, SavedRecipeRow } from '@kookio/prisma-client';
import { KookioEmojiComponent, KookioIconComponent } from '@kookio/shared-ui';
import {
  optimizedImageSrcSet,
  optimizedImageUrl,
  URLS,
} from '@kookio/shared-utility';
import {
  DIFFICULTY_EMOJI,
  DIFFICULTY_LABEL,
} from '@kookio/shared-utility/difficulty';

/** Candidate widths (px) requested from Vercel Image Optimization for the
 * feed-card `srcset`. Subset of `images.sizes` in `vercel.json`; covers the
 * card from a ~320px mobile column up to a ~640px desktop column at 1.5× DPR. */
const RECIPE_IMAGE_WIDTHS = [320, 480, 640, 960] as const;

@Component({
  selector: 'kookio-recipe-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    MatCardModule,
    MatChipsModule,
    SaveToggleComponent,
    KookioEmojiComponent,
    KookioIconComponent,
  ],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
})
export class RecipeCardComponent {
  readonly recipe = input.required<RecipeFeedItem>();

  protected readonly recipeUrl = computed(() => URLS.RECIPE(this.recipe().id));

  /** Single `src` at the desktop display width; `srcset` lets the browser pick
   * a smaller candidate on narrower viewports / lower DPR. Widths must stay a
   * subset of `images.sizes` in `vercel.json`. */
  protected readonly optimizedSrc = computed(() =>
    optimizedImageUrl(this.recipe().imageUrl, 640),
  );
  protected readonly optimizedSrcSet = computed(() =>
    optimizedImageSrcSet(this.recipe().imageUrl, RECIPE_IMAGE_WIDTHS),
  );

  protected readonly totalMinutes = computed(() => {
    const r = this.recipe();
    const total = (r.prepTimeMinutes ?? 0) + (r.cookTimeMinutes ?? 0);
    return total > 0 ? total : null;
  });

  /**
   * Synthesised row for the optimistic `SavedStore.items` insert when this
   * card is the surface that triggers the save (home, /recipes, /recipes/saved).
   * `addedAt: new Date()` is a placeholder — the server's `getSaved` returns
   * the authoritative timestamp on the next `load()`.
   */
  protected readonly savedRow = computed<SavedRecipeRow>(() => ({
    recipe: this.recipe(),
    addedAt: new Date(),
  }));

  protected readonly DIFFICULTY_LABEL = DIFFICULTY_LABEL;
  protected readonly DIFFICULTY_EMOJI = DIFFICULTY_EMOJI;
}
