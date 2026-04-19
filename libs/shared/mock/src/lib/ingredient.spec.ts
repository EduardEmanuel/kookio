import { mockIngredients } from './ingredient';

const USER_ID = '8c16ec60-b623-4126-a11f-b1e3ee20fce4';
const CREATED_AT = new Date('2025-12-13T12:13:40.797');
const UPDATED_AT = new Date('2025-12-13T12:13:40.797');

describe('ingredient', () => {
  it('should get mock data', () => {
    expect(mockIngredients).toMatchObject([
      {
        name: 'Baking Powder',
        quantity: 10,
        unit: 'g',
        optional: false,
        userId: USER_ID,
        createdAt: CREATED_AT,
        updatedAt: UPDATED_AT,
      },
      {
        name: 'Eggs',
        quantity: 3,
        unit: 'pcs',
        optional: false,
        userId: USER_ID,
        createdAt: CREATED_AT,
        updatedAt: UPDATED_AT,
      },
      {
        name: 'Butter',
        quantity: 100,
        unit: 'g',
        optional: true,
        userId: USER_ID,
        createdAt: CREATED_AT,
        updatedAt: UPDATED_AT,
      },
      {
        name: 'Flour',
        quantity: 500,
        unit: 'g',
        optional: false,
        userId: USER_ID,
        createdAt: CREATED_AT,
        updatedAt: UPDATED_AT,
      },
      {
        name: 'Nuts',
        quantity: 50,
        unit: 'g',
        optional: true,
        userId: USER_ID,
        createdAt: CREATED_AT,
        updatedAt: UPDATED_AT,
      },
      {
        name: 'Milk',
        quantity: 250,
        unit: 'ml',
        optional: false,
        userId: USER_ID,
        createdAt: CREATED_AT,
        updatedAt: UPDATED_AT,
      },
      {
        name: 'Chocolate',
        quantity: 100,
        unit: 'g',
        optional: true,
        userId: USER_ID,
        createdAt: CREATED_AT,
        updatedAt: UPDATED_AT,
      },
      {
        name: 'Salt',
        quantity: 5,
        unit: 'g',
        optional: false,
        userId: USER_ID,
        createdAt: CREATED_AT,
        updatedAt: UPDATED_AT,
      },
      {
        name: 'Vanilla Extract',
        quantity: 5,
        unit: 'ml',
        optional: true,
        userId: USER_ID,
        createdAt: CREATED_AT,
        updatedAt: UPDATED_AT,
      },
      {
        name: 'Sugar',
        quantity: 200,
        unit: 'g',
        optional: false,
        userId: USER_ID,
        createdAt: CREATED_AT,
        updatedAt: UPDATED_AT,
      },
    ]);
  });
});
