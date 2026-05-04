import { prisma } from '@kookio/prisma-client/server';
import {
  createMockCookingSession,
  resetCookingSessionCounter,
} from '@kookio/shared-mock';

import { logger } from './seed-helpers';

export const seedCookingSessions = async (
  userId: string,
  recipeIds: string[],
): Promise<void> => {
  if (recipeIds.length === 0) {
    logger.warn('No recipe IDs available — skipping cooking sessions');
    return;
  }

  logger.info({ userId }, '🌱 Seeding cooking sessions…');
  resetCookingSessionCounter();

  // Create 3 completed sessions and 1 in-progress from the first few recipes
  const sessionDefs: Array<{ recipeId: string; completedAt: Date | null }> = [
    {
      recipeId: recipeIds[0],
      completedAt: new Date('2026-01-06T19:00:00.000Z'),
    },
    {
      recipeId: recipeIds[1] ?? recipeIds[0],
      completedAt: new Date('2026-01-08T12:30:00.000Z'),
    },
    {
      recipeId: recipeIds[2] ?? recipeIds[0],
      completedAt: new Date('2026-01-10T20:00:00.000Z'),
    },
    { recipeId: recipeIds[3] ?? recipeIds[0], completedAt: null },
  ];

  for (const def of sessionDefs) {
    const session = createMockCookingSession(userId, def.recipeId, {
      completedAt: def.completedAt,
    });
    await prisma.cookingSession.upsert({
      where: { id: session.id },
      create: session,
      update: { completedAt: session.completedAt },
    });
  }

  logger.info({ count: sessionDefs.length }, '✅ Cooking sessions seeded');
};
