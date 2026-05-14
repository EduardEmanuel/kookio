import { prisma } from '@kookio/prisma-client/server';
import { MealSlotTypeSchema } from '@kookio/prisma-client';
import { createMockMealSlot } from '@kookio/shared-mock';

import { logger } from './seed-helpers';

const mst = MealSlotTypeSchema.Values;

/**
 * Seed a sample week of meal slots for the given user. Slots are flat —
 * there's no parent "plan" entity anymore; each row stands alone keyed by
 * (userId, date, slotType).
 *
 * Pattern: Mon–Fri dinner with a recipe, plus a Tuesday lunch. Sat/Sun
 * are intentionally left empty so dev sees the "Not planned" UI.
 */
export const seedMealSlots = async (
  userId: string,
  recipeIds: string[],
): Promise<void> => {
  if (recipeIds.length === 0) {
    logger.info('🌱 Skipping meal slots — no recipes available');
    return;
  }

  logger.info({ userId }, '🌱 Seeding meal slots…');

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
  ];

  // Anchor the seed slots to the current week so dev users see meals on
  // their actual timeline rather than at a stale historical date.
  const weekStart = new Date();
  weekStart.setUTCHours(0, 0, 0, 0);
  weekStart.setUTCDate(
    weekStart.getUTCDate() - ((weekStart.getUTCDay() + 6) % 7),
  );

  const rows = slots.map(({ daysOffset, slotType, recipeId }) => {
    const date = new Date(weekStart);
    date.setUTCDate(date.getUTCDate() + daysOffset);
    return createMockMealSlot(userId, recipeId, date, slotType);
  });

  for (const slot of rows) {
    await prisma.mealSlot.upsert({
      where: {
        userId_date_slotType: {
          userId: slot.userId,
          date: slot.date,
          slotType: slot.slotType,
        },
      },
      create: slot,
      update: { recipeId: slot.recipeId, servings: slot.servings },
    });
  }

  logger.info({ count: rows.length, userId }, '✅ Meal slots seeded');
};
