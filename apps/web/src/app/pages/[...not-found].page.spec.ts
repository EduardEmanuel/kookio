import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import NotFoundPage from './[...not-found].page';

describe('NotFoundPage', () => {
  let fixture: ComponentFixture<NotFoundPage>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundPage);
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
  });

  afterEach(() => TestBed.resetTestingModule());

  it('renders the 404 status code', () => {
    expect(el.textContent).toContain('404');
  });

  it('renders the Page not found title', () => {
    expect(el.textContent).toContain('Page not found');
  });

  it('renders a Go home primary CTA link to /', () => {
    const homeLink = [...el.querySelectorAll('a')].find(
      (a) => a.textContent?.trim() === 'Go home',
    );
    expect(homeLink).toBeTruthy();
    expect(homeLink?.getAttribute('href')).toBe('/');
  });
});
