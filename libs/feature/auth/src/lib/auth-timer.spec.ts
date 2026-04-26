import { describe, expect, it } from 'vitest';
import { EMPTY, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { buildRefreshTimer$ } from './auth-timer';

const createTestScheduler = () =>
  new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

const INTERVAL = 100; // virtual ms — avoids 55-min marble strings

describe('buildRefreshTimer$', () => {
  it('emits at each interval when idToken is set', () => {
    const scheduler = createTestScheduler();

    scheduler.run(({ cold, expectObservable }) => {
      const idToken$ = cold('a', { a: 'tok' });
      const result$ = buildRefreshTimer$(idToken$, INTERVAL);

      // first tick at 100ms, second at 200ms; unsubscribe at 201ms to stop infinite timer
      expectObservable(result$, '201ms !').toBe('100ms a 99ms b', {
        a: 0,
        b: 1,
      });
    });
  });

  it('does not emit when idToken is null (no user)', () => {
    const scheduler = createTestScheduler();

    scheduler.run(({ cold, expectObservable }) => {
      const idToken$ = cold('a', { a: null });
      const result$ = buildRefreshTimer$(idToken$, INTERVAL);

      expectObservable(result$).toBe('');
    });
  });

  it('starts timer when idToken becomes non-null', () => {
    const scheduler = createTestScheduler();

    scheduler.run(({ cold, expectObservable }) => {
      // null for 50ms, then token arrives
      const idToken$ = cold('50ms a', { a: 'tok' });
      const result$ = buildRefreshTimer$(idToken$, INTERVAL);

      // first tick at 50ms + 100ms = 150ms; unsubscribe at 151ms
      expectObservable(result$, '151ms !').toBe('150ms a', { a: 0 });
    });
  });

  it('cancels timer when idToken becomes null (logout before first tick)', () => {
    const scheduler = createTestScheduler();

    scheduler.run(({ cold, expectObservable }) => {
      // token at 0ms, logout at 60ms — before the 100ms tick
      const idToken$ = cold('a 59ms b', { a: 'tok', b: null });
      const result$ = buildRefreshTimer$(idToken$, INTERVAL);

      expectObservable(result$).toBe('');
    });
  });

  it('restarts timer when idToken is set again after logout', () => {
    const scheduler = createTestScheduler();

    scheduler.run(({ cold, expectObservable }) => {
      // tok → null at 60ms → tok again at 120ms
      const idToken$ = cold('a 59ms b 59ms c', {
        a: 'tok',
        b: null,
        c: 'tok2',
      });
      const result$ = buildRefreshTimer$(idToken$, INTERVAL);

      // first segment cancelled; second segment: 120ms + 100ms = 220ms; unsubscribe at 221ms
      expectObservable(result$, '221ms !').toBe('220ms a', { a: 0 });
    });
  });

  it('emits repeatedly across multiple intervals', () => {
    const scheduler = createTestScheduler();

    scheduler.run(({ cold, expectObservable }) => {
      const idToken$ = cold('a', { a: 'tok' });
      const result$ = buildRefreshTimer$(idToken$, INTERVAL);

      // 100ms, 200ms, 300ms — unsubscribe after all three ticks
      expectObservable(result$, '301ms !').toBe('100ms a 99ms b 99ms c', {
        a: 0,
        b: 1,
        c: 2,
      });
    });
  });

  it('completes immediately when source is EMPTY', () => {
    const scheduler = createTestScheduler();

    scheduler.run(({ expectObservable }) => {
      const result$ = buildRefreshTimer$(EMPTY, INTERVAL);
      // EMPTY completes synchronously → result$ also completes (|)
      expectObservable(result$).toBe('|');
    });
  });

  it('does not emit when source emits only null (of(null))', () => {
    const scheduler = createTestScheduler();

    scheduler.run(({ expectObservable }) => {
      const result$ = buildRefreshTimer$(of(null), INTERVAL);
      // of(null) emits null then completes → switchMap→EMPTY, then outer completes
      expectObservable(result$).toBe('|');
    });
  });
});
