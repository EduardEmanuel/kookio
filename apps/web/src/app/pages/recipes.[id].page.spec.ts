import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';
import {
  IngredientCategorySchema,
  MeasureUnitSchema,
  RecipeStatusSchema,
  type RecipeDetail,
} from '@kookio/prisma-client';

import RecipeDetailPage from './recipes.[id].page';

const Unit = MeasureUnitSchema.enum;
const IngCategory = IngredientCategorySchema.enum;
const Status = RecipeStatusSchema.enum;

const mockRecipe = (overrides: Partial<RecipeDetail> = {}): RecipeDetail => ({
  id: '11111111-1111-1111-1111-111111111111',
  externalId: 'meal-1',
  slug: 'spicy-arrabiata-penne',
  title: 'Spicy Arrabiata Penne',
  description: 'A fiery Italian classic.',
  imageUrl: 'https://example.test/img.jpg',
  youtubeUrl: 'https://youtube.test/watch?v=1',
  sourceUrl: 'https://example.test/source',
  instructions: 'Boil water.\nCook penne.\nCombine and serve.',
  status: Status.PUBLIC,
  servings: 4,
  prepTimeMinutes: 10,
  cookTimeMinutes: 20,
  categoryId: 'cat-1',
  areaId: 'area-1',
  authorId: null,
  createdAt: new Date('2025-01-01T00:00:00Z'),
  updatedAt: new Date('2025-01-01T00:00:00Z'),
  category: { id: 'cat-1', name: 'Pasta', emoji: '🍝' },
  area: { id: 'area-1', name: 'Italian', flag: '🇮🇹' },
  ingredients: [
    {
      id: 'ing-1',
      quantity: 200,
      unit: Unit.G,
      notes: null,
      ingredient: {
        id: 'cat-ing-1',
        name: 'Penne',
        imageUrl: null,
        category: IngCategory.GRAINS,
      },
    },
    {
      id: 'ing-2',
      quantity: 1,
      unit: Unit.TBSP,
      notes: 'fresh',
      ingredient: {
        id: 'cat-ing-2',
        name: 'Parsley',
        imageUrl: null,
        category: IngCategory.HERBS,
      },
    },
  ],
  tags: [{ tag: 'spicy' }, { tag: 'quick' }],
  ...overrides,
});

interface SetupOpts {
  isAuthenticated?: boolean;
  onboardingDone?: boolean;
  recipe?: RecipeDetail;
}

