import {
  type Mock,
  type MockInstance,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Router, provideRouter } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthStore } from '@kookio/feature-auth';
import {
  type MockAuthStore,
  createMockAuthStore,
} from '@kookio/feature-auth/testing';

import AccountPage from './account.page';
import { TrpcClientApp } from '../../trpc-client';

interface SetupOptions {
  email?: string | null;
  sessionName?: string | null;
  hasProfileSignals?: boolean;
  resetMutation?: () => Promise<{ onboardingDone: boolean }>;
  updateNameMutation?: (input: { name: string }) => Promise<{ name: string }>;
}

interface SetupResult {
  fixture: ComponentFixture<AccountPage>;
  el: HTMLElement;
  authStore: MockAuthStore;
  resetMutate: Mock;
  updateNameMutate: Mock;
  navigateByUrl: MockInstance<Router['navigateByUrl']>;
  snackBarOpen: Mock;
}

const setup = async (opts: SetupOptions = {}): Promise<SetupResult> => {
  const email = opts.email === undefined ? 'user@example.com' : opts.email;
  const sessionName = opts.sessionName ?? null;
  const authStore = createMockAuthStore({
    currentUser: email ? { email } : null,
    session: email
      ? {
          uid: 'u-1',
          email,
          name: sessionName,
          roles: [],
          amr: ['password'],
          onboardingDone: true,
        }
      : null,
    isAuthenticated: !!email,
    hasProfileSignals: opts.hasProfileSignals ?? false,
  });

  const resetMutate = vi.fn(
    opts.resetMutation ?? (() => Promise.resolve({ onboardingDone: false })),
  );
  const updateNameMutate = vi.fn(
    opts.updateNameMutation ??
      (({ name }: { name: string }) => Promise.resolve({ name })),
  );
  const trpcStub = {
    onboarding: { reset: { mutate: resetMutate } },
    profile: { updateName: { mutate: updateNameMutate } },
  };

  const snackBarOpen = vi.fn();
  const snackBarStub = { open: snackBarOpen };

  await TestBed.configureTestingModule({
    imports: [AccountPage],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([]),
      { provide: AuthStore, useValue: authStore },
      { provide: TrpcClientApp, useValue: trpcStub },
      { provide: MatSnackBar, useValue: snackBarStub },
    ],
  }).compileComponents();

  const router = TestBed.inject(Router);
  const navigateByUrl = vi
    .spyOn(router, 'navigateByUrl')
    .mockResolvedValue(true);

  const fixture = TestBed.createComponent(AccountPage);
  fixture.detectChanges();
  await fixture.whenStable();

  return {
    fixture,
    el: fixture.nativeElement as HTMLElement,
    authStore,
    resetMutate,
    updateNameMutate,
    navigateByUrl,
    snackBarOpen,
  };
};

const findButtonByText = (el: HTMLElement, text: string): HTMLButtonElement => {
  const btn = Array.from(el.querySelectorAll('button')).find((b) =>
    (b.textContent ?? '').includes(text),
  );
  if (!btn) throw new Error(`Button containing "${text}" not found`);
  return btn as HTMLButtonElement;
};

const restartButton = (el: HTMLElement): HTMLButtonElement =>
  findButtonByText(el, 'Restart onboarding');

const saveNameButton = (el: HTMLElement): HTMLButtonElement =>
  findButtonByText(el, 'Save');

const nameInput = (el: HTMLElement): HTMLInputElement => {
  const input = el.querySelector<HTMLInputElement>(
    'input[formcontrolname="name"]',
  );
  if (!input) throw new Error('Name input not found');
  return input;
};

