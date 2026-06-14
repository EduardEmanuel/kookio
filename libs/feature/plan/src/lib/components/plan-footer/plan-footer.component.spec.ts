import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, signal } from '@angular/core';

import { PlanStore } from '../../store/plan.store';
import { PlanFooterComponent } from './plan-footer.component';

type StoreOverrides = {
  hasLoadedOnce?: boolean;
  plannedCount?: number;
  isDirty?: boolean;
  isSubmitting?: boolean;
};

const makeStore = (o: StoreOverrides = {}) => ({
  hasLoadedOnce: signal(o.hasLoadedOnce ?? true),
  plannedCount: signal(o.plannedCount ?? 0),
  isDirty: signal(o.isDirty ?? false),
  isSubmitting: signal(o.isSubmitting ?? false),
  submit: vi.fn(),
  clearAll: vi.fn(),
});

const setup = async (store: ReturnType<typeof makeStore>) => {
  await TestBed.configureTestingModule({
    imports: [PlanFooterComponent],
    providers: [
      provideZonelessChangeDetection(),
      { provide: PlanStore, useValue: store as unknown as PlanStore },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(PlanFooterComponent);
  fixture.detectChanges();
  await fixture.whenStable();

  return { el: fixture.nativeElement as HTMLElement };
};

const buttonByText = (el: HTMLElement, text: RegExp): HTMLButtonElement =>
  [...el.querySelectorAll('button')].find((b) =>
    text.test(b.textContent ?? ''),
  ) as HTMLButtonElement;

describe('PlanFooterComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
    vi.restoreAllMocks();
  });

  it('hides the footer until the plan has loaded once', async () => {
    const { el } = await setup(makeStore({ hasLoadedOnce: false }));
    expect(el.querySelector('.plan-footer')).toBeNull();
  });

  it('renders the footer once loaded', async () => {
    const { el } = await setup(makeStore({ hasLoadedOnce: true }));
    expect(el.querySelector('.plan-footer')).toBeTruthy();
  });

  describe('Clear all', () => {
    it('is disabled when nothing is planned', async () => {
      const { el } = await setup(makeStore({ plannedCount: 0 }));
      expect(buttonByText(el, /clear all/i).disabled).toBe(true);
    });

    it('clears after confirmation when meals are planned', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(true);
      const store = makeStore({ plannedCount: 3 });
      const { el } = await setup(store);
      const clear = buttonByText(el, /clear all/i);
      expect(clear.disabled).toBe(false);
      clear.click();
      expect(window.confirm).toHaveBeenCalled();
      expect(store.clearAll).toHaveBeenCalled();
    });

    it('does not clear when confirmation is cancelled', async () => {
      vi.spyOn(window, 'confirm').mockReturnValue(false);
      const store = makeStore({ plannedCount: 3 });
      const { el } = await setup(store);
      buttonByText(el, /clear all/i).click();
      expect(store.clearAll).not.toHaveBeenCalled();
    });
  });

  describe('Save plan', () => {
    it('is disabled until the plan is dirty', async () => {
      const { el } = await setup(makeStore({ isDirty: false }));
      expect(buttonByText(el, /save plan/i).disabled).toBe(true);
    });

    it('is enabled when dirty and submits on click', async () => {
      const store = makeStore({ isDirty: true });
      const { el } = await setup(store);
      const save = buttonByText(el, /save plan/i);
      expect(save.disabled).toBe(false);
      save.click();
      expect(store.submit).toHaveBeenCalled();
    });

    it('shows "Saving…" and stays disabled while submitting', async () => {
      const { el } = await setup(
        makeStore({ isDirty: true, isSubmitting: true }),
      );
      const save = buttonByText(el, /saving/i);
      expect(save).toBeTruthy();
      expect(save.disabled).toBe(true);
    });
  });
});
