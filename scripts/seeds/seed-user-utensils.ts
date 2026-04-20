import { prisma, type UserMock } from '@kookio/prisma-client';

import { logger } from './seed-helpers';

// Slugs assigned to dev/test users at seed time
const USER_UTENSIL_SLUGS: Record<string, string[]> = {
  usr_dev_user: [
    'chef-knife',
    'cutting-board',
    'frying-pan',
    'saucepan',
    'mixing-bowl',
  ],
  usr_dev_admin: ['chef-knife', 'frying-pan'],
  usr_test_001: ['chef-knife', 'cutting-board', 'frying-pan'],
  usr_test_002: ['chef-knife', 'cutting-board'],
};

export const seedUserUtensils = async (users: UserMock[]): Promise<void> => {
  logger.info('🌱 Seeding user utensils…');

  const slugs = [...new Set(Object.values(USER_UTENSIL_SLUGS).flat())];
  const [utensils, profiles] = await Promise.all([
    prisma.utensil.findMany({
      where: { slug: { in: slugs } },
      select: { id: true, slug: true },
    }),
    prisma.userProfile.findMany({
      where: { userId: { in: users.map((u) => u.id) } },
      select: { id: true, userId: true },
    }),
  ]);
  const slugToId = Object.fromEntries(utensils.map((u) => [u.slug, u.id]));
  const userIdToProfileId = Object.fromEntries(
    profiles.map((p) => [p.userId, p.id]),
  );

  const rows = users.flatMap((user) => {
    const assignedSlugs = USER_UTENSIL_SLUGS[user.id] ?? [];
    const profileId = userIdToProfileId[user.id];
    if (!profileId) return [];
    return assignedSlugs
      .map((slug) => slugToId[slug])
      .filter(Boolean)
      .map((utensilId) => ({ userId: profileId, utensilId }));
  });

  if (rows.length > 0) {
    await prisma.userUtensil.createMany({
      data: rows,
      skipDuplicates: true,
    });
  }

  logger.info({ count: rows.length }, '✅ User utensils seeded');
};
