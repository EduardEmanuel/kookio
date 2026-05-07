import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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

const MAX_NAME = 50;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-account-page',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    KookioIconComponent,
  ],
  templateUrl: './account.page.html',
  styleUrl: './account.page.scss',
})
export default class AccountPage {
  protected readonly authStore = inject(AuthStore);
  private readonly trpc = injectTrpcClient();
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly isResetting = signal(false);
  protected readonly isSavingName = signal(false);

  protected readonly profileForm = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(MAX_NAME)],
    }),
  });

  // Restart-onboarding orchestration: every click pings this Subject, but
  // exhaustMap drops emissions while a reset is in flight, so rapid clicks
  // do not pile up parallel mutations. takeUntilDestroyed (in injection
  // context here) ties the subscription to the component lifetime.
  private readonly restart$ = new Subject<void>();

  // Same pattern for the name save: exhaustMap dedupes rapid double-clicks.
  private readonly saveName$ = new Subject<string>();

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

    this.saveName$
      .pipe(
        tap(() => this.isSavingName.set(true)),
        exhaustMap((name) =>
          from(this.trpc.profile.updateName.mutate({ name })).pipe(
            tap(() => {
              this.authStore.fetchSession();
              this.snackBar.open('Saved.', 'Dismiss', { duration: 2500 });
            }),
            catchError(() => {
              this.snackBar.open(
                'Could not save your name. Please try again.',
                'Dismiss',
                { duration: 4000 },
              );
              return EMPTY;
            }),
            finalize(() => this.isSavingName.set(false)),
          ),
        ),
        takeUntilDestroyed(),
      )
      .subscribe();

    // Pre-fill the form whenever the session resolves with a name.
    // `untracked` keeps the patch outside the reactive graph so an `effect`
    // that watches the form value cannot loop.
    effect(() => {
      const sessionName = this.authStore.session()?.name ?? '';
      untracked(() => {
        if (this.profileForm.controls.name.value !== sessionName) {
          this.profileForm.controls.name.setValue(sessionName, {
            emitEvent: false,
          });
        }
      });
    });
  }

  protected readonly onRestart = (): void => {
    this.restart$.next();
  };

  protected readonly onSaveName = (): void => {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    this.saveName$.next(this.profileForm.controls.name.value.trim());
  };
}
