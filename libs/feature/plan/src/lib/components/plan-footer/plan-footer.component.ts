import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { PlanStore } from '../../store/plan.store';

/**
 * Page-level action bar for `/plan` — `Clear all` and `Save plan`.
 *
 * Lives outside `PlanCalendarComponent` so its sticky border can span
 * the full page width instead of being capped by the calendar's
 * `max-width: 1200px`. Communicates with the calendar exclusively via
 * the shared `PlanStore` (`providedIn: 'root'`), so no Input/Output
 * wiring is needed — both components inject the singleton store and
 * react to the same signals.
 */
@Component({
  selector: 'kookio-plan-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule],
  templateUrl: './plan-footer.component.html',
  styleUrl: './plan-footer.component.scss',
})
export class PlanFooterComponent {
  protected readonly store = inject(PlanStore);

  protected readonly onSave = (): void => {
    this.store.submit();
  };

  protected readonly onClearAll = (): void => {
    if (this.store.plannedCount() === 0) return;
    const ok =
      typeof window !== 'undefined' &&
      window.confirm(
        'Clear all planned meals? This cannot be undone until you save.',
      );
    if (ok) this.store.clearAll();
  };
}
