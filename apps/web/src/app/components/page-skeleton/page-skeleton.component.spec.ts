import { afterEach, describe, expect, it } from 'vitest';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { provideNgxSkeletonLoader } from 'ngx-skeleton-loader';

import { PageSkeletonComponent } from './page-skeleton.component';

const createComponent = (
  url: string,
): ComponentFixture<PageSkeletonComponent> => {
  TestBed.configureTestingModule({
    imports: [PageSkeletonComponent],
    providers: [
      provideRouter([]),
      provideNgxSkeletonLoader(),
      // Override the router URL so the component resolves the correct config
      { provide: Router, useValue: { url } },
    ],
  });
  const fixture = TestBed.createComponent(PageSkeletonComponent);
  fixture.detectChanges();
  return fixture;
};

afterEach(() => TestBed.resetTestingModule());

describe('PageSkeletonComponent', () => {
  it('renders a section for a known route (/login)', () => {
    const { nativeElement } = createComponent('/login');
    expect(nativeElement.querySelector('section')).not.toBeNull();
  });

  it('renders a section for /register', () => {
    const { nativeElement } = createComponent('/register');
    expect(nativeElement.querySelector('section')).not.toBeNull();
  });

  it('renders nothing for an unknown route', () => {
    const { nativeElement } = createComponent('/nonexistent');
    expect(nativeElement.querySelector('section')).toBeNull();
  });

  it('strips query parameters when resolving the config', () => {
    const { nativeElement } = createComponent('/login?returnUrl=%2Fpantry');
    expect(nativeElement.querySelector('section')).not.toBeNull();
  });

  it('exposes a null config for an unknown route', () => {
    const { componentInstance } = createComponent('/unknown');
    // config is protected but accessible via the instance cast
    expect(
      (componentInstance as unknown as { config: unknown }).config,
    ).toBeNull();
  });
});
