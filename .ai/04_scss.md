# SCSS Guidelines

> **Status: Active (partial)** — partials, BEM, Material theming, and the utility-first methodology are in use under `apps/web/src/styles/` and `libs/shared/ui/src/styles/`. Load-bearing constraint codified below: the global entry is `apps/web/src/styles.css` (CSS, not SCSS) and design tokens load via `<link>` from a pre-built CSS file. Both are workarounds for the same `nxViteTsPaths()` Sass-importer bug.

## Architecture

- Each component has its own scoped SCSS file — no global styles except in `styles/`
- Global styles structure:
  src/styles/
  ├── \_theme.scss ← Angular Material theme definition
  ├── \_variables.scss ← SCSS variables and CSS custom properties
  ├── \_mixins.scss ← reusable mixins
  ├── \_functions.scss ← reusable functions
  ├── \_utilities.scss ← utility classes (spacing, typography, layout)
  └── styles.scss ← entry point — imports all partials
- Prefix all partials with `_` so they are not compiled independently
- Import shared partials via `@use` — do NOT use `@import` (deprecated)

### Global styles entry must stay `.css`, not `.scss`

The global styles entry file (`apps/web/src/styles.css`) **cannot use
`@use` or `@import` Sass directives**. Component SCSS files
(`*.component.scss`, Angular `styleUrl`) are unaffected — this constraint
applies only to the entry file loaded from `index.html`.

**Why:** `nxViteTsPaths()` registers a custom Sass importer that
intercepts every import in `.scss` files. In Vite's `?direct` mode (used
by AnalogJS for HMR/SSR), that importer returns `[object Promise]`
instead of an `AbsoluteURL`, surfacing as
`[sass] Error: The importer must return an absolute URL, was "%5Bobject%20Promise%5D"`.
Setting `api: 'legacy'` or `silenceDeprecations` in
`css.preprocessorOptions` does **not** fix it — the `?direct` code path
ignores those options.

**How to apply:**

- Keep the global entry as `.css`. `@import 'tailwindcss'` works in `.css`
  via the `@tailwindcss/vite` plugin without involving Sass.
- Load design tokens via a separate `<link rel="stylesheet" href="…">` in
  `index.html`, not via `@use` from the entry. See "Design Tokens
  Architecture" below.
- If a future Vite/NX upgrade makes Sass-in-entry work again, leave a
  test commit for one cycle before flipping the convention — the bug
  reproduces silently at runtime, not at build.

## Design Tokens Architecture

Material 3 design tokens (orange/warm palette) are authored as SCSS-syntax
files but shipped as a **single concatenated CSS file** loaded by
`<link>`, never imported via `@use`.

**Source of truth**: `libs/shared/ui/src/styles/` — 8 files (despite the
`.scss` extension, they use only pure-CSS syntax to side-step the Sass
importer bug). Load order:

1. `_tokens.scss` — semantic aliases (`--color-primary`, `--space-*`,
   `--radius-*`, food-domain tokens like `--color-expiry-*`)
2. `_m3-light.scss` — base light theme + the `--mat-sys-*` bridge that
   feeds Angular Material 20's design-token API
3. `_m3-dark.scss` — `@media (prefers-color-scheme: dark)`
4. `_m3-light-mc.scss` / `_m3-light-hc.scss` — light + medium / forced
   contrast
5. `_m3-dark-mc.scss` / `_m3-dark-hc.scss` — dark + medium / high
   contrast

**App entry**: `apps/web/src/styles/kookio-tokens.css` — concatenated
output of the eight source files, loaded via `<link>` in `index.html`.

**To update tokens**: edit the SCSS source under `libs/shared/ui/src/styles/`,
then run `npx nx run ui:build-tokens` to regenerate the concatenated CSS.
Commit both the source change and the generated file.

**Angular Material bridge**: each color file sets `--mat-sys-*` variables
that point at the corresponding `--md-sys-color-*` variables. Angular
Material 20 reads `--mat-sys-*`, so it picks up the Kookio palette
automatically — never override Material colors directly with `var(--md-…)`
selectors in component SCSS, set them through the token files instead.

