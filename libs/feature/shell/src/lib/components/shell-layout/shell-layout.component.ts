import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';

import { BreakpointService } from '../../services/breakpoint.service';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { BottomTabsComponent } from '../bottom-tabs/bottom-tabs.component';
import { SideNavMenuComponent } from '../sidenav-menu/sidenav-menu.component';

@Component({
  selector: 'kookio-shell-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    TopBarComponent,
    BottomTabsComponent,
    SideNavMenuComponent,
  ],
  templateUrl: './shell-layout.component.html',
  styleUrl: './shell-layout.component.scss',
})
export class ShellLayoutComponent {
  private readonly bp = inject(BreakpointService);
  readonly isMobile = this.bp.isMobile;
}
