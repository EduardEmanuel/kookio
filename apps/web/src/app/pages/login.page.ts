import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PageSkeletonComponent } from '../components/page-skeleton/page-skeleton.component';

import type { RouteMeta } from '@analogjs/router';

import { AuthStore, guestGuard } from '@kookio/feature-auth';
import { URLS } from '@kookio/feature-shell';

export const routeMeta: RouteMeta = {
  canActivate: [guestGuard],
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'kookio-login-page',
  imports: [FormsModule, PageSkeletonComponent],
  template: `
    @defer (when authStore.authReady()) {
      <section class="prose mx-auto p-6 max-w-sm">
        <h1>Sign in</h1>

        @if (authStore.loginError()) {
          <p class="text-red-600">{{ authStore.loginError() }}</p>
        }

        <form (ngSubmit)="onSubmit()">
          <div>
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              [(ngModel)]="email"
              name="email"
              required
              autocomplete="email"
            />
          </div>
          <div>
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              [(ngModel)]="password"
              name="password"
              required
              autocomplete="current-password"
            />
          </div>
          <button type="submit" [disabled]="authStore.loading()">
            {{ authStore.loading() ? 'Signing in…' : 'Sign in' }}
          </button>
        </form>

        <a [href]="registerUrl">Create an account</a>
      </section>
    } @placeholder (minimum 500ms) {
      <kookio-page-skeleton />
    }
  `,
})
export default class LoginPage {
  protected readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected email = '';
  protected password = '';
  protected readonly registerUrl = URLS.REGISTER;

  constructor() {
    // Redirect once DB session is populated (roles available)
    // AppComponent triggers fetchSession automatically after idToken is set
    effect(() => {
      if (this.authStore.session()) {
        const returnUrl =
          this.route.snapshot.queryParamMap.get('returnUrl') ?? URLS.HOME;
        void this.router.navigateByUrl(returnUrl);
      }
    });
  }

  protected onSubmit = () => {
    if (!this.email || !this.password) return;
    this.authStore.login({ email: this.email, password: this.password });
  };
}
