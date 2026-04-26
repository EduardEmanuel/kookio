import {
  prisma,
  MealSlotTypeSchema,
  type MealPlanMock,
} from '@kookio/prisma-client';
import {
  createMockMealPlanSlot,
  resetMealPlanCounter,
  resetMealPlanSlotCounter,
} from '@kookio/shared-mock';

import { logger } from './seed-helpers';

const mst = MealSlotTypeSchema.Values;

const seedMealPlanSlots = async (
  mealPlanId: string,
  recipeIds: string[],
): Promise<void> => {
  if (recipeIds.length === 0) return;

  // One week of dinner slots: Mon–Fri with a recipe, Sat–Sun without
  const slots = [
    { daysOffset: 0, slotType: mst.DINNER, recipeId: recipeIds[0] },
    {
      daysOffset: 1,
      slotType: mst.LUNCH,
      recipeId: recipeIds[1] ?? recipeIds[0],
    },
    {
      daysOffset: 2,
      slotType: mst.DINNER,
      recipeId: recipeIds[2] ?? recipeIds[0],
    },
    {
      daysOffset: 3,
      slotType: mst.DINNER,
      recipeId: recipeIds[3] ?? recipeIds[0],
    },
    {
      daysOffset: 4,
      slotType: mst.DINNER,
      recipeId: recipeIds[4] ?? recipeIds[0],
    },
    { daysOffset: 5, slotType: mst.DINNER, recipeId: null },
    { daysOffset: 6, slotType: mst.DINNER, recipeId: null },
  ];

  const weekStart = new Date('2026-01-05T00:00:00.000Z');
  const rows = slots.map(({ daysOffset, slotType, recipeId }) => {
    const date = new Date(weekStart);
    date.setUTCDate(date.getUTCDate() + daysOffset);
    return createMockMealPlanSlot(mealPlanId, recipeId, date, slotType);
  });

  for (const slot of rows) {
    await prisma.mealPlanSlot.upsert({
      where: {
        mealPlanId_date_slotType: {
          mealPlanId: slot.mealPlanId,
          date: slot.date,
          slotType: slot.slotType,
        },
      },
      create: slot,
      update: { recipeId: slot.recipeId, servings: slot.servings },
    });
  }
};

export const seedMealPlans = async (
  plans: MealPlanMock[],
  recipeIds: string[],
): Promise<void> => {
  logger.info({ count: plans.length }, '🌱 Seeding meal plans…');
  resetMealPlanCounter();
  resetMealPlanSlotCounter();

  for (const plan of plans) {
    await prisma.mealPlan.upsert({
      where: { id: plan.id },
      create: plan,
      update: { name: plan.name },
    } as never);

    await seedMealPlanSlots(plan.id, recipeIds);
  }

  logger.info({ count: plans.length }, '✅ Meal plans seeded');
};
