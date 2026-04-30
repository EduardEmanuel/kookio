import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { from } from 'rxjs';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { KookioEmojiComponent } from '@kookio/shared-ui';

import {
  UTENSIL_CATEGORY_LABELS,
  UTENSIL_CATEGORY_ORDER,
  UTENSILS_STRINGS,
} from '../../../onboarding-strings';
import {
  ONBOARDING_TRPC,
  OnboardingStore,
  type UtensilRow,
} from '../../../store/onboarding.store';

interface UtensilGroup {
  /** Stable key — DB category or `'__other__'` for unmapped/null. */
  key: string;
  label: string;
  items: UtensilRow[];
}

/** Stable sentinel key for utensils with no category or with unknown category. */
const OTHER_KEY = '__other__';

@Component({
  selector: 'kookio-onboarding-utensils-step',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatChipsModule, MatProgressSpinnerModule, KookioEmojiComponent],
  templateUrl: './utensils-step.component.html',
  styleUrl: './utensils-step.component.scss',
})
export class UtensilsStepComponent {
  protected readonly store = inject(OnboardingStore);
  protected readonly strings = UTENSILS_STRINGS;

  private readonly trpc = inject(ONBOARDING_TRPC);

  protected readonly utensils = toSignal(
    from(this.trpc.onboardingCatalogs.utensils.query()),
  );

  protected readonly grouped = computed<UtensilGroup[]>(() => {
    const data = this.utensils() ?? [];
    if (data.length === 0) return [];

    const buckets = new Map<string, UtensilRow[]>();
    for (const u of data) {
      const key =
        u.category && UTENSIL_CATEGORY_LABELS[u.category]
          ? u.category
          : OTHER_KEY;
      const bucket = buckets.get(key);
      if (bucket) bucket.push(u);
      else buckets.set(key, [u]);
    }

    const ordered: UtensilGroup[] = [];
    for (const cat of UTENSIL_CATEGORY_ORDER) {
      const items = buckets.get(cat);
      if (items?.length) {
        ordered.push({
          key: cat,
          label: UTENSIL_CATEGORY_LABELS[cat] ?? cat,
          items,
        });
        buckets.delete(cat);
      }
    }
    // Anything left over (unknown DB category or null) goes under "Other".
    const other = buckets.get(OTHER_KEY);
    if (other?.length) {
      ordered.push({
        key: OTHER_KEY,
        label: this.strings.uncategorized,
        items: other,
      });
    }
    return ordered;
  });

  protected readonly isSelected = (id: string): boolean =>
    this.store.utensilIds().has(id);

  protected readonly onToggle = (id: string): void => {
    this.store.toggleUtensil(id);
  };
}
