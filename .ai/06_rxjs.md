# RxJS Guidelines

## Philosophy

- Prefer Signals over RxJS for all local component state and derived state
- Use RxJS only where Angular requires it or for complex async orchestration
- Convert observables to signals at the earliest opportunity using `toSignal()`
- The boundary between RxJS and Signals should be explicit and intentional

## Interop: RxJS ↔ Signals

### Observable → Signal

- Use `toSignal()` to consume observables in components:

```typescript
  readonly users = toSignal(this.usersService.getAll(), { initialValue: [] });
```

- Always provide `initialValue` or handle `undefined` explicitly
- `toSignal()` automatically unsubscribes when the injection context is destroyed —
  do NOT manually unsubscribe when using it
- Call `toSignal()` in the constructor or field initializer — not inside lifecycle hooks

### Signal → Observable

- Use `toObservable()` when an NgRx Effect or RxJS operator requires an observable:

```typescript
  readonly selectedId$ = toObservable(this.store.selectedId);
```

### rxMethod() in NgRx Signal Store

- Use `rxMethod()` for reactive side effects inside Signal Store:

```typescript
  loadUsers: rxMethod<void>(
    pipe(
      tap(() => patchState(store, { loading: true })),
      switchMap(() =>
        usersService.getAll().pipe(
          tapResponse({
            next: users => patchState(store, { users, loading: false }),
            error: (error: string) => patchState(store, { error, loading: false }),
          })
        )
      ),
    )
  ),
```

- Always use `tapResponse()` inside `rxMethod()` — never use bare `tap()` + `catchError()`
  as the stream would complete on error

## Operators

- Prefer higher-order mapping operators over nested subscriptions:
  - `switchMap` — cancels previous, use for search/navigation
  - `concatMap` — queues, use for ordered operations
  - `exhaustMap` — ignores new until current completes, use for form submissions
  - `mergeMap` — parallel, use only when order and cancellation don't matter
- Use `catchError` at the outermost level of effects — return a safe fallback observable
- Use `takeUntilDestroyed()` for manual subscriptions outside `toSignal()`:

```typescript
  readonly #destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.someObservable$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(value => { ... });
  }
```

- Avoid `takeUntil(this.destroy$)` pattern — prefer `takeUntilDestroyed()`

## Subscriptions

- Never subscribe manually in components when `toSignal()` or `async` pipe can be used
- Never subscribe inside another subscription — compose with operators instead
- Every manual subscription MUST be unsubscribed — use `takeUntilDestroyed()`
- Never subscribe in constructors — use field initializers with `toSignal()` instead

## Subjects

- Use `Subject` for event buses and triggers
- Use `BehaviorSubject` only when the current value must be readable synchronously
  and `signal()` is not an option
- Prefer `signal()` over `BehaviorSubject` in all new code
- Mark subjects as `readonly` and expose only the observable side:

```typescript
  readonly #refresh$ = new Subject<void>();
  readonly refresh$ = this.#refresh$.asObservable();
```

## General Rules

- Never use `async/await` inside RxJS operator chains — use RxJS operators throughout
- Avoid creating observables with `new Observable()` — prefer `of()`, `from()`, factory operators
- Do not ignore errors — always handle with `catchError` or `tapResponse`
- Avoid `tap()` for state updates inside components — update signals directly instead
