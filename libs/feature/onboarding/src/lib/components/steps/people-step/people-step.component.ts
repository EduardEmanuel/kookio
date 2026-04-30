import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { KookioEmojiComponent, KookioIconComponent } from '@kookio/shared-ui';

import { PEOPLE_STRINGS } from '../../../onboarding-strings';
import { OnboardingStore } from '../../../store/onboarding.store';

@Component({
  selector: 'kookio-onboarding-people-step',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, KookioEmojiComponent, KookioIconComponent],
  templateUrl: './people-step.component.html',
  styleUrl: './people-step.component.scss',
})
export class PeopleStepComponent {
  protected readonly store = inject(OnboardingStore);
  protected readonly strings = PEOPLE_STRINGS;

  protected readonly decreaseAdults = (): void => {
    this.store.setAdultsCount(this.store.adultsCount() - 1);
  };

  protected readonly increaseAdults = (): void => {
    this.store.setAdultsCount(this.store.adultsCount() + 1);
  };

  protected readonly decreaseChildren = (): void => {
    this.store.setChildrenCount(this.store.childrenCount() - 1);
  };

  protected readonly increaseChildren = (): void => {
    this.store.setChildrenCount(this.store.childrenCount() + 1);
  };
}
