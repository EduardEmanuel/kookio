# Firebase Guidelines

## Services Used

- Firebase Authentication (primary auth system)
- Firebase Client SDK (`firebase`) — browser/client side
- Firebase Admin SDK (`firebase-admin`) — server side (Nitro/h3 context)

## Architecture: Auth Flow

Client (Angular)
↓ signIn / signOut (Firebase Client SDK)
Firebase Auth
↓ ID Token (JWT)
Client → tRPC / API route (Authorization: Bearer `<token>`)
↓ verifyIdToken (Firebase Admin SDK)
Server (Nitro/h3 context)
↓ ctx.user (verified user injected into tRPC context)
Prisma / Business Logic

## File Structure

libs/
└── firebase/
├── src/
│ ├── client.ts ← Firebase client app singleton
│ ├── admin.ts ← Firebase Admin app singleton
│ ├── auth.ts ← client-side auth helpers
│ └── auth.server.ts ← server-side token verification

## Client SDK

### Singleton

- Always use a singleton Firebase app instance — never initialize per component:

```typescript
// libs/firebase/src/client.ts
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env['NG_APP_FIREBASE_API_KEY'],
  authDomain: import.meta.env['NG_APP_FIREBASE_AUTH_DOMAIN'],
  projectId: import.meta.env['NG_APP_FIREBASE_PROJECT_ID'],
  storageBucket: import.meta.env['NG_APP_FIREBASE_STORAGE_BUCKET'],
  messagingSenderId: import.meta.env['NG_APP_FIREBASE_MESSAGING_SENDER_ID'],
  appId: import.meta.env['NG_APP_FIREBASE_APP_ID'],
};

export const firebaseApp: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
```

- All config values come from `NG_APP_` environment variables — never hardcode

### Auth Helpers

- Define reusable auth helpers in `auth.ts`:

```typescript
// libs/firebase/src/auth.ts
import { getAuth, signInWithPopup, signInWithEmailAndPassword, signOut, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import { firebaseApp } from './client';

export const auth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();

export function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export function signInWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signOutUser() {
  return signOut(auth);
}

export function getIdToken(): Promise<string | null> {
  return auth.currentUser?.getIdToken() ?? Promise.resolve(null);
}
```

### Angular Integration

- Use a singleton `AuthStore` (NgRx Signal Store) to manage auth state globally:

```typescript
// libs/data-access/src/auth.store.ts
import { signalStore, withState, withMethods, withHooks } from '@ngrx/signals';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { auth, signInWithGoogle, signOutUser } from '@kookio/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
}

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>({ user: null, loading: true }),
  withMethods((store, router = inject(Router)) => ({
    async signInWithGoogle() {
      await signInWithGoogle();
    },
    async signOut() {
      await signOutUser();
      router.navigate(['/login']);
    },
  })),
  withHooks((store) => ({
    onInit() {
      onAuthStateChanged(auth, (user) => {
        patchState(store, { user, loading: false });
      });
    },
  })),
);
```

- Expose `user` and `loading` signals — never read `auth.currentUser` directly in components
- Use `AuthStore.user()` in templates and guards — do not subscribe to `onAuthStateChanged` in components

### AuthStore — Known Edge Cases

#### Firebase not configured in the browser (preview / local without env vars)

- When none of the `NG_APP_FIREBASE_*` variables are set, Firebase is not initialised
  and `onAuthStateChanged` never fires — `loading` stays `true` indefinitely, blocking
  the login form behind an infinite skeleton
- Guard `onAuthStateChanged` with an env var check and set `loading = false` immediately
  when Firebase is not configured:

```typescript
withHooks((store) => ({
  onInit() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;

    if (!import.meta.env['NG_APP_FIREBASE_API_KEY']) {
      patchState(store, { loading: false });
      return;
    }

    onAuthStateChanged(auth, (user) => {
      patchState(store, { user, loading: false });
    });
  },
})),
```

#### Safety timeout on `authReady`

- `onAuthStateChanged` can fail to fire when Firebase is configured but silently
  blocked (network issue, SDK initialisation stalled by a browser extension, etc.)
- A safety timeout that sets `loading = false` after X ms prevents an infinite skeleton
  in these edge cases; always clear the timeout immediately when the real callback fires:

```typescript
onInit() {
  const timeout = setTimeout(
    () => patchState(store, { loading: false }),
    /* X */ 2000,
  );

  onAuthStateChanged(auth, (user) => {
    clearTimeout(timeout);
    patchState(store, { user, loading: false });
  });
},
```

