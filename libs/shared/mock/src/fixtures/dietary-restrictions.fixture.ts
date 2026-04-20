import {
  createMockDietaryRestriction,
  resetDietaryRestrictionCounter,
} from '../factories/dietary-restriction.factory';

resetDietaryRestrictionCounter();

export const devDietaryRestrictions = [
  createMockDietaryRestriction({
    id: 'dr_vegan',
    slug: 'vegan',
    label: 'Vegan',
    emoji: '🌱',
    description: 'No animal products',
  }),
  createMockDietaryRestriction({
    id: 'dr_vegetarian',
    slug: 'vegetarian',
    label: 'Vegetarian',
    emoji: '🥦',
    description: 'No meat or fish',
  }),
  createMockDietaryRestriction({
    id: 'dr_gluten_free',
    slug: 'gluten-free',
    label: 'Gluten-Free',
    emoji: '🌾',
    description: 'No gluten-containing grains',
  }),
  createMockDietaryRestriction({
    id: 'dr_dairy_free',
    slug: 'dairy-free',
    label: 'Dairy-Free',
    emoji: '🥛',
    description: 'No dairy products',
  }),
  createMockDietaryRestriction({
    id: 'dr_nut_free',
    slug: 'nut-free',
    label: 'Nut-Free',
    emoji: '🥜',
    description: 'No tree nuts or peanuts',
  }),
  createMockDietaryRestriction({
    id: 'dr_halal',
    slug: 'halal',
    label: 'Halal',
    emoji: '☪️',
    description: 'Prepared according to Islamic law',
  }),
  createMockDietaryRestriction({
    id: 'dr_kosher',
    slug: 'kosher',
    label: 'Kosher',
    emoji: '✡️',
    description: 'Prepared according to Jewish dietary law',
  }),
  createMockDietaryRestriction({
    id: 'dr_paleo',
    slug: 'paleo',
    label: 'Paleo',
    emoji: '🦴',
    description: 'Whole foods, no grains or legumes',
  }),
  createMockDietaryRestriction({
    id: 'dr_keto',
    slug: 'keto',
    label: 'Keto',
    emoji: '🥩',
    description: 'Very low carb, high fat',
  }),
  createMockDietaryRestriction({
    id: 'dr_low_fodmap',
    slug: 'low-fodmap',
    label: 'Low-FODMAP',
    emoji: '🍃',
    description: 'Low fermentable carbohydrates for IBS',
  }),
];
