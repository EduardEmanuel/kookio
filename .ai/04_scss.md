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

## Units: `rem` for spacing/sizing/typography, `px` for the carve-outs

Write spacing, sizing, typography, and border-radius in `rem` so they
scale with the user's browser font-size setting (the single most
important built-in accessibility lever). At the default 16px root size
the rounded values land on a clean scale: 2px → 0.125rem, 4px →
0.25rem, 8px → 0.5rem, 12px → 0.75rem, 16px → 1rem, 24px → 1.5rem,
32px → 2rem, 40px → 2.5rem, 48px → 3rem, 64px → 4rem. The design
tokens in `_tokens.scss` (`--space-*`, `--radius-*`, `--shell-*`) are
already defined in `rem`, so any consumer of `var(--space-md)` is
covered automatically.

**Keep `px` for these specific cases and nowhere else:**

- **Borders** (`border: 1px solid …`) — hairlines look sharpest at
  exactly one device pixel and don't need to scale with type size.
- **Box-shadow offsets and blur radii** (`box-shadow: 0 1px 2px …`,
  `filter: drop-shadow(0 4px 12px …)`) — same reasoning as borders.
- **Media-query breakpoint values** (`@media (min-width: 768px)`).
  `_breakpoints.scss` is the single source of truth, and its values
  must stay byte-identical to `BreakpointService` in
  `libs/feature/shell/src/lib/services/` (the service uses
  `window.matchMedia(...)` at runtime with the same query string).
  Changing the unit on one side without the other produces a silent
  layout-vs-logic drift.
- **The `9999px` sentinel** in `--radius-full` — semantic "perfect
  pill", not a real measurement.
- **The `1px` sr-only hairline** in `_utilities.scss` / `_mixins.scss`
  — conventional pattern for screen-reader-only content (matched by
  Bootstrap, Tailwind, MUI).

**Why not px for spacing too?** A user who sets their browser to 200%
font size sees text bigger but, with px paddings, the same cramped
layout around it — readability still suffers. Borders and shadows
don't have this problem because their visual weight doesn't scale with
type size in the same way.

**How to apply:** when introducing a value that has no design token,
write a rem literal directly (e.g. `min-width: 13.75rem`). If the
scale has a gap (no token between `--space-sm: 0.5rem` and
`--space-md: 1rem`, say), write the rem literal and leave an inline
comment naming the gap. Don't invent new tokens for one-off values.

## `var()` fallbacks on project-owned tokens

Every `var(--name)` for a **project-owned token** must include a
fallback as the second argument. The fallback runs when the token
fails to resolve at runtime — e.g. `kookio-tokens.css` 404s, loads
after first paint, or gets blocked by a CSP — so the page stays
legible during the failure window instead of collapsing to property
defaults (custom properties without a fallback resolve to `unset`,
which then falls back to `display: block`, `color: canvastext`,
`padding: 0`, etc.).

**Scope — fall back on these token families:**

- `--space-*`, `--radius-*`, `--shell-*` (scalar layout)
- `--color-*` (semantic colour aliases)
- `--font-*`, `--typescale-*` (typography)
- `--transition-*`, `--z-*` (animation, layering)
- `--container-*`, `--text-*` (Tailwind v4 exposed tokens)

**Skip — do NOT fall back on raw Material/M3 tokens:**
`--mat-sys-*` and `--md-sys-color-*`. Adding light-theme hex fallbacks
to those would pin the colour wrong in dark mode if Material loads but
our overrides don't; and if Material itself fails to load, its own
components break too, so the consumer's fallback doesn't rescue a
working UI — it just paints one layer of a broken system. Cleaner to
accept the failure as a degraded state.

**Fallback values:**

- **Scalar tokens** — the canonical value from `_tokens.scss` in rem
  (e.g. `var(--space-md, 1rem)`, `var(--radius-md, 0.75rem)`,
  `var(--shell-top-bar-height, 3.5rem)`).
- **Colour tokens (`--color-*`)** — always `currentColor`, **never** a
  hex/rgb pin. `currentColor` resolves to the element's `color`
  property, which inherits from its surroundings and reads sensibly in
  either light or dark mode. A hex/rgb fallback pins one theme and
  looks wrong in the other.
- **Typescale shorthands (`--typescale-*`)** — write a complete `font`
  shorthand fallback so the property parses even when the upstream
  token is missing: `var(--typescale-body-small, 400 0.75rem / 1rem
sans-serif)`.

```scss
// ✅ scalar token — concrete rem fallback
padding: var(--space-md, 1rem);

// ✅ colour token — currentColor, theme-neutral
color: var(--color-on-surface, currentColor);

// ✅ typescale — complete font shorthand
font: var(--typescale-body-small, 400 0.75rem / 1rem sans-serif);

// ✅ raw Material token — no fallback by design
background: var(--mat-sys-surface-container);

// ❌ colour with hex fallback — pins light theme
color: var(--color-primary, rgb(159 61 0));

// ❌ no fallback — visible regression if the token file fails to load
gap: var(--space-md);
```

