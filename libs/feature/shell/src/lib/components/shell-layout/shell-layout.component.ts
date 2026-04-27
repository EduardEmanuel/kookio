import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSidenavModule } from '@angular/material/sidenav';
import { filter, map, startWith } from 'rxjs';

import { isOnAuthRoute } from '../../utils/auth-routes';
import { BreakpointService } from '../../services/breakpoint.service';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { BottomTabsComponent } from '../bottom-tabs/bottom-tabs.component';
import { CookNowFabComponent } from '../cook-now-fab/cook-now-fab.component';
import { SideNavMenuComponent } from '../sidenav-menu/sidenav-menu.component';

@Component({
  selector: 'kookio-shell-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    TopBarComponent,
    BottomTabsComponent,
    CookNowFabComponent,
    SideNavMenuComponent,
  ],
  templateUrl: './shell-layout.component.html',
  styleUrl: './shell-layout.component.scss',
})
export class ShellLayoutComponent {
  private readonly bp = inject(BreakpointService);
  private readonly router = inject(Router);

  readonly isMobile = this.bp.isMobile;

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => (e as NavigationEnd).urlAfterRedirects),
      startWith(this.router.url),
    ),
  );

  readonly isAuthRoute = computed(() => isOnAuthRoute(this.currentUrl()));
}
