import { bootstrapApplication } from '@angular/platform-browser';
import * as Sentry from '@sentry/angular';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// Client error monitoring. No-op until NG_APP_SENTRY_DSN is set, so dev/local
// and pre-setup deploys run untouched. A Sentry DSN is a public ingest key —
// safe to expose to the browser, so it carries the NG_APP_ prefix that Vite
// inlines into the client bundle (a copy of the integration's SENTRY_DSN).
const dsn = import.meta.env['NG_APP_SENTRY_DSN'];
if (dsn) {
  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    // Performance tracing: browserTracingIntegration captures page-load and
    // navigation transactions (Web Vitals, route timings). A 10% sample stays
    // well within the free-tier trace budget. (release is injected at build
    // time by @sentry/vite-plugin.)
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: 0.1,
    // Drop expected user-facing / transient errors. These are surfaced to the
    // user in the form or retried by the client — they are not bugs, and
    // reporting them buries real issues under auth-typo and network noise.
    beforeSend: (event, hint) => {
      const ex = hint?.originalException as
        | {
            name?: string;
            code?: string;
            message?: string;
            data?: { code?: string };
          }
        | undefined;
      const message =
        (typeof ex?.message === 'string' && ex.message) ||
        event.exception?.values?.[0]?.value ||
        '';

      // Firebase auth user-errors (wrong password, email taken, …): shown in
      // the login/register form, never actionable as a bug.
      if (typeof ex?.code === 'string' && ex.code.startsWith('auth/')) {
        return null;
      }
      if (/Firebase: Error \(auth\//.test(message)) return null;

      // Expired/absent token → UNAUTHORIZED. The client already force-refreshes
      // and retries once; a leftover UNAUTHORIZED is an expected logged-out
      // state, not a fault.
      if (ex?.name === 'TRPCClientError' && ex.data?.code === 'UNAUTHORIZED') {
        return null;
      }

      // Network blips — not actionable from the app's side.
      if (/Failed to fetch|NetworkError|Load failed/i.test(message)) {
        return null;
      }

      return event;
    },
  });
}

bootstrapApplication(AppComponent, appConfig).catch((err) => {
  console.error(err, '❌ Error bootstrapping application:');
});
