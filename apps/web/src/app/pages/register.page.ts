import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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

const PASSWORD_REQUIREMENTS_HINT =
  'Min 6 characters with at least one uppercase, lowercase, digit, and special character.';

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

/**
 * Mirrors the Firebase Auth password policy configured in the project:
 * min 6 chars with at least one uppercase, lowercase, digit, and special
 * character. Validating client-side gives instant feedback; Firebase
 * still enforces the same policy server-side as the security boundary.
 *
 * Returns a discrete error key per missing criterion so the UI can either
 * show a composed "Missing: X, Y" line (current behavior) or render a
 * per-criterion checklist later without changing the validator.
 */
const passwordComplexity = (ctrl: AbstractControl): ValidationErrors | null => {
  const value = (ctrl.value as string) ?? '';
  if (!value) return null;
  const errors: ValidationErrors = {};
  if (!/[A-Z]/.test(value)) errors['missingUppercase'] = true;
  if (!/[a-z]/.test(value)) errors['missingLowercase'] = true;
  if (!/\d/.test(value)) errors['missingDigit'] = true;
  if (!/[^A-Za-z0-9]/.test(value)) errors['missingSpecial'] = true;
  return Object.keys(errors).length > 0 ? errors : null;
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

  protected readonly passwordRequirementsHint = PASSWORD_REQUIREMENTS_HINT;

  protected readonly form = new FormGroup(
    {
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(6),
          passwordComplexity,
        ],
      }),
      confirm: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    },
    { validators: [passwordsMatch] },
  );

  private readonly passwordValue = toSignal(
    this.form.controls.password.valueChanges,
    { initialValue: '' },
  );

  /**
   * Friendly per-criterion list of what the current password value is
   * missing — driven from the live value rather than the stored errors so
   * the template re-evaluates under OnPush without extra wiring.
   */
  protected readonly missingPasswordCriteria = computed<readonly string[]>(
    () => {
      const value = this.passwordValue();
      if (!value) return [];
      const missing: string[] = [];
      if (!/[A-Z]/.test(value)) missing.push('uppercase letter');
      if (!/[a-z]/.test(value)) missing.push('lowercase letter');
      if (!/\d/.test(value)) missing.push('digit');
      if (!/[^A-Za-z0-9]/.test(value)) missing.push('special character');
      return missing;
    },
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
