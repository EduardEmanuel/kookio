# Form Guidelines

## Strategy: Mixed Approach

- **Form Actions** — public forms that don't require authentication
  (newsletter, contact, search, feedback)
- **tRPC mutations** — authenticated forms with user context
  (profile, settings, dashboard CRUD operations)
- Decision rule: if the form requires `ctx.firebaseUser` → tRPC;
  if the form is accessible without login → Form Actions

## Form Actions (Public Forms)

### When to Use

| Use Form Actions           | Use tRPC Mutations          |
| -------------------------- | --------------------------- |
| Newsletter signup          | Profile update              |
| Contact form               | Settings change             |
| Search (GET)               | Create/edit/delete content  |
| Feedback form              | Any authenticated operation |
| Public registration step 1 | Dashboard forms             |

### File Structure

- Colocate `.server.ts` alongside `.page.ts`:

src/app/pages/
├── newsletter.page.ts
├── newsletter.server.ts ← action() handler
├── contact.page.ts
├── contact.server.ts
└── (auth)/
├── login.page.ts
└── login.server.ts

### Server Action Handler

```typescript
// src/app/pages/newsletter.server.ts
import { type PageServerAction, redirect, json, fail } from '@analogjs/router/server/actions';
import { readFormData } from 'h3';
import { z } from 'zod';

const NewsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required').max(100),
});

export async function action({ event }: PageServerAction) {
  const body = await readFormData(event);

  const result = NewsletterSchema.safeParse({
    email: body.get('email'),
    name: body.get('name'),
  });

  if (!result.success) {
    return fail(422, {
      errors: result.error.flatten().fieldErrors,
    });
  }

  try {
    // process form data — call service, send email etc.
    await subscribeToNewsletter(result.data);
    return json({ type: 'success' });
  } catch {
    return fail(500, { errors: { form: ['Something went wrong'] } });
  }
}
```

- Always validate with Zod — never use raw `body.get()` values directly
- Use `fail()` for validation errors — never throw exceptions for user errors
- Use `redirect()` for post-submission navigation
- Use `json()` for AJAX-style responses
- Never access `ctx.firebaseUser` in Form Actions — use tRPC for authenticated operations

### Page Component

