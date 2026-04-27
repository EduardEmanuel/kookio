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

import { URLS } from '@kookio/shared-utility';

import { isOnAuthRoute } from '../../utils/auth-routes';

import type { TabItem } from '../../models';

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
    { label: 'Home', icon: 'home', route: URLS.HOME },
    { label: 'Pantry', icon: 'kitchen', route: URLS.PANTRY },
    { label: 'Plan', icon: 'calendar_today', route: URLS.MEAL_PLAN },
    { label: 'Account', icon: 'person', route: URLS.ACCOUNT },
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
    return !url || isOnAuthRoute(url);
  });
}
