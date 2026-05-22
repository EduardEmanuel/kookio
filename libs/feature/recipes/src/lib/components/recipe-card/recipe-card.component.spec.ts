import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';
import { SAVED_TRPC, type SavedTrpcClient } from '@kookio/feature-saved/trpc';
import { DifficultySchema, type RecipeFeedItem } from '@kookio/prisma-client';

import { RecipeCardComponent } from './recipe-card.component';

const makeSavedTrpc = (): SavedTrpcClient => ({
  recipeCollection: {
    getSaved: { query: vi.fn().mockResolvedValue([]) },
    getSavedIds: { query: vi.fn().mockResolvedValue([]) },
    toggleSave: {
      mutate: vi.fn().mockResolvedValue({ recipeId: '', saved: true }),
    },
  },
});

const baseRecipe: RecipeFeedItem = {
  id: '11111111-1111-1111-1111-111111111111',
  slug: 'spaghetti-bolognese',
  title: 'Spaghetti Bolognese',
  imageUrl: 'https://example.test/img.jpg',
  prepTimeMinutes: 10,
  cookTimeMinutes: 20,
  servings: 4,
  category: { id: 'cat-1', name: 'Pasta', emoji: '🍝' },
  area: { id: 'area-1', name: 'Italian', flag: '🇮🇹' },
};

const setup = async (recipe: RecipeFeedItem) => {
  const authStore = createMockAuthStore({ session: null });
  await TestBed.configureTestingModule({
    imports: [RecipeCardComponent],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([]),
      { provide: AuthStore, useValue: authStore },
      { provide: SAVED_TRPC, useValue: makeSavedTrpc() },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(RecipeCardComponent);
  fixture.componentRef.setInput('recipe', recipe);
  fixture.detectChanges();
  await fixture.whenStable();

  return { fixture, el: fixture.nativeElement as HTMLElement };
};

describe('RecipeCardComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  describe('rendering', () => {
    it('renders the recipe title', async () => {
      const { el } = await setup(baseRecipe);
      expect(el.querySelector('.recipe-card__title')?.textContent).toContain(
        'Spaghetti Bolognese',
      );
    });

    it('links to /recipes/<id>', async () => {
      const { el } = await setup(baseRecipe);
      const anchor = el.querySelector('a.recipe-card') as HTMLAnchorElement;
      expect(anchor.getAttribute('href')).toBe(`/recipes/${baseRecipe.id}`);
    });

    it('renders the image when imageUrl is set', async () => {
      const { el } = await setup(baseRecipe);
      const img = el.querySelector('img.recipe-card__image');
      expect(img).toBeTruthy();
      expect(img?.getAttribute('loading')).toBe('lazy');
      expect(img?.getAttribute('alt')).toBe(baseRecipe.title);
    });

    it('omits the image when imageUrl is null', async () => {
      const { el } = await setup({ ...baseRecipe, imageUrl: null });
      expect(el.querySelector('img.recipe-card__image')).toBeNull();
    });

    it('renders category and area chips with emojis', async () => {
      const { el } = await setup(baseRecipe);
      const chips = el.querySelectorAll('.recipe-card__chip');
      expect(chips.length).toBe(2);
      expect(chips[0].textContent).toContain('Pasta');
      expect(chips[1].textContent).toContain('Italian');
    });

    it('renders the difficulty chip when difficulty is set', async () => {
      const { el } = await setup({
        ...baseRecipe,
        difficulty: DifficultySchema.enum.MEDIUM,
      });
      const chips = el.querySelectorAll('.recipe-card__chip');
      const text = Array.from(chips).map((c) => c.textContent?.trim());
      expect(text.some((t) => t?.includes('Medium'))).toBe(true);
    });

    it('omits the difficulty chip when difficulty is null', async () => {
      const { el } = await setup(baseRecipe);
      const text = el.querySelector('.recipe-card__meta')?.textContent ?? '';
      expect(text).not.toContain('Easy');
      expect(text).not.toContain('Medium');
      expect(text).not.toContain('Hard');
    });

    it('omits chips block when no category, area, or difficulty', async () => {
      const { el } = await setup({
        ...baseRecipe,
        category: null,
        area: null,
      });
      expect(el.querySelector('.recipe-card__meta')).toBeNull();
    });

    it('renders total time as prep + cook minutes', async () => {
      const { el } = await setup(baseRecipe);
      const times = el.querySelector('.recipe-card__times')?.textContent ?? '';
      expect(times).toContain('30 min');
    });

    it('omits total time when both prep and cook are null', async () => {
      const { el } = await setup({
        ...baseRecipe,
        prepTimeMinutes: null,
        cookTimeMinutes: null,
      });
      const text = el.querySelector('.recipe-card__times')?.textContent ?? '';
      expect(text).not.toContain('min');
    });

    it('renders servings when present', async () => {
      const { el } = await setup(baseRecipe);
      expect(el.querySelector('.recipe-card__times')?.textContent).toContain(
        '4',
      );
    });

    it('omits the times block entirely when nothing to show', async () => {
      const { el } = await setup({
        ...baseRecipe,
        prepTimeMinutes: null,
        cookTimeMinutes: null,
        servings: null,
      });
      expect(el.querySelector('.recipe-card__times')).toBeNull();
    });
  });
});
