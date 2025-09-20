import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { IngredientService } from '@web/app/services/ingredient/ingredient.service';

@Component({
  selector: 'web-home',
  imports: [MatIconModule],
  providers: [IngredientService],
  templateUrl: `./(home).page.html`,
})
export default class HomeComponent {
  
  protected readonly ingredientService = inject(IngredientService);
  protected message = 'to Kookio';
}
