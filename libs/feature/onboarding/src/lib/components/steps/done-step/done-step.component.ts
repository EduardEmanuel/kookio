import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

import { KookioEmojiComponent, KookioIconComponent } from '@kookio/shared-ui';
import type { MaterialSymbolName } from '@kookio/shared-utility';

import { DONE_STRINGS } from '../../../onboarding-strings';
import { OnboardingStore } from '../../../store/onboarding.store';

interface SummaryChip {
  key: string;
  icon: MaterialSymbolName;
  label: string;
  emphasis?: 'warn';
}

@Component({
  selector: 'kookio-onboarding-done-step',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatChipsModule, KookioEmojiComponent, KookioIconComponent],
  templateUrl: './done-step.component.html',
  styleUrl: './done-step.component.scss',
})
export class DoneStepComponent {
  protected readonly store = inject(OnboardingStore);
  protected readonly strings = DONE_STRINGS;

  protected readonly chips = computed<SummaryChip[]>(() => {
    const result: SummaryChip[] = [
      {
        key: 'people',
        icon: 'group',
        label: this.strings.summary.people(
          this.store.adultsCount(),
          this.store.childrenCount(),
        ),
      },
    ];

    const cats = this.store.preferredCategoryIds().size;
    if (cats > 0) {
      result.push({
        key: 'categories',
        icon: 'menu_book',
        label: this.strings.summary.categories(cats),
      });
    }

    const areas = this.store.preferredAreaIds().size;
    if (areas > 0) {
      result.push({
        key: 'areas',
        icon: 'public',
        label: this.strings.summary.areas(areas),
      });
    }

    const utensils = this.store.utensilIds().size;
    if (utensils > 0) {
      result.push({
        key: 'utensils',
        icon: 'restaurant',
        label: this.strings.summary.utensils(utensils),
      });
    }

    const restrictions = this.store.dietaryRestrictionIds().size;
    if (restrictions > 0) {
      result.push({
        key: 'restrictions',
        icon: 'no_food',
        label: this.strings.summary.restrictions(restrictions),
        emphasis: 'warn',
      });
    }

    return result;
  });
}
