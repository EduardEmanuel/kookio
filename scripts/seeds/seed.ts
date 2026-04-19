// Central seed orchestrator: users → catalog → recipes
import { prisma } from '@kookio/prisma-client';
import { logger } from '@kookio/server-logger';
import { env } from './seed-helpers';
import { seedUsers } from './seed-users';
import { runSeedCatalog } from './seed-catalog';
import { runSeedRecipes } from './seed-recipes';

const main = async () => {
  // 1) Users (idempotent)
  if (env.ADMIN_EMAIL && env.ADMIN_PASSWORD) {
    await seedUsers({
      admin: {
        email: env.ADMIN_EMAIL,
        password: env.ADMIN_PASSWORD,
      },
    });
  }

  // 2) Catalog: categories, areas, ingredients
  await runSeedCatalog();

  // 3) Recipes
  await runSeedRecipes();
};

main()
  .catch((error) => {
    logger.error(error, '❌ Prisma seed failed');
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
