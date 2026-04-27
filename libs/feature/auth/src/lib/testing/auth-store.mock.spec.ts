import { describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID, provideZonelessChangeDetection } from '@angular/core';

import { AUTH_TRPC, AuthStore, FIREBASE_OPTIONS } from '../auth';

import { createMockAuthStore } from './auth-store.mock';

const FRAMEWORK_NOISE = new Set([
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf',
  'ngOnDestroy',
]);

const collectPublicKeys = (obj: object): Set<string> => {
  const keys = new Set<string>();
  let cur: object | null = obj;
  while (cur && cur !== Object.prototype) {
    for (const k of Object.getOwnPropertyNames(cur)) {
      if (k.startsWith('_') || k.startsWith('ɵ') || FRAMEWORK_NOISE.has(k)) {
        continue;
      }
      keys.add(k);
    }
    cur = Object.getPrototypeOf(cur);
  }
  return keys;
};

describe('createMockAuthStore — drift guard', () => {
  it('exposes every public key the real AuthStore exposes', () => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: PLATFORM_ID, useValue: 'server' },
        { provide: FIREBASE_OPTIONS, useValue: {} },
        { provide: AUTH_TRPC, useValue: null },
      ],
    });

    const real = TestBed.inject(AuthStore);
    const realKeys = collectPublicKeys(real);
    const mockKeys = collectPublicKeys(createMockAuthStore());

    const missing = [...realKeys].filter((k) => !mockKeys.has(k));
    expect(missing).toEqual([]);
  });
});
