import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { filter, map, startWith } from 'rxjs';

import { AuthStore } from '@kookio/feature-auth';

import { BreakpointService } from '../../services/breakpoint.service';

const HIDDEN_ROUTES = [
  '/login',
  '/register',
  '/onboarding',
  '/dashboard',
  '/404',
  '/403',
];

@Component({
  selector: 'kookio-cook-now-fab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './cook-now-fab.component.html',
  styleUrl: './cook-now-fab.component.scss',
})
export class CookNowFabComponent {
  private readonly authStore = inject(AuthStore);
  private readonly bp = inject(BreakpointService);
  private readonly router = inject(Router);

  readonly label = 'Cook now';

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => (e as NavigationEnd).urlAfterRedirects),
      startWith(this.router.url),
    ),
  );

  readonly isVisible = computed(() => {
    const user = this.authStore.currentUser();
    const onboardingDone = this.authStore.onboardingDone();
    const url = this.currentUrl() ?? '';

    if (!user || !onboardingDone) return false;
    return !HIDDEN_ROUTES.some((r) => url.startsWith(r));
  });

  readonly showLabel = computed(() => !this.bp.isMobile());
}
