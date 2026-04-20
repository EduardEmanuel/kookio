import {
  createMockRecipeCollection,
  resetCollectionCounter,
} from '../factories/recipe-collection.factory';

resetCollectionCounter();

// Default collections created at onboarding for dev users
export const devRecipeCollections = [
  createMockRecipeCollection('usr_dev_user', {
    id: 'col_dev_favorites',
    name: 'Favorite',
    emoji: '❤️',
  }),
  createMockRecipeCollection('usr_dev_user', {
    id: 'col_dev_try',
    name: 'De încercat',
    emoji: '🔖',
  }),
];
