import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InstallPromptComponent } from '@kookio/feature-shell';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, InstallPromptComponent],
  selector: 'kookio-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'web';
}
