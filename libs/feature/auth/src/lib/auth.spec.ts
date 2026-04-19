import { describe, expect, it, vi } from 'vitest';

vi.mock('firebase/app', () => ({
  getApps: vi.fn(() => []),
  getApp: vi.fn(),
  initializeApp: vi.fn(() => ({ name: '[DEFAULT]' })),
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({ currentUser: null })),
  browserLocalPersistence: 'local',
  createUserWithEmailAndPassword: vi.fn(),
  onAuthStateChanged: vi.fn((_auth: unknown, cb: (u: null) => void) => {
    cb(null);
    return vi.fn();
  }),
  setPersistence: vi.fn(() => Promise.resolve()),
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
}));

import { getResolvedAuth } from './auth';

describe('getResolvedAuth', () => {
  it('returns null before Firebase is initialized via DI', () => {
    // _resolvedAuth is set only when resolveAuth() runs inside the Angular DI
    // context (AuthStore withMethods). Without TestBed it stays null.
    expect(getResolvedAuth()).toBeNull();
  });
});
