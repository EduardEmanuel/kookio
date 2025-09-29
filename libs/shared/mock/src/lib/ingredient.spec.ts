import { mockIngredients } from './ingredient';

describe('ingredient', () => {
  it('should get mock data', () => {
    expect(mockIngredients).toEqual([
      { name: 'Flour', quantity: 500, unit: 'g', optional: false, userId: 'test-user-id-1' },
      { name: 'Sugar', quantity: 200, unit: 'g', optional: false, userId: 'test-user-id-2' },
      { name: 'Eggs', quantity: 3, unit: 'pcs', optional: false, userId: 'test-user-id-3' },
      { name: 'Milk', quantity: 250, unit: 'ml', optional: false, userId: 'test-user-id-4' },
      { name: 'Butter', quantity: 100, unit: 'g', optional: true, userId: 'test-user-id-5' },
      { name: 'Baking Powder', quantity: 10, unit: 'g', optional: false, userId: 'test-user-id-6' },
      { name: 'Salt', quantity: 5, unit: 'g', optional: false, userId: 'test-user-id-7' },
      { name: 'Vanilla Extract', quantity: 5, unit: 'ml', optional: true, userId: 'test-user-id-8' },
      { name: 'Chocolate Chips', quantity: 100, unit: 'g', optional: true, userId: 'test-user-id-9' },
      { name: 'Nuts', quantity: 50, unit: 'g', optional: true, userId: 'test-user-id-10' },
    ]);
  });
});
