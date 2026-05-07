import { describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { MealPlanTodayWidgetComponent } from './meal-plan-today.widget';

const setup = async () => {
  await TestBed.configureTestingModule({
    imports: [MealPlanTodayWidgetComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture = TestBed.createComponent(MealPlanTodayWidgetComponent);
  fixture.detectChanges();
  await fixture.whenStable();

  return fixture.nativeElement as HTMLElement;
};

describe('MealPlanTodayWidgetComponent', () => {
  it('renders the placeholder copy and a disabled CTA', async () => {
    const el = await setup();

    expect(el.textContent ?? '').toContain("Today's plan");
    expect(el.textContent ?? '').toContain('No meal plan yet');

    const cta = el.querySelector('button[disabled]');
    expect(cta).not.toBeNull();
    expect(cta?.textContent ?? '').toContain('Plan your week');
  });
});
