import { prisma, type UserMock } from '@kookio/prisma-client';

import { logger } from './seed-helpers';

// Slugs assigned to dev/test users at seed time
const USER_RESTRICTION_SLUGS: Record<string, string[]> = {
  usr_dev_user: ['vegetarian', 'gluten-free'],
  usr_dev_admin: [],
  usr_test_001: ['vegan'],
  usr_test_002: ['dairy-free', 'nut-free'],
};

export const seedUserDietaryRestrictions = async (
  users: UserMock[],
): Promise<void> => {
  logger.info('🌱 Seeding user dietary restrictions…');

  const slugs = [...new Set(Object.values(USER_RESTRICTION_SLUGS).flat())];
  const restrictions = await prisma.dietaryRestriction.findMany({
    where: { slug: { in: slugs } },
    select: { id: true, slug: true },
  });
  const slugToId = Object.fromEntries(restrictions.map((r) => [r.slug, r.id]));

  const rows = users.flatMap((user) => {
    const assignedSlugs = USER_RESTRICTION_SLUGS[user.id] ?? [];
    return assignedSlugs
      .map((slug) => slugToId[slug])
      .filter(Boolean)
      .map((dietaryRestrictionId) => ({
        userId: user.id,
        dietaryRestrictionId,
      }));
  });

  if (rows.length > 0) {
    await prisma.userDietaryRestriction.createMany({
      data: rows,
      skipDuplicates: true,
    });
  }

  logger.info({ count: rows.length }, '✅ User dietary restrictions seeded');
};
