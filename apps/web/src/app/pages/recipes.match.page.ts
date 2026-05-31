import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import type { RouteMeta } from '@analogjs/router';
import { Observable, from } from 'rxjs';

import { authGuard, onboardingGuard } from '@kookio/feature-auth';
import {
  type FeedPage,
  RECIPES_TRPC,
  RecipeMatchCardComponent,
  RecipesFeedComponent,
} from '@kookio/feature-recipes';
import type { RecipeMatchItem } from '@kookio/prisma-client';
import { KookioIconComponent } from '@kookio/shared-ui';
import {
  RECIPE_MATCH_LEVEL_HINT,
  type RecipeMatchLevel,
} from '@kookio/shared-utility/recipe-match-level';

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, onboardingGuard],
  title: 'Cook with your stocks — Kookio',
};

@Component({
  selector: 'kookio-recipes-match-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    MatButtonModule,
    MatButtonToggleModule,
    KookioIconComponent,
    RecipesFeedComponent,
    RecipeMatchCardComponent,
  ],
  templateUrl: './recipes.match.page.html',
  styleUrl: './recipes.match.page.scss',
})
export default class RecipesMatchPage {
  private readonly trpc = inject(RECIPES_TRPC);

  protected readonly level = signal<RecipeMatchLevel>('Alright');

  protected readonly levelHint = computed<string>(
    () => RECIPE_MATCH_LEVEL_HINT[this.level()],
  );

  // The source closure reads the level signal at fetch time, so each page
  // request reflects the current toggle. Reset semantics on resetKey ensure
  // mid-flight pages from a previous level never write into the new state.
  protected readonly matchSource = (
    cursor: string | null,
    limit: number,
  ): Observable<FeedPage<RecipeMatchItem>> =>
    from(
      this.trpc.recipes.match.query({
        level: this.level(),
        ...(cursor ? { cursor } : {}),
        limit,
      }),
    );

  protected readonly onLevelChange = (next: RecipeMatchLevel): void => {
    this.level.set(next);
  };
}
