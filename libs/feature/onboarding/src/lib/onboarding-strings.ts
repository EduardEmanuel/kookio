/**
 * Single source of truth for user-facing strings in the onboarding flow.
 *
 * Components read from here; tests assert against these values directly so
 * label changes do not require a parallel update to spec files.
 *
 * i18n migration: the `@@onboarding.*` keys below match the markers placed
 * inside the component template. Once `@angular/localize` is wired up, swap
 * each `<!-- i18n: @@key -->` comment in the template for the matching
 * `i18n="@@key"` (or `i18n-label="@@key"`) attribute and feed translations
 * via the standard tooling.
 */

export const STEP_LABELS = [
  'Welcome to Kookio!',
  'Your fridge contents',
  'Your utensils',
  'How many people?',
  'Food restrictions',
  "You're all set!",
] as const;

export const ACTION_LABELS = {
  back: 'Back',
  skip: 'Skip',
  start: 'Get started',
  continue: 'Continue',
  // `submit` removed: the last-step CTA is now a wordmark-stamp SVG
  // (see onboarding-stepper.component.html) so it has no visible text
  // and uses an aria-label directly on the button instead.
} as const;

/** Welcome step (index 0). */
export const START_STRINGS = {
  heading: 'Welcome to Kookio!',
  subtitle:
    "Let's get to know you. In a few quick steps you'll be ready to cook without food waste.",
  nameLabel: 'How should we call you?',
  namePlaceholder: 'Your name',
  nameHint: "We'll use it to greet you on the dashboard.",
  nameRequired: 'Please enter your name',
  nameMaxLength: 'Max 50 characters',
  chips: {
    pantry: 'Pantry contents',
    utensils: 'Utensils',
    people: 'People',
    restrictions: 'Restrictions',
  },
  hint: 'It takes less than 2 minutes.',
} as const;

/** Fridge step (index 1) — preferences for meal categories and cuisines. */
export const FRIDGE_STRINGS = {
  heading: "What's in your fridge — or what would you like to cook?",
  subtitle: 'Pick the kinds of food you enjoy.',
  tabs: {
    pantry: 'Your ingredients',
    preferences: 'Preferences',
  },
  pantryEmptyHint:
    "Add a few ingredients now and we'll suggest recipes you can cook right away. You can always manage your full pantry from the Pantry tab later.",
  addToFridge: 'Add to fridge',
  subTabs: {
    categories: 'Categories',
    areas: 'Cuisines',
  },
  emptyCategories: 'No categories available right now.',
  emptyAreas: 'No cuisines available right now.',
  ariaCategories: 'Preferred meal categories',
  ariaAreas: 'Preferred cuisines',
} as const;

/** Utensils step (index 2). */
export const UTENSILS_STRINGS = {
  heading: 'What utensils do you have?',
  subtitle:
    "We'll use this to recommend recipes you can actually prepare with what you own.",
  empty: 'No utensils available right now.',
  uncategorized: 'Other',
  ariaPrefix: 'Utensils — ',
} as const;

/**
 * Mapping of utensil DB categories → user-facing group labels.
 * Source of truth for categories: the `category` field on `Utensil` rows in
 * the database. Unknown categories fall back to `UTENSILS_STRINGS.uncategorized`.
 */
export const UTENSIL_CATEGORY_LABELS: Record<string, string> = {
  cutting: 'Cutting',
  cooking: 'Cooking',
  baking: 'Baking',
  measuring: 'Measuring',
};

/**
 * Order in which utensil groups appear in the UI. Categories not listed here
 * are appended in alphabetical order at the end (`uncategorized` always last).
 */
export const UTENSIL_CATEGORY_ORDER = [
  'cutting',
  'cooking',
  'baking',
  'measuring',
] as const;

/** People step (index 3). */
export const PEOPLE_STRINGS = {
  heading: 'How many people are you cooking for?',
  subtitle: "We'll scale recipe portions based on this.",
  adults: 'Adults',
  children: 'Children',
  decreaseAdults: 'Decrease adults',
  increaseAdults: 'Increase adults',
  decreaseChildren: 'Decrease children',
  increaseChildren: 'Increase children',
  notice:
    "For children we'll suggest smaller portions and age-appropriate ingredients.",
} as const;

/** Restrictions step (index 4). */
export const RESTRICTIONS_STRINGS = {
  heading: 'Any dietary restrictions?',
  subtitle: "We'll filter recipes to respect your choices.",
  empty: 'No dietary restrictions available right now.',
} as const;

/** Done step (index 5). */
export const DONE_STRINGS = {
  heading: "You're all set!",
  hint: "Here's what you've configured:",
  cta: 'Press "Let\'s Kookio it!" to save your preferences.',
  summary: {
    people: (adults: number, children: number) =>
      `${adults} adult${adults === 1 ? '' : 's'}, ${children} child${children === 1 ? '' : 'ren'}`,
    categories: (count: number) =>
      `${count} categor${count === 1 ? 'y' : 'ies'}`,
    areas: (count: number) => `${count} cuisine${count === 1 ? '' : 's'}`,
    ingredients: (count: number) =>
      `${count} ingredient${count === 1 ? '' : 's'}`,
    utensils: (count: number) => `${count} utensil${count === 1 ? '' : 's'}`,
    restrictions: (count: number) =>
      `${count} restriction${count === 1 ? '' : 's'}`,
  },
} as const;
