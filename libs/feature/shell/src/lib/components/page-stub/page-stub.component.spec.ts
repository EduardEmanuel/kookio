import { describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { PageStubComponent } from './page-stub.component';

const createComponent = () => {
  TestBed.configureTestingModule({
    imports: [PageStubComponent],
    providers: [provideZonelessChangeDetection()],
  });
  return TestBed.createComponent(PageStubComponent);
};

describe('PageStubComponent', () => {
  describe('defaults', () => {
    it('creates the component instance', () => {
      expect(createComponent().componentInstance).toBeTruthy();
    });

    it('exposes the default placeholder copy via the signal input', () => {
      const fixture = createComponent();
      expect(fixture.componentInstance.placeholder()).toContain(
        'This page will be implemented',
      );
    });

    it('defaults icon, title, route and subtitle to empty strings', () => {
      const c = createComponent().componentInstance;
      expect(c.icon()).toBe('');
      expect(c.title()).toBe('');
      expect(c.route()).toBe('');
      expect(c.subtitle()).toBe('');
    });
  });

  describe('input bindings', () => {
    it('renders icon, title, route and placeholder when set', () => {
      const fixture = createComponent();
      fixture.componentRef.setInput('icon', 'kitchen');
      fixture.componentRef.setInput('title', 'Pantry');
      fixture.componentRef.setInput('route', '/pantry');
      fixture.componentRef.setInput('placeholder', 'Coming soon.');
      fixture.detectChanges();

      const el = fixture.nativeElement as HTMLElement;
      expect(el.querySelector('.page-stub__icon')?.textContent?.trim()).toBe(
        'kitchen',
      );
      expect(el.querySelector('.page-stub__title')?.textContent?.trim()).toBe(
        'Pantry',
      );
      expect(
        el.querySelector('.page-stub__route code')?.textContent?.trim(),
      ).toBe('/pantry');
      expect(
        el.querySelector('.page-stub__placeholder')?.textContent?.trim(),
      ).toBe('Coming soon.');
    });

    it('omits the subtitle slot when subtitle is empty', () => {
      const fixture = createComponent();
      fixture.detectChanges();
      const el = fixture.nativeElement as HTMLElement;
      expect(el.querySelector('.page-stub__subtitle')).toBeNull();
    });

    it('renders the subtitle slot when subtitle is set', () => {
      const fixture = createComponent();
      fixture.componentRef.setInput('subtitle', 'Browse and discover recipes');
      fixture.detectChanges();

      const el = fixture.nativeElement as HTMLElement;
      expect(
        el.querySelector('.page-stub__subtitle')?.textContent?.trim(),
      ).toBe('Browse and discover recipes');
    });
  });
});
