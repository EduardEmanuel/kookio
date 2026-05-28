import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';
import {
  COOKING_SESSION_TRPC,
  type CookingSessionTrpcClient,
} from '@kookio/feature-recipes/cooking-trpc';
import {
  PANTRY_TRPC,
  type PantryTrpcClient,
} from '@kookio/feature-pantry/trpc';
import {
  DifficultySchema,
  IngredientCategorySchema,
  MeasureUnitSchema,
  RecipeStatusSchema,
  type RecipeDetail,
} from '@kookio/prisma-client';

import CookPage from './cook.[recipeId].page';

const Unit = MeasureUnitSchema.enum;
const IngCategory = IngredientCategorySchema.enum;
const Status = RecipeStatusSchema.enum;
const Difficulty = DifficultySchema.enum;

const mockRecipe = (overrides: Partial<RecipeDetail> = {}): RecipeDetail => ({
  id: '11111111-1111-1111-1111-111111111111',
  externalId: 'meal-1',
  slug: 'spicy-arrabiata-penne',
  title: 'Spicy Arrabiata Penne',
  description: 'A fiery Italian classic.',
  imageUrl: 'https://example.test/img.jpg',
  videoUrl: null,
  sourceUrl: null,
  status: Status.PUBLIC,
  servings: 4,
  difficulty: Difficulty.MEDIUM,
  prepTimeMinutes: 10,
  cookTimeMinutes: 20,
  categoryId: null,
  areaId: null,
  authorId: null,
  createdAt: new Date('2025-01-01T00:00:00Z'),
  updatedAt: new Date('2025-01-01T00:00:00Z'),
  category: null,
  area: null,
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
        pieceGrams: null,
      },
    },
  ],
  tags: [],
  steps: [
    { id: 'step-1', order: 1, title: 'Boil Water', content: 'Boil water.' },
    { id: 'step-2', order: 2, title: 'Cook Penne', content: 'Cook penne.' },
    { id: 'step-3', order: 3, title: 'Combine', content: 'Mix together.' },
  ],
  ...overrides,
});

const makeCookingTrpc = (): CookingSessionTrpcClient => ({
  cookingSession: {
    start: {
      mutate: vi.fn().mockResolvedValue({ sessionId: 'session-1' }),
    },
    complete: {
      mutate: vi.fn().mockResolvedValue({ ok: true }),
    },
  },
});

const makePantryTrpc = (): PantryTrpcClient => ({
  pantry: {
    list: { query: vi.fn().mockResolvedValue([]) },
    add: { mutate: vi.fn() },
    update: { mutate: vi.fn() },
    remove: { mutate: vi.fn() },
    searchIngredients: { query: vi.fn().mockResolvedValue([]) },
  },
});

interface SetupOpts {
  recipe?: RecipeDetail;
  queryParams?: Record<string, string>;
  cookingTrpc?: CookingSessionTrpcClient;
}

