import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { mockIngredients } from '@kookio/shared-mock';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-web-home',
  imports: [MatIconModule],
  templateUrl: `./(home).page.html`,
})
export default class HomeComponent {
  protected message = 'to Kookio';

  // TODO: replace with real data from tRPC once IngredientCatalog procedures are implemented
  protected ingredients = signal(mockIngredients);
}
