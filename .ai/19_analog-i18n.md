## Translation Files

### Structure

- One JSON file per locale in `src/i18n/`
- Use flat keys with dot notation for namespacing:

```json
// src/i18n/en.json
{
  "common.save": "Save",
  "common.cancel": "Cancel",
  "common.loading": "Loading...",
  "common.error": "Something went wrong",
  "nav.home": "Home",
  "nav.about": "About",
  "nav.blog": "Blog",
  "auth.login": "Sign in",
  "auth.logout": "Sign out",
  "auth.signup": "Create account"
}
```

- All locales must have identical keys — missing keys fall back to `en`
- Keys use `snake_case` within each namespace segment
- Never use sentences as keys — always use semantic identifiers:

```json
  // ✅ correct
  "auth.login": "Sign in"

  // ❌ avoid
  "Sign in": "Sign in"
```

### Translation File Rules

- `en.json` is the source of truth — all other locales derive from it
- When adding a new key, add it to `en.json` first, then all other locales
- Mark untranslated keys with `[TODO]` prefix so they're easy to find:

```json
  // fr.json — key not yet translated
  "auth.signup": "[TODO] Create account"
```

- Run a CI check to detect `[TODO]` keys in non-development environments

## Setup

### Install

```bash
npm install @angular/localize
```

### Initialize in Entry Points

```typescript
// src/main.ts
import '@angular/localize/init';
```

```typescript
// src/main.server.ts
import '@angular/localize/init';
```

### App Config

```typescript
// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideFileRouter, provideI18n } from '@analogjs/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { requestContextInterceptor } from '@analogjs/router';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '@kookio/types';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFileRouter(),
    provideHttpClient(withFetch(), withInterceptors([requestContextInterceptor])),
    provideClientHydration(withEventReplay()),
    provideI18n({
      defaultLocale: DEFAULT_LOCALE,
      locales: [...SUPPORTED_LOCALES],
      loader: async (locale) => {
        const translations = await import(`../i18n/${locale}.json`);
        return translations.default;
      },
    }),
  ],
};
```

## URL-Based Locale Routing

### Index Page — Locale Redirect

- Root `/` redirects to detected locale:

```typescript
// src/app/pages/index.page.ts
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LOCALE } from '@analogjs/router/tokens';
import { DEFAULT_LOCALE } from '@kookio/types';

@Component({
  standalone: true,
  template: '',
})
export default class IndexPage {
  constructor() {
    const router = inject(Router);
    const locale = inject(LOCALE, { optional: true }) ?? DEFAULT_LOCALE;
    router.navigate([locale], { replaceUrl: true });
  }
}
```

### Locale Layout Page

- Wrap all localized pages in a layout that validates the locale param:

```typescript
// src/app/pages/[locale].page.ts
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '@kookio/types';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export default class LocaleLayout {
  constructor() {
    const route = inject(ActivatedRoute);
    const router = inject(Router);
    const locale = route.snapshot.params['locale'];

    if (!SUPPORTED_LOCALES.includes(locale)) {
      router.navigate([DEFAULT_LOCALE], { replaceUrl: true });
    }
  }
}
```

### RouteMeta with Locale

- Always include locale in route metadata for SEO:

```typescript
// src/app/pages/[locale]/about.page.ts
import { RouteMeta } from '@analogjs/router';
import { inject } from '@angular/core';
import { injectLocale } from '@analogjs/router/tokens';

export const routeMeta: RouteMeta = {
  title: () => $localize`:@@about.pageTitle:About Us`,
  meta: () => {
    const locale = injectLocale();
    return [
      { name: 'description', content: $localize`:@@about.metaDescription:Learn more about Kookio` },
      { property: 'og:locale', content: locale },
    ];
  },
};
```

## Using Translations in Templates

### `i18n` Attribute (preferred for static text)

```html
<h1 i18n="@@nav.home">Home</h1>
<button i18n="@@common.save">Save</button>
```

