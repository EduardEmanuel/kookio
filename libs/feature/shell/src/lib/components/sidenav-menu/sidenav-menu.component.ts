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

import { KookioIconComponent } from '@kookio/shared-ui';

import { NAV_DESTINATIONS } from '../../models';
import { isOnAuthRoute } from '../../utils/auth-routes';

@Component({
  selector: 'kookio-sidenav-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, MatListModule, KookioIconComponent],
  templateUrl: './sidenav-menu.component.html',
  styleUrl: './sidenav-menu.component.scss',
})
export class SideNavMenuComponent {
  private readonly router = inject(Router);

  protected readonly items = NAV_DESTINATIONS;

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
