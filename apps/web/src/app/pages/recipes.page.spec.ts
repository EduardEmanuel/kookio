import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';

import RecipesPage from './recipes.page';

type Stage = 'anonymous' | 'auth-no-signals' | 'auth-with-signals';

const setup = async (stage: Stage) => {
  const authStore = createMockAuthStore({
    authReady: true,
    isAuthenticated: stage !== 'anonymous',
    pantryCount: stage === 'auth-with-signals' ? 3 : 0,
    hasProfileSignals: stage === 'auth-with-signals',
  });

  await TestBed.configureTestingModule({
    imports: [RecipesPage],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([]),
      { provide: AuthStore, useValue: authStore },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(RecipesPage);
  fixture.detectChanges();
  await fixture.whenStable();

  return { fixture, el: fixture.nativeElement as HTMLElement };
};

describe('RecipesPage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  it('shows the catalog stub for anonymous visitors', async () => {
    const { el } = await setup('anonymous');

    expect(el.querySelector('kookio-page-stub')).toBeTruthy();
    expect(el.querySelector('.recipes-empty')).toBeNull();
  });

  it('shows the onboarding CTA for authenticated users without profile signals', async () => {
    const { el } = await setup('auth-no-signals');

    expect(el.querySelector('.recipes-empty')).toBeTruthy();
    expect(el.querySelector('kookio-page-stub')).toBeNull();

    const cta = el.querySelector('a.recipes-empty__cta') as HTMLAnchorElement;
    expect(cta).toBeTruthy();
    expect(cta.getAttribute('href')).toBe('/onboarding');
    expect(cta.textContent).toContain('Start onboarding');
  });

  it('shows the catalog stub once the user has any profile signals', async () => {
    const { el } = await setup('auth-with-signals');

    expect(el.querySelector('kookio-page-stub')).toBeTruthy();
    expect(el.querySelector('.recipes-empty')).toBeNull();
  });
});
