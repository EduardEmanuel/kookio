# NgRx Guidelines

> **Status: Active** — Signal Store is the only state-management primitive used (`AuthStore` in `libs/feature/auth/src/lib/auth.ts`). Classic NgRx (`@ngrx/store`, `@ngrx/effects`, `@ngrx/entity`) is **not installed** and is intentionally out of scope — do not introduce it. Side effects belong inside `withMethods()` / `rxMethod()`; collection state uses `withEntities()` from `@ngrx/signals/entities`.

## Version & APIs Used

- `@ngrx/signals` — Signal Store for global and feature state
- `@ngrx/signals/entities` — `withEntities()` for collection state inside a Signal Store

## Signal Store

### Structure

- Define one store per feature/domain — keep stores focused and cohesive
- Colocate store file with the feature it serves:
  src/app/features/users/
  ├── users.store.ts
  ├── users.component.ts
  └── users.service.ts
- Name stores descriptively: `UsersStore`, `OrdersStore`, `AuthStore`

### Defining a Store

- Use `signalStore()` with explicit feature composition:

```typescript
export const UsersStore = signalStore(
  { providedIn: 'root' },
  withState<UsersState>(initialState),
  withComputed(({ users, selectedId }) => ({
    selectedUser: computed(() => users().find((u) => u.id === selectedId())),
  })),
  withMethods((store, usersService = inject(UsersService)) => ({
    loadUsers: rxMethod<void>(
      pipe(
        switchMap(() => usersService.getAll()),
        tap((users) => patchState(store, { users, loading: false })),
      ),
    ),
  })),
);
```

- Use `withState()` for state slice definition
- Use `withComputed()` for derived state — never duplicate derivable state
- Use `withMethods()` for actions and side effect triggers
- Use `withHooks()` for lifecycle logic (`onInit`, `onDestroy`)

### State Shape

- Always define a typed interface for state:

```typescript
interface UsersState {
  users: User[];
  selectedId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  selectedId: null,
  loading: false,
  error: null,
};
```

- Model async state explicitly with `loading` and `error` fields
- Use `withEntities()` from NgRx Entity for collection state (see Entity section)

### Updating State

- Use `patchState()` for partial state updates — never mutate state directly:

```typescript
patchState(store, { loading: true });
patchState(store, { users, loading: false });
```

### Providing Stores

- Use `providedIn: 'root'` for app-wide stores
- Use component-level providers for feature-scoped stores:

```typescript
  @Component({
    providers: [UsersStore],
  })
```

## Side Effects

- Side effects belong in `withMethods()` — wrap async work in `rxMethod()` so the
  subscription is tied to the store's lifecycle:

```typescript
loadUsers: rxMethod<void>(
  pipe(
    tap(() => patchState(store, { loading: true })),
    switchMap(() =>
      usersService.getAll().pipe(
        tapResponse({
          next: (users) => patchState(store, { users, loading: false }),
          error: (error: string) => patchState(store, { error, loading: false }),
        }),
      ),
    ),
  ),
),
```

- Use `tapResponse()` from `@ngrx/operators` inside `rxMethod()` — never bare
  `tap()` + `catchError()` (the stream would complete on error)
- Prefer `switchMap` for cancellable requests, `concatMap` for ordered,
  `exhaustMap` for non-concurrent submissions

## Entity

### Usage

- Use `withEntities()` from `@ngrx/signals/entities` for collection state in Signal Store:

```typescript
export const UsersStore = signalStore(
  withEntities<User>(),
  withMethods((store) => ({
    addUser(user: User) {
      patchState(store, addEntity(user));
    },
    removeUser(id: string) {
      patchState(store, removeEntity(id));
    },
    updateUser(update: EntityUpdate<User>) {
      patchState(store, updateEntity(update));
    },
  })),
);
```

- Always define `selectId` if entity ID is not `id`:

```typescript
withEntities({ selectId: (user: User) => user.userId });
```

- Use Entity adapter methods: `addEntity`, `addEntities`, `setEntity`, `setEntities`,
  `updateEntity`, `updateEntities`, `removeEntity`, `removeEntities`, `setAllEntities`

## General Rules

- Signal Store is the only state-management primitive — do not introduce
  classic `@ngrx/store` / `@ngrx/effects` / `@ngrx/entity` dependencies
- Keep store state normalized — avoid deeply nested objects
- Computed signals must be pure — no side effects
- Do not access store state outside of components, directives, or other stores
- Do not subscribe manually to store signals in components — use them directly in templates
