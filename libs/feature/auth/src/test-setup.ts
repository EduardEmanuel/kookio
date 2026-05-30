import '@angular/compiler';
import '@analogjs/vitest-angular/setup-snapshots';
import '@analogjs/vitest-angular/setup-serializers';
import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';

// Angular 21 + Vitest 4 setup. `setupTestBed()` guards initTestEnvironment
// behind a per-worker globalThis flag and registers Angular's cleanup hooks
// in before/afterEach, so spec files that share a worker (e.g. when CI's low
// core count disables Vitest file-parallelism) no longer throw "Cannot set
// base providers..." / "test module already instantiated". It also provides
// zoneless change detection, matching the app.
setupTestBed();
