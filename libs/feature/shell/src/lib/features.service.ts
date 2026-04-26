import {
  Injectable,
  InjectionToken,
  inject,
  computed,
  signal,
} from '@angular/core';

import type { ServerFeatures } from '@kookio/core-security';

/**
 * Minimal client surface for tRPC features.
 */
export interface AppRouterClient {
  features: {
    read: {
      query(): Promise<ServerFeatures>;
    };
  };
}

export const APP_TRPC = new InjectionToken<AppRouterClient>('APP_TRPC');

@Injectable({ providedIn: 'root' })
export class FeaturesService {
  private readonly trpc = inject(APP_TRPC);

  readonly features = signal<ServerFeatures | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly pwaEnabled = computed(() => !!this.features()?.pwa);
  readonly webauthnEnabled = computed(() => !!this.features()?.webauthn);
  readonly ionicShellEnabled = computed(() => !!this.features()?.ionicShell);

  refresh = async (): Promise<void> => {
    if (this.loading()) return;
    this.loading.set(true);
    this.error.set(null);
    try {
      const data = await this.trpc.features.read.query();
      this.features.set(data);
    } catch (error: unknown) {
      const defaultMessage = 'Failed to load features';
      const errorMessage = error && (error as { message: string }).message;
      const message = errorMessage
        ? `${defaultMessage}: ${errorMessage}`
        : defaultMessage;
      this.error.set(message);
    } finally {
      this.loading.set(false);
    }
  };

  ensureLoaded = async (): Promise<void> => {
    if (this.features() || this.loading()) return;
    await this.refresh();
  };
}
