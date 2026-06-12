import { captureException } from '@sentry/angular';

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
