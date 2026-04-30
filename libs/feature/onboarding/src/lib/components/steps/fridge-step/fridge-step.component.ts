import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { from } from 'rxjs';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';

import { KookioIconComponent } from '@kookio/shared-ui';

import { FRIDGE_STRINGS } from '../../../onboarding-strings';
import {
  ONBOARDING_TRPC,
  OnboardingStore,
} from '../../../store/onboarding.store';

@Component({
  selector: 'kookio-onboarding-fridge-step',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    KookioIconComponent,
  ],
  templateUrl: './fridge-step.component.html',
  styleUrl: './fridge-step.component.scss',
})
export class FridgeStepComponent {
  protected readonly store = inject(OnboardingStore);
  protected readonly strings = FRIDGE_STRINGS;

  private readonly trpc = inject(ONBOARDING_TRPC);

  protected readonly categories = toSignal(
    from(this.trpc.onboardingCatalogs.mealCategories.query()),
  );

  protected readonly areas = toSignal(
    from(this.trpc.onboardingCatalogs.mealAreas.query()),
  );

  protected readonly isCategorySelected = (id: string): boolean =>
    this.store.preferredCategoryIds().has(id);

  protected readonly isAreaSelected = (id: string): boolean =>
    this.store.preferredAreaIds().has(id);

  protected readonly toggleCategory = (id: string): void => {
    this.store.togglePreferredCategory(id);
  };

  protected readonly toggleArea = (id: string): void => {
    this.store.togglePreferredArea(id);
  };
}
