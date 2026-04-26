# NgRx Guidelines

## Version & APIs Used

- NgRx Signal Store for global state management
- NgRx Effects for side effects
- NgRx Entity for collection management

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

## Effects

### Structure

- Define effects in a dedicated `*.effects.ts` file per feature
- Keep effects focused — one effect per async operation
- Use `createEffect()` with `Actions` pipe:

```typescript
loadUsers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(UsersActions.loadUsers),
    switchMap(() =>
      this.usersService.getAll().pipe(
        map((users) => UsersActions.loadUsersSuccess({ users })),
        catchError((error) => of(UsersActions.loadUsersFailure({ error: error.message }))),
      ),
    ),
  ),
);
```

- Always handle errors inside effects with `catchError` — never let streams complete on error
- Prefer `switchMap` for cancellable requests, `concatMap` for ordered, `exhaustMap` for non-concurrent

### Actions

- Use `createActionGroup()` to group related actions:

```typescript
export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Failure': props<{ error: string }>(),
  },
});
```

- Action names must be descriptive and follow `[Source] Event` convention
- Never dispatch actions from inside reducers or selectors

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

- Prefer Signal Store over classic NgRx Store for new features
- Keep store state normalized — avoid deeply nested objects
- Selectors and computed signals must be pure — no side effects
- Do not access store state outside of components, directives, or other stores
- Do not subscribe manually to store signals in components — use them directly in templates
