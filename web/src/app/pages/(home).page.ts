import { Component, DestroyRef, effect, inject } from '@angular/core';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { forkJoin, take } from 'rxjs';

import { mockIngredients } from '@kookio/mock';

import { IngredientService } from '@web/app/services/ingredient/ingredient.service';

@Component({
  selector: 'web-home',
  imports: [MatIconModule],
  providers: [IngredientService],
  templateUrl: `./(home).page.html`,
})
export default class HomeComponent {

  // private readonly destroyRef = inject(DestroyRef);
  
  protected readonly ingredientService = inject(IngredientService);

  protected message = 'to Kookio';

  private readonly initEffect = effect(() => {
    forkJoin(
      mockIngredients.map(mockIngredient => {
        if (mockIngredient.id) {
          return this.ingredientService.fetchIngredient({ id: mockIngredient.id });
        }
        return this.ingredientService.createIngredient(mockIngredient)
      })
    )
    .pipe(take(1))
    .subscribe(ingredients => {
      const randomIndex = Math.floor(Math.random() * ingredients.length);
      const randomIngredient = ingredients[randomIndex];
      if (randomIngredient && randomIngredient.id) {
        this.ingredientService.fetchIngredient({ id: randomIngredient.id })
          .pipe(take(1))
          .subscribe();
      }
    });
  });
}
