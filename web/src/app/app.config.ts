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
import { DomSanitizer, provideClientHydration } from '@angular/platform-browser';
import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';

import { provideTrpcClient } from '../trpc-client';
import { IconNamespace } from './icons/types';
import { MatIconRegistry } from '@angular/material/icon';
import { ALL_ICONS } from './icons/all-icons';

export const addSvgIcons = (
  resources: IconNamespace[],
  iconRegistry: MatIconRegistry,
  sanitizer: DomSanitizer
) => {
  for (const resource of resources) {
    for (const icon of resource.icons) {
      for (const style of icon.styles) {
        iconRegistry.addSvgIconInNamespace(
          resource.namespace,
          icon.name,
          sanitizer.bypassSecurityTrustResourceUrl(
            `/icons/${resource.namespace}/${style}/${icon.name}.svg`
          )
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
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([requestContextInterceptor])
    ),
    provideTrpcClient(),
  ],
};
