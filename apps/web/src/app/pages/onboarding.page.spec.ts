import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';
import { ONBOARDING_TRPC } from '@kookio/feature-onboarding';
import { buildTrpcMock } from '@kookio/feature-onboarding/testing';
import { PANTRY_TRPC } from '@kookio/feature-pantry/trpc';

import OnboardingPage from './onboarding.page';

const setup = async ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const trpc = buildTrpcMock();
  // The page only cares about `onboarding.current.query`; we hold a typed
  // alias to it so assertions read cleanly.
  const current = trpc.onboarding.current.query as ReturnType<typeof vi.fn>;
  // The fridge step's embedded PantryFormComponent injects PANTRY_TRPC
  // for its ingredient-search autocomplete. Provide a no-op stub so the
  // stepper can mount during the spec.
  const pantryTrpc = {
    pantry: {
      list: { query: vi.fn() },
      add: { mutate: vi.fn() },
      update: { mutate: vi.fn() },
      remove: { mutate: vi.fn() },
      searchIngredients: { query: vi.fn().mockResolvedValue([]) },
    },
  };
  const authStore = createMockAuthStore({
    isAuthenticated,
    authReady: true,
  });

  await TestBed.configureTestingModule({
    imports: [OnboardingPage],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([]),
      { provide: PLATFORM_ID, useValue: 'server' },
      { provide: AuthStore, useValue: authStore },
      { provide: ONBOARDING_TRPC, useValue: trpc },
      { provide: PANTRY_TRPC, useValue: pantryTrpc },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(OnboardingPage);
  fixture.detectChanges();
  await fixture.whenStable();

  return {
    fixture,
    el: fixture.nativeElement as HTMLElement,
    current,
  };
};

describe('OnboardingPage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  it('renders the stepper component', async () => {
    const { el } = await setup({ isAuthenticated: false });
    expect(el.querySelector('kookio-onboarding-stepper')).toBeTruthy();
  });

  it('does not pre-populate when the user is not authenticated', async () => {
    const { current } = await setup({ isAuthenticated: false });
    expect(current).not.toHaveBeenCalled();
  });

  it('pre-populates from the server when the user is authenticated', async () => {
    const { current } = await setup({ isAuthenticated: true });
    expect(current).toHaveBeenCalledOnce();
  });
});
