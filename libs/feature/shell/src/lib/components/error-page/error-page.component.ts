import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { KookioIconComponent } from '@kookio/shared-ui';
import type { MaterialSymbolName } from '@kookio/shared-utility';

export type ErrorCta =
  | { label: string; route: string }
  | { label: string; action: () => void };

@Component({
  selector: 'kookio-error-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatButtonModule, KookioIconComponent],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss',
})
export class ErrorPageComponent {
  readonly code = input.required<number>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly icon = input<MaterialSymbolName>('error');
  readonly primaryCta = input<ErrorCta | null>(null);
  readonly secondaryCta = input<ErrorCta | null>(null);
}
