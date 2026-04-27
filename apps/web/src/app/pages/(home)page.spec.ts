import { ComponentFixture, TestBed } from '@angular/core/testing';

import HomeComponent from './(home).page';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
  });

  it('renders the Home stub', () => {
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(text).toContain('Home');
    expect(text).toContain('Public recipe feed');
    expect(text).toContain('/');
  });
});
