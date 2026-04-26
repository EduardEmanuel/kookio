import { prisma, type UserMock } from '@kookio/prisma-client';
import { createMockUserProfile } from '@kookio/shared-mock';

import { logger } from './seed-helpers';

export const seedUserProfiles = async (users: UserMock[]): Promise<void> => {
  logger.info({ count: users.length }, '🌱 Seeding user profiles…');

  for (const user of users) {
    const profile = createMockUserProfile(user.id, {
      id: `prf_${user.id}`,
    });

    await prisma.userProfile.upsert({
      where: { userId: profile.userId },
      create: profile,
      update: {
        adultsCount: profile.adultsCount,
        childrenCount: profile.childrenCount,
      },
    } as never);
  }

  logger.info({ count: users.length }, '✅ User profiles seeded');
};
