import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

import { SaveToggleComponent } from '@kookio/feature-saved';
import type { RecipeFeedItem, SavedRecipeRow } from '@kookio/prisma-client';
import {
  FadeInImageDirective,
  KookioEmojiComponent,
  KookioIconComponent,
} from '@kookio/shared-ui';
import { URLS } from '@kookio/shared-utility';
import {
  DIFFICULTY_EMOJI,
  DIFFICULTY_LABEL,
} from '@kookio/shared-utility/difficulty';

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
    FadeInImageDirective,
    NgOptimizedImage,
  ],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
})
export class RecipeCardComponent {
  readonly recipe = input.required<RecipeFeedItem>();

  protected readonly recipeUrl = computed(() => URLS.RECIPE(this.recipe().id));

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
