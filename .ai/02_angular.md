# Angular Guidelines

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
- Prefer inline templates for small components
- When using external templates/styles, use paths relative to the component TS file
- Use `NgOptimizedImage` for all static images (does not work for inline base64)

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
