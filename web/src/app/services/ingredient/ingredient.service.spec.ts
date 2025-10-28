import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { mockIngredients } from '@kookio/mock';
import { CreateIngredientDTO, FindUniqueIngredientResultDTO, IngredientDTO } from '@kookio/prisma';
import { logger } from '@kookio/utils';

import { createTestScheduler } from '@web/test-setup';
import { TrpcClientApp } from '@web/trpc-client';

import { IngredientService } from './ingredient.service';

const now = new Date('2024-01-01T00:00:00Z');
const existingIngredient: IngredientDTO = {
  ...mockIngredients[0],
  createdAt: now,
};
const createdIngredient: IngredientDTO = {
  id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  name: 'Sour Cream',
  quantity: 100,
  unit: 'g',
  optional: true,
  userId: 'test-user-id-11',
  createdAt: now,
};
const createPayload: CreateIngredientDTO = {
  name: createdIngredient.name,
  quantity: createdIngredient.quantity,
  unit: createdIngredient.unit,
  optional: createdIngredient.optional,
  userId: createdIngredient.userId,
  createdAt: createdIngredient.createdAt,
};

export const ingredientTrpcMock = {
  ingredient: {
    findUnique: {
      query: vi.fn().mockImplementation((): Observable<FindUniqueIngredientResultDTO> => of(existingIngredient)),
    },
    create: {
      mutate: vi.fn().mockImplementation(
        (): Observable<IngredientDTO> => of(createdIngredient)
      ),
    }
  },
};

describe('IngredientService', () => {
  let service: IngredientService;

  const id = existingIngredient.id;

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
      const response$ = cold('--a|', { a: createdIngredient });

      // inject the mocked tRPC mutation
      ingredientTrpcMock.ingredient.create.mutate.mockReturnValue(response$);

      // initial state
      expect(service.ingredients()).toEqual([]);

      const result$ = service.createIngredient(createPayload);

      expectObservable(result$).toBe('--a|', { a: createdIngredient });

      scheduler.flush(); // update the signal
      expect(service.ingredients()).toEqual([createdIngredient]);
    });
  });

  it('should fetch and set ingredients list from tRPC (marble)', () => {
    const scheduler = createTestScheduler();

    scheduler.run(({ cold, expectObservable }) => {
      const response$ = cold('--x|', { x: existingIngredient });

      ingredientTrpcMock.ingredient.findUnique.query.mockReturnValue(response$);

      expect(service.ingredients()).toEqual([]);

      const result$ = service.fetchIngredient({ id });

      expectObservable(result$).toBe('--x|', { x: existingIngredient });

      scheduler.flush();
      expect(service.ingredients()).toEqual([existingIngredient]);
    });
  });

  it('should handle errors and reset ingredients to empty array (marble)', () => {
    const scheduler = createTestScheduler();
    const errorSpy = vi.spyOn(logger, 'error');

    scheduler.run(({ cold, expectObservable }) => {
      const err = new Error('Simulated API failure');

      ingredientTrpcMock.ingredient.findUnique.query.mockReturnValue(cold('--#', {}, err));
      ingredientTrpcMock.ingredient.create.mutate.mockReturnValue(cold('--#', {}, err));

      const fetch$ = service.fetchIngredient({ id });
      const create$ = service.createIngredient(createPayload);

      expectObservable(fetch$).toBe('--(y|)', { y: null });
      expectObservable(create$).toBe('--(b|)', { b: {} as IngredientDTO });

      scheduler.flush();

      expect(errorSpy).toHaveBeenCalledTimes(2);
      expect(errorSpy).toHaveBeenCalledWith(err, '❌ Error fetching ingredients from tRPC:');
      expect(errorSpy).toHaveBeenCalledWith(err, '❌ Error creating ingredient via tRPC:');
      expect(service.ingredients()).toEqual([]); // should be reset to empty on error
    });
  });
});
