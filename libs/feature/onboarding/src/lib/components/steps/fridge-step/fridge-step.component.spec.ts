import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';

import { FRIDGE_STRINGS } from '../../../onboarding-strings';
import {
  ONBOARDING_TRPC,
  OnboardingStore,
  type MealAreaRow,
  type MealCategoryRow,
} from '../../../store/onboarding.store';
import { buildTrpcMock } from '../../../testing/build-trpc-mock';
import { FridgeStepComponent } from './fridge-step.component';

const sampleCategories: MealCategoryRow[] = [
  { id: 'c1', name: 'Beef', emoji: '🐄', imageUrl: null, description: null },
  { id: 'c2', name: 'Chicken', emoji: '🐔', imageUrl: null, description: null },
];

const sampleAreas: MealAreaRow[] = [
  { id: 'a1', name: 'Italian', flag: '🇮🇹' },
  { id: 'a2', name: 'Japanese', flag: '🇯🇵' },
];

const setup = async (
  opts: {
    categories?: MealCategoryRow[];
    areas?: MealAreaRow[];
  } = {},
) => {
  const trpc = buildTrpcMock({
    onboardingCatalogs: {
      mealCategories: {
        query: vi.fn().mockResolvedValue(opts.categories ?? sampleCategories),
      },
      mealAreas: {
        query: vi.fn().mockResolvedValue(opts.areas ?? sampleAreas),
      },
    },
  });
  const authStore = createMockAuthStore({ authReady: true });

  await TestBed.configureTestingModule({
    imports: [FridgeStepComponent],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([]),
      { provide: PLATFORM_ID, useValue: 'server' },
      OnboardingStore,
      { provide: ONBOARDING_TRPC, useValue: trpc },
      { provide: AuthStore, useValue: authStore },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(FridgeStepComponent);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();

  const store = TestBed.inject(OnboardingStore);
  const el = fixture.nativeElement as HTMLElement;
  // `componentInstance` is `unknown` in zoneless TestBed; the cast unlocks the
  // protected helpers we exercise from the spec for the inactive Preferences tab.
  // Reaching for protected members is acceptable here because `mat-tab-group`
  // does not render the inactive tab's body, so DOM-level assertions for the
  // category/area chips and empty state are not feasible without a real Zone.
  const component = fixture.componentInstance as unknown as {
    toggleCategory: (id: string) => void;
    toggleArea: (id: string) => void;
    isCategorySelected: (id: string) => boolean;
    isAreaSelected: (id: string) => boolean;
    categories: () => MealCategoryRow[] | undefined;
    areas: () => MealAreaRow[] | undefined;
  };

  return { fixture, el, store, component };
};

describe('FridgeStepComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  describe('default (Pantry) tab', () => {
    it('renders heading, subtitle and pantry info', async () => {
      const { el } = await setup();
      expect(el.textContent).toContain(FRIDGE_STRINGS.heading);
      expect(el.textContent).toContain(FRIDGE_STRINGS.subtitle);
      expect(el.textContent).toContain(FRIDGE_STRINGS.pantryNotice);
    });

    it('exposes both top-level tab labels', async () => {
      const { el } = await setup();
      const tabLabels = Array.from(el.querySelectorAll('[role="tab"]')).map(
        (t) => t.textContent?.trim(),
      );
      expect(tabLabels).toContain(FRIDGE_STRINGS.tabs.pantry);
      expect(tabLabels).toContain(FRIDGE_STRINGS.tabs.preferences);
    });
  });

  describe('Preferences logic', () => {
    it('exposes the fetched categories and areas via signals', async () => {
      const { component } = await setup();
      expect(component.categories()?.map((c) => c.id)).toEqual(['c1', 'c2']);
      expect(component.areas()?.map((a) => a.id)).toEqual(['a1', 'a2']);
    });

    it('toggleCategory routes through the store', async () => {
      const { component, store } = await setup();
      component.toggleCategory('c1');
      expect(store.preferredCategoryIds().has('c1')).toBe(true);
      component.toggleCategory('c1');
      expect(store.preferredCategoryIds().has('c1')).toBe(false);
    });

    it('toggleArea routes through the store', async () => {
      const { component, store } = await setup();
      component.toggleArea('a1');
      expect(store.preferredAreaIds().has('a1')).toBe(true);
    });

    it('exposes empty arrays when catalogs return nothing', async () => {
      const { component } = await setup({ categories: [], areas: [] });
      expect(component.categories()).toEqual([]);
      expect(component.areas()).toEqual([]);
    });
  });
});
