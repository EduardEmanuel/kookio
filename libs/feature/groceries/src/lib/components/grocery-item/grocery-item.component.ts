import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { formatMeasureUnit } from '@kookio/shared-utility/measure-units';

import type { GroceryItem } from '../../groceries-trpc';

/**
 * Single row in the grocery list. Bought-state is rendered straight from
 * `item().isBought` — the page's store applies optimistic updates upstream
 * so the checkbox flips immediately on toggle.
 */
@Component({
  selector: 'kookio-grocery-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCheckboxModule],
  templateUrl: './grocery-item.component.html',
  styleUrl: './grocery-item.component.scss',
})
export class GroceryItemComponent {
  readonly item = input.required<GroceryItem>();
  // Named `boughtChange` (not `toggle`) because `toggle` collides with
  // the native HTMLDetailsElement event — `@angular-eslint/no-output-native`
  // bans those names to keep templates unambiguous.
  readonly boughtChange = output<string>();

  protected readonly quantityLabel = computed(() => {
    const { totalQuantity, unit } = this.item();
    const unitLabel = formatMeasureUnit(unit);
    if (totalQuantity !== null) {
      // 2-decimal cap keeps scaled ratios readable (e.g. 1.33 instead of
      // 1.3333333). Drops trailing zeros so `200` renders as `200`.
      const rounded = Math.round(totalQuantity * 100) / 100;
      return unitLabel ? `${rounded} ${unitLabel}` : `${rounded}`;
    }
    return unitLabel || 'as needed';
  });

  protected readonly onToggle = (): void => {
    this.boughtChange.emit(this.item().ingredientCatalogId);
  };
}
