import { afterEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';

import {
  ONBOARDING_TRPC,
  OnboardingStore,
} from '../../../store/onboarding.store';
import { buildTrpcMock } from '../../../testing/build-trpc-mock';
import { START_STRINGS } from '../../../onboarding-strings';
import { StartStepComponent } from './start-step.component';

const setup = async () => {
  await TestBed.configureTestingModule({
    imports: [StartStepComponent],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([]),
      OnboardingStore,
      { provide: ONBOARDING_TRPC, useValue: buildTrpcMock() },
      {
        provide: AuthStore,
        useValue: createMockAuthStore({ authReady: true }),
      },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(StartStepComponent);
  fixture.detectChanges();
  await fixture.whenStable();

  return {
    fixture,
    el: fixture.nativeElement as HTMLElement,
    store: TestBed.inject(OnboardingStore),
  };
};

describe('StartStepComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('renders the heading and subtitle from STRINGS', async () => {
    const { el } = await setup();
    expect(el.textContent).toContain(START_STRINGS.heading);
    expect(el.textContent).toContain(START_STRINGS.subtitle);
  });

  it('renders all four overview chips', async () => {
    const { el } = await setup();
    const text = el.textContent ?? '';
    expect(text).toContain(START_STRINGS.chips.pantry);
    expect(text).toContain(START_STRINGS.chips.utensils);
    expect(text).toContain(START_STRINGS.chips.people);
    expect(text).toContain(START_STRINGS.chips.restrictions);
  });

  it('renders the name input with the configured label', async () => {
    const { el } = await setup();
    const input = el.querySelector('input[matInput]');
    expect(input).not.toBeNull();
    expect(el.textContent ?? '').toContain(START_STRINGS.nameLabel);
  });

  it('writes input changes through to OnboardingStore.name', async () => {
    const { el, store, fixture } = await setup();
    const input = el.querySelector('input[matInput]') as HTMLInputElement;

    input.value = 'Ana';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(store.name()).toBe('Ana');
    expect(store.nameIsValid()).toBe(true);
  });

  it('keeps nameIsValid false for whitespace-only input', async () => {
    const { el, store, fixture } = await setup();
    const input = el.querySelector('input[matInput]') as HTMLInputElement;

    input.value = '   ';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(store.nameIsValid()).toBe(false);
  });
});