**How to apply:** when adding a new project-owned token to
`_tokens.scss`, sweep every consumer (`grep -r 'var(--name)'`) and add
the canonical value as the fallback. When a token value changes, sweep
again — outdated fallbacks won't break anything at runtime (the fresh
token wins), but the codebase drifts. A future automated check could
diff `_tokens.scss` against the fallbacks the codebase carries; for
now, manual.

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

## CDK virtual-scroll viewports — skip the redundant overrides

When wrapping a `<cdk-virtual-scroll-viewport>` in a flex child, do
**not** add the conventional `min-height: 0` + `display: block` pair on
the viewport host. Both are no-ops because CDK already applies them
via its built-in stylesheet — declaring them again is double-declaration
and the `min-height` comment that calls it "load-bearing" is wrong for
this case.

**Why both are redundant:** the viewport host element carries the
`.cdk-virtual-scrollable` class which sets
`overflow: auto; contain: strict; will-change: scroll-position`, and
the `cdk-virtual-scroll-viewport` selector itself sets `display: block;
position: relative`. `contain: strict` includes **size containment**,
meaning the element's intrinsic size is calculated as if it had no
descendants. So a flex child with the default `min-height: auto`
(= `min-content`) already resolves to 0 here — the tall spacer that
CDK renders inside the viewport (to give the scrollbar the full
virtual-list range) does **not** affect the viewport's reported
`min-content`. An explicit `min-height: 0` adds nothing.

The relevant rule lives in
`node_modules/@angular/cdk/fesm2022/scrolling.mjs` as part of the
`CdkVirtualScrollViewport` component's inline `styles:` array. If
behaviour changes in a future major CDK release, re-evaluate.

**Where the load-bearing constraint actually lives:** one level up,
on the flex _parent_. The parent needs an **explicit height** (not
`max-height`) so the viewport's `flex: 1` has actual excess to consume.
Examples in the codebase:

- `.plan__sidebar` carries `height: calc(100vh - 4rem)` so the inner
  virtual viewport gets a usable height to fill.
- The recipe-picker-sheet `:host` carries `height: 80vh` for the same
  reason.

Drop the explicit height (or substitute `max-height`) and the viewport
renders at zero height — items hydrate but never become visible. _This_
is the rule that warrants a load-bearing comment, not the viewport's
own `min-height`.

**Viewport padding is a trap.** Don't apply horizontal padding to the
viewport host (`padding: 0 1rem` on `.sheet__viewport`,
`.recipes-feed__viewport`, etc.). The CDK content wrapper is
`position: absolute; inset: 0` and ignores the host's padding for item
positioning — visible items align flush with the viewport's outer
edge during scroll, and the padding only clips the static element. Put
horizontal padding on the per-item wrapper instead (`.sheet__item`,
`.plan__sidebar-drag`, the `&__item` slot in `recipes-feed`, etc.).
That gutter scrolls with the content and stays consistent with
spinner / empty-state rows too.

**Bottom line:** for a viewport host in a flex layout, the entire
CSS you need is `flex: 1` (+ `width: 100%` if the parent is a column
flex with sized children). The parent provides the height, CDK
provides everything else.

## General Rules

- Use `@use` and `@forward` — never `@import`
- Use `sass:math`, `sass:map`, `sass:color` modules explicitly
- Avoid nesting deeper than 3 levels
- Avoid `!important` — if needed, leave a comment explaining why
- Use `rem` for spacing/sizing/typography/border-radius; keep `px` only for
  borders, box-shadow, media-query breakpoints, the `9999px` sentinel, and
  the sr-only hairline — see "Units" above
- Pass a fallback to every `var()` for project-owned tokens (scalar tokens
  pin the canonical value from `_tokens.scss`; colour tokens fall back to
  `currentColor`; raw Material `--mat-sys-*` / `--md-sys-color-*` are
  exempt) — see "var() fallbacks on project-owned tokens" above
- Always scope component animations to `@media (prefers-reduced-motion: reduce)`
- Comment any rule that's load-bearing for a behaviour set elsewhere
  — see "Load-bearing rules need a comment" above
- When wrapping `<cdk-virtual-scroll-viewport>` in a flex layout, the
  viewport itself needs only `flex: 1` (+ `width: 100%` if relevant);
  CDK already sets `display: block` + `contain: strict` on the host,
  so the conventional `min-height: 0` + `display: block` overrides are
  no-ops. The load-bearing constraint lives on the flex parent (explicit
  `height`, not `max-height`) — see "CDK virtual-scroll viewports —
  skip the redundant overrides" above