describe('AccountPage', () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  describe('static layout', () => {
    it('renders the Account heading and signed-in email', async () => {
      const { el } = await setup({ email: 'user@example.com' });

      expect(el.querySelector('h1')?.textContent?.trim()).toBe('Account');
      expect(el.querySelector('strong')?.textContent?.trim()).toBe(
        'user@example.com',
      );
    });

    it('shows nothing in the email slot when currentUser is null', async () => {
      const { el } = await setup({ email: null });

      expect(el.querySelector('strong')?.textContent?.trim()).toBe('');
    });
  });

  describe('Restart onboarding button — variant', () => {
    it('renders as filled when the user has no profile signals', async () => {
      const { el } = await setup({ hasProfileSignals: false });

      const btn = restartButton(el);
      expect(btn.classList.contains('mat-mdc-unelevated-button')).toBe(true);
      expect(btn.classList.contains('mat-mdc-outlined-button')).toBe(false);
      expect(btn.textContent).toContain('Restart onboarding');
    });

    it('renders as outlined when the user has profile signals', async () => {
      const { el } = await setup({ hasProfileSignals: true });

      const btn = restartButton(el);
      expect(btn.classList.contains('mat-mdc-outlined-button')).toBe(true);
      expect(btn.classList.contains('mat-mdc-unelevated-button')).toBe(false);
    });
  });

  describe('Restart onboarding — click flow', () => {
    it('calls reset mutation, flips the session flag, navigates to /onboarding', async () => {
      const { el, fixture, authStore, resetMutate, navigateByUrl } =
        await setup();

      restartButton(el).click();
      await fixture.whenStable();

      expect(resetMutate).toHaveBeenCalledTimes(1);
      expect(authStore.markOnboardingReset).toHaveBeenCalledTimes(1);
      expect(navigateByUrl).toHaveBeenCalledWith('/onboarding');
    });

    it('drops a second click while a reset is still in flight', async () => {
      let resolveMutation: (value: { onboardingDone: boolean }) => void = () =>
        undefined;
      const pending = new Promise<{ onboardingDone: boolean }>((r) => {
        resolveMutation = r;
      });

      const { el, fixture, resetMutate } = await setup({
        resetMutation: () => pending,
      });

      const btn = restartButton(el);
      btn.click();
      btn.click();
      btn.click();

      // Three clicks fired, but exhaustMap drops the latter two while the
      // first is still in flight.
      expect(resetMutate).toHaveBeenCalledTimes(1);

      resolveMutation({ onboardingDone: false });
      await fixture.whenStable();
    });

    it('shows a snackbar and does NOT navigate when the mutation rejects', async () => {
      const { el, fixture, authStore, navigateByUrl, snackBarOpen } =
        await setup({
          resetMutation: () => Promise.reject(new Error('boom')),
        });

      restartButton(el).click();
      await fixture.whenStable();

      expect(snackBarOpen).toHaveBeenCalledTimes(1);
      expect(snackBarOpen.mock.calls[0]?.[0]).toContain(
        'Could not restart onboarding',
      );
      expect(authStore.markOnboardingReset).not.toHaveBeenCalled();
      expect(navigateByUrl).not.toHaveBeenCalled();
    });
  });

  describe('Save name — flow', () => {
    it('pre-fills the input from session.name', async () => {
      const { el } = await setup({ sessionName: 'Ana' });

      expect(nameInput(el).value).toBe('Ana');
    });

    it('submits trimmed value, refetches the session, shows a snackbar', async () => {
      const { el, fixture, authStore, updateNameMutate, snackBarOpen } =
        await setup({ sessionName: '' });

      const input = nameInput(el);
      input.value = '  Ana Maria  ';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      await fixture.whenStable();

      saveNameButton(el).click();
      await fixture.whenStable();

      expect(updateNameMutate).toHaveBeenCalledTimes(1);
      expect(updateNameMutate.mock.calls[0]?.[0]).toEqual({
        name: 'Ana Maria',
      });
      expect(authStore.fetchSession).toHaveBeenCalledTimes(1);
      expect(snackBarOpen.mock.calls[0]?.[0]).toContain('Saved.');
    });

    it('does NOT call the mutation when the input is empty', async () => {
      const { el, fixture, updateNameMutate } = await setup({
        sessionName: '',
      });

      saveNameButton(el).click();
      await fixture.whenStable();

      expect(updateNameMutate).not.toHaveBeenCalled();
    });

    it('shows a snackbar and does NOT refetch the session when the mutation rejects', async () => {
      const { el, fixture, authStore, snackBarOpen } = await setup({
        sessionName: '',
        updateNameMutation: () => Promise.reject(new Error('boom')),
      });

      const input = nameInput(el);
      input.value = 'Ana';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      await fixture.whenStable();

      saveNameButton(el).click();
      await fixture.whenStable();

      expect(snackBarOpen).toHaveBeenCalledTimes(1);
      expect(snackBarOpen.mock.calls[0]?.[0]).toContain(
        'Could not save your name',
      );
      expect(authStore.fetchSession).not.toHaveBeenCalled();
    });
  });
});
