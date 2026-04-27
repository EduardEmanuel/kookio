# SCSS Guidelines

> **Status: Active (partial)** — partials, BEM, Material theming, and the utility-first methodology are in use under `apps/web/src/styles/` and `libs/shared/ui/src/styles/`. Deviation: the global entry is `apps/web/src/styles.css` (CSS, not SCSS) due to a known NX + sass-embedded + Vite `?direct` bug — see `feedback_scss-global-styles.md` in memory. Do not migrate the entry to `.scss`.

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

## General Rules

- Use `@use` and `@forward` — never `@import`
- Use `sass:math`, `sass:map`, `sass:color` modules explicitly
- Avoid nesting deeper than 3 levels
- Avoid `!important` — if needed, leave a comment explaining why
- Use `rem` for typography and spacing, `px` only for borders and shadows
- Always scope component animations to `@media (prefers-reduced-motion: reduce)`
