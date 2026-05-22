import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';

import { AuthStore } from '@kookio/feature-auth';
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
  imports: [MatButtonModule, MatTooltipModule, KookioIconComponent],
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
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  protected readonly isSaved = computed(() =>
    this.store.isSaved(this.recipeId()),
  );

  protected readonly isPending = computed(() =>
    this.store.isPending(this.recipeId()),
  );

  // Gated on `authReady` so the muted state does not flash during Firebase
  // init on a hydrating page where the user is actually logged in.
  protected readonly isGuest = computed(
    () => this.authStore.authReady() && !this.authStore.isAuthenticated(),
  );

  protected readonly ariaLabel = computed(() =>
    this.isSaved() ? 'Remove from saved' : 'Save recipe',
  );

  // Empty string disables `matTooltip` on the authenticated path so the
  // common case stays silent on hover.
  protected readonly tooltip = computed(() =>
    this.isGuest() ? 'Login is required' : '',
  );

  protected readonly onToggle = (event: MouseEvent): void => {
    // The toggle is regularly rendered inside `<a>` cards (match-card,
    // saved-page-card); without stopPropagation a save click would also
    // navigate to the recipe detail page.
    event.preventDefault();
    event.stopPropagation();
    if (!this.authStore.isAuthenticated()) {
      void this.router.navigate(['/login']);
      return;
    }
    if (this.isPending()) return;
    this.store.toggleSave({
      recipeId: this.recipeId(),
      recipe: this.recipe() ?? undefined,
    });
  };
}
