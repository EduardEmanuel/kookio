import { vi } from 'vitest';

import type { RecipeFeedPage } from '@kookio/prisma-client';

import type { RecipesTrpcClient } from '../recipes-trpc';

export interface MockRecipesTrpcOptions {
  feed?: RecipeFeedPage | RecipeFeedPage[];
  feedError?: unknown;
}

/**
 * Builds a mocked RecipesTrpcClient for component tests.
 *
 * - Pass a single `RecipeFeedPage` to make every `feed.query` call resolve
 *   with the same payload.
 * - Pass an array to drain pages in order (one per call); after exhaustion,
 *   the last entry is returned again, which keeps tests that scroll past
 *   the end deterministic.
 * - Pass `feedError` to make every `feed.query` reject with the given value.
 */
export const buildRecipesTrpcMock = (
  options: MockRecipesTrpcOptions = {},
): RecipesTrpcClient => {
  const queryMock = vi.fn();

  if (options.feedError !== undefined) {
    queryMock.mockRejectedValue(options.feedError);
  } else if (Array.isArray(options.feed)) {
    const pages = options.feed;
    let i = 0;
    queryMock.mockImplementation(() => {
      const page = pages[Math.min(i, pages.length - 1)];
      i += 1;
      return Promise.resolve(page);
    });
  } else {
    const page: RecipeFeedPage = options.feed ?? {
      items: [],
      nextCursor: null,
    };
    queryMock.mockResolvedValue(page);
  }

  return {
    recipes: {
      feed: { query: queryMock },
    },
  } as RecipesTrpcClient;
};
