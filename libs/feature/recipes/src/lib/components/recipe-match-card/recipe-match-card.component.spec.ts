import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Router, provideRouter } from '@angular/router';

import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';
import { SAVED_TRPC, type SavedTrpcClient } from '@kookio/feature-saved/trpc';
import { DifficultySchema, type RecipeMatchItem } from '@kookio/prisma-client';

import { RecipeMatchCardComponent } from './recipe-match-card.component';

const baseItem = (
  overrides: Partial<RecipeMatchItem> = {},
): RecipeMatchItem => ({
  id: 'r-1',
  slug: 'recipe-1',
  title: 'Test Recipe',
  imageUrl: null,
  prepTimeMinutes: 5,
  cookTimeMinutes: 10,
  servings: 2,
  category: null,
  area: null,
  matchInfo: {
    missingCount: 0,
    totalIngredients: 5,
    missingNames: [],
  },
  ...overrides,
});

const makeSavedTrpc = (): SavedTrpcClient => ({
  recipeCollection: {
    getSaved: { query: vi.fn().mockResolvedValue([]) },
    getSavedIds: { query: vi.fn().mockResolvedValue([]) },
    toggleSave: {
      mutate: vi.fn().mockResolvedValue({ recipeId: '', saved: true }),
    },
  },
});

