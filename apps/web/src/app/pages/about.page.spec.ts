import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { TestBed, type ComponentFixture } from '@angular/core/testing';

import AboutPage from './about.page';

describe('AboutPage', () => {
  let fixture: ComponentFixture<AboutPage>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutPage);
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
  });

  afterEach(() => TestBed.resetTestingModule());

  it('creates the component instance', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the About stub with title and route', () => {
    const text = el.textContent ?? '';
    expect(text).toContain('About Kookio');
    expect(text).toContain('/about');
  });
});