```typescript
// src/app/pages/newsletter.page.ts
import { Component, signal } from '@angular/core';
import { FormAction } from '@analogjs/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

type FormErrors =
  | {
      email?: string[];
      name?: string[];
      form?: string[];
    }
  | undefined;

@Component({
  standalone: true,
  imports: [FormAction, ReactiveFormsModule],
  template: `
    <form method="post" (onSuccess)="onSuccess()" (onError)="onError($event)" (onStateChange)="onStateChange($event)" FormAction>
      <mat-form-field>
        <mat-label i18n="@@newsletter.name">Name</mat-label>
        <input matInput type="text" name="name" />
        @if (errors()?.name) {
          <mat-error>{{ errors()!.name![0] }}</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label i18n="@@newsletter.email">Email</mat-label>
        <input matInput type="email" name="email" />
        @if (errors()?.email) {
          <mat-error>{{ errors()!.email![0] }}</mat-error>
        }
      </mat-form-field>

      @if (errors()?.form) {
        <p class="error">{{ errors()!.form![0] }}</p>
      }

      @if (success()) {
        <p i18n="@@newsletter.success">Thank you for subscribing!</p>
      } @else {
        <button mat-raised-button type="submit" [disabled]="loading()">
          <span i18n="@@newsletter.submit">Subscribe</span>
        </button>
      }
    </form>
  `,
})
export default class NewsletterPage {
  readonly errors = signal<FormErrors>(undefined);
  readonly success = signal(false);
  readonly loading = signal(false);

  onSuccess() {
    this.success.set(true);
    this.errors.set(undefined);
  }

  onError(event: { errors: FormErrors }) {
    this.errors.set(event.errors);
  }

  onStateChange(state: { loading: boolean }) {
    this.loading.set(state.loading);
  }
}
```

### Form Action Events

| Event             | When fires        | Use for                        |
| ----------------- | ----------------- | ------------------------------ |
| `(onSuccess)`     | `json()` returned | Show success state, reset form |
| `(onError)`       | `fail()` returned | Show validation errors         |
| `(onStateChange)` | Any state change  | Loading indicator              |

### Multiple Forms on Same Page

- Use hidden `action` input to distinguish forms:

```html
<!-- Form 1 -->
<form method="post" FormAction>
  <input type="hidden" name="action" value="subscribe" />
  ...
</form>

<!-- Form 2 -->
<form method="post" FormAction>
  <input type="hidden" name="action" value="unsubscribe" />
  ...
</form>
```

```typescript
// server handler
export async function action({ event }: PageServerAction) {
  const body = await readFormData(event);
  const actionType = body.get('action');

  if (actionType === 'subscribe') {
    return handleSubscribe(body);
  }
  if (actionType === 'unsubscribe') {
    return handleUnsubscribe(body);
  }

  return fail(400, { errors: { form: ['Invalid action'] } });
}
```

### GET Forms (Search)

- Use `method="get"` for search forms — submits as query parameters:

```typescript
// src/app/pages/search.page.ts
import { Component, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { injectLoad, FormAction } from '@analogjs/router';
import type { load } from './search.server';

@Component({
  standalone: true,
  imports: [FormAction],
  template: `
    <form method="get" FormAction>
      <input type="search" name="q" [value]="searchTerm()" placeholder="Search..." />
      <button type="submit">Search</button>
    </form>

    @if (searchTerm()) {
      <p>Results for: {{ searchTerm() }}</p>
    }
  `,
})
export default class SearchPage {
  readonly loader = toSignal(injectLoad<typeof load>(), { requireSync: true });
  readonly searchTerm = computed(() => this.loader().searchTerm);
}
```

```typescript
// src/app/pages/search.server.ts
import { PageServerLoad } from '@analogjs/router';

export const load = async ({ params }: PageServerLoad) => {
  const searchTerm = (params['q'] as string) ?? '';
  const results = searchTerm ? await searchContent(searchTerm) : [];
  return { searchTerm, results };
};
```

## tRPC Mutations (Authenticated Forms)

### When to Use

- Any form that requires `ctx.firebaseUser`
- CRUD operations on user-owned data
- Settings and profile updates
- Any form where type-safety between client and server is critical

### Pattern

```typescript
// Component
export default class ProfilePage {
  private readonly trpc = injectTrpcClient();
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly form = inject(FormBuilder).group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    bio: ['', Validators.maxLength(500)],
  });

  async onSubmit() {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.error.set(null);

    try {
      await firstValueFrom(this.trpc.users.updateProfile.mutate(this.form.getRawValue()));
    } catch (err) {
      this.error.set('Failed to update profile');
    } finally {
      this.loading.set(false);
    }
  }
}
```

- Use Angular Reactive Forms for validation on tRPC forms —
  `FormBuilder` + `Validators` + Zod schema on the server
- Never use `FormAction` directive with tRPC — they are separate patterns
- Always use `firstValueFrom()` to convert tRPC observable to Promise
  when using async/await in event handlers

## Validation Strategy

### Public Forms (Form Actions)

- Client: Angular `Validators` for immediate UX feedback
- Server: Zod schema in `.server.ts` action — source of truth
- Never trust client validation alone — always re-validate on server

### Authenticated Forms (tRPC)

- Client: Angular `Validators` for immediate UX feedback
- Server: Zod schema in tRPC procedure input — source of truth
- Use `prisma-zod-generator` schemas where applicable

### Error Display Pattern

- Always display field-level errors alongside the field — not just at the top
- Use Angular Material `mat-error` inside `mat-form-field` for consistent styling
- Map server errors to field errors where possible — avoid generic "Something went wrong"
- Translate all error messages via `$localize` — never hardcode user-facing strings

## Accessibility Rules

- Every input must have a visible `<label>` or `aria-label`
- Associate labels explicitly with `for`/`id` or use `mat-label` inside `mat-form-field`
- Mark required fields with `required` attribute — not just asterisk in label
- Announce form errors to screen readers via `aria-live` or Angular Material's built-in support
- Focus the first field with an error after failed submission
- Never disable the submit button as the only form of validation feedback

## General Rules

- Never use `ngModel` — always use Reactive Forms or native form inputs with `FormAction`
- Never submit sensitive data (passwords, tokens) via GET forms — always POST
- Always show a loading state during form submission — never leave the user guessing
- Reset error state on new submission attempt
- For multi-step forms, store intermediate state in a Signal Store — not in URL params
- Always handle the network error case — not just validation errors
