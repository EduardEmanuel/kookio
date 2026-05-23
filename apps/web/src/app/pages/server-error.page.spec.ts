import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import ServerErrorPage from './server-error.page';

describe('ServerErrorPage', () => {
  let fixture: ComponentFixture<ServerErrorPage>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerErrorPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ServerErrorPage);
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
  });

  afterEach(() => TestBed.resetTestingModule());

  it('renders the 500 status code', () => {
    expect(el.textContent).toContain('500');
  });

  it('renders the Something went wrong title', () => {
    expect(el.textContent).toContain('Something went wrong');
  });

  it('renders a Retry primary CTA button', () => {
    const retryBtn = [...el.querySelectorAll('button')].find(
      (b) => b.textContent?.trim() === 'Retry',
    );
    expect(retryBtn).toBeTruthy();
  });

  it('renders a Go home secondary CTA link to /', () => {
    const homeLink = [...el.querySelectorAll('a')].find(
      (a) => a.textContent?.trim() === 'Go home',
    );
    expect(homeLink).toBeTruthy();
    expect(homeLink?.getAttribute('href')).toBe('/');
  });
});
