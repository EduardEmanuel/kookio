import { prisma } from '@kookio/prisma-client/server';
import type { UserMock, UserSeeded } from '@kookio/prisma-client';

import { logger } from './seed-helpers';

const seedMockUser = async (row: UserMock): Promise<UserSeeded> => {
  const result = (await prisma.user.upsert({
    where: { id: row.id },
    create: { ...row, firebaseUid: null },
    update: { email: row.email, roles: row.roles, name: row.name },
    select: { id: true, email: true, roles: true, firebaseUid: true },
  } as never)) as UserSeeded;

  logger.debug(
    { userId: result.id, email: result.email },
    'Mock user upserted',
  );
  return result;
};

export const seedMockUsers = async (
  rows: UserMock[],
): Promise<Record<string, UserSeeded>> => {
  logger.info({ count: rows.length }, '🌱 Seeding mock users (Prisma only)…');

  const results: Record<string, UserSeeded> = {};
  for (const row of rows) {
    results[row.id] = await seedMockUser(row);
  }

  logger.info({ count: rows.length }, '✅ Mock users seeded');
  return results;
};
