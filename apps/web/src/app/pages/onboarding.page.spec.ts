import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { TestBed, type ComponentFixture } from '@angular/core/testing';

import OnboardingPage from './onboarding.page';

describe('OnboardingPage', () => {
  let fixture: ComponentFixture<OnboardingPage>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingPage],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingPage);
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
  });

  afterEach(() => TestBed.resetTestingModule());

  it('creates the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the Onboarding stub', () => {
    const text = el.textContent ?? '';
    expect(text).toContain('Onboarding');
    expect(text).toContain('Welcome to Kookio');
    expect(text).toContain('/onboarding');
  });
});
