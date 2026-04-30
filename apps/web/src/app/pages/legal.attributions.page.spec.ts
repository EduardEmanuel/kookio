import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { TestBed, type ComponentFixture } from '@angular/core/testing';

import LegalAttributionsPage from './legal.attributions.page';

describe('LegalAttributionsPage', () => {
  let fixture: ComponentFixture<LegalAttributionsPage>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalAttributionsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LegalAttributionsPage);
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
  });

  afterEach(() => TestBed.resetTestingModule());

  it('creates the component instance', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the page heading', () => {
    expect(el.querySelector('h1')?.textContent?.trim()).toBe('Attributions');
  });

  describe('attribution entries', () => {
    it('renders the Twemoji entry as required', () => {
      const text = el.textContent ?? '';
      expect(text).toContain('Twemoji');
      expect(text).toContain('CC BY 4.0');
    });

    it('marks Twemoji with the required badge', () => {
      const twemojiHeading = [...el.querySelectorAll('h2')].find((h) =>
        h.textContent?.includes('Twemoji'),
      );
      expect(twemojiHeading?.querySelector('small')?.textContent?.trim()).toBe(
        'required',
      );
    });

    it('renders Material Symbols, Inter, Roboto, and Fredoka entries', () => {
      const text = el.textContent ?? '';
      expect(text).toContain('Material Symbols');
      expect(text).toContain('Fredoka');
      expect(text).toContain('Inter');
      expect(text).toContain('Roboto');
    });

    it('does not mark non-CC-BY entries as required', () => {
      const headings = [...el.querySelectorAll('h2')].filter(
        (h) => !h.textContent?.includes('Twemoji'),
      );
      for (const h of headings) {
        expect(h.querySelector('small')).toBeNull();
      }
    });

    it('links the Twemoji license URL to creativecommons.org', () => {
      const links = [...el.querySelectorAll('a')];
      const ccLink = links.find((a) =>
        a.getAttribute('href')?.includes('creativecommons.org/licenses/by/4.0'),
      );
      expect(ccLink).toBeDefined();
    });

    it('opens external license/source links in a new tab safely', () => {
      const externalLinks = [...el.querySelectorAll('a')].filter((a) =>
        a.getAttribute('href')?.startsWith('http'),
      );
      expect(externalLinks.length).toBeGreaterThan(0);
      for (const a of externalLinks) {
        expect(a.getAttribute('target')).toBe('_blank');
        expect(a.getAttribute('rel')).toContain('noopener');
      }
    });
  });
});
