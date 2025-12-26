import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { iif, map, switchMap } from 'rxjs';

import { FindUniqueIngredientDTO } from '@kookio/prisma-validator';
import { mockIngredients } from '@kookio/shared-mock';

import { IngredientService } from '../services/ingredient/ingredient.service';

@Component({
  selector: 'kookio-web-home',
  imports: [MatIconModule],
  providers: [IngredientService],
  templateUrl: `./(home).page.html`,
})
export default class HomeComponent {
  protected readonly ingredientService = inject(IngredientService);

  protected message = 'to Kookio';

  protected ingredients = toSignal(
    iif(
      () => mockIngredients.every((i) => i.userId && i.name),
      this.ingredientService.findMany({}),
      this.ingredientService.createMany({ data: mockIngredients }),
    ).pipe(
      switchMap(() => {
        const randomIndex = Math.floor(Math.random() * mockIngredients.length);
        const randomIngredient = mockIngredients[randomIndex];
        const userId = randomIngredient.userId;
        const name = randomIngredient.name;
        const userId_name = { userId, name };

        return this.ingredientService.findUnique({
          where: { userId_name },
        } as FindUniqueIngredientDTO);
      }),
      map((ingredient) => (ingredient ? [ingredient] : [])),
    ),
  );
}
