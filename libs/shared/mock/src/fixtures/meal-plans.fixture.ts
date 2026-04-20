import {
  createMockMealPlan,
  resetMealPlanCounter,
} from '../factories/meal-plan.factory';

resetMealPlanCounter();

export const devMealPlans = [
  createMockMealPlan('usr_dev_user', {
    id: 'mp_dev_week1',
    name: 'Week 1',
    startDate: new Date('2026-01-05T00:00:00.000Z'),
    endDate: new Date('2026-01-11T23:59:59.000Z'),
  }),
];
