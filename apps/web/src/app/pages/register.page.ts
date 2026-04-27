import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PageSkeletonComponent } from '../components/page-skeleton/page-skeleton.component';
import type { RouteMeta } from '@analogjs/router';

import { AuthStore, guestGuard } from '@kookio/feature-auth';
import { URLS } from '@kookio/feature-shell';

export const routeMeta: RouteMeta = {
  canActivate: [guestGuard],
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-register-page',
  imports: [FormsModule, PageSkeletonComponent],
  template: `
    @defer (when authStore.authReady()) {
      <section class="prose mx-auto p-6 max-w-sm">
        <h1>Create account</h1>

        @if (authStore.registerError()) {
          <p class="text-[var(--color-error)]">
            {{ authStore.registerError() }}
          </p>
        }

        @if (passwordMismatch) {
          <p class="text-[var(--color-error)]">Passwords do not match.</p>
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
              autocomplete="new-password"
            />
          </div>
          <div>
            <label for="confirm">Confirm password</label>
            <input
              id="confirm"
              type="password"
              [(ngModel)]="confirm"
              name="confirm"
              required
              autocomplete="new-password"
            />
          </div>
          <button type="submit" [disabled]="authStore.loading()">
            {{ authStore.loading() ? 'Creating account…' : 'Create account' }}
          </button>
        </form>

        <a [href]="loginUrl">Already have an account? Sign in</a>
      </section>
    } @placeholder (minimum 500ms) {
      <kookio-page-skeleton />
    }
  `,
})
export default class RegisterPage {
  protected readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  protected email = '';
  protected password = '';
  protected confirm = '';
  protected passwordMismatch = false;
  protected readonly loginUrl = URLS.LOGIN;

  constructor() {
    // Step 2: Firebase user created → provision DB record (public endpoint, no token needed)
    effect(() => {
      const firebaseUser = this.authStore.currentUser();
      if (firebaseUser && !this.authStore.session()) {
        this.authStore.provisionUser({
          email: firebaseUser.email ?? '',
          firebaseUid: firebaseUser.uid,
        });
      }
    });

    // Step 3: DB user provisioned → redirect home
    // (AppComponent handles fetchSession automatically via idToken effect)
    effect(() => {
      if (this.authStore.session()) {
        void this.router.navigateByUrl(URLS.HOME);
      }
    });
  }

  protected onSubmit = () => {
    this.passwordMismatch = this.password !== this.confirm;
    if (this.passwordMismatch || !this.email || !this.password) return;
    this.authStore.register({ email: this.email, password: this.password });
  };
}
