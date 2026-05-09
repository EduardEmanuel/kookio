import { inject } from '@angular/core';
import type { CanDeactivateFn } from '@angular/router';

import { PlanStore } from './store/plan.store';

/**
 * Prevents navigating away from `/plan` while the editor has unsaved
 * changes (or a save is in flight). Reads the singleton `PlanStore` so it
 * can stay decoupled from the page component instance — no hooks required.
 *
 * Uses `window.confirm` for the prompt because the project's MatDialog
 * usage today is form-driven; a tiny native confirm is sufficient and
 * avoids pulling MatDialog into the guard's dependency graph.
 */
export const planCanDeactivate: CanDeactivateFn<unknown> = () => {
  const store = inject(PlanStore);
  if (!store.blockNavigation()) return true;
  if (typeof window === 'undefined') return true;
  return window.confirm('You have unsaved changes to your plan. Leave anyway?');
};
