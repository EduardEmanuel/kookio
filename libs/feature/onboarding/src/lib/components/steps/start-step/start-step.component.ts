import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { START_STRINGS } from '../../../onboarding-strings';

@Component({
  selector: 'kookio-onboarding-start-step',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatChipsModule, MatIconModule],
  templateUrl: './start-step.component.html',
  styleUrl: './start-step.component.scss',
})
export class StartStepComponent {
  protected readonly strings = START_STRINGS;
}
