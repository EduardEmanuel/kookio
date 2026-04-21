import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import type { User } from 'firebase/auth';

import { AuthStore } from '@kookio/feature-auth';
import { BreakpointService } from '@kookio/feature-shell';
import { TrpcHeaders } from '../trpc-client';
import { AppComponent } from './app.component';

const mockBreakpointService = {
  isMobile: signal(false),
  isDesktop: signal(true),
};

const makeAuthStore = () => {
  const currentUser = signal<Partial<User> | null>(null);
  const idToken = signal<string | null>(null);
  return {
    currentUser,
    idToken,
    refreshToken: vi.fn(),
    fetchSession: vi.fn(),
    session: signal(null),
    loading: signal(false),
    isAuthenticated: signal(false),
  };
};

describe('AppComponent effects', () => {
  let store: ReturnType<typeof makeAuthStore>;
  let setHeadersSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    store = makeAuthStore();
    setHeadersSpy = vi.spyOn(TrpcHeaders, 'set');

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: AuthStore, useValue: store },
        { provide: BreakpointService, useValue: mockBreakpointService },
      ],
    }).compileComponents();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  // ─── currentUser effect ──────────────────────────────────────────────────

  it('calls refreshToken when currentUser becomes non-null', () => {
    TestBed.createComponent(AppComponent);

    store.currentUser.set({ uid: 'abc', email: 'u@test.com' });
    TestBed.flushEffects();

    expect(store.refreshToken).toHaveBeenCalledOnce();
  });

  it('clears tRPC headers when currentUser becomes null (logout)', () => {
    TestBed.createComponent(AppComponent);

    // Start logged-in, then log out
    store.currentUser.set({ uid: 'abc' });
    TestBed.flushEffects();
    setHeadersSpy.mockClear();

    store.currentUser.set(null);
    TestBed.flushEffects();

    expect(setHeadersSpy).toHaveBeenCalledWith({});
  });

  it('does not call refreshToken when currentUser is null on init', () => {
    TestBed.createComponent(AppComponent);
    TestBed.flushEffects();

    expect(store.refreshToken).not.toHaveBeenCalled();
  });

  // ─── idToken effect ───────────────────────────────────────────────────────

  it('sets Bearer Authorization header when idToken becomes available', () => {
    TestBed.createComponent(AppComponent);

    store.idToken.set('my-token-123');
    TestBed.flushEffects();

    expect(setHeadersSpy).toHaveBeenCalledWith({
      Authorization: 'Bearer my-token-123',
    });
  });

  it('calls fetchSession when idToken becomes available', () => {
    TestBed.createComponent(AppComponent);

    store.idToken.set('my-token-123');
    TestBed.flushEffects();

    expect(store.fetchSession).toHaveBeenCalledOnce();
  });

  it('does not set headers or fetch session when idToken is null on init', () => {
    TestBed.createComponent(AppComponent);
    TestBed.flushEffects();

    expect(setHeadersSpy).not.toHaveBeenCalledWith(
      expect.objectContaining({ Authorization: expect.any(String) }),
    );
    expect(store.fetchSession).not.toHaveBeenCalled();
  });

  it('updates Authorization header when idToken changes', () => {
    TestBed.createComponent(AppComponent);

    store.idToken.set('token-v1');
    TestBed.flushEffects();
    store.idToken.set('token-v2');
    TestBed.flushEffects();

    expect(setHeadersSpy).toHaveBeenLastCalledWith({
      Authorization: 'Bearer token-v2',
    });
  });
});
