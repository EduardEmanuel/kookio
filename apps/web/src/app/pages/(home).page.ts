import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-web-home',
  imports: [],
  template: `<h1>Welcome {{ message }}</h1>`,
})
export default class HomeComponent {
  protected message = 'to Kookio';
}
