import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import type { RouteMeta } from '@analogjs/router';

import { AuthStore, authGuard, onboardingGuard } from '@kookio/feature-auth';
import {
  ExpiringSoonWidgetComponent,
  MealPlanTodayWidgetComponent,
  QuickActionsWidgetComponent,
  ShoppingCountWidgetComponent,
} from '@kookio/feature-dashboard';

export const routeMeta: RouteMeta = {
  canActivate: [authGuard, onboardingGuard],
  title: 'Dashboard — Kookio',
};

const greetingFor = (hour: number): string => {
  if (hour < 12) return "What's for breakfast today?";
  if (hour < 17) return 'Time for a delicious lunch?';
  return 'Dinner inspiration?';
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kookio-dashboard-page',
  imports: [
    ExpiringSoonWidgetComponent,
    MealPlanTodayWidgetComponent,
    QuickActionsWidgetComponent,
    ShoppingCountWidgetComponent,
  ],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
})
export default class DashboardPage {
  private readonly authStore = inject(AuthStore);

  protected readonly userName = computed<string>(() => {
    // Prefer the user-provided name (set in onboarding / account page).
    // Fallback chain handles users who registered before the field existed
    // and users on identity providers that do not surface displayName.
    const fromSession = this.authStore.session()?.name?.split(' ')[0]?.trim();
    if (fromSession) return fromSession;

    const user = this.authStore.currentUser();
    const display = user?.displayName?.split(' ')[0]?.trim();
    if (display) return display;

    return 'cook';
  });

  // `new Date()` is read once at first computed evaluation. The greeting
  // uses Vercel-region time on SSR; consistency across SSR/CSR is preferred
  // over hour-of-day accuracy — re-evaluating with a tracked clock signal
  // would force re-renders on every minute for a cosmetic line.
  protected readonly greeting = computed<string>(() =>
    greetingFor(new Date().getHours()),
  );
}
