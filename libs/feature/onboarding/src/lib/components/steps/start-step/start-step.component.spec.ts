import { afterEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { START_STRINGS } from '../../../onboarding-strings';
import { StartStepComponent } from './start-step.component';

const setup = async () => {
  await TestBed.configureTestingModule({
    imports: [StartStepComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture = TestBed.createComponent(StartStepComponent);
  fixture.detectChanges();
  await fixture.whenStable();

  return { el: fixture.nativeElement as HTMLElement };
};

describe('StartStepComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('renders the heading and subtitle from STRINGS', async () => {
    const { el } = await setup();
    expect(el.textContent).toContain(START_STRINGS.heading);
    expect(el.textContent).toContain(START_STRINGS.subtitle);
  });

  it('renders all four overview chips', async () => {
    const { el } = await setup();
    const text = el.textContent ?? '';
    expect(text).toContain(START_STRINGS.chips.fridge);
    expect(text).toContain(START_STRINGS.chips.utensils);
    expect(text).toContain(START_STRINGS.chips.people);
    expect(text).toContain(START_STRINGS.chips.restrictions);
  });
});
