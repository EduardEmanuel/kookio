import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';

import {
  UTENSILS_STRINGS,
  UTENSIL_CATEGORY_LABELS,
} from '../../../onboarding-strings';
import {
  ONBOARDING_TRPC,
  OnboardingStore,
  type UtensilRow,
} from '../../../store/onboarding.store';
import { buildTrpcMock } from '../../../testing/build-trpc-mock';
import { UtensilsStepComponent } from './utensils-step.component';

const sample: UtensilRow[] = [
  { id: 'u1', slug: 'knife', name: 'Knife', emoji: '🔪', category: 'cutting' },
  { id: 'u2', slug: 'pan', name: 'Pan', emoji: '🍳', category: 'cooking' },
  { id: 'u3', slug: 'pot', name: 'Pot', emoji: '🥘', category: 'cooking' },
  { id: 'u4', slug: 'whisk', name: 'Whisk', emoji: '🌀', category: 'baking' },
  { id: 'u5', slug: 'mystery', name: 'Mystery', emoji: null, category: null },
];

const setup = async (utensils: UtensilRow[] = sample) => {
  const trpc = buildTrpcMock({
    onboardingCatalogs: {
      utensils: { query: vi.fn().mockResolvedValue(utensils) },
    },
  });
  const authStore = createMockAuthStore({ authReady: true });

  await TestBed.configureTestingModule({
    imports: [UtensilsStepComponent],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([]),
      { provide: PLATFORM_ID, useValue: 'server' },
      OnboardingStore,
      { provide: ONBOARDING_TRPC, useValue: trpc },
      { provide: AuthStore, useValue: authStore },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(UtensilsStepComponent);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();

  const store = TestBed.inject(OnboardingStore);
  const el = fixture.nativeElement as HTMLElement;
  return { fixture, el, store };
};

describe('UtensilsStepComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('renders heading and subtitle', async () => {
    const { el } = await setup();
    expect(el.textContent).toContain(UTENSILS_STRINGS.heading);
    expect(el.textContent).toContain(UTENSILS_STRINGS.subtitle);
  });

  it('groups utensils by category in fixed order', async () => {
    const { el } = await setup();
    const headings = Array.from(
      el.querySelectorAll('.utensils-step__category'),
    ).map((h) => h.textContent?.trim());
    // Order: cutting → cooking → baking → measuring → other
    expect(headings).toEqual([
      UTENSIL_CATEGORY_LABELS['cutting'],
      UTENSIL_CATEGORY_LABELS['cooking'],
      UTENSIL_CATEGORY_LABELS['baking'],
      UTENSILS_STRINGS.uncategorized,
    ]);
  });

  it('places null-category utensils under "Other"', async () => {
    const { el } = await setup();
    const groups = el.querySelectorAll('.utensils-step__group');
    const lastGroup = groups[groups.length - 1];
    expect(lastGroup?.textContent).toContain('Mystery');
    expect(lastGroup?.textContent).toContain(UTENSILS_STRINGS.uncategorized);
  });

  it('renders the empty state when no utensils are returned', async () => {
    const { el } = await setup([]);
    expect(el.textContent).toContain(UTENSILS_STRINGS.empty);
  });

  it('toggles utensil selection when a chip is clicked', async () => {
    const { fixture, el, store } = await setup();
    const firstChip = el.querySelector<HTMLElement>('mat-chip-option');
    expect(firstChip).toBeTruthy();
    firstChip?.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(store.utensilIds().size).toBe(1);
  });
});
