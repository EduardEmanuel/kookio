import { afterEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';

import { PEOPLE_STRINGS } from '../../../onboarding-strings';
import {
  ONBOARDING_TRPC,
  OnboardingStore,
} from '../../../store/onboarding.store';
import { buildTrpcMock } from '../../../testing/build-trpc-mock';
import { PeopleStepComponent } from './people-step.component';

const setup = async () => {
  const trpc = buildTrpcMock();
  const authStore = createMockAuthStore({ authReady: true });

  await TestBed.configureTestingModule({
    imports: [PeopleStepComponent],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([]),
      { provide: PLATFORM_ID, useValue: 'server' },
      OnboardingStore,
      { provide: ONBOARDING_TRPC, useValue: trpc },
      { provide: AuthStore, useValue: authStore },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(PeopleStepComponent);
  fixture.detectChanges();
  await fixture.whenStable();

  const store = TestBed.inject(OnboardingStore);
  const el = fixture.nativeElement as HTMLElement;
  const buttonByLabel = (label: string) =>
    el.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`);

  return { fixture, el, store, buttonByLabel };
};

describe('PeopleStepComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('renders heading and subtitle', async () => {
    const { el } = await setup();
    expect(el.textContent).toContain(PEOPLE_STRINGS.heading);
    expect(el.textContent).toContain(PEOPLE_STRINGS.subtitle);
  });

  it('starts at 1 adult and 0 children with decrement disabled at boundaries', async () => {
    const { store, buttonByLabel } = await setup();
    expect(store.adultsCount()).toBe(1);
    expect(store.childrenCount()).toBe(0);
    expect(buttonByLabel(PEOPLE_STRINGS.decreaseAdults)?.disabled).toBe(true);
    expect(buttonByLabel(PEOPLE_STRINGS.decreaseChildren)?.disabled).toBe(true);
  });

  it('increments adults via the + button', async () => {
    const { fixture, store, buttonByLabel } = await setup();
    buttonByLabel(PEOPLE_STRINGS.increaseAdults)?.click();
    fixture.detectChanges();
    expect(store.adultsCount()).toBe(2);
  });

  it('increments children via the + button', async () => {
    const { fixture, store, buttonByLabel } = await setup();
    buttonByLabel(PEOPLE_STRINGS.increaseChildren)?.click();
    fixture.detectChanges();
    expect(store.childrenCount()).toBe(1);
  });

  it('caps adults at 20', async () => {
    const { fixture, store, buttonByLabel } = await setup();
    store.setAdultsCount(20);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(buttonByLabel(PEOPLE_STRINGS.increaseAdults)?.disabled).toBe(true);
  });
});
