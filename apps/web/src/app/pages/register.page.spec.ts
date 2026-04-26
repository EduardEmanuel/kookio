import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { DeferBlockBehavior } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNgxSkeletonLoader } from 'ngx-skeleton-loader';
import type { AuthSession } from '@kookio/prisma-client';

import { AuthStore } from '@kookio/feature-auth';
import RegisterPage from './register.page';

const makeAuthStore = (
  opts: {
    authReady?: boolean;
    loading?: boolean;
    registerError?: string | null;
    session?: AuthSession | null;
  } = {},
) => ({
  authReady: signal(opts.authReady ?? true),
  loading: signal(opts.loading ?? false),
  registerError: signal(opts.registerError ?? null),
  session: signal(opts.session ?? null),
  currentUser: signal(null),
  isAuthenticated: signal(false),
  register: vi.fn(),
  provisionUser: vi.fn(),
  fetchSession: vi.fn(),
});

describe('RegisterPage', () => {
  let fixture: ComponentFixture<RegisterPage>;
  let el: HTMLElement;
  let store: ReturnType<typeof makeAuthStore>;

  const setup = async (storeOpts: Parameters<typeof makeAuthStore>[0] = {}) => {
    store = makeAuthStore(storeOpts);
    await TestBed.configureTestingModule({
      imports: [RegisterPage],
      deferBlockBehavior: DeferBlockBehavior.Playthrough,
      providers: [
        provideRouter([]),
        provideNgxSkeletonLoader(),
        { provide: AuthStore, useValue: store },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
  };

  afterEach(() => TestBed.resetTestingModule());

  it('creates the component', async () => {
    await setup();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the Create account heading when authReady is true', async () => {
    await setup({ authReady: true });
    expect(el.querySelector('h1')?.textContent).toContain('Create account');
  });

  it('renders email, password and confirm inputs', async () => {
    await setup({ authReady: true });
    expect(el.querySelector('input[name="email"]')).not.toBeNull();
    expect(el.querySelector('input[name="password"]')).not.toBeNull();
    expect(el.querySelector('input[name="confirm"]')).not.toBeNull();
  });

  it('renders a link back to the login page', async () => {
    await setup({ authReady: true });
    expect(el.querySelector('a[href="/login"]')).not.toBeNull();
  });

  it('disables the submit button while loading', async () => {
    await setup({ authReady: true, loading: true });
    const button = el.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;
    expect(button?.disabled).toBe(true);
  });

  it('shows the register error message when present', async () => {
    await setup({ authReady: true, registerError: 'Email already in use' });
    expect(el.textContent).toContain('Email already in use');
  });

  it('calls authStore.register when passwords match', async () => {
    await setup({ authReady: true });
    const instance = fixture.componentInstance as unknown as {
      email: string;
      password: string;
      confirm: string;
      onSubmit: () => void;
    };
    instance.email = 'new@example.com';
    instance.password = 'pass1234';
    instance.confirm = 'pass1234';
    instance.onSubmit();
    expect(store.register).toHaveBeenCalledWith({
      email: 'new@example.com',
      password: 'pass1234',
    });
  });

  it('does not call register and shows mismatch error when passwords differ', async () => {
    await setup({ authReady: true });
    const instance = fixture.componentInstance as unknown as {
      email: string;
      password: string;
      confirm: string;
      passwordMismatch: boolean;
      onSubmit: () => void;
    };
    instance.email = 'new@example.com';
    instance.password = 'pass1234';
    instance.confirm = 'different';
    instance.onSubmit();
    expect(store.register).not.toHaveBeenCalled();
    expect(instance.passwordMismatch).toBe(true);
  });

  it('does not call register when email is empty', async () => {
    await setup({ authReady: true });
    const instance = fixture.componentInstance as unknown as {
      email: string;
      password: string;
      confirm: string;
      onSubmit: () => void;
    };
    instance.email = '';
    instance.password = 'pass1234';
    instance.confirm = 'pass1234';
    instance.onSubmit();
    expect(store.register).not.toHaveBeenCalled();
  });
});
