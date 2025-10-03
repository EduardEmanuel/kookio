import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Observable, of, take, throwError } from 'rxjs';

import { mockIngredients } from '@kookio/mock';
import { Ingredient } from '@kookio/schema';
import { logger } from '@kookio/utils';

import { createTestScheduler } from '@web/test-setup';
import { TrpcClientApp } from '@web/trpc-client';

import { IngredientService } from './ingredient.service';

export const ingredientTrpcMock = {
  ingredient: {
    byId: {
      query: vi.fn().mockImplementation((): Observable<Ingredient[]> => of(mockIngredients)),
    },
    create: {
      mutate: vi.fn().mockImplementation(
        (newIngredient: Ingredient): Observable<Ingredient> => of(newIngredient)
      ),
    }
  },
};

describe('IngredientService', () => {
  let service: IngredientService;

  const newIngredient: Ingredient = { 
    name: 'Sour Cream', 
    quantity: 100, 
    unit: 'g', 
    optional: true, 
    userId: 'test-user-id-11' 
  };
  const testUserId = 'test-user-id-1';
  const testUserIdObj = { userId: testUserId };

  afterEach(() => {
    vi.clearAllMocks();
    TestBed.resetTestingModule();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IngredientService,
        { provide: TrpcClientApp, useValue: ingredientTrpcMock },
      ],
    });
    service = TestBed.inject(IngredientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create and add ingredient via tRPC (marble)', () => {
    const scheduler = createTestScheduler();

    scheduler.run(({ cold, expectObservable }) => {
      // simulate a cold observable that emits `newIngredient` after 2 frames and completes
      const response$ = cold('--a|', { a: newIngredient });

      // inject the mocked tRPC mutation
      ingredientTrpcMock.ingredient.create.mutate.mockReturnValue(response$);

      // initial state
      expect(service.ingredients()).toEqual([]);

      const result$ = service.createIngredient(newIngredient);

      expectObservable(result$).toBe('--a|', { a: newIngredient });

      scheduler.flush(); // update the signal
      expect(service.ingredients()).toEqual([newIngredient]);
    });
  });

  it('should fetch and set ingredients list from tRPC (marble)', () => {
    const scheduler = createTestScheduler();

    scheduler.run(({ cold, expectObservable }) => {
      const response$ = cold('--x|', { x: mockIngredients });

      ingredientTrpcMock.ingredient.byId.query.mockReturnValue(response$);

      expect(service.ingredients()).toEqual([]);

      const result$ = service.fetchIngredientsForUser(testUserId);

      expectObservable(result$).toBe('--x|', { x: mockIngredients });

      scheduler.flush();
      expect(service.ingredients()).toEqual(mockIngredients);
    });
  });

  it('should handle errors and reset ingredients to empty array (marble)', () => {
    const scheduler = createTestScheduler();
    const errorSpy = vi.spyOn(logger, 'error');

    scheduler.run(({ cold, expectObservable }) => {
      const err = new Error('Simulated API failure');

      ingredientTrpcMock.ingredient.byId.query.mockReturnValue(cold('--#', {}, err));
      ingredientTrpcMock.ingredient.create.mutate.mockReturnValue(cold('--#', {}, err));

      const fetch$ = service.fetchIngredientsForUser(testUserId);
      const create$ = service.createIngredient(newIngredient);

      expectObservable(fetch$).toBe('--(y|)', { y: [] });
      expectObservable(create$).toBe('--(b|)', { b: {} as Ingredient });

      scheduler.flush();

      expect(errorSpy).toHaveBeenCalledTimes(2);
      expect(errorSpy).toHaveBeenCalledWith(err, '❌ Error fetching ingredients from tRPC:');
      expect(errorSpy).toHaveBeenCalledWith(err, '❌ Error creating ingredient via tRPC:');
      expect(service.ingredients()).toEqual([]); // should be reset to empty on error
    });
  });
});