const setup = async (opts: SetupOpts = {}) => {
  const recipe = opts.recipe ?? mockRecipe();

  const authStore = createMockAuthStore({
    authReady: true,
    isAuthenticated: opts.isAuthenticated ?? false,
    onboardingDone: opts.onboardingDone ?? false,
  });

  await TestBed.configureTestingModule({
    imports: [RecipeDetailPage],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([]),
      { provide: AuthStore, useValue: authStore },
      {
        provide: ActivatedRoute,
        useValue: { data: of({ load: { recipe } }) },
      },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(RecipeDetailPage);
  fixture.detectChanges();
  await fixture.whenStable();

  return {
    fixture,
    el: fixture.nativeElement as HTMLElement,
    title: TestBed.inject(Title),
  };
};

describe('RecipeDetailPage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  it('renders the recipe title, description and image', async () => {
    const { el } = await setup();

    expect(el.querySelector('.recipe-detail__title')?.textContent).toContain(
      'Spicy Arrabiata Penne',
    );
    expect(
      el.querySelector('.recipe-detail__description')?.textContent,
    ).toContain('A fiery Italian classic.');
    expect(
      el.querySelector<HTMLImageElement>('.recipe-detail__hero')?.src,
    ).toContain('img.jpg');
  });

  it('renders category, area and tag chips', async () => {
    const { el } = await setup();
    const chips = el.querySelectorAll('.recipe-detail__chip');

    const text = Array.from(chips).map((c) => c.textContent?.trim());
    expect(text.some((t) => t?.includes('Pasta'))).toBe(true);
    expect(text.some((t) => t?.includes('Italian'))).toBe(true);
    expect(text.some((t) => t?.includes('spicy'))).toBe(true);
    expect(text.some((t) => t?.includes('quick'))).toBe(true);
  });

  it('renders prep, cook and servings stats', async () => {
    const { el } = await setup();
    const text = el.querySelector('.recipe-detail__stats')?.textContent ?? '';

    expect(text).toContain('Prep');
    expect(text).toContain('10 min');
    expect(text).toContain('Cook');
    expect(text).toContain('20 min');
    expect(text).toContain('Servings');
    expect(text).toContain('4');
  });

  it('renders ingredients with quantity, unit and optional notes', async () => {
    const { el } = await setup();
    const items = el.querySelectorAll('.recipe-detail__ingredient');

    expect(items).toHaveLength(2);
    expect(items[0].textContent).toContain('200');
    expect(items[0].textContent).toContain('g');
    expect(items[0].textContent).toContain('Penne');

    expect(items[1].textContent).toContain('1');
    expect(items[1].textContent).toContain('tbsp');
    expect(items[1].textContent).toContain('Parsley');
    expect(items[1].textContent).toContain('fresh');
  });

  it('splits instructions into numbered steps', async () => {
    const { el } = await setup();
    const steps = el.querySelectorAll('.recipe-detail__step');

    expect(steps).toHaveLength(3);
    expect(steps[0].textContent).toContain('1');
    expect(steps[0].textContent).toContain('Boil water.');
    expect(steps[2].textContent).toContain('3');
    expect(steps[2].textContent).toContain('Combine and serve.');
  });

  it('hides the Cook now CTA for anonymous users', async () => {
    const { el } = await setup({ isAuthenticated: false });

    expect(el.querySelector('.recipe-detail__cook-cta')).toBeNull();
  });

  it('hides the Cook now CTA for users without onboarding', async () => {
    const { el } = await setup({
      isAuthenticated: true,
      onboardingDone: false,
    });

    expect(el.querySelector('.recipe-detail__cook-cta')).toBeNull();
  });

  it('shows the Cook now CTA linking to /cook/:id when authenticated and onboarded', async () => {
    const { el } = await setup({
      isAuthenticated: true,
      onboardingDone: true,
    });
    const cta = el.querySelector<HTMLAnchorElement>('.recipe-detail__cook-cta');

    expect(cta).toBeTruthy();
    expect(cta?.getAttribute('href')).toBe(
      '/cook/11111111-1111-1111-1111-111111111111',
    );
    expect(cta?.textContent).toContain('Cook now');
  });

  it('renders source links when youtubeUrl or sourceUrl are present', async () => {
    const { el } = await setup();
    const sources = el.querySelectorAll('.recipe-detail__sources a');

    expect(sources).toHaveLength(2);
    expect(sources[0].getAttribute('href')).toBe(
      'https://youtube.test/watch?v=1',
    );
    expect(sources[0].getAttribute('rel')).toContain('noopener');
    expect(sources[1].getAttribute('href')).toBe('https://example.test/source');
  });

  it('omits the source section when both source URLs are absent', async () => {
    const { el } = await setup({
      recipe: mockRecipe({ youtubeUrl: null, sourceUrl: null }),
    });

    expect(el.querySelector('.recipe-detail__sources')).toBeNull();
  });

  it('updates the document title to "<recipe> — Kookio"', async () => {
    const { title } = await setup();
    expect(title.getTitle()).toBe('Spicy Arrabiata Penne — Kookio');
  });

  it('shows fallback messages for empty ingredients and instructions', async () => {
    const { el } = await setup({
      recipe: mockRecipe({ ingredients: [], instructions: '' }),
    });

    const empties = Array.from(el.querySelectorAll('.recipe-detail__empty'));
    const text = empties.map((e) => e.textContent?.trim()).join(' | ');
    expect(text).toContain('No ingredients');
    expect(text).toContain('No instructions');
  });
});
