import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  EMPTY,
  Subject,
  catchError,
  exhaustMap,
  finalize,
  from,
  tap,
} from 'rxjs';
import type { RouteMeta } from '@analogjs/router';

import { AuthStore, authGuard, onboardingGuard } from '@kookio/feature-auth';
import { KookioIconComponent } from '@kookio/shared-ui';
import { URLS } from '@kookio/shared-utility';

import { injectTrpcClient } from '../../trpc-client';

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, onboardingGuard],
  title: 'Account — Kookio',
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-account-page',
  imports: [MatButtonModule, MatProgressSpinnerModule, KookioIconComponent],
  template: `
    <section class="prose mx-auto p-6">
      <h1>Account</h1>
      <p>
        Signed in as <strong>{{ authStore.currentUser()?.email }}</strong>
      </p>
      <button (click)="authStore.logout()">Sign out</button>

      <section class="account__section">
        <h2>Your preferences</h2>
        <p class="account__hint">
          Want different recommendations? Restart onboarding — your existing
          selections will be pre-filled so you can adjust just the parts you
          care about.
        </p>

        <button
          [matButton]="authStore.hasProfileSignals() ? 'outlined' : 'filled'"
          type="button"
          (click)="onRestart()"
          [disabled]="isResetting()"
          [attr.aria-busy]="isResetting() || null"
          [attr.aria-label]="isResetting() ? 'Restarting onboarding' : null"
        >
          @if (isResetting()) {
            <mat-spinner diameter="20" />
          } @else {
            <kookio-icon name="refresh" />
            Restart onboarding
          }
        </button>
      </section>
    </section>
  `,
})
export default class AccountPage {
  protected readonly authStore = inject(AuthStore);
  private readonly trpc = injectTrpcClient();
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly isResetting = signal(false);

  // Restart-onboarding orchestration: every click pings this Subject, but
  // exhaustMap drops emissions while a reset is in flight, so rapid clicks
  // do not pile up parallel mutations. takeUntilDestroyed (in injection
  // context here) ties the subscription to the component lifetime.
  private readonly restart$ = new Subject<void>();

  constructor() {
    this.restart$
      .pipe(
        tap(() => this.isResetting.set(true)),
        exhaustMap(() =>
          from(this.trpc.onboarding.reset.mutate()).pipe(
            tap(() => {
              this.authStore.markOnboardingReset();
              void this.router.navigateByUrl(URLS.ONBOARDING);
            }),
            catchError(() => {
              this.snackBar.open(
                'Could not restart onboarding. Please try again.',
                'Dismiss',
                { duration: 4000 },
              );
              return EMPTY;
            }),
            finalize(() => this.isResetting.set(false)),
          ),
        ),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  protected readonly onRestart = (): void => {
    this.restart$.next();
  };
}
