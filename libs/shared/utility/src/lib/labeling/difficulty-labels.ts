import { DifficultySchema, type Difficulty } from '@kookio/prisma-client';

/**
 * Runtime list of every `Difficulty` in the schema, derived from the
 * generated zod enum. Centralised here so frontend consumers depend on the
 * small `@kookio/shared-utility` surface instead of importing the prisma
 * barrel at every call site. Safe post the `@kookio/prisma-client/server`
 * split: the root barrel is browser-safe (types + zod schemas only).
 */
export const DIFFICULTIES = DifficultySchema.options;

/** Short display labels for difficulty levels. */
export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard',
};

/**
 * Emoji prefixes used in the difficulty chip across recipe surfaces. Single-
 * quoted on purpose — the `scripts/build-twemoji.ts` TS scanner matches
 * `KEY: 'emoji'` literals and won't pick up double-quoted values.
 */
export const DIFFICULTY_EMOJI: Record<Difficulty, string> = {
  EASY: '🟢',
  MEDIUM: '🟡',
  HARD: '🔴',
};
