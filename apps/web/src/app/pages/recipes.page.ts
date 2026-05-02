import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import type { RouteMeta } from '@analogjs/router';

import { AuthStore } from '@kookio/feature-auth';
import { RecipesFeedComponent } from '@kookio/feature-recipes';
import { KookioEmojiComponent, KookioIconComponent } from '@kookio/shared-ui';
import { URLS } from '@kookio/shared-utility';

export const routeMeta: RouteMeta = {
  title: 'Recipes — Kookio',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-recipes-page',
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    RecipesFeedComponent,
    KookioEmojiComponent,
    KookioIconComponent,
  ],
  templateUrl: './recipes.page.html',
  styleUrl: './recipes.page.scss',
})
export default class RecipesPage {
  protected readonly authStore = inject(AuthStore);
  protected readonly onboardingRoute = URLS.ONBOARDING;

  /**
   * Show the onboarding CTA only for authenticated users who haven't yet
   * populated any profile signals (no pantry items, utensils, dietary
   * restrictions, or preferred categories/areas). Anonymous visitors and
   * fully-set-up users see the recipes feed instead.
   */
  protected readonly showOnboardingCta = computed(
    () =>
      this.authStore.isAuthenticated() && !this.authStore.hasProfileSignals(),
  );
}
