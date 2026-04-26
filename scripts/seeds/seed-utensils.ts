import { prisma, type UtensilMock } from '@kookio/prisma-client';

import { logger } from './seed-helpers';

export const seedUtensils = async (rows: UtensilMock[]): Promise<void> => {
  logger.info({ count: rows.length }, '🌱 Seeding utensils…');

  for (const row of rows) {
    await prisma.utensil.upsert({
      where: { slug: row.slug },
      create: row,
      update: { name: row.name, emoji: row.emoji, category: row.category },
    } as never);
  }

  logger.info({ count: rows.length }, '✅ Utensils seeded');
};
