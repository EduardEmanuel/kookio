import { afterEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';

import { DONE_STRINGS } from '../../../onboarding-strings';
import {
  ONBOARDING_TRPC,
  OnboardingStore,
} from '../../../store/onboarding.store';
import { buildTrpcMock } from '../../../testing/build-trpc-mock';
import { DoneStepComponent } from './done-step.component';

const setup = async () => {
  const trpc = buildTrpcMock();
  const authStore = createMockAuthStore({ authReady: true });

  await TestBed.configureTestingModule({
    imports: [DoneStepComponent],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([]),
      { provide: PLATFORM_ID, useValue: 'server' },
      OnboardingStore,
      { provide: ONBOARDING_TRPC, useValue: trpc },
      { provide: AuthStore, useValue: authStore },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(DoneStepComponent);
  fixture.detectChanges();
  await fixture.whenStable();

  const store = TestBed.inject(OnboardingStore);
  const el = fixture.nativeElement as HTMLElement;
  return { fixture, el, store };
};

describe('DoneStepComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('renders heading and CTA copy', async () => {
    const { el } = await setup();
    expect(el.textContent).toContain(DONE_STRINGS.heading);
    expect(el.textContent).toContain(DONE_STRINGS.cta);
  });

  it('always shows the people chip with default 1 adult / 0 children', async () => {
    const { el } = await setup();
    expect(el.textContent).toContain(DONE_STRINGS.summary.people(1, 0));
  });

  it('hides optional chips when their selection set is empty', async () => {
    const { el } = await setup();
    const chipCount = el.querySelectorAll('mat-chip').length;
    // Only the always-on people chip is rendered.
    expect(chipCount).toBe(1);
  });

  it('shows category, area, utensil and restriction chips when selections exist', async () => {
    const { fixture, el, store } = await setup();
    store.togglePreferredCategory('c1');
    store.togglePreferredArea('a1');
    store.toggleUtensil('u1');
    store.toggleDietaryRestriction('d1');
    fixture.detectChanges();
    await fixture.whenStable();

    const text = el.textContent ?? '';
    expect(text).toContain(DONE_STRINGS.summary.categories(1));
    expect(text).toContain(DONE_STRINGS.summary.areas(1));
    expect(text).toContain(DONE_STRINGS.summary.utensils(1));
    expect(text).toContain(DONE_STRINGS.summary.restrictions(1));
  });

  it('reflects updated counts via the people chip', async () => {
    const { fixture, el, store } = await setup();
    store.setAdultsCount(2);
    store.setChildrenCount(3);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(el.textContent).toContain(DONE_STRINGS.summary.people(2, 3));
  });
});
