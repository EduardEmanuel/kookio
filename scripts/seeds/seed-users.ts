import {
  prisma,
  RoleSchema,
  type Role,
  type UserSeeded,
} from '@kookio/prisma-client';
import { getAdminAuth } from '@kookio/server-auth';

import { logger } from './seed-helpers';

const role = RoleSchema.Values;

type UserSeed = {
  email: string;
  password: string;
  name: string;
  roles: Role[];
  claims?: Record<string, unknown>;
};

const seedUser = async (seed: UserSeed): Promise<UserSeeded> => {
  const auth = getAdminAuth();
  const { email, password, name, roles, claims = {} } = seed;

  let firebaseUid: string;
  try {
    const existing = await auth.getUserByEmail(email);
    firebaseUid = existing.uid;
    await auth.updateUser(firebaseUid, { password, emailVerified: true });
    logger.info(
      { uid: firebaseUid, email },
      '♻️  Firebase user exists — resynced',
    );
  } catch (err: unknown) {
    const e = err as { code?: string };
    if (e.code === 'auth/user-not-found') {
      const created = await auth.createUser({
        email,
        password,
        emailVerified: true,
      });
      firebaseUid = created.uid;
      logger.info({ uid: firebaseUid, email }, '✨ Firebase user created');
    } else {
      throw err;
    }
  }

  // Derive claims from roles + allow overrides
  const derivedClaims = {
    admin: roles.includes(role.ADMIN),
    ...claims,
  };
  await auth.setCustomUserClaims(firebaseUid, derivedClaims);

  const result = (await prisma.user.upsert({
    where: { email },
    create: { email, name, firebaseUid, roles, amr: ['password'] },
    update: { firebaseUid, roles },
    select: { id: true, email: true, roles: true, firebaseUid: true },
  } as never)) as UserSeeded;

  logger.info({ user: result }, '✅ User seeded');
  return result;
};

type UserCredentials = Pick<UserSeed, 'email' | 'password'>;

type SeedCredentials = {
  admin: UserCredentials;
  regularUser?: UserCredentials;
};

export const seedUsers = async ({
  admin,
  regularUser,
}: SeedCredentials): Promise<Record<string, UserSeeded>> => {
  logger.info('🌱 Seeding users (Firebase + Prisma)…');

  const seeds: Array<UserSeed & { key: string }> = [
    { key: 'admin', ...admin, name: 'Admin', roles: [role.ADMIN, role.USER] },
  ];

  if (regularUser) {
    seeds.push({
      key: 'regularUser',
      ...regularUser,
      name: 'Regular User',
      roles: [role.USER],
    });
  }

  const results: Record<string, UserSeeded> = {};
  for (const { key, ...seed } of seeds) {
    results[key] = await seedUser(seed);
  }

  logger.info({ count: Object.keys(results).length }, '✅ All users seeded');
  return results;
};
