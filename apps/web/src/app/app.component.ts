import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';

import { AuthStore } from '@kookio/feature-auth';
import { ShellLayoutComponent } from '@kookio/feature-shell';

import { TrpcHeaders } from '../trpc-client';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-root',
  imports: [ShellLayoutComponent],
  template: `<kookio-shell-layout />`,
})
export class AppComponent {
  private readonly authStore = inject(AuthStore);

  constructor() {
    // When Firebase user changes, refresh the ID token
    effect(() => {
      const user = this.authStore.currentUser();
      if (user) {
        this.authStore.refreshToken();
      } else {
        TrpcHeaders.set({});
        // currentUser gone (logout) — session already cleared in logout rxMethod
      }
    });

    // When idToken becomes available:
    // 1. Update tRPC request headers so all subsequent calls carry Bearer token
    // 2. Fetch DB session (roles) — auth.me requires a valid Bearer token
    effect(() => {
      const token = this.authStore.idToken();
      if (token) {
        TrpcHeaders.set({ Authorization: `Bearer ${token}` });
        this.authStore.fetchSession();
      }
    });
  }
}
