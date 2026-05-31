import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { RECIPES_TRPC } from '@kookio/feature-recipes';
import { buildRecipesTrpcMock } from '@kookio/feature-recipes/testing';

import RecipesMatchPage from './recipes.match.page';

const setup = async () => {
  await TestBed.configureTestingModule({
    imports: [RecipesMatchPage],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([]),
      {
        provide: RECIPES_TRPC,
        useValue: buildRecipesTrpcMock({
          match: { items: [], nextCursor: null, partialScan: false },
        }),
      },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(RecipesMatchPage);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();

  return {
    fixture,
    el: fixture.nativeElement as HTMLElement,
    component: fixture.componentInstance,
  };
};

describe('RecipesMatchPage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  it('renders the three-level button toggle group', async () => {
    const { el } = await setup();

    const group = el.querySelector('.page__levels');
    expect(group).toBeTruthy();
    const toggles = el.querySelectorAll('mat-button-toggle');
    expect(toggles.length).toBe(3);
  });

  it('mounts the recipes feed component', async () => {
    const { el } = await setup();
    expect(el.querySelector('kookio-recipes-feed')).toBeTruthy();
  });

  it('shows the hint copy for the default level Alright', async () => {
    const { el } = await setup();
    const hint = el.querySelector('.page__hint');
    expect(hint?.textContent).toContain('cook right now');
  });

  it('updates the hint copy when the level changes', async () => {
    const { fixture, el, component } = await setup();
    const c = component as unknown as {
      onLevelChange: (n: 'Alright' | 'Almost' | 'All') => void;
    };

    c.onLevelChange('Almost');
    fixture.detectChanges();
    expect(el.querySelector('.page__hint')?.textContent).toContain(
      'missing 1–3',
    );

    c.onLevelChange('All');
    fixture.detectChanges();
    expect(el.querySelector('.page__hint')?.textContent).toContain(
      'All available recipes',
    );
  });
});
