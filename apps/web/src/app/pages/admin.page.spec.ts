import { afterEach, describe, expect, it } from 'vitest';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import AdminPage from './admin.page';

describe('AdminPage', () => {
  let fixture: ComponentFixture<AdminPage>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPage);
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
  });

  afterEach(() => TestBed.resetTestingModule());

  it('creates the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the Admin heading', () => {
    expect(el.querySelector('h1')?.textContent?.trim()).toBe('Admin');
  });

  it('renders a coming-soon message', () => {
    expect(el.querySelector('p')?.textContent).toContain('coming soon');
  });
});
