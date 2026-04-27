import { type WritableSignal, signal } from '@angular/core';
import { vi } from 'vitest';
import { of } from 'rxjs';
import type { User } from 'firebase/auth';

import type { AuthSession } from '@kookio/prisma-client';

export interface MockAuthStoreOptions {
  currentUser?: Partial<User> | null;
  session?: AuthSession | null;
  idToken?: string | null;
  loading?: boolean;
  authReady?: boolean;
  loginError?: string | null;
  registerError?: string | null;
  logoutError?: string | null;
  isAuthenticated?: boolean;
  onboardingDone?: boolean;
}

export interface MockAuthStore {
  currentUser: WritableSignal<Partial<User> | null>;
  session: WritableSignal<AuthSession | null>;
  idToken: WritableSignal<string | null>;
  loading: WritableSignal<boolean>;
  authReady: WritableSignal<boolean>;
  loginError: WritableSignal<string | null>;
  registerError: WritableSignal<string | null>;
  logoutError: WritableSignal<string | null>;
  isAuthenticated: WritableSignal<boolean>;
  onboardingDone: WritableSignal<boolean>;
  ready$: ReturnType<typeof vi.fn>;
  fetchSession: ReturnType<typeof vi.fn>;
  provisionUser: ReturnType<typeof vi.fn>;
  login: ReturnType<typeof vi.fn>;
  register: ReturnType<typeof vi.fn>;
  logout: ReturnType<typeof vi.fn>;
  refreshToken: ReturnType<typeof vi.fn>;
}

export const createMockAuthStore = (
  opts: MockAuthStoreOptions = {},
): MockAuthStore => ({
  currentUser: signal<Partial<User> | null>(opts.currentUser ?? null),
  session: signal<AuthSession | null>(opts.session ?? null),
  idToken: signal<string | null>(opts.idToken ?? null),
  loading: signal(opts.loading ?? false),
  authReady: signal(opts.authReady ?? true),
  loginError: signal<string | null>(opts.loginError ?? null),
  registerError: signal<string | null>(opts.registerError ?? null),
  logoutError: signal<string | null>(opts.logoutError ?? null),
  isAuthenticated: signal(opts.isAuthenticated ?? !!opts.currentUser),
  onboardingDone: signal(
    opts.onboardingDone ?? opts.session?.onboardingDone ?? false,
  ),
  ready$: vi.fn(() => of(undefined)),
  fetchSession: vi.fn(),
  provisionUser: vi.fn(),
  login: vi.fn(),
  register: vi.fn(),
  logout: vi.fn(),
  refreshToken: vi.fn(),
});
