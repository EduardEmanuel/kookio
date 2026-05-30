# Unit Testing Guidelines

> **Status: Active** — Vitest + Angular Testing Library are wired up via `vitest.workspace.ts`; spec files exist throughout `apps/web` and the `libs/`. Marble testing helpers are valid patterns; no marble specs exist in the codebase yet.

## Framework & Tools

- Vitest as the test runner
- Angular Testing Library (`@testing-library/angular`) for component tests
- Signal Stores are tested via `TestBed.inject()` against the public API — no
  helper package; do not pull in `@ngrx/store/testing` (classic NgRx, not used here)

## Philosophy

- Test behavior, not implementation details
- Tests should resemble how users interact with the application
- A passing test suite should give confidence that the app works, not that the code is structured a certain way
- Prefer fewer, more meaningful tests over many shallow ones

## File Structure

- Colocate test files with the source file:
  src/app/features/users/
  ├── users.store.ts
  ├── users.store.spec.ts
  ├── users.component.ts
  ├── users.component.spec.ts
  ├── users.service.ts
  └── users.service.spec.ts
- Name test files `*.spec.ts`
- Group related tests with `describe()` blocks matching the unit under test
- Use nested `describe()` to separate logical groups within a test file — never use comment separators (e.g. `// ─── section ───`) in place of nesting; comments detach from the tests they label and mislead after refactors

## Component Tests

- Use Angular Testing Library for all component tests:

```typescript
import { render, screen, fireEvent } from '@testing-library/angular';
import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  it('should display users list', async () => {
    await render(UsersComponent, {
      componentInputs: { users: mockUsers },
    });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should emit selectUser when a user is clicked', async () => {
    const selectUser = vi.fn();
    await render(UsersComponent, {
      componentInputs: { users: mockUsers },
      componentOutputs: { selectUser: { emit: selectUser } as any },
    });

    await fireEvent.click(screen.getByText('John Doe'));

    expect(selectUser).toHaveBeenCalledWith(mockUsers[0]);
  });
});
```

- Do NOT use `fixture.detectChanges()` manually — Angular Testing Library handles this
- Query elements by role, label, or text — not by CSS class or DOM structure:

```typescript
// ✅ correct
screen.getByRole('button', { name: 'Save' });
screen.getByLabelText('Email address');
screen.getByText('No users found');

// ❌ avoid
screen.getByTestId('save-btn');
container.querySelector('.save-button');
```

## Service Tests

- Test services in isolation with mocked dependencies:

```typescript
describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should fetch users', () => {
    service.getAll().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('/api/users');
    req.flush(mockUsers);
  });
});
```

## NgRx Signal Store Tests

- Provide the store directly in `TestBed` and test via public methods and signals:

```typescript
describe('UsersStore', () => {
  let store: InstanceType<typeof UsersStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersStore, { provide: UsersService, useValue: mockUsersService }],
    });
    store = TestBed.inject(UsersStore);
  });

  it('should load users', async () => {
    mockUsersService.getAll.mockReturnValue(of(mockUsers));

    TestBed.flushEffects();

    expect(store.users()).toEqual(mockUsers);
    expect(store.loading()).toBe(false);
  });
});
```

- Test computed signals by setting state and asserting derived values
- Do NOT test internal implementation of `patchState` calls directly

## RxJS Marble Testing

- Use `@rx-angular/testing` or native `rxjs/testing` `TestScheduler` for marble tests
- Use marble testing for operators, effects, and complex async streams —
  not for simple observable wrapping
- Define marbles with standard notation:
  - `-` — one frame of time
  - `|` — completion
  - `#` — error
  - `^` — subscription point
  - `!` — unsubscription point
  - `a, b, c` — emitted values

### TestScheduler Setup

```typescript
import { TestScheduler } from 'rxjs/testing';

describe('searchOperator', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should debounce and switchMap search terms', () => {
    scheduler.run(({ cold, hot, expectObservable }) => {
      const search$ = hot('-a-b-c---------d|', {
        a: 'an',
        b: 'ang',
        c: 'angu',
        d: 'angular',
      });

      const expected = '-------------x--(y|)';

      expectObservable(
        search$.pipe(
          debounceTime(3, scheduler),
          distinctUntilChanged(),
          switchMap((term) => searchService.search(term)),
        ),
      ).toBe(expected, { x: mockResults, y: mockResults2 });
    });
  });
});
```

### Rules

- Use `scheduler.run()` callback — always prefer virtual time over real async
- Use `hot()` for observables that emit regardless of subscription (user events, actions$)
- Use `cold()` for observables that start on subscription (HTTP calls, timers)
- Always assert both values AND timing when timing is relevant to the behavior
- Do not use marble testing for simple `of()` or `from()` wrapping — overkill

## Mocking

- Use `vi.fn()` for function mocks
- Use `vi.spyOn()` for spying on existing methods
- Define mocks close to the test that uses them — avoid shared global mocks
- Use factory functions for mock data:

```typescript
function createMockUser(overrides?: Partial<User>): User {
  return {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    ...overrides,
  };
}
```

## Fixtures with Prisma-derived shapes

When a fixture targets a type derived from a Prisma model (`RecipeDetail`,
`UserSession`, anything built from `RecipeModelSchema.pick(...)` etc.), use the
generated zod enums to populate enum fields — never hardcoded string literals.

The `prisma-zod-generator` exposes every enum as a `z.enum([...])` schema,
re-exported through the public barrel `@kookio/prisma-client`. Read the literal
values via `.enum`:

```typescript
// ✅ correct — enum value comes from the generator
import { IngredientCategorySchema, MeasureUnitSchema, RecipeStatusSchema, type RecipeDetail } from '@kookio/prisma-client';

const Unit = MeasureUnitSchema.enum;
const IngCategory = IngredientCategorySchema.enum;
const Status = RecipeStatusSchema.enum;

const mockRecipe = (overrides: Partial<RecipeDetail> = {}): RecipeDetail => ({
  // ...
  status: Status.PUBLIC,
  ingredients: [
    {
      // ...
      unit: Unit.G,
      ingredient: { /* ... */ category: IngCategory.GRAINS },
    },
  ],
  ...overrides,
});

// ❌ avoid — hardcoded string literal
const mockBad: RecipeDetail = {
  // ...
  status: 'PUBLIC',
  ingredients: [{ /* ... */ unit: 'G', ingredient: { category: 'GRAINS' } }],
};
```

**Why:** if the schema renames or adds an enum value (`GRAINS` → `CEREALS`,
new `MeasureUnit.JAR`, etc.), specs that reference the generated enum fail at
typecheck on the exact line that needs updating. Hardcoded string literals
silently satisfy `z.infer` until the value is removed entirely, and partial
renames across many fixture files are easy to miss in review.

## Cross-lib injection: test discipline when refactoring shared widgets

When a widget changes its **injected dependencies** (adds an `inject(...)`,
switches from one store to another, depends on a new InjectionToken),
the widget's own lib tests typically keep passing because they stub the
new dep locally. Consumer projects — pages that mount the widget
through `<lib-widget>` in their template — break, because their specs
were written against the _old_ injection graph and don't know about the
new dep.

The failure mode is a `NullInjectorError` at component construction,
not a typecheck error. Static imports change → lint catches it. DI
graph changes → only tests at the consumer catch it.

Concrete instance: `MealPlanTodayWidgetComponent` was refactored to
inject `PlanStore` for live data instead of rendering static
placeholder copy. `feature-dashboard:test` passed (widget spec stubs
`PlanStore`). `web:test` broke — `dashboard.page.spec.ts` mounts the
widget through `<kookio-meal-plan-today-widget>` but only stubbed
`PantryStore`, so PlanStore's `withMethods` factory tried to
`inject(MEAL_PLAN_TRPC)` against a null injector and threw on the
first `TestBed.createComponent(DashboardPage)`. The regression sat
silently for several commits because the cross-lib spec was never
re-run during the widget refactor.

**Discipline:** after refactoring a shared widget's injected
dependencies, run tests at _every consumer project_, not just the
widget's lib:

```bash
# Either name the consumers explicitly:
nx run-many -t test -p feature-dashboard web

# Or let NX figure out what depends on the changed code:
nx affected -t test
```

`nx affected` is the safer option in a multi-lib repo where the
dependency graph is non-trivial — it walks `project.json` deps and
runs everything downstream of the change.

**Mirror the discipline in widget spec design:** when you stub the
shared store in a consumer spec, stub _only_ the read surface the
widget actually consumes (signals it reads, methods it calls). The
stub is then a contract test — when the widget grows a new dep, the
consumer spec fails fast on a missing stub property rather than
silently rendering with a partial store.

## Vitest 4 + Angular 21 test environment

> **Status: Active** — wired up across every Angular project's
> `src/test-setup.ts` and `vite.config.{ts,mts}` after the Vitest 3→4 /
> Angular 20→21 / AnalogJS 2 upgrade.

### `setupTestBed()` is the Angular-21 init pattern

For Angular > 20, the test environment is initialised via
`@analogjs/vitest-angular`'s `setupTestBed()` — **not** a hand-written
`getTestBed().initTestEnvironment(...)` call:

```typescript
import '@angular/compiler';
import '@analogjs/vitest-angular/setup-snapshots';
import '@analogjs/vitest-angular/setup-serializers';
import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';

setupTestBed();
```

`setupTestBed()` guards `initTestEnvironment` behind a per-worker `globalThis`
flag, registers Angular's cleanup hooks in `before/afterEach`, and provides
`provideZonelessChangeDetection()` (matching the app — this also clears the
`NG0914` "zoneless but loading Zone.js" warnings). Because it's zoneless,
specs trigger change detection with `TestBed.tick()`, not Zone-based
`fakeAsync`/`tick`.

### CI runs spec files in one shared context — design for it

Vitest's default is `fileParallelism: true` (each spec file isolated). A
**resource-constrained CI runner flips it off**: when there aren't enough
cores to fork a worker, Vitest runs every spec file in a project in ONE
shared module context. This is especially likely for a project whose `test`
target runs concurrently with a heavy `build` target — `nx affected -t test
build` runs `web:test` alongside `web:build` on a 2-core runner, starving it.
Under one shared context Angular's module-level `TestBed` singleton leaks
across files and you get `Cannot set base providers because it has already
been called`, `Need to call TestBed.initTestEnvironment() first`, `Cannot read
properties of null (reading 'ngModule')`, or `NG0400`.

**Two defences, applied together:**

1. **Assert `fileParallelism: true` in every Angular vitest config.** It's
   already the default, but stating it explicitly overrides an
   environment-derived flip (only a CLI flag — which the `@nx/vitest`
   executor does not pass — can beat config). This is enough for projects
   whose test target isn't starved: the feature libs (≤ ~10 spec files) pass
   on stock `setupTestBed()` once parallelism is asserted.

2. **For a project still starved into single-context, make its test-setup
   idempotent.** `setupTestBed()`'s `globalThis` guard desyncs from the
   module-level TestBed once Vitest re-evaluates `@angular/core/testing`
   across many files (`web` has 23). Replace it with an unconditional
   teardown + re-init:

   ```typescript
   import { destroyPlatform, getPlatform, NgModule, provideZonelessChangeDetection } from '@angular/core';
   import { ɵgetCleanupHook as getCleanupHook, getTestBed } from '@angular/core/testing';
   // ...
   @NgModule({ providers: [provideZonelessChangeDetection()] })
   class ZonelessTestModule {}

   beforeEach(getCleanupHook(false));
   afterEach(getCleanupHook(true));

   const testBed = getTestBed();
   if (getPlatform()) destroyPlatform(); // tear down a platform from a prior eval — avoids NG0400
   testBed.resetTestEnvironment();
   testBed.initTestEnvironment([BrowserTestingModule, ZonelessTestModule], platformBrowserTesting(), { teardown: { destroyAfterEach: true } });
   ```

   There is **no reliable public way to read whether the env is already
   initialised** (`testBed.platform` reads falsy even when set), which is why
   the guard is "tear down then re-init" rather than "init if missing". Keep
   this divergence to the one project that needs it; the libs stay on stock
   `setupTestBed()`.

**Reproduce the CI condition locally** (your dev machine has too many cores to
trigger it on its own): `npx vitest run --config <path> --no-file-parallelism`.
This reproduces the exact errors — verify any fix against it, not just a
normal run.

### Other Vitest 4 breaking changes that bit

- `restoreAllMocks()` no longer clears a plain `vi.fn()`'s call history (it
  only restores `spyOn` spies). Reset persistent mocks explicitly
  (`mockReset()` in `beforeEach`).
- Vitest 4 exits non-zero on "No test files found". Libs with no specs need
  `passWithNoTests: true` in their vitest config.
- `@nx/vitest` (new in NX 22) is a separate package; the test executor is
  `@nx/vitest:test`, not `@nx/vite:test`.
- Zod 4 removed the `.Values` enum accessor used in prisma-zod fixtures — use
  `MeasureUnitSchema.enum` (see `12_prisma-zod.md`).

## General Rules

- Each test must be independent — no shared mutable state between tests
- Use `beforeEach` for setup, `afterEach` for cleanup
- Avoid `setTimeout` or `Promise` chains in tests — use `fakeAsync` / `tick` or `await`
- Do not test Angular internals (change detection, DI resolution)
- Do not test private methods — test through the public API
- Aim for tests that are fast, deterministic, and isolated
- After refactoring a widget's injected dependencies, run `nx affected
-t test` (not just the widget lib's own tests) — see "Cross-lib
  injection" above
