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
import { MatListModule } from '@angular/material/list';

import { AuthStore } from '@kookio/feature-auth';
import { KookioIconComponent } from '@kookio/shared-ui';
import { URLS } from '@kookio/shared-utility';

import { isOnAuthRoute } from '../../utils/auth-routes';

import type { NavItem } from '../../models';

const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Home', icon: 'home', route: URLS.HOME },
  { label: 'Dashboard', icon: 'dashboard', route: URLS.DASHBOARD },
  {
    label: 'Cook with stocks',
    icon: 'restaurant',
    route: URLS.RECIPES_MATCH,
  },
  { label: 'Saved', icon: 'bookmark', route: URLS.RECIPES_SAVED },
  { label: 'Pantry', icon: 'kitchen', route: URLS.PANTRY },
  { label: 'Meal Plan', icon: 'calendar_today', route: URLS.MEAL_PLAN },
  {
    label: 'Shopping List',
    icon: 'shopping_cart',
    route: URLS.SHOPPING_LIST,
  },
  { label: 'Account', icon: 'person', route: URLS.ACCOUNT },
  {
    label: 'Admin',
    icon: 'admin_panel_settings',
    route: URLS.ADMIN,
    requiresRole: 'ADMIN',
  },
];

@Component({
  selector: 'kookio-sidenav-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, MatListModule, KookioIconComponent],
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
    return !url || isOnAuthRoute(url);
  });

  readonly visibleItems = computed(() => {
    const roles = this.roles();
    return NAV_ITEMS.filter(
      (item) => !item.requiresRole || roles.includes(item.requiresRole),
    );
  });
}
