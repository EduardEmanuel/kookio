# SSR & SSG Guidelines

## Strategy: Mixed Rendering

- SSR for dynamic pages (authenticated, user-specific, real-time data)
- SSG for static content pages (blog, docs, changelog, marketing)
- Decision rule: if the page content changes based on the user or request → SSR;
  if the same content is served to everyone → SSG

## Rendering Decision Matrix

| Page Type       | Strategy | Reason                         |
| --------------- | -------- | ------------------------------ |
| Home / landing  | SSG      | Same for all users             |
| Blog posts      | SSG      | Content-driven, rarely changes |
| Documentation   | SSG      | Static content                 |
| Changelog       | SSG      | Static content                 |
| Marketing pages | SSG      | Static content                 |
| Dashboard       | SSR      | User-specific data             |
| Profile pages   | SSR      | Authenticated, user-specific   |
| Search results  | SSR      | Dynamic, query-dependent       |
| Admin pages     | SSR      | Authenticated, sensitive       |

## Vite Configuration

### Base Setup

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

export default defineConfig(({ mode }) => ({
  plugins: [
    analog({
      ssr: true,
      prerender: {
        routes: async () => [
          '/',
          '/about',
          '/blog',
          '/docs',
          '/changelog',
          // Dynamic content routes — fetched at build time
          ...(await getBlogSlugs()).map((slug) => `/blog/${slug}`),
          ...(await getDocsSlugs()).map((slug) => `/docs/${slug}`),
        ],
        sitemap: {
          host: 'https://kookio.app',
        },
      },
      nitro: {
        preset: 'vercel',
      },
    }),
  ],
}));
```

### SSG Route Fetching

- Fetch dynamic route slugs at build time from the filesystem or database:

```typescript
async function getBlogSlugs(): Promise<string[]> {
  const files = await readdir('./src/content/blog');
  return files.filter((f) => f.endsWith('.md')).map((f) => f.replace('.md', ''));
}
```

- Never hardcode dynamic routes — always derive from content source
- Keep route fetching functions in `vite.config.ts` or a dedicated `build/routes.ts` file

## SSR Setup

### App Config (Client)

```typescript
// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideFileRouter(), provideHttpClient(withFetch(), withInterceptors([requestContextInterceptor])), provideClientHydration(withEventReplay())],
};
```

### App Config (Server)

```typescript
// src/app/app.config.server.ts
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRoutesConfig } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(), provideServerRoutesConfig(serverRoutes)],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
```

### Server Routes Configuration

- Define which routes are SSR vs SSG vs CLIENT via `app.routes.server.ts`:

```typescript
// src/app/app.routes.server.ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // SSG routes — prerendered at build time
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'blog', renderMode: RenderMode.Prerender },
  { path: 'blog/:slug', renderMode: RenderMode.Prerender },
  { path: 'docs/**', renderMode: RenderMode.Prerender },
  { path: 'changelog', renderMode: RenderMode.Prerender },
  { path: 'about', renderMode: RenderMode.Prerender },

  // SSR routes — rendered on each request
  { path: 'dashboard/**', renderMode: RenderMode.Server },
  { path: 'profile/**', renderMode: RenderMode.Server },
  { path: 'admin/**', renderMode: RenderMode.Server },

  // Fallback — SSR for anything not explicitly defined
  { path: '**', renderMode: RenderMode.Server },
];
```

- Always be explicit about render mode — never rely on the default for important routes
- Group routes by render mode for readability

## Hydration

### Current Setup

- `withEventReplay()` enabled — replays user events that occur before hydration completes
- Incremental hydration (`withIncrementalHydration()`) not yet enabled —
  consider enabling for large pages with heavy components below the fold

### Rules

- Never access `document`, `window`, or `localStorage` directly in components —
  use `isPlatformBrowser()` or `afterNextRender()`:

```typescript
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

export class MyComponent {
  readonly #platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (isPlatformBrowser(this.#platformId)) {
      // browser-only code
    }
  }
}
```

- Prefer `afterNextRender()` for browser-only initialization:

```typescript
import { afterNextRender } from '@angular/core';

