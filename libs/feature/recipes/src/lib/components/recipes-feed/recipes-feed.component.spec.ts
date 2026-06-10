import { afterEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import {
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AuthStore } from '@kookio/feature-auth';
import { createMockAuthStore } from '@kookio/feature-auth/testing';
import { SAVED_TRPC, type SavedTrpcClient } from '@kookio/feature-saved/trpc';
import type { RecipeFeedItem, RecipeFeedPage } from '@kookio/prisma-client';

import { buildRecipesTrpcMock } from '../../testing/build-trpc-mock';
import { RECIPES_TRPC } from '../../recipes-trpc';
import { type FeedPage, RecipesFeedComponent } from './recipes-feed.component';

const makeSavedTrpc = (): SavedTrpcClient => ({
  recipeCollection: {
    getSaved: { query: vi.fn().mockResolvedValue([]) },
    getSavedIds: { query: vi.fn().mockResolvedValue([]) },
    toggleSave: {
      mutate: vi.fn().mockResolvedValue({ recipeId: '', saved: true }),
    },
  },
});

const savedProviders = () => [
  { provide: AuthStore, useValue: createMockAuthStore({ session: null }) },
  { provide: SAVED_TRPC, useValue: makeSavedTrpc() },
];

/**
 * Stubs the component's viewChild-resolved viewport so the prefetch
 * check reads a known `{ start, end }` instead of the empty range
 * jsdom-rendered viewports return by default. Use to simulate "user
 * scrolled near the loaded tail" in pagination tests.
 */
const setRenderedEnd = (
  component: RecipesFeedComponent<RecipeFeedItem>,
  end: number,
): void => {
  const viewport = (
    component as unknown as {
      viewport: () => CdkVirtualScrollViewport | undefined;
    }
  ).viewport();
  if (!viewport) {
    throw new Error(
      'Viewport not resolved — call fixture.detectChanges() after data loads',
    );
  }
  vi.spyOn(viewport, 'getRenderedRange').mockReturnValue({ start: 0, end });
};

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
      ...savedProviders(),
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
        maybePrefetch: () => void;
      };

      expect(c.items().length).toBe(20);
      expect(c.hasMore()).toBe(true);

      // Simulate the viewport rendering up to index 16 of 20 — only 4
      // items past the rendered tail, within the prefetch threshold (5).
      setRenderedEnd(
        component as unknown as RecipesFeedComponent<RecipeFeedItem>,
        16,
      );
      c.maybePrefetch();
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
      // viewport rendering everything must NOT trigger a prefetch, because
      // the threshold guard requires more loaded items to be meaningful.
      const trpc = buildRecipesTrpcMock({
        feed: [makePage(['1', '2'], '2'), makePage(['3', '4'], null)],
      });
      const { component } = await setup(trpc);

      const c = component as unknown as {
        items: () => RecipeFeedItem[];
        maybePrefetch: () => void;
      };

      // No spurious prefetch from initial render.
      expect(c.items().length).toBe(2);

      // Even with the viewport rendering everything (end === total === 2),
      // the `total > PREFETCH_THRESHOLD` guard blocks the prefetch.
      setRenderedEnd(
        component as unknown as RecipesFeedComponent<RecipeFeedItem>,
        2,
      );
      c.maybePrefetch();
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
        maybePrefetch: () => void;
      };

      // Even rendered to the very last item, `hasMore() === false` blocks
      // the prefetch.
      setRenderedEnd(
        component as unknown as RecipesFeedComponent<RecipeFeedItem>,
        20,
      );
      c.maybePrefetch();
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
          ...savedProviders(),
          ...savedProviders(),
        ],
      }).compileComponents();

      const fixture = TestBed.createComponent(RecipesFeedComponent);
      fixture.detectChanges();
      await fixture.whenStable();
      await flush();
      fixture.detectChanges();
      const c = fixture.componentInstance as unknown as {
        maybePrefetch: () => void;
      };

      // Simulate three rapid scroll events near the loaded tail while
      // page 2 is in flight.
      setRenderedEnd(
        fixture.componentInstance as unknown as RecipesFeedComponent<RecipeFeedItem>,
        17,
      );
      c.maybePrefetch();
      c.maybePrefetch();
      c.maybePrefetch();
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
          ...savedProviders(),
          ...savedProviders(),
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

  describe('custom source', () => {
    it('invokes the source function and skips the default tRPC query', async () => {
      const customSource = vi
        .fn()
        .mockReturnValue(of(makePage(['a', 'b']) as FeedPage<RecipeFeedItem>));
      const trpc = buildRecipesTrpcMock({ feed: makePage([], null) });

      await TestBed.configureTestingModule({
        imports: [RecipesFeedComponent],
        providers: [
          provideZonelessChangeDetection(),
          provideRouter([]),
          { provide: RECIPES_TRPC, useValue: trpc },
          ...savedProviders(),
          ...savedProviders(),
        ],
      }).compileComponents();

      const fixture = TestBed.createComponent(RecipesFeedComponent);
      fixture.componentRef.setInput('source', customSource);
      fixture.detectChanges();
      await fixture.whenStable();
      await flush();
      fixture.detectChanges();

      expect(customSource).toHaveBeenCalledTimes(1);
      expect(customSource).toHaveBeenCalledWith(null, expect.any(Number));
      expect(trpc.recipes.feed.query).not.toHaveBeenCalled();

      const c = fixture.componentInstance as unknown as {
        items: () => RecipeFeedItem[];
      };
      expect(c.items().map((i) => i.id)).toEqual(['a', 'b']);
    });
  });

  describe('resetKey', () => {
    it('clears items and refetches when the key changes', async () => {
      // First page (initial fetch) and a different page after the reset.
      const customSource = vi
        .fn<
          (
            cursor: string | null,
            limit: number,
          ) => ReturnType<typeof of<FeedPage<RecipeFeedItem>>>
        >()
        .mockReturnValueOnce(of(makePage(['1', '2'], null)))
        .mockReturnValueOnce(of(makePage(['9'], null)));

      await TestBed.configureTestingModule({
        imports: [RecipesFeedComponent],
        providers: [
          provideZonelessChangeDetection(),
          provideRouter([]),
          {
            provide: RECIPES_TRPC,
            useValue: buildRecipesTrpcMock({ feed: makePage([], null) }),
          },
          ...savedProviders(),
        ],
      }).compileComponents();

      const fixture = TestBed.createComponent(RecipesFeedComponent);
      fixture.componentRef.setInput('source', customSource);
      fixture.componentRef.setInput('resetKey', 'A');
      fixture.detectChanges();
      await fixture.whenStable();
      await flush();
      fixture.detectChanges();

      const c = fixture.componentInstance as unknown as {
        items: () => RecipeFeedItem[];
      };
      expect(c.items().map((i) => i.id)).toEqual(['1', '2']);
      expect(customSource).toHaveBeenCalledTimes(1);

      // Change resetKey — effect must clear and refetch.
      fixture.componentRef.setInput('resetKey', 'B');
      fixture.detectChanges();
      await fixture.whenStable();
      await flush();
      fixture.detectChanges();

      expect(customSource).toHaveBeenCalledTimes(2);
      // Items are replaced (not appended) on reset.
      expect(c.items().map((i) => i.id)).toEqual(['9']);
    });
  });

  describe('custom templates', () => {
    @Component({
      imports: [RecipesFeedComponent],
      template: `
        <kookio-recipes-feed [emptyTemplate]="emptyTpl" />
        <ng-template #emptyTpl>
          <div data-testid="custom-empty">CUSTOM-EMPTY</div>
        </ng-template>
      `,
    })
    class HostWithEmptyTpl {}

    @Component({
      imports: [RecipesFeedComponent],
      template: `
        <kookio-recipes-feed
          [source]="src"
          [itemTemplate]="itemTpl"
          [resetKey]="key()"
        />
        <ng-template #itemTpl let-it>
          <div data-testid="custom-item">CUSTOM-{{ it.id }}</div>
        </ng-template>
      `,
    })
    class HostWithItemTpl {
      protected readonly key = signal(0);
      protected readonly src = (): ReturnType<
        typeof of<FeedPage<RecipeFeedItem>>
      > => of(makePage(['x', 'y'], null));
    }

    it('renders emptyTemplate when items are empty and no error', async () => {
      await TestBed.configureTestingModule({
        imports: [HostWithEmptyTpl],
        providers: [
          provideZonelessChangeDetection(),
          provideRouter([]),
          {
            provide: RECIPES_TRPC,
            useValue: buildRecipesTrpcMock({ feed: makePage([], null) }),
          },
          ...savedProviders(),
        ],
      }).compileComponents();

      const fixture = TestBed.createComponent(HostWithEmptyTpl);
      fixture.detectChanges();
      await fixture.whenStable();
      await flush();
      fixture.detectChanges();

      const el = fixture.nativeElement as HTMLElement;
      expect(el.querySelector('[data-testid="custom-empty"]')).toBeTruthy();
      // Default empty content must not render alongside the custom one.
      expect(el.textContent).not.toContain('No recipes available yet');
    });

    it('renders itemTemplate for each item instead of the default card', async () => {
      await TestBed.configureTestingModule({
        imports: [HostWithItemTpl],
        providers: [
          provideZonelessChangeDetection(),
          provideRouter([]),
          {
            provide: RECIPES_TRPC,
            useValue: buildRecipesTrpcMock({ feed: makePage([], null) }),
          },
          ...savedProviders(),
        ],
      }).compileComponents();

      const fixture = TestBed.createComponent(HostWithItemTpl);
      fixture.detectChanges();
      await fixture.whenStable();
      await flush();
      fixture.detectChanges();

      const el = fixture.nativeElement as HTMLElement;
      // Virtual scroll renders only the items inside the visible viewport
      // (commonly just one in jsdom, where the viewport has no real height),
      // so the assertion targets the template choice rather than the count.
      const firstCustomItem = el.querySelector('[data-testid="custom-item"]');
      expect(firstCustomItem).toBeTruthy();
      expect(firstCustomItem?.textContent?.trim()).toMatch(/^CUSTOM-/);
      // Default card must not appear when itemTemplate is provided.
      expect(el.querySelector('kookio-recipe-card')).toBeNull();
    });
  });
});
