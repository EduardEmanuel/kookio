import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';

import { SAVED_TRPC, type SavedTrpcClient } from '../../saved-trpc';
import { SaveToggleComponent } from './save-toggle.component';

const flush = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

const setup = async (
  componentInputs: { recipeId: string; variant?: 'button' | 'iconOnly' },
  trpcOverrides?: Partial<SavedTrpcClient['recipeCollection']>,
) => {
  const getSaved = vi.fn().mockResolvedValue([]);
  const getSavedIds = vi.fn().mockResolvedValue([]);
  const toggleSave = vi
    .fn()
    .mockResolvedValue({ recipeId: componentInputs.recipeId, saved: true });

  const trpc: SavedTrpcClient = {
    recipeCollection: {
      getSaved: { query: getSaved, ...trpcOverrides?.getSaved },
      getSavedIds: { query: getSavedIds, ...trpcOverrides?.getSavedIds },
      toggleSave: { mutate: toggleSave, ...trpcOverrides?.toggleSave },
    },
  };

  const authStore = createMockAuthStore({ session: null });

  await TestBed.configureTestingModule({
    imports: [SaveToggleComponent],
    providers: [
      provideZonelessChangeDetection(),
      { provide: AuthStore, useValue: authStore },
      { provide: SAVED_TRPC, useValue: trpc },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(SaveToggleComponent);
  fixture.componentRef.setInput('recipeId', componentInputs.recipeId);
  if (componentInputs.variant) {
    fixture.componentRef.setInput('variant', componentInputs.variant);
  }
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();

  return {
    fixture,
    el: fixture.nativeElement as HTMLElement,
    toggleSave,
  };
};

describe('SaveToggleComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
    vi.restoreAllMocks();
  });

  it('renders the "Save" label in button variant when not saved', async () => {
    const { el } = await setup({ recipeId: 'r1', variant: 'button' });
    const btn = el.querySelector('button') as HTMLButtonElement;
    expect(btn).toBeTruthy();
    expect(btn.getAttribute('aria-label')).toMatch(/save recipe/i);
    expect(btn.textContent).toMatch(/save/i);
  });

  it('calls toggleSave on click', async () => {
    const { el, fixture, toggleSave } = await setup({
      recipeId: 'r1',
      variant: 'iconOnly',
    });

    const btn = el.querySelector('button') as HTMLButtonElement;
    btn.click();
    fixture.detectChanges();
    await flush();

    expect(toggleSave).toHaveBeenCalledWith({ recipeId: 'r1' });
  });

  it('disables the button while a toggle is pending', async () => {
    let resolveToggle: (v: { recipeId: string; saved: boolean }) => void =
      // assigned in the promise below
      () => undefined;
    const togglePromise = new Promise<{ recipeId: string; saved: boolean }>(
      (resolve) => {
        resolveToggle = resolve;
      },
    );
    const { el, fixture } = await setup(
      { recipeId: 'r1', variant: 'iconOnly' },
      { toggleSave: { mutate: vi.fn().mockReturnValue(togglePromise) } },
    );

    const btn = el.querySelector('button') as HTMLButtonElement;
    btn.click();
    fixture.detectChanges();
    await flush();
    fixture.detectChanges();
    expect(btn.disabled).toBe(true);

    resolveToggle({ recipeId: 'r1', saved: true });
    await flush();
    fixture.detectChanges();
    await flush();

    expect(btn.disabled).toBe(false);
  });

  it('stops propagation so the wrapping anchor does not navigate', async () => {
    const { el, fixture } = await setup({ recipeId: 'r1' });

    const btn = el.querySelector('button') as HTMLButtonElement;
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    const stopPropagationSpy = vi.spyOn(event, 'stopPropagation');
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
    btn.dispatchEvent(event);
    fixture.detectChanges();

    expect(stopPropagationSpy).toHaveBeenCalled();
    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