export class MyComponent {
  constructor() {
    afterNextRender(() => {
      // runs only in the browser, after hydration
    });
  }
}
```

- Never use `setTimeout` or `setInterval` at component init — they cause hydration mismatches
- Avoid direct DOM manipulation — always use Angular's renderer or signals

## TransferState

- AnalogJS handles `TransferState` automatically for `HttpClient` requests —
  do NOT manually serialize/deserialize server data
- Data fetched via `HttpClient` during SSR is automatically transferred to the
  client to prevent duplicate requests on hydration
- Data fetched via `injectLoad()` (`.server.ts`) is also automatically transferred —
  do NOT re-fetch on the client what was loaded on the server

## Sitemap

- AnalogJS auto-generates `sitemap.xml` when `sitemap.host` is set in `vite.config.ts`
- Sitemap is generated from the `prerender.routes` array — only SSG routes are included
- SSR routes are NOT included in the sitemap automatically — add them manually if needed:

```typescript
  sitemap: {
    host: 'https://kookio.app',
    // additional routes not in prerender.routes
    additionalRoutes: ['/sitemap-dynamic.xml'],
  }
```

- Verify sitemap at `/sitemap.xml` after every production build

## Environment Variables

- Use `import.meta.env` for Vite environment variables in client code:

```typescript
const apiUrl = import.meta.env['NG_APP_API_URL'];
```

- Use `process.env` for server-side (Nitro) environment variables:

```typescript
const secret = process.env['MY_SECRET'];
```

- Never use `process.env` in client/Angular code — it's not available in the browser
- Never use `import.meta.env` for secrets — all `NG_APP_` variables are exposed to the browser

## Performance Rules

- Prerender as many routes as possible — SSG pages are served as static files by Vercel,
  no server compute required
- Use Redis caching for SSR pages that are expensive to render but not user-specific
- Avoid heavy computation in `.server.ts` load functions — delegate to services or cache
- Use `NgOptimizedImage` on all SSG pages — critical for Core Web Vitals
- Lazy-load all feature routes — never eagerly load routes in SSR context

## Common Pitfalls

- ❌ Using `localStorage` / `sessionStorage` in SSR context → use cookies via h3
- ❌ Using `window.location` in SSR context → use Angular `Router` or `injectRequest()`
- ❌ Importing browser-only libraries at the top level → use dynamic `import()` inside
  `afterNextRender()` or `isPlatformBrowser()` guard
- ❌ Returning different HTML on server vs client → causes hydration mismatch errors
- ❌ Using `Date.now()` or `Math.random()` in templates → non-deterministic,
  causes hydration mismatches

## AnalogJS Build — Known Failure Patterns

### `manualChunks` — do not use with AnalogJS

- Never set `manualChunks` in `vite.config.ts` when using AnalogJS
- Rollup does not guarantee load order for parallel chunk imports — splitting Angular,
  Material, or NgRx into named chunks causes `Class extends value undefined` at bootstrap
  (blank page on Vercel) because a derived-class chunk may evaluate before its base-class chunk
- AnalogJS already controls bundle splitting internally for both SSR and client builds;
  external `manualChunks` interfere with that control and produce unpredictable ordering

### `ssr.external: true` — do not set

- Never set `ssr.external: true` at the Vite config root
- AnalogJS overrides this option internally — it has no effect on the SSR build
- It _does_ affect Vite's client pre-bundler, changing Angular's module initialisation
  order and reproducing the same `Class extends value undefined` crash on Vercel

### `nitro.externals.external` — Nitro's Rollup step only

- `nitro.externals.external` prevents Nitro's Rollup (not Vite) from following and
  inlining large packages during the "Building Server..." step
- It only works when the Vite SSR output contains _bare_ package imports (e.g. `@angular/core`)
- If `manualChunks` is active in the SSR build pass, bare imports become local chunk
  references — `nitro.externals.external` never matches them and the package is still
  inlined into the Rollup bundle → OOM

### `defineConfig` callback does not receive `isSsrBuild`

- The `defineConfig(({ mode }) => ...)` callback is evaluated once by AnalogJS and
  **never** receives `isSsrBuild: true`
- Conditionals on `isSsrBuild` inside the callback have no effect
- Plugin `config` hooks are called per build pass and do receive the correct flag, but
  even there AnalogJS controls SSR bundling internally — do not rely on this to gate
  bundle manipulation between client and SSR builds

### CI heap OOM during Nitro bundle step

- AnalogJS forces Angular (~1.5 MB) and Material (~714 kB) into Nitro's Rollup AST
  regardless of externalization settings — this exhausts the default Node.js heap
  (~2 GB) on CI runners with 7 GB RAM
- Fix: set `NODE_OPTIONS=--max-old-space-size=6144` on the build step in CI
- This is the correct fix, not a workaround — Rollup's AST construction is inherently
  memory-intensive for these package sizes and cannot be avoided via config
