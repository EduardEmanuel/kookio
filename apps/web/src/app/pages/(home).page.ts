import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-web-home',
  imports: [],
  templateUrl: `./(home).page.html`,
})
export default class HomeComponent {
  protected message = 'to Kookio';
}
