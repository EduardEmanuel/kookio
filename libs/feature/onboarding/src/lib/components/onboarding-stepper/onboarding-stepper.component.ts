import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { type StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';

import {
  ACTION_LABELS,
  STEP_LABELS,
  STEP_PLACEHOLDERS,
} from '../../onboarding-strings';
import { OnboardingStore } from '../../store/onboarding.store';

/** First and last steps cannot be skipped. */
const FIRST_SKIPPABLE_STEP = 1;
const LAST_SKIPPABLE_STEP = 4;

@Component({
  selector: 'kookio-onboarding-stepper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatStepperModule,
  ],
  templateUrl: './onboarding-stepper.component.html',
  styleUrl: './onboarding-stepper.component.scss',
})
export class OnboardingStepperComponent {
  protected readonly store = inject(OnboardingStore);
  protected readonly stepLabels = STEP_LABELS;
  protected readonly stepPlaceholders = STEP_PLACEHOLDERS;
  protected readonly actions = ACTION_LABELS;

  protected readonly canSkip = computed(() => {
    const s = this.store.currentStep();
    return s >= FIRST_SKIPPABLE_STEP && s <= LAST_SKIPPABLE_STEP;
  });

  protected onStepperSelectionChange = (event: StepperSelectionEvent): void => {
    this.store.goToStep(event.selectedIndex);
  };

  protected onSkip = (): void => {
    this.store.next();
  };

  protected onNext = (): void => {
    this.store.next();
  };

  protected onPrev = (): void => {
    this.store.prev();
  };

  protected onSubmit = (): void => {
    this.store.submit();
  };
}