- **The correct value for X is unvalidated.** The 5 s value introduced in the
  codebase was added while a `manualChunks` chunk-ordering bug was also present,
  which itself caused blank-page / infinite-skeleton symptoms at runtime. The timeout
  may have masked that root cause rather than solved a genuine Firebase delay.
- Before settling on a value: measure `onAuthStateChanged` callback latency in
  production without any timeout active; only then decide whether a safety timeout
  is necessary and what the threshold should be.

### ID Token — Sending to Server

- Always attach the Firebase ID token as a Bearer token on authenticated requests:

```typescript
// libs/firebase/src/auth.ts
export async function getAuthHeaders(): Promise<Record<string, string>> {
  const token = await getIdToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
```

- Use an Angular HTTP interceptor to attach the token automatically:

```typescript
export const authInterceptor: HttpInterceptorFn = async (req, next) => {
  const headers = await getAuthHeaders();
  const authReq = req.clone({ setHeaders: headers });
  return next(authReq);
};
```

- Register `authInterceptor` in `app.config.ts` via `withInterceptors()`
- ID tokens expire after 1 hour — always call `getIdToken(true)` to force refresh
  when a 401 is received

## Admin SDK (Server Side)

### Admin Singleton

- Always use a singleton Admin app — never initialize per request:

```typescript
// libs/firebase/src/admin.ts
import { initializeApp, getApps, cert, App } from 'firebase-admin/app';

function createAdminApp(): App {
  return initializeApp({
    credential: cert({
      projectId: process.env['FIREBASE_PROJECT_ID'],
      clientEmail: process.env['FIREBASE_CLIENT_EMAIL'],
      privateKey: process.env['FIREBASE_PRIVATE_KEY']?.replace(/\\n/g, '\n'),
    }),
  });
}

export const adminApp: App = getApps().length === 0 ? createAdminApp() : getApps()[0];
```

- All Admin SDK config comes from server-side environment variables (no `NG_APP_` prefix)
- Never expose Admin SDK credentials to the client — keep in server-only files

### Token Verification

- Verify ID tokens in tRPC context or h3 middleware — never in individual procedures:

```typescript
// libs/firebase/src/auth.server.ts
import { getAuth } from 'firebase-admin/auth';
import { adminApp } from './admin';

export async function verifyIdToken(token: string) {
  try {
    return await getAuth(adminApp).verifyIdToken(token);
  } catch {
    return null;
  }
}
```

### tRPC Context Integration

- Extract and verify the token in `createContext()`:

```typescript
// src/server/trpc/context.ts
import { H3Event, getHeader } from 'h3';
import { verifyIdToken } from '@kookio/firebase/server';

export async function createContext(event: H3Event) {
  const authHeader = getHeader(event, 'authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  const firebaseUser = token ? await verifyIdToken(token) : null;

  return { event, firebaseUser };
}
```

- `protectedProcedure` checks `ctx.firebaseUser` — throws `UNAUTHORIZED` if null
- Never trust client-provided user IDs — always use `ctx.firebaseUser.uid`

## Environment Variables

### Client (NG*APP* prefix — exposed to browser)

NG_APP_FIREBASE_API_KEY=
NG_APP_FIREBASE_AUTH_DOMAIN=
NG_APP_FIREBASE_PROJECT_ID=
NG_APP_FIREBASE_STORAGE_BUCKET=
NG_APP_FIREBASE_MESSAGING_SENDER_ID=
NG_APP_FIREBASE_APP_ID=

### Server (no prefix — server only, never exposed to browser)

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

## Angular Route Guards

- Implement auth guard using `AuthStore`:

```typescript
export const authGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (authStore.loading()) {
    // wait for auth state to resolve
    return toObservable(authStore.loading).pipe(
      filter((loading) => !loading),
      map(() => (authStore.user() ? true : router.createUrlTree(['/login']))),
      take(1),
    );
  }

  return authStore.user() ? true : router.createUrlTree(['/login']);
};
```

- Apply guards via `routeMeta` in AnalogJS page files:

```typescript
export const routeMeta: RouteMeta = {
  canActivate: [authGuard],
};
```

## General Rules

- Never store sensitive user data in Firebase Auth custom claims beyond what's needed for authorization
- Always verify tokens server-side — never trust client-reported identity
- Use `onAuthStateChanged` only in `AuthStore.onInit()` — nowhere else
- Never call Firebase Auth methods directly in components — always via `AuthStore`
- Refresh tokens proactively on 401 responses — implement retry logic in the HTTP interceptor
- Never log ID tokens — treat them as secrets
- Keep client and admin SDK imports strictly separated:
  - Client SDK: only in browser/Angular code
  - Admin SDK: only in server/Nitro code
