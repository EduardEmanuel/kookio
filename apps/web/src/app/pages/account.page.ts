import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import type { RouteMeta } from '@analogjs/router';

import { AuthStore, authGuard } from '@kookio/feature-auth';

export const routeMeta: RouteMeta = {
  canActivate: [authGuard],
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'kookio-account-page',
  template: `
    <section class="prose mx-auto p-6">
      <h1>Account</h1>
      <p>
        Signed in as <strong>{{ authStore.currentUser()?.email }}</strong>
      </p>
      <button (click)="authStore.logout()">Sign out</button>
    </section>
  `,
})
export default class AccountPage {
  protected readonly authStore = inject(AuthStore);
}
