import { afterEach, describe, expect, it } from 'vitest';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import ForbiddenPage from './403.page';
import { URLS } from '@kookio/feature-shell';

describe('ForbiddenPage', () => {
  let fixture: ComponentFixture<ForbiddenPage>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForbiddenPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ForbiddenPage);
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
  });

  afterEach(() => TestBed.resetTestingModule());

  it('creates the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders a 403 heading', () => {
    expect(el.querySelector('h1')?.textContent).toContain('403');
  });

  it('renders a permission-denied message', () => {
    expect(el.querySelector('p')?.textContent).toContain(
      "don't have permission",
    );
  });

  it('renders a link back to the home route', () => {
    const link = el.querySelector('a');
    expect(link).not.toBeNull();
    expect(link?.getAttribute('href')).toBe(URLS.HOME);
  });
});
