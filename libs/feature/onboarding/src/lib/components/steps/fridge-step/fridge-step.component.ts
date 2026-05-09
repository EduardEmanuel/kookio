import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { from } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';

import {
  PantryFormComponent,
  PantryItemComponent,
} from '@kookio/feature-pantry';
import { KookioEmojiComponent } from '@kookio/shared-ui';

import { FRIDGE_STRINGS } from '../../../onboarding-strings';
import {
  ONBOARDING_TRPC,
  OnboardingStore,
} from '../../../store/onboarding.store';

@Component({
  selector: 'kookio-onboarding-fridge-step',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    KookioEmojiComponent,
    PantryFormComponent,
    PantryItemComponent,
  ],
  templateUrl: './fridge-step.component.html',
  styleUrl: './fridge-step.component.scss',
})
export class FridgeStepComponent {
  protected readonly store = inject(OnboardingStore);
  protected readonly strings = FRIDGE_STRINGS;

  private readonly trpc = inject(ONBOARDING_TRPC);

  protected readonly form = viewChild(PantryFormComponent);

  protected readonly stagedItems = computed(() =>
    this.store.stagedPantryItems(),
  );

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

  protected readonly onAddToFridge = (): void => {
    const f = this.form();
    if (!f) return;
    const value = f.value();
    const ingredient = f.selectedIngredient();
    if (!value || !ingredient) return;
    this.store.stagePantryItem({
      id: ingredient.id,
      ingredient: {
        name: ingredient.name,
        imageUrl: ingredient.imageUrl,
      },
      quantity: value.quantity,
      unit: value.unit,
      expiresAt: value.expiresAt ? new Date(value.expiresAt) : null,
    });
    f.reset();
  };

  protected readonly onRemoveStaged = (id: string): void => {
    this.store.removeStagedPantryItem(id);
  };
}
