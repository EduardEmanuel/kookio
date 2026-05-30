import '@angular/compiler';
import '@analogjs/vitest-angular/setup-snapshots';
import '@analogjs/vitest-angular/setup-serializers';
import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';
import { TestScheduler } from 'rxjs/testing';
import { expect } from 'vitest';

// Angular 21 + Vitest 4 setup. `setupTestBed()` guards initTestEnvironment
// behind a per-worker globalThis flag and registers Angular's cleanup hooks
// in before/afterEach. It also provides zoneless change detection, matching
// the app. Per-file isolation (isolate + fileParallelism in vite.config) keeps
// each spec's TestBed independent.
setupTestBed();

export const createTestScheduler = () =>
  new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });
