import { EMPTY, Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs';

// 5 min before Firebase's 60-min token expiry.
export const REFRESH_INTERVAL_MS = 55 * 60 * 1000;

/**
 * Pure function — no Angular / Firebase deps, marble-testable.
 *
 * Starts a recurring timer when `idToken$` emits a truthy value;
 * cancels via switchMap→EMPTY on logout (null).
 */
export const buildRefreshTimer$ = (
  idToken$: Observable<string | null>,
  intervalMs = REFRESH_INTERVAL_MS,
): Observable<number> =>
  idToken$.pipe(
    switchMap((token) => (token ? timer(intervalMs, intervalMs) : EMPTY)),
  );
