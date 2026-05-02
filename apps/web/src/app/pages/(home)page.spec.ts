import { afterEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { RECIPES_TRPC } from '@kookio/feature-recipes';
import { buildRecipesTrpcMock } from '@kookio/feature-recipes/testing';

import HomePage, { routeMeta } from './(home).page';

describe('(home) route', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('exposes a routeMeta with a title (no redirect)', () => {
    expect(routeMeta).toEqual({ title: 'Kookio' });
  });

  it('renders the recipes feed at /', async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        {
          provide: RECIPES_TRPC,
          useValue: buildRecipesTrpcMock({
            feed: { items: [], nextCursor: null },
          }),
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();
    await fixture.whenStable();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('kookio-recipes-feed')).toBeTruthy();
  });
});
