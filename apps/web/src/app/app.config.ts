import {
  ApplicationConfig,
  provideZoneChangeDetection,
  provideBrowserGlobalErrorListeners,
  provideAppInitializer,
  inject,
} from '@angular/core';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import {
  DomSanitizer,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';

import { provideNgxSkeletonLoader } from 'ngx-skeleton-loader';

import { AUTH_TRPC, FIREBASE_OPTIONS } from '@kookio/feature-auth';
import { APP_TRPC } from '@kookio/feature-shell';

import { provideTrpcClient, TrpcClientApp } from '../trpc-client';
import { IconNamespace } from './icons/types';
import { ALL_ICONS } from './icons/all-icons';

export const addSvgIcons = (
  resources: IconNamespace[],
  iconRegistry: MatIconRegistry,
  sanitizer: DomSanitizer,
) => {
  for (const resource of resources) {
    for (const icon of resource.icons) {
      for (const style of icon.styles) {
        iconRegistry.addSvgIconInNamespace(
          resource.namespace,
          icon.name,
          sanitizer.bypassSecurityTrustResourceUrl(
            `/icons/${resource.namespace}/${style}/${icon.name}.svg`,
          ),
        );
      }
    }
  }
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      const iconRegistry = inject(MatIconRegistry);
      const sanitizer = inject(DomSanitizer);

      return addSvgIcons(ALL_ICONS, iconRegistry, sanitizer);
    }),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideFileRouter(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([requestContextInterceptor]),
    ),
    provideTrpcClient(),
    provideNgxSkeletonLoader(),
    { provide: APP_TRPC, useExisting: TrpcClientApp },
    { provide: AUTH_TRPC, useExisting: TrpcClientApp },
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