const setup = async (opts: SetupOpts = {}) => {
  const recipe = opts.recipe ?? mockRecipe();
  const queryParams = opts.queryParams ?? {};
  const cookingTrpc = opts.cookingTrpc ?? makeCookingTrpc();

  const route = {
    data: of({ load: { recipe } }),
    snapshot: {
      queryParamMap: {
        get: (key: string) => queryParams[key] ?? null,
      },
    },
  };

  const authStore = createMockAuthStore({
    authReady: true,
    isAuthenticated: true,
    onboardingDone: true,
  });

  // Stub the dialog so onFinish doesn't try to render a real overlay.
  const dialogRef = {
    afterClosed: vi.fn().mockReturnValue(of(null)),
  };
  const dialog = {
    open: vi.fn().mockReturnValue(dialogRef),
  };

  const snackBar = {
    open: vi.fn(),
  };

  await TestBed.configureTestingModule({
    imports: [CookPage],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([]),
      { provide: AuthStore, useValue: authStore },
      { provide: COOKING_SESSION_TRPC, useValue: cookingTrpc },
      { provide: PANTRY_TRPC, useValue: makePantryTrpc() },
      { provide: MatDialog, useValue: dialog },
      { provide: MatSnackBar, useValue: snackBar },
      { provide: ActivatedRoute, useValue: route },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(CookPage);
  fixture.detectChanges();
  await fixture.whenStable();

  return {
    fixture,
    el: fixture.nativeElement as HTMLElement,
    cookingTrpc,
    dialog,
  };
};

/** Click Start and wait for the mutation + state transition to settle. */
const startCooking = async (fixture: {
  detectChanges: () => void;
  whenStable: () => Promise<unknown>;
  nativeElement: HTMLElement;
}) => {
  const el = fixture.nativeElement;
  const startBtn = el.querySelector('.cook-setup__cta') as HTMLButtonElement;
  startBtn.click();
  await fixture.whenStable();
  fixture.detectChanges();
  await fixture.whenStable();
};

describe('CookPage', () => {
  let replaceStateSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Reset the URL between tests so `?step=…` written by one test doesn't
    // leak into the next via jsdom's persistent `window.location`.
    window.history.replaceState({}, '', '/cook/test-recipe-id');
    replaceStateSpy = vi.spyOn(window.history, 'replaceState');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  describe('setup phase', () => {
    it('renders the setup section initially', async () => {
      const { el } = await setup();
      expect(el.querySelector('.cook-setup')).toBeTruthy();
      expect(el.querySelector('.cook-steps')).toBeNull();
    });

    it('shows the recipe servings count as the base hint', async () => {
      const { el } = await setup({ recipe: mockRecipe({ servings: 6 }) });
      const base = el.querySelector('.cook-setup__base');
      expect(base?.textContent).toContain('6 servings');
    });
  });

  describe('cooking phase transition', () => {
    it('flips to cooking phase on Start click', async () => {
      const { fixture, el } = await setup();
      await startCooking(fixture);
      expect(el.querySelector('.cook-setup')).toBeNull();
      expect(el.querySelector('.cook-steps')).toBeTruthy();
    });

    it('starts at step 0 with no ?step query param', async () => {
      const { fixture, el } = await setup();
      await startCooking(fixture);
      const active = el.querySelector('.cook-steps__rail-item.is-active');
      expect(active?.textContent).toContain('Boil Water');
    });

    it('seeds currentStep from ?step=2 on start', async () => {
      const { fixture, el } = await setup({ queryParams: { step: '2' } });
      await startCooking(fixture);
      const active = el.querySelector('.cook-steps__rail-item.is-active');
      expect(active?.textContent).toContain('Combine');
    });

    it('clamps ?step values past the last index to the last step', async () => {
      const { fixture, el } = await setup({ queryParams: { step: '99' } });
      await startCooking(fixture);
      const active = el.querySelector('.cook-steps__rail-item.is-active');
      expect(active?.textContent).toContain('Combine');
    });

    it('clamps negative ?step values to 0', async () => {
      const { fixture, el } = await setup({ queryParams: { step: '-3' } });
      await startCooking(fixture);
      const active = el.querySelector('.cook-steps__rail-item.is-active');
      expect(active?.textContent).toContain('Boil Water');
    });

    it('ignores non-numeric ?step values', async () => {
      const { fixture, el } = await setup({ queryParams: { step: 'abc' } });
      await startCooking(fixture);
      const active = el.querySelector('.cook-steps__rail-item.is-active');
      expect(active?.textContent).toContain('Boil Water');
    });
  });

  describe('cooking phase rendering', () => {
    it('renders one rail item per step', async () => {
      const { fixture, el } = await setup();
      await startCooking(fixture);
      const items = el.querySelectorAll('.cook-steps__rail-item');
      expect(items).toHaveLength(3);
    });

    it('renders the step number in the marker by default', async () => {
      const { fixture, el } = await setup();
      await startCooking(fixture);
      const firstMarker = el.querySelector(
        '.cook-steps__rail-item .cook-steps__rail-marker',
      );
      expect(firstMarker?.textContent?.trim()).toBe('1');
    });

    it('renders a check icon on completed steps after navigating forward', async () => {
      const { fixture, el } = await setup();
      await startCooking(fixture);

      const nextBtn = el.querySelector(
        '.cook-steps__footer button:nth-of-type(2)',
      ) as HTMLButtonElement;
      nextBtn.click();
      fixture.detectChanges();
      await fixture.whenStable();

      // Step 0 is now completed; its marker should render the check icon
      // instead of the number.
      const items = el.querySelectorAll('.cook-steps__rail-item');
      const firstMarker = items[0].querySelector('.cook-steps__rail-marker');
      expect(firstMarker?.querySelector('kookio-icon')).toBeTruthy();
      expect(firstMarker?.textContent?.trim()).not.toBe('1');
    });

    it('shows the active step content in the right pane', async () => {
      const { fixture, el } = await setup();
      await startCooking(fixture);
      const content = el.querySelector('.cook-steps__content');
      expect(content?.textContent).toContain('Boil Water');
      expect(content?.textContent).toContain('Boil water.');
    });
  });

  describe('navigation', () => {
    it('disables Previous at step 0', async () => {
      const { fixture, el } = await setup();
      await startCooking(fixture);
      const prevBtn = el.querySelector(
        '.cook-steps__footer button:first-of-type',
      ) as HTMLButtonElement;
      expect(prevBtn.disabled).toBe(true);
    });

    it('replaces Next with the Done button on the last step', async () => {
      const { fixture, el } = await setup({ queryParams: { step: '2' } });
      await startCooking(fixture);
      const lastBtn = el.querySelector(
        '.cook-steps__footer button:last-of-type',
      ) as HTMLButtonElement;
      expect(lastBtn.textContent).toMatch(/done/i);
    });
  });

  describe('URL persistence', () => {
    it('writes ?step=N to the URL when currentStep changes during cooking', async () => {
      const { fixture, el } = await setup();
      await startCooking(fixture);
      // The effect fires once on the start transition (step 0); reset the
      // spy so we measure only the next change.
      replaceStateSpy.mockClear();

      const nextBtn = el.querySelector(
        '.cook-steps__footer button:nth-of-type(2)',
      ) as HTMLButtonElement;
      nextBtn.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(replaceStateSpy).toHaveBeenCalled();
      const lastUrl = String(replaceStateSpy.mock.calls.at(-1)?.[2] ?? '');
      expect(lastUrl).toContain('step=1');
    });

    it('does not touch the URL while in the setup phase', async () => {
      // Setup runs detectChanges + whenStable, which would have flushed any
      // effect run. We assert it stayed silent throughout.
      await setup();
      expect(replaceStateSpy).not.toHaveBeenCalled();
    });
  });

  describe('finish flow', () => {
    it('opens the ingredient confirm dialog on Done click', async () => {
      const { fixture, el, dialog } = await setup({
        queryParams: { step: '2' },
      });
      await startCooking(fixture);

      const doneBtn = el.querySelector(
        '.cook-steps__footer button:last-of-type',
      ) as HTMLButtonElement;
      doneBtn.click();
      await fixture.whenStable();

      expect(dialog.open).toHaveBeenCalled();
    });
  });
});
