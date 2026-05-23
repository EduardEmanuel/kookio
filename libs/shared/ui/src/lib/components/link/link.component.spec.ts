import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { KookioLinkComponent } from './link.component';

describe('KookioLinkComponent', () => {
  let fixture: ComponentFixture<KookioLinkComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KookioLinkComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(KookioLinkComponent);
    router = TestBed.inject(Router);
  });

  afterEach(() => TestBed.resetTestingModule());

  const render = (to: string): HTMLAnchorElement => {
    fixture.componentRef.setInput('to', to);
    fixture.detectChanges();
    const a = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(a).toBeTruthy();
    return a;
  };

  const click = (
    a: HTMLAnchorElement,
    init: Partial<MouseEventInit> = {},
  ): MouseEvent => {
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      button: 0,
      ...init,
    });
    a.dispatchEvent(event);
    return event;
  };

  describe('internal route detection', () => {
    it('uses routerLink for paths starting with /', () => {
      const a = render('/legal/attributions');
      expect(a.getAttribute('href')).toBe('/legal/attributions');
      expect(a.getAttribute('target')).toBeNull();
      expect(a.getAttribute('rel')).toBeNull();
    });
  });

  describe('external link detection', () => {
    it('renders http URLs with target=_blank and rel=noopener noreferrer', () => {
      const a = render('http://example.com');
      expect(a.getAttribute('href')).toBe('http://example.com');
      expect(a.getAttribute('target')).toBe('_blank');
      expect(a.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('renders https URLs as external', () => {
      const a = render('https://example.com');
      expect(a.getAttribute('href')).toBe('https://example.com');
      expect(a.getAttribute('target')).toBe('_blank');
      expect(a.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('is case-insensitive on the http(s) prefix', () => {
      const a = render('HTTPS://example.com');
      expect(a.getAttribute('target')).toBe('_blank');
    });
  });

  describe('protocol-prefixed links', () => {
    it('renders mailto: with a plain href and no target', () => {
      const a = render('mailto:test@example.com');
      expect(a.getAttribute('href')).toBe('mailto:test@example.com');
      expect(a.getAttribute('target')).toBeNull();
      expect(a.getAttribute('rel')).toBeNull();
    });

    it('renders tel: with a plain href and no target', () => {
      const a = render('tel:+1234567890');
      expect(a.getAttribute('href')).toBe('tel:+1234567890');
      expect(a.getAttribute('target')).toBeNull();
    });
  });

  describe('click handling', () => {
    it('intercepts left-click on internal routes and navigates via Router', () => {
      const spy = vi
        .spyOn(router, 'navigateByUrl')
        .mockImplementation(() => Promise.resolve(true));
      const a = render('/legal/attributions');
      const event = click(a);
      expect(spy).toHaveBeenCalledWith('/legal/attributions');
      expect(event.defaultPrevented).toBe(true);
    });

    it('does not intercept clicks on external links', () => {
      const spy = vi
        .spyOn(router, 'navigateByUrl')
        .mockImplementation(() => Promise.resolve(true));
      const a = render('https://example.com');
      const event = click(a);
      expect(spy).not.toHaveBeenCalled();
      expect(event.defaultPrevented).toBe(false);
    });

    it('does not intercept clicks on mailto: links', () => {
      const spy = vi
        .spyOn(router, 'navigateByUrl')
        .mockImplementation(() => Promise.resolve(true));
      const a = render('mailto:test@example.com');
      const event = click(a);
      expect(spy).not.toHaveBeenCalled();
      expect(event.defaultPrevented).toBe(false);
    });

    it('does not intercept cmd/ctrl/shift/alt-click on internal routes', () => {
      const spy = vi
        .spyOn(router, 'navigateByUrl')
        .mockImplementation(() => Promise.resolve(true));
      const a = render('/foo');
      for (const modifier of ['metaKey', 'ctrlKey', 'shiftKey', 'altKey']) {
        const event = click(a, { [modifier]: true });
        expect(event.defaultPrevented).toBe(false);
      }
      expect(spy).not.toHaveBeenCalled();
    });

    it('does not intercept middle-click (button !== 0)', () => {
      const spy = vi
        .spyOn(router, 'navigateByUrl')
        .mockImplementation(() => Promise.resolve(true));
      const a = render('/foo');
      const event = click(a, { button: 1 });
      expect(spy).not.toHaveBeenCalled();
      expect(event.defaultPrevented).toBe(false);
    });
  });
});