## Methodology: Utility-first

- Prefer utility classes for spacing, typography, display, and layout
- Define utilities in `_utilities.scss` using SCSS loops for consistency:

```scss
$spacings: (0, 4, 8, 12, 16, 24, 32, 48, 64);

@each $size in $spacings {
  .mt-#{$size} {
    margin-top: #{$size}px;
  }
  .mb-#{$size} {
    margin-bottom: #{$size}px;
  }
  .ml-#{$size} {
    margin-left: #{$size}px;
  }
  .mr-#{$size} {
    margin-right: #{$size}px;
  }
  .p-#{$size} {
    padding: #{$size}px;
  }
}
```

- Write component-specific styles only for layout and structure unique to that component
- Avoid duplicating utility logic inside component SCSS files

## Variables & Custom Properties

- Define design tokens as CSS custom properties in `_variables.scss`:

```scss
:root {
  --spacing-unit: 4px;
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --transition-default: 200ms ease;
}
```

- Use SCSS variables for values used only at compile time (breakpoints, maps)
- Use CSS custom properties for values that may change at runtime (theming, dark mode)

## Shared SCSS partials (compile-time, not the design tokens)

The design tokens at `libs/shared/ui/src/styles/_*.scss` are
**.scss-extension files containing pure CSS** — they're concatenated
into `apps/web/src/styles/kookio-tokens.css` and loaded as a single
`<link>` (workaround for the `nxViteTsPaths()` Sass-importer bug on
the global entry, see "Global styles entry must stay .css" above).

A separate category lives next to them: **real SCSS partials** that
component .scss files `@use` at compile time. Examples:
`_breakpoints.scss` (variables + responsive mixins). These never get
loaded as runtime CSS — they only emit code where a component
`@include`-s a mixin or references a `$variable`.

**Where they live:** `libs/shared/ui/src/styles/_<name>.scss`,
alongside the design tokens. Tooling tells the two categories apart by
whether anyone `@use`-s the file (the design tokens are never `@use`-d
because the global entry is `.css`).

**How to import them:**

