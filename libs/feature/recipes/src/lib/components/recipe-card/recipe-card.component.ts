import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

import type { RecipeFeedItem } from '@kookio/prisma-client';
import { KookioEmojiComponent, KookioIconComponent } from '@kookio/shared-ui';
import { URLS } from '@kookio/shared-utility';

@Component({
  selector: 'kookio-recipe-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    MatCardModule,
    MatChipsModule,
    KookioEmojiComponent,
    KookioIconComponent,
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
}
