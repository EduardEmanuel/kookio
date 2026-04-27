import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'kookio-page-stub',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './page-stub.component.html',
  styleUrl: './page-stub.component.scss',
})
export class PageStubComponent {
  readonly icon = input<string>('');
  readonly title = input<string>('');
  readonly route = input<string>('');
  readonly subtitle = input<string>('');
  readonly placeholder = input<string>(
    'This page will be implemented in a future iteration.',
  );
}
