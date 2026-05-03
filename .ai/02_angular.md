# Angular Guidelines

> **Status: Active** — Signals, OnPush, `inject()`, native control flow, Material/CDK conventions, and the "no explicit `standalone: true`" rule are followed across the codebase. The inline-`template:` carve-out for negligible templates (see "Components" below) matches what `apps/web/src/app/pages/` already does for thin route stubs.

## Version

Angular v20+

## Architecture

- Always use standalone components — do NOT set `standalone: true` (it's the default in v20+)
- Implement lazy loading for all feature routes
- Use `inject()` function instead of constructor injection
- Use `providedIn: 'root'` for singleton services
- Design services around a single responsibility
- Put host bindings inside the `host` object of `@Component` / `@Directive` — do NOT use `@HostBinding` / `@HostListener`

## Components

- Set `changeDetection: ChangeDetectionStrategy.OnPush` in every `@Component`
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Keep components small and focused on a single responsibility
- Default to external templates (`templateUrl`) and styles (`styleUrl`). Inline `template:` / `styles:` is reserved for **negligible** cases — a template that boils down to a single child-component invocation with a handful of attribute bindings, or a thin host wrapper of ~10 lines or fewer with no styling concerns of its own. Extract to a sibling `.html` (and `.scss`) file as soon as **any** of these appear:
  - native control flow (`@if`, `@for`, `@switch`)
  - multiple sibling DOM blocks that carry their own classes / styles
  - the template (or styles block) grows past a screenful
  - the same template starts to be edited frequently in isolation from the class

  The route stubs under `apps/web/src/app/pages/` that wrap a single `<kookio-page-stub />` are the canonical negligible case. An actual UI surface — `pantry.page.html`, a feature card, anything with layout of its own — is not. When in doubt, extract: the cost of an extra file is small and the diff for a future template change stays scoped.

- Use `NgOptimizedImage` for all static images (does not work for inline base64)
- Define class members that are pure helpers (formatters, predicates, anything stateless used from the template) as arrow-function fields, not as class methods. ESLint's `prefer-arrow/prefer-arrow-functions` enforces this and `--fix` does not auto-rewrite the form because changing method → field can alter `this` binding semantics. The fix has to be written by hand:

  ```typescript
  // ❌ method syntax — fails the prefer-arrow lint rule
  protected formatUnit(unit: MeasureUnit | null): string {
    return unit ? (LABEL[unit] ?? '') : '';
  }

  // ✅ arrow field — preferred
  protected readonly formatUnit = (unit: MeasureUnit | null): string =>
    unit ? (LABEL[unit] ?? '') : '';
  ```

  Lifecycle hooks (`ngOnInit`, `ngOnDestroy` etc.) and constructors stay as methods — the rule is scoped to plain helpers.

## State Management

- Use Signals for all local component state
- Use NgRx for global/shared application state
- Prefer Signals over RxJS wherever possible — use RxJS only where Angular requires it or for complex async orchestration
- Use `update()` or `set()` on signals — do NOT use `mutate()`
- Keep state transformations pure and predictable

## Templates

- Use native control flow: `@if`, `@for`, `@switch` — do NOT use `*ngIf`, `*ngFor`, `*ngSwitch`
- Use `class` bindings instead of `ngClass`
- Use `style` bindings instead of `ngStyle`
- Keep templates simple — avoid complex logic
- Use the `async` pipe to handle remaining observables
- Import and use built-in pipes explicitly in the component
- Do not write arrow functions in templates
- Do not assume globals like `new Date()` are available in templates

## Forms

- Always use Reactive Forms — do NOT use Template-driven forms

## Angular Material & CDK

- Use Angular Material components as the primary UI library
- Use Angular CDK for behavior primitives (overlays, drag & drop, virtual scroll etc.)
- Always import Material/CDK modules explicitly in the standalone component that uses them
- Use Material theming system for colors and typography — avoid hardcoded values
- Follow Material Design accessibility guidelines alongside WCAG AA

## Icons

- Render icons via `<kookio-icon name="..." />` from `@kookio/shared-ui` — do NOT use `<mat-icon>` directly. The wrapper delegates to `<mat-icon>` internally but constrains the `name` input to `MaterialSymbolName` (a union derived from the auto-generated manifest), so unknown ligatures fail at compile time instead of rendering as literal text in a subsetted font that does not contain them. ESLint enforces this by banning `MatIconModule` and `MatIcon` imports anywhere except the wrapper component itself; `MatIconRegistry` remains available for global font-set configuration.
- Use the `[filled]` input to flip the FILL axis on the variable font for state changes (e.g. active route in nav). Do not toggle `mat-icon--filled` manually.
- Material's content-projection markers — `matChipAvatar`, `matListItemIcon`, `mat-card-avatar`, `iconPositionEnd` — are attribute selectors and apply directly to `<kookio-icon>` host. Do not duplicate them on the inner `<mat-icon>`.
- Icon names live as data on typed fields (`icon: MaterialSymbolName` on `TabItem`, `NavItem`, etc.) so the constraint propagates from config arrays through to the template.
- After adding or removing an icon usage anywhere in the codebase, run `npm run build:icons` to regenerate `libs/shared/utility/src/lib/material-symbols-icons.ts` and the subsetted woff2 at `apps/web/public/fonts/material-symbols/`. Commit both. CI runs `npm run build:icons:check` and fails the PR on drift.
- Browse available ligatures at [fonts.google.com/icons](https://fonts.google.com/icons) (Style: Outlined). The variable axes available are `FILL`, `wght`, `GRAD`, `opsz`.
- Angular Material renders `<mat-icon>` from its own templates inside `node_modules` (stepper state indicators, datepicker chevrons, snackbar/dialog close, expansion toggles, sort arrows, form-field clear, etc.). Those usages bypass the codebase scanner. The build script keeps a hardcoded `MATERIAL_INTERNAL_ICONS` list (in `scripts/build-material-symbols-icons.ts`) that is unioned with the auto-scanned set before subsetting. Re-evaluate this list when Angular Material is upgraded to a major version — remove names no longer rendered, add any new ones.
- **When modifying `KookioIconComponent` (or adding similar wrappers around Material primitives)**: the wrapper's `:host` must replicate the wrapped element's box model exactly — same `display`, explicit dimensions, `line-height`, `vertical-align`, and `font-size`. `display: contents` looks elegant but breaks every CSS rule that needs the wrapper to participate in the box tree (`z-index`, `position`, slot-dimension constraints, margins set by Material on the slot class). Plain `inline-block` without explicit dimensions also breaks layout because of inline-leading drift inside flex containers. The wrapper has to be a drop-in substitute, byte-for-byte at the box level, because Material assumes the original element's metrics in dozens of slots (icon-button, FAB, list-item, chip avatar, card avatar, stepper, etc.).

## Accessibility

- All components MUST pass AXE checks
- Follow WCAG AA minimums: focus management, color contrast, ARIA attributes

## Testing

- Use Vitest as the testing framework
- Write unit tests for services and pure logic
- Write component tests for non-trivial UI interactions
- Do not test implementation details — test behavior

## TypeScript

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid `any` — use `unknown` when the type is uncertain
