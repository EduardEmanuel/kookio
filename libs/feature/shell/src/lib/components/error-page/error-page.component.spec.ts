import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ErrorPageComponent, type ErrorCta } from './error-page.component';

interface RenderInputs {
  code?: number;
  title?: string;
  description?: string;
  icon?: 'warning' | 'error';
  primaryCta?: ErrorCta;
  secondaryCta?: ErrorCta;
}

describe('ErrorPageComponent', () => {
  let fixture: ComponentFixture<ErrorPageComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorPageComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorPageComponent);
  });

  afterEach(() => TestBed.resetTestingModule());

  const render = (inputs: RenderInputs): void => {
    for (const [k, v] of Object.entries(inputs)) {
      fixture.componentRef.setInput(k, v);
    }
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
  };

  it('renders the status code, title, and description', () => {
    render({ code: 404, title: 'Not found', description: 'Missing page.' });
    expect(el.textContent).toContain('404');
    expect(el.textContent).toContain('Not found');
    expect(el.textContent).toContain('Missing page.');
  });

  it('omits the actions row when no CTAs are provided', () => {
    render({ code: 404, title: 'X', description: 'Y' });
    expect(el.querySelector('.error-page__actions')).toBeNull();
  });

  describe('primary CTA', () => {
    it('renders a routerLink anchor for a route-based CTA', () => {
      render({
        code: 404,
        title: 'X',
        description: 'Y',
        primaryCta: { label: 'Go home', route: '/' },
      });
      const a = el.querySelector(
        '.error-page__actions a',
      ) as HTMLAnchorElement | null;
      expect(a).not.toBeNull();
      expect(a?.textContent?.trim()).toBe('Go home');
      expect(a?.getAttribute('href')).toBe('/');
    });

    it('renders a button for an action-based CTA and fires action on click', () => {
      const action = vi.fn();
      render({
        code: 500,
        title: 'X',
        description: 'Y',
        primaryCta: { label: 'Retry', action },
      });
      const btn = el.querySelector(
        '.error-page__actions button',
      ) as HTMLButtonElement | null;
      expect(btn).not.toBeNull();
      expect(btn?.textContent?.trim()).toBe('Retry');
      btn?.click();
      expect(action).toHaveBeenCalledTimes(1);
    });
  });

  describe('secondary CTA', () => {
    it('renders both primary and secondary CTAs side by side', () => {
      const action = vi.fn();
      render({
        code: 500,
        title: 'X',
        description: 'Y',
        primaryCta: { label: 'Retry', action },
        secondaryCta: { label: 'Home', route: '/' },
      });
      const actions = el.querySelector('.error-page__actions');
      expect(actions?.children.length).toBe(2);
    });
  });
});
