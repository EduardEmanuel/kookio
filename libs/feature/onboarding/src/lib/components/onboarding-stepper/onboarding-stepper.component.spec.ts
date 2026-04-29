import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';

import { ACTION_LABELS } from '../../onboarding-strings';
import {
  ONBOARDING_TRPC,
  OnboardingStore,
  type OnboardingTrpcClient,
} from '../../store/onboarding.store';
import { OnboardingStepperComponent } from './onboarding-stepper.component';

const buildTrpc = (): OnboardingTrpcClient => ({
  onboarding: {
    commit: { mutate: vi.fn().mockResolvedValue({ onboardingDone: true }) },
    current: {
      query: vi.fn().mockResolvedValue({
        adultsCount: 1,
        childrenCount: 0,
        preferredCategoryIds: [],
        preferredAreaIds: [],
        utensilIds: [],
        dietaryRestrictionIds: [],
      }),
    },
  },
});

const setup = async () => {
  const trpc = buildTrpc();
  const authStore = createMockAuthStore({ authReady: true });

  await TestBed.configureTestingModule({
    imports: [OnboardingStepperComponent],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([]),
      { provide: PLATFORM_ID, useValue: 'server' },
      OnboardingStore,
      { provide: ONBOARDING_TRPC, useValue: trpc },
      { provide: AuthStore, useValue: authStore },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(OnboardingStepperComponent);
  fixture.detectChanges();
  await fixture.whenStable();

  const store = TestBed.inject(OnboardingStore);
  const el = fixture.nativeElement as HTMLElement;
  return { fixture, el, store, trpc };
};

const visibleButtonTexts = (el: HTMLElement): string[] =>
  Array.from(el.querySelectorAll('.onboarding-shell__footer button'))
    .map((b) => b.textContent?.trim() ?? '')
    .filter(Boolean);

describe('OnboardingStepperComponent', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  describe('first step', () => {
    it('renders only the start button', async () => {
      const { el } = await setup();
      const texts = visibleButtonTexts(el);
      expect(texts).toEqual(
        expect.arrayContaining([expect.stringContaining(ACTION_LABELS.start)]),
      );
      expect(texts.some((t) => t.includes(ACTION_LABELS.back))).toBe(false);
      expect(texts.some((t) => t.includes(ACTION_LABELS.skip))).toBe(false);
    });
  });

  describe('intermediate steps (1..4)', () => {
    it('shows back, skip, and continue on step 1', async () => {
      const { fixture, el, store } = await setup();
      store.goToStep(1);
      fixture.detectChanges();
      await fixture.whenStable();

      const texts = visibleButtonTexts(el);
      expect(texts.some((t) => t.includes(ACTION_LABELS.back))).toBe(true);
      expect(texts.some((t) => t.includes(ACTION_LABELS.skip))).toBe(true);
      expect(texts.some((t) => t.includes(ACTION_LABELS.continue))).toBe(true);
    });

    it('shows skip on step 4', async () => {
      const { fixture, el, store } = await setup();
      store.goToStep(4);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(
        visibleButtonTexts(el).some((t) => t.includes(ACTION_LABELS.skip)),
      ).toBe(true);
    });
  });

  describe('last step', () => {
    it('hides skip and back, renders the submit label', async () => {
      const { fixture, el, store } = await setup();
      store.goToStep(5);
      fixture.detectChanges();
      await fixture.whenStable();

      const texts = visibleButtonTexts(el);
      expect(texts.some((t) => t.includes(ACTION_LABELS.submit))).toBe(true);
      expect(texts.some((t) => t.includes(ACTION_LABELS.skip))).toBe(false);
      expect(texts.some((t) => t.includes(ACTION_LABELS.back))).toBe(false);
    });

    it('shows the spinner and disables submit while submitting', async () => {
      const { fixture, el, store } = await setup();
      store.goToStep(5);
      fixture.detectChanges();
      await fixture.whenStable();

      const submit = el.querySelector(
        '.onboarding-shell__footer button[mat-flat-button]',
      ) as HTMLButtonElement | null;
      expect(submit).toBeTruthy();

      // Click — but mock the mutation to keep the in-flight state forever.
      const trpc = TestBed.inject(ONBOARDING_TRPC);
      vi.spyOn(trpc.onboarding.commit, 'mutate').mockReturnValue(
        new Promise(() => {
          /* never resolves — locks isSubmitting at true */
        }),
      );

      submit?.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(store.isSubmitting()).toBe(true);
      expect(submit?.disabled).toBe(true);
      expect(el.querySelector('mat-progress-spinner')).toBeTruthy();
    });
  });

  describe('error surface', () => {
    it('renders submitError after a failed mutation', async () => {
      const { fixture, el, store } = await setup();
      const trpc = TestBed.inject(ONBOARDING_TRPC);
      vi.spyOn(trpc.onboarding.commit, 'mutate').mockRejectedValue(
        new Error('Network error'),
      );

      store.goToStep(5);
      store.submit();
      await new Promise<void>((resolve) => setTimeout(resolve, 0));
      fixture.detectChanges();

      expect(store.submitError()).toBe('Network error');
      expect(
        el.querySelector('.onboarding-shell__error')?.textContent?.trim(),
      ).toContain('Network error');
    });
  });
});
