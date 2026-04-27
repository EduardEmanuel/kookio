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
  it('creates the component instance', () => {
    expect(createComponent().componentInstance).toBeTruthy();
  });

  it('exposes the default placeholder copy via the signal input default', () => {
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
