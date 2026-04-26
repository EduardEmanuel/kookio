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
import { MatListModule } from '@angular/material/list';

import { AuthStore } from '@kookio/feature-auth';

import type { NavItem } from '../../models';

const AUTH_ROUTES = ['/login', '/register', '/onboarding', '/404', '/401'];

const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Home', icon: 'home', route: '/' },
  { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
  { label: 'Recipes', icon: 'menu_book', route: '/recipes' },
  { label: 'Cook with stocks', icon: 'restaurant', route: '/recipes/match' },
  { label: 'Saved', icon: 'bookmark', route: '/recipes/saved' },
  { label: 'Pantry', icon: 'kitchen', route: '/pantry' },
  { label: 'Meal Plan', icon: 'calendar_today', route: '/meal-plan' },
  {
    label: 'Shopping List',
    icon: 'shopping_cart',
    route: '/shopping-list',
  },
  { label: 'Account', icon: 'person', route: '/account' },
  {
    label: 'Admin',
    icon: 'admin_panel_settings',
    route: '/admin',
    requiresRole: 'ADMIN',
  },
];

@Component({
  selector: 'kookio-sidenav-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatListModule],
  templateUrl: './sidenav-menu.component.html',
  styleUrl: './sidenav-menu.component.scss',
})
export class SideNavMenuComponent {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  private readonly roles = computed(
    () => this.authStore.session()?.roles ?? [],
  );

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

  readonly visibleItems = computed(() => {
    const roles = this.roles();
    return NAV_ITEMS.filter(
      (item) => !item.requiresRole || roles.includes(item.requiresRole),
    );
  });
}
