import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-web-home',
  imports: [MatIconModule],
  templateUrl: `./(home).page.html`,
})
export default class HomeComponent {
  protected message = 'to Kookio';
}
