import { describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { KookioEmojiComponent } from './emoji.component';

const createComponent = () => {
  TestBed.configureTestingModule({
    imports: [KookioEmojiComponent],
    providers: [provideZonelessChangeDetection()],
  });
  return TestBed.createComponent(KookioEmojiComponent);
};

const getImg = (
  fixture: ReturnType<typeof createComponent>,
): HTMLImageElement =>
  fixture.nativeElement.querySelector('img') as HTMLImageElement;

describe('KookioEmojiComponent', () => {
  describe('codepoint mapping', () => {
    it('maps a single-codepoint emoji to its bare hex filename', () => {
      const fixture = createComponent();
      fixture.componentRef.setInput('char', '🎉');
      fixture.detectChanges();

      expect(getImg(fixture).getAttribute('src')).toBe(
        '/icons/twemoji/1f389.svg',
      );
    });

    it('strips U+FE0F (variation selector) when no ZWJ is present', () => {
      const fixture = createComponent();
      // ❤️ = U+2764 U+FE0F → Twemoji file is 2764.svg
      fixture.componentRef.setInput('char', '❤️');
      fixture.detectChanges();

      expect(getImg(fixture).getAttribute('src')).toBe(
        '/icons/twemoji/2764.svg',
      );
    });

    it('keeps U+FE0F when the sequence contains a ZWJ', () => {
      const fixture = createComponent();
      // 👁️‍🗨️ = U+1F441 U+FE0F U+200D U+1F5E8 U+FE0F (eye in speech bubble)
      // → Twemoji file is 1f441-fe0f-200d-1f5e8-fe0f.svg
      fixture.componentRef.setInput('char', '👁️‍🗨️');
      fixture.detectChanges();

      expect(getImg(fixture).getAttribute('src')).toBe(
        '/icons/twemoji/1f441-fe0f-200d-1f5e8-fe0f.svg',
      );
    });

    it('joins multi-codepoint emoji with `-`', () => {
      const fixture = createComponent();
      // 🇫🇷 = U+1F1EB U+1F1F7 (regional indicators, France flag)
      fixture.componentRef.setInput('char', '🇫🇷');
      fixture.detectChanges();

      expect(getImg(fixture).getAttribute('src')).toBe(
        '/icons/twemoji/1f1eb-1f1f7.svg',
      );
    });

    it('reacts when the char input changes', () => {
      const fixture = createComponent();
      fixture.componentRef.setInput('char', '👋');
      fixture.detectChanges();
      expect(getImg(fixture).getAttribute('src')).toBe(
        '/icons/twemoji/1f44b.svg',
      );

      fixture.componentRef.setInput('char', '🌱');
      fixture.detectChanges();
      expect(getImg(fixture).getAttribute('src')).toBe(
        '/icons/twemoji/1f331.svg',
      );
    });
  });

  describe('rendering', () => {
    it('defaults alt to an empty string (decorative)', () => {
      const fixture = createComponent();
      fixture.componentRef.setInput('char', '🎉');
      fixture.detectChanges();

      expect(getImg(fixture).getAttribute('alt')).toBe('');
    });

    it('exposes meaningful alt text when provided', () => {
      const fixture = createComponent();
      fixture.componentRef.setInput('char', '🎉');
      fixture.componentRef.setInput('alt', 'Celebration');
      fixture.detectChanges();

      expect(getImg(fixture).getAttribute('alt')).toBe('Celebration');
    });

    it('uses the default size of 20px when size is not provided', () => {
      const fixture = createComponent();
      fixture.componentRef.setInput('char', '🎉');
      fixture.detectChanges();

      const img = getImg(fixture);
      expect(img.getAttribute('width')).toBe('20');
      expect(img.getAttribute('height')).toBe('20');
    });

    it('honours a custom size input', () => {
      const fixture = createComponent();
      fixture.componentRef.setInput('char', '🎉');
      fixture.componentRef.setInput('size', 32);
      fixture.detectChanges();

      const img = getImg(fixture);
      expect(img.getAttribute('width')).toBe('32');
      expect(img.getAttribute('height')).toBe('32');
    });

    it('marks the img as lazy-loaded and async-decoded', () => {
      const fixture = createComponent();
      fixture.componentRef.setInput('char', '🎉');
      fixture.detectChanges();

      const img = getImg(fixture);
      expect(img.getAttribute('loading')).toBe('lazy');
      expect(img.getAttribute('decoding')).toBe('async');
    });
  });
});
