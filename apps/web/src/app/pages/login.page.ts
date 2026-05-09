import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-login-page',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    KookioIconComponent,
    PageSkeletonComponent,
  ],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export default class LoginPage {
  protected readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly registerUrl = URLS.REGISTER;
  protected readonly showPassword = signal(false);

  protected readonly form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  constructor() {
    // Redirect once DB session is populated (roles available).
    // AppComponent triggers fetchSession automatically after idToken is set.
    effect(() => {
      if (this.authStore.session()) {
        const returnUrl =
          this.route.snapshot.queryParamMap.get('returnUrl') ?? URLS.HOME;
        void this.router.navigateByUrl(returnUrl);
      }
    });
  }

  protected readonly togglePassword = (): void => {
    this.showPassword.update((v) => !v);
  };

  protected readonly onSubmit = (): void => {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { email, password } = this.form.getRawValue();
    this.authStore.login({ email, password });
  };
}