const setup = async (item: RecipeMatchItem) => {
  // The card now renders `<kookio-save-toggle>`, which injects SavedStore;
  // SavedStore in turn injects AuthStore and SAVED_TRPC. The mock auth store
  // starts logged-out so the SavedStore's `withHooks` does NOT auto-fire
  // `loadIds()` — keeps the tests focused on the card itself.
  const authStore = createMockAuthStore({ session: null });

  await TestBed.configureTestingModule({
    imports: [RecipeMatchCardComponent],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([]),
      { provide: AuthStore, useValue: authStore },
      { provide: SAVED_TRPC, useValue: makeSavedTrpc() },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(RecipeMatchCardComponent);
  fixture.componentRef.setInput('item', item);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();

  return {
    fixture,
    el: fixture.nativeElement as HTMLElement,
    component: fixture.componentInstance,
  };
};

describe('RecipeMatchCardComponent', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  describe('complete (missingCount === 0)', () => {
    it('renders the Alright-to-cook badge on a complete match', async () => {
      const { el } = await setup(baseItem());

      const badge = el.querySelector('.match-card__badge');
      expect(badge).toBeTruthy();
      expect(badge?.textContent).toContain('Alright to cook');
    });

    it('renders the Cook now button on a complete match', async () => {
      const { el } = await setup(baseItem());
      const btn = el.querySelector('.match-card__actions button');
      expect(btn).toBeTruthy();
      expect(btn?.textContent).toContain('Cook now');
    });

    it('does not render the missing-ingredients line', async () => {
      const { el } = await setup(baseItem());
      expect(el.querySelector('.match-card__missing')).toBeNull();
    });

    it('Cook now click cancels anchor navigation and pushes to /cook/:id', async () => {
      const { el, fixture } = await setup(baseItem({ id: 'r-42' }));

      const router = TestBed.inject(Router);
      const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

      const btn = el.querySelector(
        '.match-card__actions button',
      ) as HTMLButtonElement;
      const event = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      const stopPropagationSpy = vi.spyOn(event, 'stopPropagation');
      btn.dispatchEvent(event);
      fixture.detectChanges();

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(stopPropagationSpy).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith(['/cook/r-42']);
    });
  });

  describe('almost (1..3 missing)', () => {
    it('renders the Missing-N badge on an almost match', async () => {
      const { el } = await setup(
        baseItem({
          matchInfo: {
            missingCount: 2,
            totalIngredients: 6,
            missingNames: ['tomato', 'basil'],
          },
        }),
      );

      const badge = el.querySelector('.match-card__badge');
      expect(badge?.textContent).toContain('Missing 2');
    });

    it('lists missing names without truncation when names cover the count', async () => {
      const { el } = await setup(
        baseItem({
          matchInfo: {
            missingCount: 2,
            totalIngredients: 6,
            missingNames: ['tomato', 'basil'],
          },
        }),
      );
      const missing = el.querySelector('.match-card__missing');
      expect(missing?.textContent).toContain('Missing: tomato, basil');
      expect(missing?.textContent).not.toContain('more');
    });

    it('appends "+N more" when the server returns a partial list', async () => {
      const { el } = await setup(
        baseItem({
          matchInfo: {
            missingCount: 5,
            totalIngredients: 8,
            missingNames: ['tomato', 'basil'],
          },
        }),
      );
      const missing = el.querySelector('.match-card__missing');
      expect(missing?.textContent).toContain('Missing: tomato, basil +3 more');
    });

    it('does not render the Cook now button', async () => {
      const { el } = await setup(
        baseItem({
          matchInfo: {
            missingCount: 2,
            totalIngredients: 6,
            missingNames: ['tomato', 'basil'],
          },
        }),
      );
      expect(el.querySelector('.match-card__actions')).toBeNull();
    });
  });

  describe('browse (>3 missing)', () => {
    it('omits the badge on a browse-level match', async () => {
      const { el } = await setup(
        baseItem({
          matchInfo: {
            missingCount: 7,
            totalIngredients: 10,
            missingNames: ['a', 'b', 'c'],
          },
        }),
      );
      expect(el.querySelector('.match-card__badge')).toBeNull();
    });

    it('still renders the missing-ingredients line', async () => {
      const { el } = await setup(
        baseItem({
          matchInfo: {
            missingCount: 7,
            totalIngredients: 10,
            missingNames: ['a', 'b', 'c'],
          },
        }),
      );
      expect(el.querySelector('.match-card__missing')?.textContent).toContain(
        'Missing: a, b, c +4 more',
      );
    });
  });

  describe('difficulty chip', () => {
    it('renders the difficulty chip when difficulty is set', async () => {
      const { el } = await setup(
        baseItem({ difficulty: DifficultySchema.enum.HARD }),
      );
      const chips = el.querySelectorAll('.match-card__chip');
      const text = Array.from(chips).map((c) => c.textContent?.trim());
      expect(text.some((t) => t?.includes('Hard'))).toBe(true);
    });

    it('omits the difficulty chip when difficulty is null', async () => {
      const { el } = await setup(baseItem());
      const text = el.querySelector('.match-card__meta')?.textContent ?? '';
      expect(text).not.toContain('Easy');
      expect(text).not.toContain('Medium');
      expect(text).not.toContain('Hard');
    });
  });

  describe('aria-label', () => {
    it('reads "ready to cook" on a complete match', async () => {
      const { el } = await setup(baseItem({ title: 'Risotto' }));
      const anchor = el.querySelector('.match-card');
      expect(anchor?.getAttribute('aria-label')).toBe(
        'Risotto — ready to cook',
      );
    });

    it('reads "missing N ingredients" on an almost match', async () => {
      const { el } = await setup(
        baseItem({
          title: 'Risotto',
          matchInfo: {
            missingCount: 2,
            totalIngredients: 5,
            missingNames: ['rice', 'broth'],
          },
        }),
      );
      const anchor = el.querySelector('.match-card');
      expect(anchor?.getAttribute('aria-label')).toBe(
        'Risotto — missing 2 ingredients',
      );
    });

    it('uses singular "ingredient" when only one is missing', async () => {
      const { el } = await setup(
        baseItem({
          title: 'Risotto',
          matchInfo: {
            missingCount: 1,
            totalIngredients: 5,
            missingNames: ['rice'],
          },
        }),
      );
      const anchor = el.querySelector('.match-card');
      expect(anchor?.getAttribute('aria-label')).toBe(
        'Risotto — missing 1 ingredient',
      );
    });

    it('falls back to "View recipe" on a browse match', async () => {
      const { el } = await setup(
        baseItem({
          title: 'Risotto',
          matchInfo: {
            missingCount: 8,
            totalIngredients: 10,
            missingNames: [],
          },
        }),
      );
      const anchor = el.querySelector('.match-card');
      expect(anchor?.getAttribute('aria-label')).toBe('View recipe Risotto');
    });
  });
});
