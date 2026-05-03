import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconRegistry } from '@angular/material/icon';
import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';

import { provideNgxSkeletonLoader } from 'ngx-skeleton-loader';

import { AUTH_TRPC, FIREBASE_OPTIONS } from '@kookio/feature-auth';
import { ONBOARDING_TRPC } from '@kookio/feature-onboarding';
import { RECIPES_TRPC } from '@kookio/feature-recipes';
import { APP_TRPC } from '@kookio/feature-shell';

import { provideTrpcClient, TrpcClientApp } from '../trpc-client';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideFileRouter(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([requestContextInterceptor]),
    ),
    provideTrpcClient(),
    provideNativeDateAdapter(),
    provideNgxSkeletonLoader(),
    provideAppInitializer(() => {
      inject(MatIconRegistry).setDefaultFontSetClass(
        'material-symbols-outlined',
      );
    }),
    { provide: APP_TRPC, useExisting: TrpcClientApp },
    { provide: AUTH_TRPC, useExisting: TrpcClientApp },
    { provide: ONBOARDING_TRPC, useExisting: TrpcClientApp },
    { provide: RECIPES_TRPC, useExisting: TrpcClientApp },
    {
      provide: FIREBASE_OPTIONS,
      useValue: {
        apiKey: import.meta.env['NG_APP_FIREBASE_API_KEY'],
        authDomain: import.meta.env['NG_APP_FIREBASE_AUTH_DOMAIN'],
        projectId: import.meta.env['NG_APP_FIREBASE_PROJECT_ID'],
        appId: import.meta.env['NG_APP_FIREBASE_APP_ID'],
      },
    },
  ],
};
