import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-ui',
  imports: [],
  templateUrl: './ui.html',
  styleUrl: './ui.scss',
})
export class Ui {}
