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

export const STEP_PLACEHOLDERS = [
  '"Welcome" step — placeholder content.',
  '"Fridge" step — placeholder content.',
  '"Utensils" step — placeholder content.',
  '"People" step — placeholder content.',
  '"Restrictions" step — placeholder content.',
  '"Done" step — placeholder content.',
] as const;

export const ACTION_LABELS = {
  back: 'Back',
  skip: 'Skip',
  start: 'Get started',
  continue: 'Continue',
  submit: "Let's start cooking",
} as const;
