import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { DeferBlockBehavior } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { provideNgxSkeletonLoader } from 'ngx-skeleton-loader';
import type { AuthSession } from '@kookio/prisma-client/dtos';

import { AuthStore } from '@kookio/feature-auth';
import LoginPage from './login.page';

const makeAuthStore = (
  opts: {
    authReady?: boolean;
    loading?: boolean;
    loginError?: string | null;
    session?: AuthSession | null;
  } = {},
) => ({
  authReady: signal(opts.authReady ?? true),
  loading: signal(opts.loading ?? false),
  loginError: signal(opts.loginError ?? null),
  session: signal(opts.session ?? null),
  currentUser: signal(null),
  isAuthenticated: signal(false),
  login: vi.fn(),
  fetchSession: vi.fn(),
});

const fakeActivatedRoute = {
  snapshot: { queryParamMap: { get: () => null } },
};

describe('LoginPage', () => {
  let fixture: ComponentFixture<LoginPage>;
  let el: HTMLElement;
  let store: ReturnType<typeof makeAuthStore>;

  const setup = async (storeOpts: Parameters<typeof makeAuthStore>[0] = {}) => {
    store = makeAuthStore(storeOpts);
    await TestBed.configureTestingModule({
      imports: [LoginPage],
      deferBlockBehavior: DeferBlockBehavior.Playthrough,
      providers: [
        provideRouter([]),
        provideNgxSkeletonLoader(),
        { provide: AuthStore, useValue: store },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
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

  it('renders the Sign in heading when authReady is true', async () => {
    await setup({ authReady: true });
    expect(el.querySelector('h1')?.textContent).toContain('Sign in');
  });

  it('renders a link to the register page', async () => {
    await setup({ authReady: true });
    const link = el.querySelector('a[href="/register"]');
    expect(link).not.toBeNull();
  });

  it('renders email and password inputs', async () => {
    await setup({ authReady: true });
    expect(el.querySelector('input[name="email"]')).not.toBeNull();
    expect(el.querySelector('input[name="password"]')).not.toBeNull();
  });

  it('disables the submit button while loading', async () => {
    await setup({ authReady: true, loading: true });
    const button = el.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;
    expect(button?.disabled).toBe(true);
  });

  it('shows the login error message when present', async () => {
    await setup({ authReady: true, loginError: 'Invalid credentials' });
    expect(el.textContent).toContain('Invalid credentials');
  });

  it('calls authStore.login with email and password on submit', async () => {
    await setup({ authReady: true });
    const instance = fixture.componentInstance as unknown as {
      email: string;
      password: string;
      onSubmit: () => void;
    };
    instance.email = 'user@example.com';
    instance.password = 'secret123';
    instance.onSubmit();
    expect(store.login).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'secret123',
    });
  });

  it('does not call login when email is empty', async () => {
    await setup({ authReady: true });
    const instance = fixture.componentInstance as unknown as {
      email: string;
      password: string;
      onSubmit: () => void;
    };
    instance.email = '';
    instance.password = 'secret123';
    instance.onSubmit();
    expect(store.login).not.toHaveBeenCalled();
  });
});
