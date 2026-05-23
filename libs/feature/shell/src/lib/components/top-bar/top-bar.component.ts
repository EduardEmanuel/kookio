import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { filter, map, startWith } from 'rxjs';

import { AuthStore } from '@kookio/feature-auth';
import { KookioIconComponent } from '@kookio/shared-ui';

import { ThemeService } from '../../services/theme.service';

/**
 * Routes where the "Cook now" shortcut is hidden — auth/onboarding
 * surfaces, the cook-now destination itself (`/recipes/match` would
 * be a no-op shortcut to the page you're already on), and error
 * pages where the chrome is intentionally minimal.
 */
const COOK_NOW_HIDDEN_ROUTES = [
  '/login',
  '/register',
  '/onboarding',
  '/recipes/match',
  '/404',
];

@Component({
  selector: 'kookio-top-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatTooltipModule,
    KookioIconComponent,
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  protected readonly theme = inject(ThemeService);

  readonly user = this.authStore.currentUser;

  // Read system preference non-reactively. If the OS theme changes while
  // the user is in 'auto' mode, isDarkActive won't reflect it until the
  // theme signal itself changes — acceptable for batch 6 scope.
  // matchMedia is missing under jsdom (test env) and SSR; default to false
  // (= light) when unavailable.
  private readonly systemPrefersDark = (): boolean => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    ) {
      return false;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  // Slider position: when an explicit mode is set, reflect it. When in
  // 'auto', mirror the currently-resolved theme so the slider doesn't
  // visibly jump when the user toggles off "Follow system".
  protected readonly isDarkActive = computed<boolean>(() => {
    const mode = this.theme.mode();
    if (mode === 'dark') return true;
    if (mode === 'light') return false;
    return this.systemPrefersDark();
  });

  protected readonly onAutoChange = (checked: boolean): void => {
    if (checked) {
      this.theme.setMode('auto');
      return;
    }
    // Seed manual mode with the resolved theme so the slider position
    // does not jump when the user disables "Follow system".
    this.theme.setMode(this.systemPrefersDark() ? 'dark' : 'light');
  };

  protected readonly onSliderChange = (checked: boolean): void => {
    this.theme.setMode(checked ? 'dark' : 'light');
  };

  /**
   * Current URL signal driven by router events — feeds the cook-now
   * visibility check so navigations into / out of hidden routes
   * (e.g. the user opens `/recipes/match`) update the icon's display.
   */
  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => (e as NavigationEnd).urlAfterRedirects),
      startWith(this.router.url),
    ),
  );

  /**
   * Cook-now icon visible when the user is authenticated, has finished
   * onboarding, and is not on one of the routes where the shortcut is
   * meaningless or visually intrusive. Replaces the previous global
   * `<kookio-cook-now-fab />` — keeping the same predicate so the
   * surface area is identical, just relocated from a bottom-right
   * floating button to a top-bar icon next to the user menu.
   */
  readonly cookNowVisible = computed(() => {
    const user = this.authStore.currentUser();
    const onboardingDone = this.authStore.onboardingDone();
    const url = this.currentUrl() ?? '';
    if (!user || !onboardingDone) return false;
    return !COOK_NOW_HIDDEN_ROUTES.some((r) => url.startsWith(r));
  });

  readonly logout = () => this.authStore.logout();
}
