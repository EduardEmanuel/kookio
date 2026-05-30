import '@angular/compiler';
import '@analogjs/vitest-angular/setup-snapshots';
import '@analogjs/vitest-angular/setup-serializers';
import {
  NgModule,
  destroyPlatform,
  getPlatform,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  ɵgetCleanupHook as getCleanupHook,
  getTestBed,
} from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';
import { TestScheduler } from 'rxjs/testing';
import { afterEach, beforeEach, expect } from 'vitest';

// Angular 21 + Vitest 4 setup, resilient to a shared (non-isolated) worker.
//
// Why: when `web:test` runs alongside the heavy `web:build` on a
// resource-constrained CI runner, Vitest can't fork and runs all ~23 spec
// files in one shared context. Vitest re-evaluates `@angular/core/testing`
// across them, desyncing `@analogjs/vitest-angular`'s `setupTestBed()`
// cross-realm `globalThis` init guard from the re-created module-level
// TestBed/platform — specs then throw "Need to call initTestEnvironment()",
// "Cannot read properties of null (reading 'ngModule')", or NG0400. The
// smaller feature libs stay under that threshold and use stock
// `setupTestBed()`.
//
// Tear down any existing platform + test environment first, then re-init
// unconditionally — idempotent across re-evaluations, no NG0400 /
// "already been called" collisions. Cleanup hooks reset the testing module
// per test, matching `setupTestBed()`.
@NgModule({ providers: [provideZonelessChangeDetection()] })
class ZonelessTestModule {}

beforeEach(getCleanupHook(false));
afterEach(getCleanupHook(true));

const testBed = getTestBed();
if (getPlatform()) {
  destroyPlatform();
}
testBed.resetTestEnvironment();
testBed.initTestEnvironment(
  [BrowserTestingModule, ZonelessTestModule],
  platformBrowserTesting(),
  { teardown: { destroyAfterEach: true } },
);

export const createTestScheduler = () =>
  new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });
