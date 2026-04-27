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

## General Rules

- Each test must be independent — no shared mutable state between tests
- Use `beforeEach` for setup, `afterEach` for cleanup
- Avoid `setTimeout` or `Promise` chains in tests — use `fakeAsync` / `tick` or `await`
- Do not test Angular internals (change detection, DI resolution)
- Do not test private methods — test through the public API
- Aim for tests that are fast, deterministic, and isolated
