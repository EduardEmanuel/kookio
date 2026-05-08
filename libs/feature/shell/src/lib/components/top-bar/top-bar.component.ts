import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AuthStore } from '@kookio/feature-auth';
import { KookioIconComponent } from '@kookio/shared-ui';

@Component({
  selector: 'kookio-top-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    KookioIconComponent,
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
  private readonly authStore = inject(AuthStore);
  readonly user = this.authStore.currentUser;

  readonly logout = () => this.authStore.logout();
}
