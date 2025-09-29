import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';

import { TrpcClientApp } from '@web/trpc-client';
import { IngredientService } from '@web/app/services/ingredient/ingredient.service';
import { ingredientTrpcMock } from '../services/ingredient/ingredient.service.spec';
import HomeComponent from './(home).page';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  beforeEach(async () => {;
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        MockProvider(IngredientService),
        {
          provide: TrpcClientApp,
          useValue: ingredientTrpcMock,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
  });

  it('should render title', fakeAsync(() => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('Welcome to Kookio');
  }));
});