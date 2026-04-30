import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { from } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { RESTRICTIONS_STRINGS } from '../../../onboarding-strings';
import {
  ONBOARDING_TRPC,
  OnboardingStore,
} from '../../../store/onboarding.store';

@Component({
  selector: 'kookio-onboarding-restrictions-step',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCheckboxModule, MatProgressSpinnerModule],
  templateUrl: './restrictions-step.component.html',
  styleUrl: './restrictions-step.component.scss',
})
export class RestrictionsStepComponent {
  protected readonly store = inject(OnboardingStore);
  protected readonly strings = RESTRICTIONS_STRINGS;

  private readonly trpc = inject(ONBOARDING_TRPC);

  // No `initialValue` — `toSignal` natively returns `Signal<T | undefined>`,
  // and the template branches on `undefined` to render the loading state.
  protected readonly restrictions = toSignal(
    from(this.trpc.onboardingCatalogs.dietaryRestrictions.query()),
  );

  protected readonly isChecked = (id: string): boolean =>
    this.store.dietaryRestrictionIds().has(id);

  protected readonly onToggle = (id: string, checked: boolean): void => {
    if (checked === this.isChecked(id)) return;
    this.store.toggleDietaryRestriction(id);
  };
}
