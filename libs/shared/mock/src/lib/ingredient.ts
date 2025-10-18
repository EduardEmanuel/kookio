import { IngredientInputType } from '@kookio/prisma';

export const mockIngredients = [
    { id: '2e9328a6-d0f3-46a3-912c-cf5f077bbc8c', name: 'Flour', quantity: 500, unit: 'g', optional: false, userId: 'test-user-id-1' },
    { id: 'ed1a3497-576f-4fac-a5a1-6a6cb7bdddeb', name: 'Sugar', quantity: 200, unit: 'g', optional: false, userId: 'test-user-id-2' },
    { id: '22d6be80-c5a7-44db-acaa-74194adb0934', name: 'Eggs', quantity: 3, unit: 'pcs', optional: false, userId: 'test-user-id-3' },
    { id: '5d85fd37-5e53-478b-8cbe-4a955248722a', name: 'Milk', quantity: 250, unit: 'ml', optional: false, userId: 'test-user-id-4' },
    { id: '2e5a203f-3da7-4783-b1e9-7edf82558d42', name: 'Butter', quantity: 100, unit: 'g', optional: true, userId: 'test-user-id-5' },
    { id: '0bc783b9-ee91-4c45-a191-66787bec639e', name: 'Baking Powder', quantity: 10, unit: 'g', optional: false, userId: 'test-user-id-6' },
    { id: 'c4d9cb10-20f9-475d-9011-4a408b7ddb77', name: 'Salt', quantity: 5, unit: 'g', optional: false, userId: 'test-user-id-7' },
    { id: 'e769e19a-5ea7-4139-9b61-ffc3430bb6dc', name: 'Vanilla Extract', quantity: 5, unit: 'ml', optional: true, userId: 'test-user-id-8' },
    { id: '653b7308-dd90-4129-bf3f-80d67253bbe0', name: 'Chocolate Chips', quantity: 100, unit: 'g', optional: true, userId: 'test-user-id-9' },
    { id: '50837653-75f7-4778-a7df-d3a520abd4a3', name: 'Nuts', quantity: 50, unit: 'g', optional: true, userId: 'test-user-id-10' },
  ] as IngredientInputType[];