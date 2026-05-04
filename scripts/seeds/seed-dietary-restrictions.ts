import { prisma } from '@kookio/prisma-client/server';
import type { DietaryRestrictionMock } from '@kookio/prisma-client';

import { logger } from './seed-helpers';

export const seedDietaryRestrictions = async (
  rows: DietaryRestrictionMock[],
): Promise<void> => {
  logger.info({ count: rows.length }, '🌱 Seeding dietary restrictions…');

  for (const row of rows) {
    await prisma.dietaryRestriction.upsert({
      where: { id: row.id },
      create: row,
      update: {
        slug: row.slug,
        label: row.label,
        emoji: row.emoji,
        description: row.description,
      },
    } as never);
  }

  logger.info({ count: rows.length }, '✅ Dietary restrictions seeded');
};
