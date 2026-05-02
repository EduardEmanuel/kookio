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

  pantryCount?: number;
  utensilCount?: number;
  dietaryCount?: number;
  preferredCategoryCount?: number;
  preferredAreaCount?: number;
  hasProfileSignals?: boolean;
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

  pantryCount: WritableSignal<number>;
  utensilCount: WritableSignal<number>;
  dietaryCount: WritableSignal<number>;
  preferredCategoryCount: WritableSignal<number>;
  preferredAreaCount: WritableSignal<number>;
  hasProfileSignals: WritableSignal<boolean>;

  ready$: ReturnType<typeof vi.fn>;
  fetchSession: ReturnType<typeof vi.fn>;
  loadCounts: ReturnType<typeof vi.fn>;
  markOnboardingDone: ReturnType<typeof vi.fn>;
  markOnboardingReset: ReturnType<typeof vi.fn>;
  resetCounts: ReturnType<typeof vi.fn>;
  provisionUser: ReturnType<typeof vi.fn>;
  login: ReturnType<typeof vi.fn>;
  register: ReturnType<typeof vi.fn>;
  logout: ReturnType<typeof vi.fn>;
  refreshToken: ReturnType<typeof vi.fn>;
}

export const createMockAuthStore = (
  opts: MockAuthStoreOptions = {},
): MockAuthStore => {
  const pantryCount = signal(opts.pantryCount ?? 0);
  const utensilCount = signal(opts.utensilCount ?? 0);
  const dietaryCount = signal(opts.dietaryCount ?? 0);
  const preferredCategoryCount = signal(opts.preferredCategoryCount ?? 0);
  const preferredAreaCount = signal(opts.preferredAreaCount ?? 0);

  const derivedHasSignals =
    pantryCount() > 0 ||
    utensilCount() > 0 ||
    dietaryCount() > 0 ||
    preferredCategoryCount() > 0 ||
    preferredAreaCount() > 0;

  return {
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

    pantryCount,
    utensilCount,
    dietaryCount,
    preferredCategoryCount,
    preferredAreaCount,
    hasProfileSignals: signal(opts.hasProfileSignals ?? derivedHasSignals),

    ready$: vi.fn(() => of(undefined)),
    fetchSession: vi.fn(),
    loadCounts: vi.fn(),
    markOnboardingDone: vi.fn(),
    markOnboardingReset: vi.fn(),
    resetCounts: vi.fn(),
    provisionUser: vi.fn(),
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    refreshToken: vi.fn(),
  };
};
