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
    // Error monitoring only for now; tracing/replay can be enabled later
    // (free-tier budgets allow 5M traces and 50 replays).
    tracesSampleRate: 0,
  });
}

bootstrapApplication(AppComponent, appConfig).catch((err) => {
  console.error(err, '❌ Error bootstrapping application:');
});
