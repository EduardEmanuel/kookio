import {
  createMockUtensil,
  resetUtensilCounter,
} from '../factories/utensil.factory';

resetUtensilCounter();

export const devUtensils = [
  createMockUtensil({
    id: 'utensil_chef_knife',
    slug: 'chef-knife',
    name: "Chef's Knife",
    emoji: '🔪',
    category: 'cutting',
  }),
  createMockUtensil({
    id: 'utensil_cutting_board',
    slug: 'cutting-board',
    name: 'Cutting Board',
    emoji: '🪵',
    category: 'cutting',
  }),
  createMockUtensil({
    id: 'utensil_frying_pan',
    slug: 'frying-pan',
    name: 'Frying Pan',
    emoji: '🍳',
    category: 'cooking',
  }),
  createMockUtensil({
    id: 'utensil_saucepan',
    slug: 'saucepan',
    name: 'Saucepan',
    emoji: '🥘',
    category: 'cooking',
  }),
  createMockUtensil({
    id: 'utensil_stockpot',
    slug: 'stockpot',
    name: 'Stockpot',
    emoji: '🫕',
    category: 'cooking',
  }),
  createMockUtensil({
    id: 'utensil_baking_sheet',
    slug: 'baking-sheet',
    name: 'Baking Sheet',
    emoji: '🍞',
    category: 'baking',
  }),
  createMockUtensil({
    id: 'utensil_mixing_bowl',
    slug: 'mixing-bowl',
    name: 'Mixing Bowl',
    emoji: '🥣',
    category: 'baking',
  }),
  createMockUtensil({
    id: 'utensil_whisk',
    slug: 'whisk',
    name: 'Whisk',
    emoji: '🌀',
    category: 'baking',
  }),
  createMockUtensil({
    id: 'utensil_spatula',
    slug: 'spatula',
    name: 'Spatula',
    emoji: '🥄',
    category: 'cooking',
  }),
  createMockUtensil({
    id: 'utensil_colander',
    slug: 'colander',
    name: 'Colander',
    emoji: '🫙',
    category: 'cooking',
  }),
  createMockUtensil({
    id: 'utensil_measuring_cups',
    slug: 'measuring-cups',
    name: 'Measuring Cups',
    emoji: '🥤',
    category: 'measuring',
  }),
  createMockUtensil({
    id: 'utensil_wooden_spoon',
    slug: 'wooden-spoon',
    name: 'Wooden Spoon',
    emoji: '🥄',
    category: 'cooking',
  }),
];
