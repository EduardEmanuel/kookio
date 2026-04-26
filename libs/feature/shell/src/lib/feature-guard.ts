import { inject } from '@angular/core';
import type { CanMatchFn, UrlTree } from '@angular/router';
import { Router } from '@angular/router';

import type { ServerFeatures } from '@kookio/core-security';

import { FeaturesService } from './features.service';

/** Guard factory to gate routes by feature flag. */
export const featureGuard = (
  required: keyof ServerFeatures,
  redirectTo = '/',
): CanMatchFn => {
  return async (): Promise<boolean | UrlTree> => {
    const router = inject(Router);
    const features = inject(FeaturesService);

    await features.ensureLoaded();

    const f = features.features();

    if (f && f[required]) return true;
    return router.parseUrl(redirectTo);
  };
};

export const guardWebAuthn = (redirectTo = '/'): CanMatchFn =>
  featureGuard('webauthn', redirectTo);
export const guardPwa = (redirectTo = '/'): CanMatchFn =>
  featureGuard('pwa', redirectTo);
export const guardIonicShell = (redirectTo = '/'): CanMatchFn =>
  featureGuard('ionicShell', redirectTo);
