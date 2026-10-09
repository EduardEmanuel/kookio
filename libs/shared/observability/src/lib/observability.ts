import {
  captureException,
  captureMessage,
  type SeverityLevel,
} from '@sentry/angular';

/**
 * Reports a *handled* error to Sentry. No-op until Sentry is initialised
 * (`NG_APP_SENTRY_DSN`; see `apps/web/src/main.ts`), so dev/local stays quiet.
 *
 * The global `ErrorHandler` only sees *unhandled* errors. Store `catchError`
 * blocks consume their error (set error-state, return `EMPTY`), so those
 * handled failures never reach it — call `reportError` to surface them.
 * `op` tags the failing operation (e.g. `'pantry.add'`) for filtering in Sentry.
 */
export const reportError = (err: unknown, op: string): void => {
  captureException(err, { tags: { op } });
};

/**
 * Reports a non-error signal — a timing metric or a degraded-state flag — to
 * Sentry as a message event. Same no-op-until-initialised contract as
 * `reportError`, so dev/local/test stay quiet.
 *
 * Each call is a full Sentry event, so callers MUST gate this behind a
 * threshold (only report the interesting tail, never one event per page load)
 * to avoid blowing the quota. `op` tags the source for filtering; `data` lands
 * in the event's `extra` for inspection (e.g. `{ latencyMs }`).
 */
export const reportMetric = (
  message: string,
  op: string,
  data: Record<string, number | string | boolean> = {},
  level: SeverityLevel = 'info',
): void => {
  captureMessage(message, { level, tags: { op }, extra: data });
};
