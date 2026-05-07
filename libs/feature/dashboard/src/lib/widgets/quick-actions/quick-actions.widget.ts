import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

import { KookioIconComponent } from '@kookio/shared-ui';

@Component({
  selector: 'kookio-quick-actions-widget',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatCardModule, RouterLink, KookioIconComponent],
  templateUrl: './quick-actions.widget.html',
  styleUrl: './quick-actions.widget.scss',
})
export class QuickActionsWidgetComponent {}
