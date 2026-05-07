# Tailwind CSS v4 Guidelines

> **Status: Active** — Tailwind v4 is loaded via `@import 'tailwindcss'` in `apps/web/src/styles.css` and used inside page templates. Material theming is kept separate per the responsibility split.

## Version & Setup

- Tailwind CSS v4 via `@tailwindcss/vite` plugin
- Tailwind is the primary styling approach — SCSS for complex cases only
- Angular Material theming is managed separately in SCSS (`_theme.scss`)
- No overlap between Tailwind utilities and Material component styles

## Tailwind v4 vs v3 — Key Differences

- Configuration is now CSS-first — no `tailwind.config.js` by default
- Theme is defined directly in CSS via `@theme`:

```css
@import 'tailwindcss';

@theme {
  --color-primary: #6200ee;
  --font-sans: 'Inter', sans-serif;
  --spacing-unit: 4px;
}
```

- `@apply` still works but is discouraged — prefer utility classes in templates
- Content detection is automatic via Vite plugin — no `content` array needed
- Arbitrary values still supported: `w-[42px]`, `bg-[#1a1a1a]`

## Responsibility Split

### Tailwind handles:

- Layout: `flex`, `grid`, `gap-*`, `col-span-*`, `place-items-*`
- Spacing: `p-*`, `m-*`, `space-*`
- Typography: `text-*`, `font-*`, `leading-*`, `tracking-*`
- Sizing: `w-*`, `h-*`, `min-*`, `max-*`
- Colors on non-Material elements: `bg-*`, `text-*`, `border-*`
- Responsive variants: `sm:`, `md:`, `lg:`, `xl:`
- State variants: `hover:`, `focus:`, `disabled:`, `dark:`
- Simple animations: `transition-*`, `duration-*`, `ease-*`

### SCSS handles:

- Angular Material theme definition (`_theme.scss`)
- Complex animations and keyframes
- SCSS mixins and functions (`_mixins.scss`, `_functions.scss`)
- Utility class generation via loops (`_utilities.scss`)
- Component-specific structural styles not expressible with utilities

### Never mix:

- Do NOT use Tailwind color utilities on Angular Material components —
  use Material theme tokens instead
- Do NOT use `@apply` inside Angular component SCSS files —
  write utilities directly in the template
- Do NOT redefine spacing/sizing in SCSS when a Tailwind utility exists

## Theme Configuration

### Design Tokens in CSS

- Define all design tokens in `@theme` inside `styles.scss`:

```css
@import 'tailwindcss';

@theme {
  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'Fira Code', monospace;

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  /* Breakpoints */
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
}
```

- Keep `@theme` tokens in sync with SCSS variables in `_variables.scss`
  to ensure consistency across Tailwind and SCSS usage
- Do NOT define colors that duplicate Angular Material theme colors —
  reference Material tokens for UI component colors

## Angular Material Integration

### Separation of Concerns

- Material component colors, typography, and density: managed in `_theme.scss` via SCSS
- Layout, spacing, and structural styles around Material components: Tailwind utilities

```html
<!-- ✅ correct: Tailwind for layout, Material handles its own colors -->
<div class="flex gap-4 p-6">
  <mat-card class="flex-1">...</mat-card>
  <mat-card class="flex-1">...</mat-card>
</div>

<!-- ❌ avoid: Tailwind color on Material component -->
<mat-button class="bg-purple-600">Save</mat-button>
```

- Use `class` bindings for conditional Tailwind utilities:

```html
<div [class.hidden]="!isVisible()" class="flex flex-col gap-2"></div>
```

### Preflight `border: 0 solid` collides with Material MDC components

Tailwind v4's preflight applies a global reset that promotes the
default `border-style` from `none` (CSS spec default) to `solid` on
every element:

```css
/* Tailwind v4 preflight — applied site-wide */
*,
::after,
::before,
::backdrop,
::file-selector-button {
  border: 0 solid;
}
```

