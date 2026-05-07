import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { KookioEmojiComponent, KookioIconComponent } from '@kookio/shared-ui';

@Component({
  selector: 'kookio-shopping-count-widget',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatCardModule,
    KookioEmojiComponent,
    KookioIconComponent,
  ],
  templateUrl: './shopping-count.widget.html',
  styleUrl: './shopping-count.widget.scss',
})
export class ShoppingCountWidgetComponent {}
