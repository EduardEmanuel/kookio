import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

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

  it('should render title', fakeAsync(() => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Welcome to Kookio',
    );
  }));
});
