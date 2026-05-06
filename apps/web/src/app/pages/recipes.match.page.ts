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
import type { RecipeMatchItem, RecipeMatchLevel } from '@kookio/prisma-client';
import { KookioIconComponent } from '@kookio/shared-ui';

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

  protected readonly level = signal<RecipeMatchLevel>('A');

  protected readonly levelHint = computed(() => {
    switch (this.level()) {
      case 'A':
        return 'Recipes you can cook right now with your pantry.';
      case 'B':
        return "Recipes where you're missing 1–3 ingredients.";
      case 'C':
        return 'All available recipes.';
    }
  });

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
