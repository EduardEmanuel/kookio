import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { KookioEmojiComponent, KookioIconComponent } from '@kookio/shared-ui';

@Component({
  selector: 'kookio-meal-plan-today-widget',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatCardModule,
    KookioEmojiComponent,
    KookioIconComponent,
  ],
  templateUrl: './meal-plan-today.widget.html',
  styleUrl: './meal-plan-today.widget.scss',
})
export class MealPlanTodayWidgetComponent {}
