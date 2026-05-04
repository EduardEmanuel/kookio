import { prisma } from '@kookio/prisma-client/server';
import type { RecipeCollectionMock } from '@kookio/prisma-client';

import { logger } from './seed-helpers';

export const seedRecipeCollections = async (
  collections: RecipeCollectionMock[],
  recipeIds: string[],
): Promise<void> => {
  logger.info({ count: collections.length }, '🌱 Seeding recipe collections…');

  for (const col of collections) {
    await prisma.recipeCollection.upsert({
      where: { id: col.id },
      create: col,
      update: { userId: col.userId, name: col.name, emoji: col.emoji },
    } as never);
  }

  // Add a sample of recipes to the first "Favorite" collection
  const favoritesCollection = collections.find((c) => c.name === 'Favorite');
  if (favoritesCollection && recipeIds.length > 0) {
    const sampleIds = recipeIds.slice(0, 5);
    await prisma.recipeCollectionEntry.createMany({
      data: sampleIds.map((recipeId) => ({
        collectionId: favoritesCollection.id,
        recipeId,
      })),
      skipDuplicates: true,
    });
    logger.debug(
      { collectionId: favoritesCollection.id, count: sampleIds.length },
      'Added recipes to Favorites collection',
    );
  }

  logger.info('✅ Recipe collections seeded');
};
