import { Component, DestroyRef, effect, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';

import { mockIngredients } from '@kookio/mock';

import { IngredientService } from '@web/app/services/ingredient/ingredient.service';

@Component({
  selector: 'web-home',
  imports: [MatIconModule],
  providers: [IngredientService],
  templateUrl: `./(home).page.html`,
})
export default class HomeComponent {

  private readonly destroyRef = inject(DestroyRef);
  
  protected readonly ingredientService = inject(IngredientService);

  protected message = 'to Kookio';

  private readonly effectCreate = effect(() => {
    mockIngredients.forEach(mockIngredient => 
      this.ingredientService.createIngredient(mockIngredient)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe()
    );
  });

  private readonly effectFetch = effect(() => {
    const randomId = Math.floor(Math.random() * 10) + 1;
    const userId = `test-user-id-${randomId}`;

    this.ingredientService.fetchIngredientsForUser(userId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  });
}
