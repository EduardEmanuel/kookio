import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { signal } from '@angular/core';
import { MockProvider } from 'ng-mocks';

import { Ingredient } from '@kookio/schema';

import { TrpcClientApp } from '@web/trpc-client';
import { IngredientService } from '@web/app/services/ingredient/ingredient.service';
import HomeComponent from './(home).page';

describe('HomeComponent', () => {
  const mockIngredients: Ingredient[] = [
    { name: 'Tomato', quantity: 2, unit: 'pcs' },
    { name: 'Flour', quantity: 1, unit: 'kg' },
  ];
  const trpcMock: any = {
    ingredient: {
      list: {
        query: vi.fn().mockResolvedValue(mockIngredients),
      },
    },
  };
  beforeEach(async () => {;
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        MockProvider(IngredientService, {
          ingredients: signal(mockIngredients),
        }),
        {
          provide: TrpcClientApp,
          useValue: trpcMock,
        },
      ],
    }).compileComponents();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Welcome to Kookio');
  });

  it('should have ingredients rendered', fakeAsync(async () => {
    const fixture = TestBed.createComponent(HomeComponent);

    // initial detect changes to render the component
    fixture.detectChanges();
    // wait for the effect to run and promises to resolve
    tick(); // advance the virtual timer
    await Promise.resolve(); // let pending promises resolve
    // detect changes again to update the view with new data
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('li').length).toBe(2);
    expect(compiled.querySelectorAll('li')[0]?.textContent).toContain('Tomato');
    expect(compiled.querySelectorAll('li')[1]?.textContent).toContain('Flour');
  }));
});