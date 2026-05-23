import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import AboutPage from './about.page';

describe('AboutPage', () => {
  let fixture: ComponentFixture<AboutPage>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutPage);
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
  });

  afterEach(() => TestBed.resetTestingModule());

  it('creates the component instance', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the page heading', () => {
    expect(el.querySelector('h1')?.textContent?.trim()).toBe('About Kookio');
  });

  it('describes the pantry-first approach in the lead paragraph', () => {
    const text = el.textContent ?? '';
    expect(text).toContain('pantry');
  });

  it('frames the app as an open-source academic proof-of-concept', () => {
    const text = el.textContent ?? '';
    expect(text).toContain('open-source');
    expect(text).toContain('academic proof-of-concept');
  });

  it('links to the full attributions page', () => {
    const links = [...el.querySelectorAll('a')];
    const attrLink = links.find(
      (a) => a.getAttribute('href') === '/legal/attributions',
    );
    expect(attrLink).toBeDefined();
  });

  it('provides a mailto contact link', () => {
    const links = [...el.querySelectorAll('a')];
    const mailto = links.find((a) =>
      a.getAttribute('href')?.startsWith('mailto:'),
    );
    expect(mailto).toBeDefined();
  });
});
