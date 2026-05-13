import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import type { RouteMeta } from '@analogjs/router';

import { authGuard, onboardingGuard } from '@kookio/feature-auth';
import { RecipeCardComponent } from '@kookio/feature-recipes';
import { SavedStore, type SavedView } from '@kookio/feature-saved/store';
import { KookioEmojiComponent, KookioIconComponent } from '@kookio/shared-ui';
import { URLS } from '@kookio/shared-utility';

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, onboardingGuard],
  title: 'Saved Recipes — Kookio',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-recipes-saved-page',
  imports: [
    RouterLink,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    RecipeCardComponent,
    KookioEmojiComponent,
    KookioIconComponent,
  ],
  templateUrl: './recipes.saved.page.html',
  styleUrl: './recipes.saved.page.scss',
})
export default class RecipesSavedPage {
  protected readonly store = inject(SavedStore);

  protected readonly recipesRoute = URLS.RECIPES;

  protected readonly isEmpty = computed(
    () => !this.store.isLoading() && this.store.totalCount() === 0,
  );

  constructor() {
    // `/recipes/saved` is behind `authGuard` + `onboardingGuard`, so SSR
    // redirects before the page bootstraps for real — defer the fetch to
    // client-side to avoid duplicate trpc work during SSR.
    afterNextRender(() => this.store.load());
  }

  protected readonly onViewChange = (view: SavedView): void => {
    this.store.setView(view);
  };
}