```scss
// Relative path from the component's own .scss file.
// `nxViteTsPaths()` Sass importer doesn't resolve wildcard aliases
// like `@kookio/shared-ui/styles/*` — only top-level package aliases
// that map to a single .ts file. Relative is uglier but always works.
@use '../../../../../../shared/ui/src/styles/breakpoints' as bp;

.plan__grid {
  @include bp.mobile {
    grid-template-rows: auto repeat(3, 110px);
  }
}
```

**When the same value also lives in TypeScript** (e.g. a breakpoint
is queried at runtime via `window.matchMedia(...)`), the SCSS partial
is the source of truth at compile time and the TS constant must
carry a `⚠ Must stay in sync with $foo in <path>` comment. Sass
can't be imported from TS, so manual sync with a cross-reference is
the pragmatic limit until someone wires up codegen.

## Mixins

- Define all reusable mixins in `_mixins.scss`
- Use mixins for responsive breakpoints:

```scss
$breakpoints: (
  'sm': 576px,
  'md': 768px,
  'lg': 992px,
  'xl': 1200px,
);

@mixin respond-to($breakpoint) {
  @if map.has-key($breakpoints, $breakpoint) {
    @media (min-width: map.get($breakpoints, $breakpoint)) {
      @content;
    }
  } @else {
    @warn 'Unknown breakpoint: #{$breakpoint}';
  }
}
```

- Use mixins for repeated visual patterns (elevation, truncation, focus rings):

```scss
@mixin truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@mixin focus-ring {
  outline: 2px solid var(--mat-primary);
  outline-offset: 2px;
}
```

## Functions

- Define reusable functions in `_functions.scss`
- Use functions for computed values, never for side effects:

```scss
@use 'sass:math';

@function rem($px, $base: 16) {
  @return math.div($px, $base) * 1rem;
}
```

## Angular Material Theming

- Define the Material theme in `_theme.scss` using the official `mat.define-theme()` API
- Use CSS custom properties exposed by Material for runtime theming
- Extend or override Material component styles via `mat.get-theme-color()` and
  component-level mixins — do NOT override Material internals with deep selectors
- Do NOT hardcode Material palette values — always reference theme variables:

```scss
// ✅ correct
color: var(--mat-primary);

// ❌ avoid
color: #6200ee;
```

- Apply density and typography scales through the theme, not manual overrides

## CSS Naming Convention: BEM

Use strict BEM (Block Element Modifier) for all component class names:

```scss
// Block
.topbar {
}

// Element — double underscore
.topbar__logo {
}
.topbar__brand {
}

// Modifier — double dash
.topbar--compact {
}
.bottom-tabs__item--active {
}
```

- **Block** — the component root: `topbar`, `bottom-tabs`, `shell`
- **Element** — a part of the block, separated by `__`: `topbar__logo`, `shell__main`
- **Modifier** — a variant or state, separated by `--`: `shell--mobile`, `bottom-tabs__item--active`
- Multi-word blocks and elements use single hyphen: `bottom-tabs`, `sidenav-menu__item`
- Never use flat kebab-case (`topbar-logo`) — it loses the block/element/modifier distinction

## Load-bearing rules need a comment

A CSS property whose absence would silently break a _different_ part
of the page — usually layout — needs a one-line `// why` comment that
names the dependency. Without it, the next person editing the file
(you in six months, a teammate, an LLM "tidying up") reads the
property as decorative and removes it. The layout then goes wrong
somewhere visually, with no compile or lint error.

Triggers — comment the property when:

- It compensates for a third-party tool's behaviour. Examples:
  Tailwind preflight's `border: 0 solid` (which surfaces phantom
  borders on Material MDC slots, see `02_angular.md`); NgOptimizedImage
  `fill` (which uses `position: absolute; inset: 0` and contributes
  zero to the parent's intrinsic size, so the parent must have an
  explicit height from somewhere else); CDK overlay's transformed
  ancestors (which break `position: sticky` on descendants).
- It's required by a sibling or descendant rule whose own behaviour
  depends on it. Examples: `position: relative` on a parent so an
  absolutely-positioned child has a containing block; `min-height: 0`
  on a flex child so it can actually shrink and scroll;
  `overflow: hidden` on a card so a `border-radius` actually clips an
  inner image.
- The property's effect is invisible until a _sibling_ rule changes —
  i.e. removing the property doesn't break anything by itself, but
  removing it on the same day someone else changes a related rule
  produces a layout regression nobody traces back.

The comment must name **what breaks**, not just **what the property does**:

```scss
// ✅ names the dependency — a future deleter knows what they'll break
.plan__cell {
  // aspect-ratio gives the cell an explicit height (= column width).
  // Drop it and the cell collapses to 0 because the recipe `<img>`
  // uses NgOptimizedImage's `fill` (position: absolute; inset: 0),
  // which contributes nothing to its parent's intrinsic size.
  aspect-ratio: 1 / 1;
}

.sheet__scrollable {
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0; // required so the flex child can actually shrink and scroll
}

// ❌ tautological — describes the property, not the dependency
.plan__cell {
  aspect-ratio: 1 / 1; // makes cells square
}

// ❌ describes the value, doesn't help anyone deleting it
.plan__cell-recipe {
  position: relative; // sets positioning context
}
```

The bar a comment must clear: a reader who deletes the line should
be able to tell _from the comment alone_ what they'll break. If they
can't, write a better comment. Length is fine — three sentences with a
concrete failure mode beats one cryptic word.

## General Rules

- Use `@use` and `@forward` — never `@import`
- Use `sass:math`, `sass:map`, `sass:color` modules explicitly
- Avoid nesting deeper than 3 levels
- Avoid `!important` — if needed, leave a comment explaining why
- Use `rem` for typography and spacing, `px` only for borders and shadows
- Always scope component animations to `@media (prefers-reduced-motion: reduce)`
- Comment any rule that's load-bearing for a behaviour set elsewhere
  — see "Load-bearing rules need a comment" above
