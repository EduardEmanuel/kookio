import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';
import { RECIPES_TRPC } from '@kookio/feature-recipes';
import { buildRecipesTrpcMock } from '@kookio/feature-recipes/testing';

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
      {
        provide: RECIPES_TRPC,
        useValue: buildRecipesTrpcMock({
          feed: { items: [], nextCursor: null },
        }),
      },
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

  it('shows the recipes feed for anonymous visitors', async () => {
    const { el } = await setup('anonymous');

    expect(el.querySelector('kookio-recipes-feed')).toBeTruthy();
    expect(el.querySelector('.recipes-empty')).toBeNull();
  });

  it('shows the onboarding CTA for authenticated users without profile signals', async () => {
    const { el } = await setup('auth-no-signals');

    expect(el.querySelector('.recipes-empty')).toBeTruthy();
    expect(el.querySelector('kookio-recipes-feed')).toBeNull();

    const cta = el.querySelector('a.recipes-empty__cta') as HTMLAnchorElement;
    expect(cta).toBeTruthy();
    expect(cta.getAttribute('href')).toBe('/onboarding');
    expect(cta.textContent).toContain('Start onboarding');
  });

  it('shows the recipes feed once the user has any profile signals', async () => {
    const { el } = await setup('auth-with-signals');

    expect(el.querySelector('kookio-recipes-feed')).toBeTruthy();
    expect(el.querySelector('.recipes-empty')).toBeNull();
  });
});