The `0 solid` shorthand sets `border-width: 0; border-style: solid;`.
Width is 0 so nothing renders **unless** a later rule sets a width on
one of the four sides. That is the trap: Material's MDC-derived
components routinely set `border-width: 1px` as a four-sided shorthand,
then rely on the CSS default `border-style: none` to keep the unwanted
sides invisible. With Tailwind's preflight active, that fallback is
gone and 1px-wide opaque borders render where Material assumed there
would be none.

Concrete instance: outlined `mat-form-field`. Material's
`.mat-mdc-notch-piece` has:

```css
.mat-mdc-notch-piece {
  border-top: 1px solid;
  border-bottom: 1px solid;
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mat-mdc-notch-piece {
  border-color: var(--mat-sys-outline);
  border-width: var(--mat-form-field-outlined-outline-width, 1px);
}
```

The second rule's `border-width: 1px` shorthand expands to all four
sides. The LTR notch override only resets `border-left` (to a
transparent 1px placeholder) — it relies on the implicit
`border-right-style: none` to keep the right side invisible. Tailwind
flips that to `solid`, and the form-field renders a visible vertical
divider running down the middle of the outline.

**How to apply:**

- The fix lives in `apps/web/src/styles/kookio-material.css` as an
  explicit `border-right-style: none` on the LTR notch (and a
  symmetric `border-left-style: none` for RTL). Same selector
  specificity Material itself uses (the doubled-class
  `.mat-mdc-form-field.mat-mdc-form-field`).
- When you encounter a similar "phantom border" on any other Material
  MDC component (likely candidates: `mat-divider`, the table cell
  borders, chip outlines), the diagnostic is the same: inspect the
  computed `border-*-style`. If the offending side is `solid` because
  of the Tailwind preflight cascade, add a one-line
  `border-*-style: none` reset alongside the existing notch rule, with
  a comment pointing back here.
- **Do not** disable the Tailwind preflight globally — Tailwind's
  `box-sizing: border-box` and margin/padding resets are load-bearing
  for the rest of the project. The fix is targeted resets on the
  affected Material slots, not a wholesale opt-out.

## Usage in Angular Templates

### Prefer Static Classes

- Define utility classes statically where possible — easier to read and scan:

```html
<!-- ✅ preferred -->
<section class="flex flex-col gap-6 p-8 max-w-4xl mx-auto">
  <!-- ✅ acceptable for conditional classes -->
  <div [class]="isActive() ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'"></div>
</section>
```

- Use `class` binding for conditional single classes — not `ngClass`:

```html
<!-- ✅ correct -->
<button [class.opacity-50]="isDisabled()" [class.cursor-not-allowed]="isDisabled()">
  <!-- ❌ avoid -->
  <button [ngClass]="{ 'opacity-50': isDisabled() }"></button>
</button>
```

### Responsive Design

- Use Tailwind responsive prefixes — do NOT write media queries in SCSS for layout:

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
```

- Mobile-first: base classes target mobile, prefixed classes override for larger screens

### Dark Mode

- Use `dark:` variant for dark mode support:

```html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"></div>
```

- Coordinate dark mode colors with Angular Material dark theme defined in `_theme.scss`

## When to Use SCSS Instead

Use SCSS component styles (not Tailwind) when:

- Styling requires complex selectors (`:host`, `::ng-deep` for Material overrides)
- Animation requires `@keyframes`
- Logic requires SCSS mixins or functions (e.g. responsive breakpoint mixin)
- More than 6-8 utility classes are needed on a single element — extract to a SCSS class

```scss
// Extract to SCSS when utilities become unwieldy
.page-hero {
  @include respond-to('md') {
    grid-template-columns: 1fr 1fr;
  }
}
```

## General Rules

- Tailwind utilities go in HTML templates — not in SCSS files via `@apply`
- Never use inline `style` attributes — use Tailwind utilities or `style` bindings
- Keep template utility class lists readable — break long lists across multiple lines
  in the source (Prettier handles this automatically)
- Do not install Tailwind plugins that duplicate Angular Material functionality
- Purging is automatic via Vite plugin — do not use `safelist` unless absolutely necessary,
  and document why if used
