import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { mockIngredients } from '@kookio/shared-mock';
import {
  CreateIngredientResultDTO,
  CreateManyIngredientResultDTO,
  FindManyIngredientResultDTO,
  FindUniqueIngredientResultDTO,
} from '@kookio/prisma-client/dtos';
import { ingredientLabelers } from '@kookio/shared-utility';

import { createTestScheduler } from '../../../test-setup';
import { TrpcClientApp } from '../../../trpc-client';

import { IngredientService } from './ingredient.service';

const now = new Date('2024-01-01T00:00:00Z');
const createdIngredient = {
  id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  name: 'Sour Cream',
  quantity: 100,
  unit: 'g',
  optional: true,
  userId: 'test-user-id-11',
  createdAt: now,
  updatedAt: now,
};
const createRequest = { data: createdIngredient };
const existingIngredient = {
  ...mockIngredients[0],
  createdAt: now,
};
const { name, userId } = existingIngredient;
const findUniqueRequest = { where: { userId_name: { userId, name } } };

export const ingredientTrpcMock = {
  ingredient: {
    create: {
      mutate: vi
        .fn()
        .mockImplementation(
          (): Observable<CreateIngredientResultDTO> => of(createdIngredient),
        ),
    },
    createMany: {
      mutate: vi.fn().mockImplementation(
        (): Observable<CreateManyIngredientResultDTO> =>
          of({
            count: mockIngredients.length,
          } as CreateManyIngredientResultDTO),
      ),
    },
    findMany: {
      query: vi.fn().mockImplementation(
        (): Observable<FindManyIngredientResultDTO> =>
          of({
            data: mockIngredients,
            pagination: {
              hasNext: false,
              hasPrev: false,
              page: 1,
              pageSize: mockIngredients.length,
              total: mockIngredients.length,
              totalPages: 1,
            },
          } as FindManyIngredientResultDTO),
      ),
    },
    findUnique: {
      query: vi
        .fn()
        .mockImplementation(
          (): Observable<FindUniqueIngredientResultDTO> =>
            of(existingIngredient as FindUniqueIngredientResultDTO),
        ),
    },
  },
};

describe('IngredientService', () => {
  let service: IngredientService;

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

      const result$ = service.create(createRequest);

      expectObservable(result$).toBe('--a|', { a: createdIngredient });

      scheduler.flush();
    });
  });

  it('should fetch and set ingredients list from tRPC (marble)', () => {
    const scheduler = createTestScheduler();

    scheduler.run(({ cold, expectObservable }) => {
      const response$ = cold('--x|', { x: existingIngredient });

      ingredientTrpcMock.ingredient.findUnique.query.mockReturnValue(response$);

      const result$ = service.findUnique(findUniqueRequest);

      expectObservable(result$).toBe('--x|', { x: existingIngredient });

      scheduler.flush();
    });
  });

  it('should handle errors (marble)', () => {
    const scheduler = createTestScheduler();
    const errorSpy = vi.spyOn(console, 'error');

    scheduler.run(({ cold, expectObservable }) => {
      const createLabel = ingredientLabelers.fromCreateData(createRequest.data);
      const err = new Error('Simulated API failure');
      const findLabel = ingredientLabelers.fromWhere(findUniqueRequest.where);

      ingredientTrpcMock.ingredient.findUnique.query.mockReturnValue(
        cold('--#', {}, err),
      );
      ingredientTrpcMock.ingredient.create.mutate.mockReturnValue(
        cold('--#', {}, err),
      );

      const fetch$ = service.findUnique(findUniqueRequest);
      const create$ = service.create(createRequest);

      expectObservable(fetch$).toBe('--(y|)', {
        y: {} as FindUniqueIngredientResultDTO,
      });
      expectObservable(create$).toBe('--(b|)', {
        b: {} as CreateIngredientResultDTO,
      });

      scheduler.flush();

      expect(errorSpy).toHaveBeenCalledTimes(2);

      expect(errorSpy).toHaveBeenCalledWith(
        err,
        `❌ Error finding ingredient from tRPC: ${findLabel}`,
      );

      expect(errorSpy).toHaveBeenCalledWith(
        err,
        `❌ Error creating ingredient via tRPC: ${createLabel}`,
      );
    });
  });
});
