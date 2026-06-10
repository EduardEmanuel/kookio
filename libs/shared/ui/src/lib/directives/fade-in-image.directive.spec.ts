import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { FadeInImageDirective } from './fade-in-image.directive';

@Component({
  imports: [FadeInImageDirective],
  template: `<img kookioFadeInImage alt="" />`,
})
class Host {}

const render = async () => {
  TestBed.configureTestingModule({
    imports: [Host],
    providers: [provideZonelessChangeDetection()],
  });
  const fixture = TestBed.createComponent(Host);
  const img = fixture.nativeElement.querySelector('img') as HTMLImageElement;
  return { fixture, img };
};

describe('FadeInImageDirective', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({ matches: false } as MediaQueryList),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    TestBed.resetTestingModule();
  });

  it('fades a not-yet-decoded image in: hidden first, visible on load', async () => {
    const { fixture, img } = await render();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    // No real bitmap in the test DOM (naturalWidth 0) → starts hidden.
    expect(img.style.opacity).toBe('0');
    expect(img.style.transition).toContain('opacity');

    img.dispatchEvent(new Event('load'));
    fixture.detectChanges();
    expect(img.style.opacity).toBe('1');
  });

  it('resolves on error so a broken src is never stuck invisible', async () => {
    const { fixture, img } = await render();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    img.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    expect(img.style.opacity).toBe('1');
  });

  it('skips the transition when reduced motion is preferred', async () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({ matches: true } as MediaQueryList),
    );
    const { fixture, img } = await render();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(img.style.transition).toBe('');
  });
});
