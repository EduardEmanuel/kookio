import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';

import { RESTRICTIONS_STRINGS } from '../../../onboarding-strings';
import {
  ONBOARDING_TRPC,
  OnboardingStore,
  type DietaryRestrictionRow,
} from '../../../store/onboarding.store';
import { buildTrpcMock } from '../../../testing/build-trpc-mock';
import { RestrictionsStepComponent } from './restrictions-step.component';

const sample: DietaryRestrictionRow[] = [
  {
    id: 'r1',
    slug: 'gluten-free',
    label: 'Gluten-free',
    emoji: '🌾',
    description: 'Excludes wheat, barley, rye',
  },
  {
    id: 'r2',
    slug: 'vegetarian',
    label: 'Vegetarian',
    emoji: '🥕',
    description: null,
  },
];

const setup = async (
  restrictions:
    | DietaryRestrictionRow[]
    | Promise<DietaryRestrictionRow[]> = sample,
) => {
  const trpc = buildTrpcMock({
    onboardingCatalogs: {
      dietaryRestrictions: {
        query: vi.fn().mockResolvedValue(restrictions),
      },
    },
  });
  const authStore = createMockAuthStore({ authReady: true });

  await TestBed.configureTestingModule({
    imports: [RestrictionsStepComponent],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([]),
      { provide: PLATFORM_ID, useValue: 'server' },
      OnboardingStore,
      { provide: ONBOARDING_TRPC, useValue: trpc },
      { provide: AuthStore, useValue: authStore },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(RestrictionsStepComponent);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();

  const store = TestBed.inject(OnboardingStore);
  const el = fixture.nativeElement as HTMLElement;
  return { fixture, el, store };
};

describe('RestrictionsStepComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('renders the heading and subtitle', async () => {
    const { el } = await setup();
    expect(el.textContent).toContain(RESTRICTIONS_STRINGS.heading);
    expect(el.textContent).toContain(RESTRICTIONS_STRINGS.subtitle);
  });

  it('renders one row per fetched restriction', async () => {
    const { el } = await setup();
    const text = el.textContent ?? '';
    expect(text).toContain('Gluten-free');
    expect(text).toContain('Vegetarian');
  });

  it('toggles store state when a checkbox is clicked', async () => {
    const { fixture, el, store } = await setup();
    const checkbox = el.querySelector<HTMLInputElement>(
      'mat-checkbox input[type="checkbox"]',
    );
    expect(checkbox).toBeTruthy();

    checkbox?.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(store.dietaryRestrictionIds().has('r1')).toBe(true);
  });

  it('shows the empty state when the catalog is empty', async () => {
    const { el } = await setup([]);
    expect(el.textContent).toContain(RESTRICTIONS_STRINGS.empty);
  });
});
