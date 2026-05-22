import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  computed,
  effect,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkListboxModule } from '@angular/cdk/listbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { KookioIconComponent } from '@kookio/shared-ui';

import { ACTION_LABELS, STEP_LABELS } from '../../onboarding-strings';
import { OnboardingStore } from '../../store/onboarding.store';
import { DoneStepComponent } from '../steps/done-step/done-step.component';
import { FridgeStepComponent } from '../steps/fridge-step/fridge-step.component';
import { PeopleStepComponent } from '../steps/people-step/people-step.component';
import { RestrictionsStepComponent } from '../steps/restrictions-step/restrictions-step.component';
import { StartStepComponent } from '../steps/start-step/start-step.component';
import { UtensilsStepComponent } from '../steps/utensils-step/utensils-step.component';

/** First and last steps cannot be skipped. */
const FIRST_SKIPPABLE_STEP = 1;
const LAST_SKIPPABLE_STEP = 4;

@Component({
  selector: 'kookio-onboarding-stepper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkListboxModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    KookioIconComponent,
    DoneStepComponent,
    FridgeStepComponent,
    PeopleStepComponent,
    RestrictionsStepComponent,
    StartStepComponent,
    UtensilsStepComponent,
  ],
  templateUrl: './onboarding-stepper.component.html',
  styleUrl: './onboarding-stepper.component.scss',
})
export class OnboardingStepperComponent {
  protected readonly store = inject(OnboardingStore);
  protected readonly stepLabels = STEP_LABELS;
  protected readonly actions = ACTION_LABELS;

  private readonly route = inject(ActivatedRoute);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /**
   * Step indices the rail renders — derived once and reused per cdkOption
   * so the template stays declarative.
   */
  protected readonly stepIndices = STEP_LABELS.map((_, i) => i);

  protected readonly canSkip = computed(() => {
    const s = this.store.currentStep();
    return s >= FIRST_SKIPPABLE_STEP && s <= LAST_SKIPPABLE_STEP;
  });

  /**
   * Wraps the listbox selection in an array because cdk-listbox supports
   * multi-select; we use single-select so the value is always a
   * one-element tuple.
   */
  protected readonly railValue = computed(() => [this.store.currentStep()]);

  constructor() {
    // Seed the active step from `?step=N` on first paint so a shared URL
    // deep-links into the right form. Only honoured up to
    // `maxStepReached` — refreshing the page tab drops the high-water
    // mark back to 0 (state is component-scoped, no persistence yet),
    // so a `?step=5` URL on a fresh tab still lands on step 0 until the
    // user advances. Documented as a known limitation in
    // `project_cook-step-url-deeplink.md`-style follow-up; full
    // refresh-resilience would require session persistence.
    if (this.isBrowser) {
      const raw = this.route.snapshot.queryParamMap.get('step');
      if (raw != null) {
        const parsed = Number.parseInt(raw, 10);
        if (Number.isFinite(parsed)) {
          // `goToStep` is gated on `isReachable`, so on a fresh tab this
          // is a no-op until the user reaches the requested step.
          this.store.goToStep(parsed);
        }
      }
    }

    // URL persistence: every time the active step changes, write
    // `?step=N` via `history.replaceState`. Not `router.navigate` —
    // that re-runs guards and forces a full hydration on Vercel SSR
    // for what is just a query-param swap (same reasoning as the cook
    // session, commit de40125). SSR is skipped via the isBrowser
    // guard since `history` is undefined on the server.
    effect(() => {
      if (!this.isBrowser) return;
      const step = this.store.currentStep();
      const url = new URL(window.location.href);
      url.searchParams.set('step', String(step));
      window.history.replaceState({}, '', url.toString());
    });
  }

  protected onRailSelect = (value: readonly number[]): void => {
    const first = value[0];
    if (first != null) {
      this.store.goToStep(first);
    }
  };

  protected onSkip = (): void => {
    this.store.next();
  };

  protected onNext = (): void => {
    this.store.next();
  };

  protected onPrev = (): void => {
    this.store.prev();
  };

  protected onSubmit = (): void => {
    this.store.submit();
  };
}
