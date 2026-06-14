import * as Sentry from '@sentry/node';
import { defineNitroPlugin } from 'nitropack/runtime';

/**
 * Server-side error monitoring. Mirrors the client init in `main.ts`: a no-op
 * until `SENTRY_DSN` is set (the Sentry Vercel integration provides it as a
 * server-only env var — NOT exposed to the browser, unlike `NG_APP_SENTRY_DSN`).
 *
 * Initialises once at server startup and registers a global hook for *unhandled*
 * server errors (SSR render crashes, uncaught route throws). *Handled* errors
 * are captured one level lower, at the Pino chokepoint in
 * `@kookio/server-logger`, where every `log.error({ err })` flows through.
 */
export default defineNitroPlugin((nitroApp) => {
  const dsn = process.env['SENTRY_DSN'];
  if (!dsn) return;

  Sentry.init({
    dsn,
    environment:
      process.env['VERCEL_ENV'] ?? process.env['NODE_ENV'] ?? 'development',
    // Tie events to the deploy so a regression points at the commit that
    // introduced it (matches the client release @sentry/vite-plugin injects).
    release: process.env['VERCEL_GIT_COMMIT_SHA'],
    // Performance tracing on the server (tRPC / SSR latency). 10% sample.
    tracesSampleRate: 0.1,
  });

  nitroApp.hooks.hook('error', (error) => {
    // Skip expected client errors (the asset-404 middleware, 4xx h3 errors) —
    // only server faults are worth a Sentry event.
    const status = (error as { statusCode?: number }).statusCode;
    if (typeof status === 'number' && status < 500) return;
    Sentry.captureException(error);
  });
});
