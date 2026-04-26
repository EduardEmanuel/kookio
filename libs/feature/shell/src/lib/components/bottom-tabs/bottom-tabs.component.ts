import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';

import type { TabItem } from '../../models';

const AUTH_ROUTES = ['/login', '/register', '/onboarding', '/404', '/401'];

@Component({
  selector: 'kookio-bottom-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './bottom-tabs.component.html',
  styleUrl: './bottom-tabs.component.scss',
})
export class BottomTabsComponent {
  private readonly router = inject(Router);

  readonly tabs: readonly TabItem[] = [
    { label: 'Home', icon: 'home', route: '/' },
    { label: 'Rețete', icon: 'menu_book', route: '/recipes' },
    { label: 'Pantry', icon: 'kitchen', route: '/pantry' },
    { label: 'Plan', icon: 'calendar_today', route: '/meal-plan' },
    { label: 'Cont', icon: 'person', route: '/account' },
  ];

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => (e as NavigationEnd).urlAfterRedirects),
      startWith(this.router.url),
    ),
  );

  readonly isHidden = computed(() => {
    const url = this.currentUrl();
    return !url || AUTH_ROUTES.some((p) => url.startsWith(p));
  });
}