### `$localize` in Component Code

```typescript
export class MyComponent {
  readonly saveLabel = $localize`:@@common.save:Save`;
  readonly errorMessage = $localize`:@@common.error:Something went wrong`;
}
```

### Rules

- Always provide a message ID with `@@` — never rely on auto-generated IDs:

```html
<!-- ✅ correct — explicit ID -->
<span i18n="@@auth.login">Sign in</span>

<!-- ❌ avoid — auto-generated ID, fragile -->
<span i18n>Sign in</span>
```

- Include a description for ambiguous strings:

```html
<span i18n="Button label for saving a form@@common.save">Save</span>
```

## Language Switcher

```typescript
// libs/ui/src/language-switcher.component.ts
import { Component } from '@angular/core';
import { injectLocale } from '@analogjs/router/tokens';
import { injectSwitchLocale } from '@analogjs/router';
import { SUPPORTED_LOCALES } from '@kookio/types';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  template: `
    <nav aria-label="Language selector">
      @for (locale of locales; track locale) {
        <button [class.active]="locale === currentLocale()" [attr.aria-current]="locale === currentLocale() ? 'true' : null" (click)="switchLocale(locale)">
          {{ locale.toUpperCase() }}
        </button>
      }
    </nav>
  `,
})
export class LanguageSwitcherComponent {
  readonly locales = SUPPORTED_LOCALES;
  readonly currentLocale = injectLocale();
  readonly switchLocale = injectSwitchLocale();
}
```

- `injectSwitchLocale()` triggers a full page navigation — this is intentional,
  required for `$localize` to re-evaluate all translations
- Always mark the current locale with `aria-current` for accessibility

## SSR & SSG with i18n

### SSG — Prerender All Locale Variants

- Prerender every route for every supported locale:

```typescript
  // vite.config.ts
  prerender: {
    routes: async () => {
      const staticRoutes = ['', 'about', 'blog', 'docs', 'changelog'];
      const blogSlugs = await getBlogSlugs();

      return [
        '/', // redirects to detected locale
        ...SUPPORTED_LOCALES.flatMap(locale => [
          `/${locale}`,
          ...staticRoutes.map(r => `/${locale}/${r}`),
          ...blogSlugs.map(slug => `/${locale}/blog/${slug}`),
        ]),
      ];
    },
    sitemap: {
      host: 'https://kookio.app',
    },
  }
```

- This generates one static file per locale per route — optimal for SEO and performance

### Hreflang Tags

- Add `hreflang` meta tags for SEO on all localized pages:

```typescript
export const routeMeta: RouteMeta = {
  meta: () => {
    const route = inject(ActivatedRoute);
    const slug = route.snapshot.params['slug'];

    return SUPPORTED_LOCALES.map((locale) => ({
      rel: 'alternate',
      hreflang: locale,
      href: `https://kookio.app/${locale}/blog/${slug}`,
    }));
  },
};
```

## Adding a New Locale

1. Add the locale to `SUPPORTED_LOCALES` in `libs/types/src/i18n.ts`
2. Create `src/i18n/<locale>.json` — copy `en.json` and mark all values with `[TODO]`
3. Run `npm run setup:ai` if guidelines reference locale list (not required automatically)
4. Add the locale to Vercel Preview environment if needed
5. Translate all `[TODO]` keys before enabling the locale in production

## General Rules

- Never hardcode locale strings in components — always use `$localize` or `i18n` attribute
- Never use `navigator.language` directly — use `injectLocale()` from `@analogjs/router/tokens`
- Always use `injectSwitchLocale()` for locale switching — never navigate manually
- Keep translation files in source control — they are part of the codebase
- Run i18n extraction (`ng extract-i18n`) periodically to catch missing keys
- Never expose untranslated `[TODO]` keys in production builds
- RTL languages (Arabic, Hebrew) require additional CSS — plan layout accordingly
  if RTL support is needed in the future
