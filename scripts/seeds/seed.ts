// Central seed orchestrator: admin → catalog → recipes → Tier 2 → Tier 3
import { prisma } from '@kookio/prisma-client';
import {
  devDietaryRestrictions,
  devMealPlans,
  devRecipeCollections,
  devUsers,
  devUtensils,
  testUsers,
} from '@kookio/shared-mock';
import { logger } from '@kookio/server-logger';

import { env } from './seed-helpers';
import { seedUsers } from './seed-users';
import { runSeedCatalog } from './seed-catalog';
import { runSeedRecipes } from './seed-recipes';
import { seedDietaryRestrictions } from './seed-dietary-restrictions';
import { seedUtensils } from './seed-utensils';
import { seedMockUsers } from './seed-mock-users';
import { seedUserProfiles } from './seed-user-profiles';
import { seedUserDietaryRestrictions } from './seed-user-dietary-restrictions';
import { seedUserUtensils } from './seed-user-utensils';
import { seedRecipeCollections } from './seed-recipe-collections';
import { seedPantryItems } from './seed-pantry-items';
import { seedCookingSessions } from './seed-cooking-sessions';
import { seedMealPlans } from './seed-meal-plans';

const fetchSeedRecipeIds = async (): Promise<string[]> => {
  const recipes = await prisma.recipe.findMany({
    take: 10,
    orderBy: { createdAt: 'asc' },
    select: { id: true },
  });
  return recipes.map((r) => r.id);
};

const main = async () => {
  logger.info('🌱 Starting database seed');

  // ----- Tier 1: Foundational (all environments) -----

  if (env.ADMIN_EMAIL && env.ADMIN_PASSWORD) {
    await seedUsers({
      admin: { email: env.ADMIN_EMAIL, password: env.ADMIN_PASSWORD },
    });
  }

  await runSeedCatalog();
  await runSeedRecipes();

  // Dietary restrictions and utensils are reference data, always seeded
  await seedDietaryRestrictions(devDietaryRestrictions);
  await seedUtensils(devUtensils);

  // ----- Tier 2: Mock users + profiles + assignments -----

  const mockUsers = [...devUsers, ...testUsers];
  await seedMockUsers(mockUsers);
  await seedUserProfiles(mockUsers);
  await seedUserDietaryRestrictions(mockUsers);
  await seedUserUtensils(mockUsers);

  // ----- Tier 3: Debug data for dev user -----

  const recipeIds = await fetchSeedRecipeIds();
  const devUserId = devUsers[1].id; // usr_dev_user

  await seedRecipeCollections(devRecipeCollections, recipeIds);
  await seedPantryItems(devUserId);
  await seedCookingSessions(devUserId, recipeIds);
  await seedMealPlans(devMealPlans, recipeIds);

  logger.info('✅ Database seed complete');
};

main()
  .catch((error: unknown) => {
    logger.error(error, '❌ Prisma seed failed');
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
