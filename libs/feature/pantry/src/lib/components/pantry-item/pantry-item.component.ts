import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import type { PantryItemWithIngredient } from '@kookio/prisma-client';
import { KookioIconComponent } from '@kookio/shared-ui';

import { formatMeasureUnit } from '../../utils/measure-unit-label';
import {
  getExpirationLabel,
  getExpirationStatus,
} from '../../utils/expiration';

@Component({
  selector: 'kookio-pantry-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, KookioIconComponent],
  templateUrl: './pantry-item.component.html',
  styleUrl: './pantry-item.component.scss',
})
export class PantryItemComponent {
  readonly item = input.required<PantryItemWithIngredient>();
  readonly edit = output<PantryItemWithIngredient>();
  readonly remove = output<string>();

  protected readonly status = computed(() =>
    getExpirationStatus(this.item().expiresAt),
  );

  protected readonly expirationLabel = computed(() =>
    getExpirationLabel(this.item().expiresAt),
  );

  protected readonly unitLabel = computed(() =>
    formatMeasureUnit(this.item().unit),
  );

  protected readonly onEdit = (): void => {
    this.edit.emit(this.item());
  };

  /**
   * Confirms via the native browser dialog before emitting `remove`. The
   * project has no shared confirmation component yet — adding one for a
   * single delete affordance would be over-engineering. Click handlers
   * only fire post-hydration, so `window.confirm` is safe in SSR.
   */
  protected readonly onRemove = (): void => {
    const ok = window.confirm(
      `Remove ${this.item().ingredient.name} from pantry?`,
    );
    if (ok) this.remove.emit(this.item().id);
  };
}
