import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import type { SavedRecipeRow } from '@kookio/prisma-client';
import { KookioIconComponent } from '@kookio/shared-ui';

import { SavedStore } from '../../store/saved.store';

/** Visual presentation of the toggle. `button` puts a label beside the icon
 * (recipe-detail page next to "Cook now"); `iconOnly` is the compact overlay
 * used on match cards and saved-page cards. */
export type SaveToggleVariant = 'button' | 'iconOnly';

/**
 * Sibling-component collaboration: every save surface across the app injects
 * the same singleton `SavedStore` and reads `isSaved(recipeId)` synchronously
 * from the hydrated id set. Toggling on one surface (match card) reflects
 * instantly on every other (detail page, saved page) — no event-bus, no
 * Input/Output threading.
 */
@Component({
  selector: 'kookio-save-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, KookioIconComponent],
  templateUrl: './save-toggle.component.html',
  styleUrl: './save-toggle.component.scss',
})
export class SaveToggleComponent {
  readonly recipeId = input.required<string>();
  readonly variant = input<SaveToggleVariant>('iconOnly');

  /**
   * Card data carried through to optimistic `items` insert when a recipe is
   * saved from a non-saved-page surface (recipe detail, match cards). Optional
   * — omitting it means the `/recipes/saved` page will only see the new entry
   * after its next `load()` call.
   */
  readonly recipe = input<SavedRecipeRow | null>(null);

  private readonly store = inject(SavedStore);

  protected readonly isSaved = computed(() =>
    this.store.isSaved(this.recipeId()),
  );

  protected readonly isPending = computed(() =>
    this.store.isPending(this.recipeId()),
  );

  protected readonly ariaLabel = computed(() =>
    this.isSaved() ? 'Remove from saved' : 'Save recipe',
  );

  protected readonly onToggle = (event: MouseEvent): void => {
    // The toggle is regularly rendered inside `<a>` cards (match-card,
    // saved-page-card); without stopPropagation a save click would also
    // navigate to the recipe detail page.
    event.preventDefault();
    event.stopPropagation();
    if (this.isPending()) return;
    this.store.toggleSave({
      recipeId: this.recipeId(),
      recipe: this.recipe() ?? undefined,
    });
  };
}
