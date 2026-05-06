import { vi } from 'vitest';

import type { RecipeFeedPage, RecipeMatchPage } from '@kookio/prisma-client';

import type { RecipesTrpcClient } from '../recipes-trpc';

export interface MockRecipesTrpcOptions {
  feed?: RecipeFeedPage | RecipeFeedPage[];
  feedError?: unknown;
  match?: RecipeMatchPage | RecipeMatchPage[];
  matchError?: unknown;
}

/**
 * Builds a mocked RecipesTrpcClient for component tests.
 *
 * - Pass a single `RecipeFeedPage` / `RecipeMatchPage` to make every
 *   `feed.query` / `match.query` call resolve with the same payload.
 * - Pass an array to drain pages in order (one per call); after exhaustion,
 *   the last entry is returned again, which keeps tests that scroll past
 *   the end deterministic.
 * - Pass `feedError` / `matchError` to make every call on the corresponding
 *   procedure reject with the given value.
 *
 * When match is left unset, `match.query` resolves with an empty page so
 * existing feed-only specs do not need to reason about match at all.
 */
export const buildRecipesTrpcMock = (
  options: MockRecipesTrpcOptions = {},
): RecipesTrpcClient => {
  const feedMock = vi.fn();

  if (options.feedError !== undefined) {
    feedMock.mockRejectedValue(options.feedError);
  } else if (Array.isArray(options.feed)) {
    const pages = options.feed;
    let i = 0;
    feedMock.mockImplementation(() => {
      const page = pages[Math.min(i, pages.length - 1)];
      i += 1;
      return Promise.resolve(page);
    });
  } else {
    const page: RecipeFeedPage = options.feed ?? {
      items: [],
      nextCursor: null,
    };
    feedMock.mockResolvedValue(page);
  }

  const matchMock = vi.fn();

  if (options.matchError !== undefined) {
    matchMock.mockRejectedValue(options.matchError);
  } else if (Array.isArray(options.match)) {
    const pages = options.match;
    let i = 0;
    matchMock.mockImplementation(() => {
      const page = pages[Math.min(i, pages.length - 1)];
      i += 1;
      return Promise.resolve(page);
    });
  } else {
    const page: RecipeMatchPage = options.match ?? {
      items: [],
      nextCursor: null,
      partialScan: false,
    };
    matchMock.mockResolvedValue(page);
  }

  return {
    recipes: {
      feed: { query: feedMock },
      match: { query: matchMock },
    },
  };
};
