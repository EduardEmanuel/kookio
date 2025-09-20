import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { Ingredient } from '@kookio/schema';

import { TrpcClientApp } from '@web/trpc-client';

import { IngredientService } from './ingredient.service';

describe('IngredientService', () => {
  let service: IngredientService;

  const mockIngredients: Ingredient[] = [
    { name: 'Tomato', quantity: 2, unit: 'pcs' },
    { name: 'Flour', quantity: 1, unit: 'kg' },
  ];
  const trpcMock = {
      ingredient: {
        list: {
          query: vi.fn().mockResolvedValue(mockIngredients),
        },
      },
    };

  afterEach(() => {
    vi.clearAllMocks();
    TestBed.resetTestingModule();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IngredientService,
        { provide: TrpcClientApp, useValue: trpcMock },
      ],
    });
  });

  it('should be created', () => {
    service = TestBed.inject(IngredientService);
    expect(service).toBeTruthy();
  });

  it('should fetch and set ingredients list from tRPC', fakeAsync(async () => {
    service = TestBed.inject(IngredientService);

    // expect to be empty initially
    expect(service.ingredients()).toEqual([]);

    // wait for the effect to run and promises to resolve
    tick(); // advance the virtual timer
    await Promise.resolve(); // let pending promises resolve

    // check the mock was called
    expect(trpcMock.ingredient.list.query).toHaveBeenCalled();

    // check the ingredients signal was updated
    expect(service.ingredients()).toEqual(mockIngredients);
  }));

    it('should handle errors and reset ingredients to empty array', fakeAsync(async () => {
    // force the mock to reject
    const error = new Error('Simulated API failure');
    trpcMock.ingredient.list.query.mockRejectedValue(error);
    console.log(`Ignore below the expected error: ${error.message}\n\n`);

    // recreate the service to trigger the constructor logic again
    service = TestBed.inject(IngredientService);

    tick();
    await Promise.resolve();

    console.log(`\n\nError handled as expected: ${error.message}`);
    expect(trpcMock.ingredient.list.query).toHaveBeenCalled();
    expect(service.ingredients()).toEqual([]);
  }));
});