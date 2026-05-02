import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import type { RecipeFeedItem, RecipeFeedPage } from '@kookio/prisma-client';

import { buildRecipesTrpcMock } from '../../testing/build-trpc-mock';
import { RECIPES_TRPC } from '../../recipes-trpc';
import { RecipesFeedComponent } from './recipes-feed.component';

const makeRecipe = (id: string, title = `Recipe ${id}`): RecipeFeedItem => ({
  id,
  slug: `recipe-${id}`,
  title,
  imageUrl: null,
  prepTimeMinutes: 5,
  cookTimeMinutes: 10,
  servings: 2,
  category: null,
  area: null,
});

const makePage = (
  ids: string[],
  nextCursor: string | null = null,
): RecipeFeedPage => ({
  items: ids.map((id) => makeRecipe(id)),
  nextCursor,
});

/**
 * Drains the microtask queue so the in-flight tRPC promise has resolved and
 * its `tap` updates have written to signals before assertions run. A single
 * `await fixture.whenStable()` is not always enough under zoneless change
 * detection — chained `.then` callbacks need a couple of microtask turns.
 */
const flush = async (): Promise<void> => {
  for (let i = 0; i < 4; i++) {
    await Promise.resolve();
  }
};

const setup = async (
  trpc = buildRecipesTrpcMock({ feed: makePage([], null) }),
) => {
  await TestBed.configureTestingModule({
    imports: [RecipesFeedComponent],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([]),
      { provide: RECIPES_TRPC, useValue: trpc },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(RecipesFeedComponent);
  fixture.detectChanges();
  await fixture.whenStable();
  await flush();
  fixture.detectChanges();

  return {
    fixture,
    el: fixture.nativeElement as HTMLElement,
    component: fixture.componentInstance,
    trpc,
  };
};

describe('RecipesFeedComponent', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  describe('initial load', () => {
    it('queries the feed once on init with no cursor', async () => {
      const trpc = buildRecipesTrpcMock({
        feed: makePage(['1', '2', '3']),
      });
      const { component } = await setup(trpc);

      expect(trpc.recipes.feed.query).toHaveBeenCalledTimes(1);
      // First call must be undefined-cursor (omitted), so the server falls
      // back to the start of the feed.
      expect(trpc.recipes.feed.query).toHaveBeenCalledWith(
        expect.objectContaining({ limit: expect.any(Number) }),
      );
      const firstCall = (trpc.recipes.feed.query as ReturnType<typeof vi.fn>)
        .mock.calls[0][0];
      expect(firstCall.cursor).toBeUndefined();

      // Items end up in state.
      expect(
        (component as unknown as { items: () => RecipeFeedItem[] }).items()
          .length,
      ).toBe(3);
    });

    it('renders the empty state when the first page is empty', async () => {
      const { el, fixture } = await setup(
        buildRecipesTrpcMock({ feed: makePage([], null) }),
      );
      // Extra flush + detectChanges to surface the @if branch after the
      // signal updates from the initial query resolution.
      await flush();
      fixture.detectChanges();
      expect(el.querySelector('.recipes-feed__empty')).toBeTruthy();
      expect(el.textContent).toContain('No recipes available');
    });

    it('renders the error state when the first page rejects', async () => {
      const { el, component, fixture } = await setup(
        buildRecipesTrpcMock({ feedError: new Error('boom') }),
      );
      await flush();
      fixture.detectChanges();

      const c = component as unknown as {
        hasError: () => boolean;
        isLoading: () => boolean;
      };
      expect(c.hasError()).toBe(true);
      expect(c.isLoading()).toBe(false);
      expect(el.textContent).toContain('Could not load recipes');
    });
  });

  describe('pagination', () => {
    it('appends items and tracks the cursor across pages', async () => {
      // Realistic page size (>= PREFETCH_THRESHOLD): the production prefetch
      // guard only fires once the loaded list is meaningfully populated, so
      // the test must mirror that or the second fetch never triggers.
      const firstPage = Array.from({ length: 20 }, (_, i) => `${i + 1}`);
      const secondPage = Array.from({ length: 5 }, (_, i) => `${i + 21}`);
      const trpc = buildRecipesTrpcMock({
        feed: [makePage(firstPage, '20'), makePage(secondPage, null)],
      });
      const { component } = await setup(trpc);

      const c = component as unknown as {
        items: () => RecipeFeedItem[];
        hasMore: () => boolean;
        onScrolledIndexChange: (i: number) => void;
      };

      expect(c.items().length).toBe(20);
      expect(c.hasMore()).toBe(true);

      // Scrolling near the tail (index 16: only 4 items left) triggers a
      // prefetch; the threshold is 5 in the production component.
      c.onScrolledIndexChange(16);
      await flush();

      expect(trpc.recipes.feed.query).toHaveBeenCalledTimes(2);
      const secondCall = (trpc.recipes.feed.query as ReturnType<typeof vi.fn>)
        .mock.calls[1][0];
      expect(secondCall.cursor).toBe('20');

      expect(c.items().length).toBe(25);
      expect(c.hasMore()).toBe(false);
    });

    it('does not prefetch when the loaded list is below the threshold', async () => {
      // Short feed (2 items) — even though there is a next cursor, the
      // initial scrolledIndexChange(0) must NOT trigger a prefetch, because
      // the threshold guard requires more loaded items to be meaningful.
      const trpc = buildRecipesTrpcMock({
        feed: [makePage(['1', '2'], '2'), makePage(['3', '4'], null)],
      });
      const { component } = await setup(trpc);

      const c = component as unknown as {
        items: () => RecipeFeedItem[];
        onScrolledIndexChange: (i: number) => void;
      };

      // No spurious prefetch from initial render.
      expect(c.items().length).toBe(2);

      c.onScrolledIndexChange(0);
      c.onScrolledIndexChange(1);
      await flush();

      // Still only the first call.
      expect(trpc.recipes.feed.query).toHaveBeenCalledTimes(1);
    });

    it('does not refetch once nextCursor is null', async () => {
      const trpc = buildRecipesTrpcMock({
        feed: makePage(
          Array.from({ length: 20 }, (_, i) => `${i + 1}`),
          null,
        ),
      });
      const { component } = await setup(trpc);
      const c = component as unknown as {
        onScrolledIndexChange: (i: number) => void;
      };

      c.onScrolledIndexChange(18);
      c.onScrolledIndexChange(19);
      await flush();

      expect(trpc.recipes.feed.query).toHaveBeenCalledTimes(1);
    });

    it('does not stack parallel requests on rapid scroll bursts', async () => {
      // Slow page resolution so multiple scroll events fire while in flight.
      let resolveFn: ((page: RecipeFeedPage) => void) | undefined;
      const slowPage = new Promise<RecipeFeedPage>((resolve) => {
        resolveFn = resolve;
      });
      const firstPage = Array.from({ length: 20 }, (_, i) => `${i + 1}`);
      const trpc = {
        recipes: {
          feed: {
            query: vi
              .fn()
              .mockResolvedValueOnce(makePage(firstPage, '20'))
              .mockReturnValueOnce(slowPage)
              .mockResolvedValue(makePage(['x'], null)),
          },
        },
      };

      await TestBed.configureTestingModule({
        imports: [RecipesFeedComponent],
        providers: [
          provideZonelessChangeDetection(),
          provideRouter([]),
          { provide: RECIPES_TRPC, useValue: trpc },
        ],
      }).compileComponents();

      const fixture = TestBed.createComponent(RecipesFeedComponent);
      fixture.detectChanges();
      await fixture.whenStable();
      await flush();
      const c = fixture.componentInstance as unknown as {
        onScrolledIndexChange: (i: number) => void;
      };

      // Burst of scroll events near the tail (index 17: only 3 items left)
      // while page 2 is in flight.
      c.onScrolledIndexChange(17);
      c.onScrolledIndexChange(18);
      c.onScrolledIndexChange(19);
      await Promise.resolve();

      // Initial load + one prefetch — never three concurrent fetches.
      expect(trpc.recipes.feed.query).toHaveBeenCalledTimes(2);

      resolveFn?.(makePage(['21'], null));
      await flush();
    });
  });

  describe('retry', () => {
    it('refetches when the user clicks retry after an error', async () => {
      const queryMock = vi
        .fn()
        .mockRejectedValueOnce(new Error('boom'))
        .mockResolvedValueOnce(makePage(['1'], null));
      const trpc = {
        recipes: { feed: { query: queryMock } },
      };

      await TestBed.configureTestingModule({
        imports: [RecipesFeedComponent],
        providers: [
          provideZonelessChangeDetection(),
          provideRouter([]),
          { provide: RECIPES_TRPC, useValue: trpc },
        ],
      }).compileComponents();

      const fixture = TestBed.createComponent(RecipesFeedComponent);
      fixture.detectChanges();
      await fixture.whenStable();

      const c = fixture.componentInstance as unknown as {
        hasError: () => boolean;
        items: () => RecipeFeedItem[];
        onRetry: () => void;
      };
      expect(c.hasError()).toBe(true);

      c.onRetry();
      await Promise.resolve();
      await Promise.resolve();

      expect(queryMock).toHaveBeenCalledTimes(2);
      expect(c.items().length).toBe(1);
      expect(c.hasError()).toBe(false);
    });
  });
});
