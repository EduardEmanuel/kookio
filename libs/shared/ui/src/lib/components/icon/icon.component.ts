import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import type { MaterialSymbolName } from '@kookio/shared-utility';

@Component({
  selector: 'kookio-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  templateUrl: './icon.component.html',
})
export class KookioIconComponent {
  readonly name = input.required<MaterialSymbolName>();
  readonly filled = input(false);
}
