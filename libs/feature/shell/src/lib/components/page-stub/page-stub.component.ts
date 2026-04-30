import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { KookioIconComponent } from '@kookio/shared-ui';
import type { MaterialSymbolName } from '@kookio/shared-utility';

@Component({
  selector: 'kookio-page-stub',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, KookioIconComponent],
  templateUrl: './page-stub.component.html',
  styleUrl: './page-stub.component.scss',
})
export class PageStubComponent {
  readonly icon = input<MaterialSymbolName | ''>('');
  readonly title = input<string>('');
  readonly route = input<string>('');
  readonly subtitle = input<string>('');
  readonly placeholder = input<string>(
    'This page will be implemented in a future iteration.',
  );
}
