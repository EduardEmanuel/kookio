import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  untracked,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { KookioEmojiComponent } from '@kookio/shared-ui';

import { START_STRINGS } from '../../../onboarding-strings';
import { OnboardingStore } from '../../../store/onboarding.store';

const MAX_NAME = 50;

@Component({
  selector: 'kookio-onboarding-start-step',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    KookioEmojiComponent,
  ],
  templateUrl: './start-step.component.html',
  styleUrl: './start-step.component.scss',
})
export class StartStepComponent {
  protected readonly strings = START_STRINGS;

  private readonly store = inject(OnboardingStore);

  protected readonly nameControl = new FormControl<string>(this.store.name(), {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(MAX_NAME)],
  });

  constructor() {
    // Two-way binding: control → store
    this.nameControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => this.store.setName(value));

    // Store → control (e.g. after `loadCurrent` pre-populates).
    // `untracked` keeps the patch from being treated as a dependency cycle.
    effect(() => {
      const fromStore = this.store.name();
      untracked(() => {
        if (fromStore !== this.nameControl.value) {
          this.nameControl.setValue(fromStore, { emitEvent: false });
        }
      });
    });
  }
}
