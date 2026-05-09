import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  type AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  type ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import type { RouteMeta } from '@analogjs/router';

import { AuthStore, guestGuard } from '@kookio/feature-auth';
import { URLS } from '@kookio/feature-shell';
import { KookioIconComponent } from '@kookio/shared-ui';

import { PageSkeletonComponent } from '../components/page-skeleton/page-skeleton.component';

export const routeMeta: RouteMeta = {
  canActivate: [guestGuard],
};

/**
 * Form-level validator: surfaces a `passwordMismatch` error on the form
 * when the two password fields disagree. The template renders the error
 * inside the confirm field's mat-form-field so it lands where the user
 * made the mistake.
 */
const passwordsMatch = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const confirm = group.get('confirm')?.value;
  if (!confirm) return null;
  return password === confirm ? null : { passwordMismatch: true };
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-register-page',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    KookioIconComponent,
    PageSkeletonComponent,
  ],
  templateUrl: './register.page.html',
  styleUrl: './register.page.scss',
})
export default class RegisterPage {
  protected readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  protected readonly loginUrl = URLS.LOGIN;
  protected readonly showPassword = signal(false);
  protected readonly showConfirm = signal(false);

  protected readonly form = new FormGroup(
    {
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)],
      }),
      confirm: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    },
    { validators: [passwordsMatch] },
  );

  constructor() {
    // Step 2: Firebase user created → provision DB record (public endpoint, no token needed).
    effect(() => {
      const firebaseUser = this.authStore.currentUser();
      if (firebaseUser && !this.authStore.session()) {
        this.authStore.provisionUser({
          email: firebaseUser.email ?? '',
          firebaseUid: firebaseUser.uid,
        });
      }
    });

    // Step 3: DB user provisioned → redirect home.
    effect(() => {
      if (this.authStore.session()) {
        void this.router.navigateByUrl(URLS.HOME);
      }
    });
  }

  protected readonly togglePassword = (): void => {
    this.showPassword.update((v) => !v);
  };

  protected readonly toggleConfirm = (): void => {
    this.showConfirm.update((v) => !v);
  };

  protected readonly onSubmit = (): void => {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { email, password } = this.form.getRawValue();
    this.authStore.register({ email, password });
  };
}
