import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  TemplateRef,
  effect,
  inject,
  input,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  Observable,
  Subject,
  catchError,
  exhaustMap,
  from,
  of,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

import type { RecipeFeedItem } from '@kookio/prisma-client';
import { KookioIconComponent } from '@kookio/shared-ui';

import { RECIPES_TRPC } from '../../recipes-trpc';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

const PAGE_SIZE = 20;
/** When the visible window comes within this many items of the loaded tail,
 * trigger another page fetch. Generous enough to hide network latency on
 * typical broadband; small enough that we don't pre-fetch many pages the
 * user never reaches. */
const PREFETCH_THRESHOLD = 5;
/** Approximate fixed item height (px) for CDK Virtual Scroll. Trades a small
 * amount of layout drift on tall titles for the better performance of
 * `itemSize` over `autosize`. Adjust if cards visibly overlap or leave
 * large gaps in DevTools mobile preview. */
const ITEM_SIZE_PX = 380;

export type FeedPage<TItem> = { items: TItem[]; nextCursor: string | null };
export type FeedSource<TItem> = (
  cursor: string | null,
  limit: number,
) => Observable<FeedPage<TItem>>;

@Component({
  selector: 'kookio-recipes-feed',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    ScrollingModule,
    MatProgressSpinnerModule,
    KookioIconComponent,
    RecipeCardComponent,
  ],
  templateUrl: './recipes-feed.component.html',
  styleUrl: './recipes-feed.component.scss',
})
export class RecipesFeedComponent<
  TItem extends { id: string } = RecipeFeedItem,
> {
  private readonly trpc = inject(RECIPES_TRPC);
  private readonly destroyRef = inject(DestroyRef);

  /**
   * Optional. If omitted, the component pulls from `recipes.feed`. Provide a
   * custom source to drive the feed from a different procedure (e.g.
   * `recipes.match` whose `level` argument is captured in the closure).
   */
  readonly source = input<FeedSource<TItem> | undefined>(undefined);

  /**
   * Optional. If omitted, items render with `RecipeCardComponent` (which
   * expects a `RecipeFeedItem`). When provided, the template receives each
   * item as `$implicit`. If you set a custom `source` whose item shape
   * differs from `RecipeFeedItem`, you must also set `itemTemplate`.
   */
  readonly itemTemplate = input<TemplateRef<{ $implicit: TItem }> | undefined>(
    undefined,
  );

  /**
   * Optional. If omitted, the empty state shows the default icon and
   * "No recipes available yet" message.
   */
  readonly emptyTemplate = input<TemplateRef<unknown> | undefined>(undefined);

  /**
   * Any value whose change resets the feed and refetches with last-wins
   * semantics — any in-flight pagination is cancelled. Defaults to a
   * constant so the feed renders once on init when the input is left unset.
   */
  readonly resetKey = input<unknown>(undefined);

  protected readonly itemSize = ITEM_SIZE_PX;

  protected readonly items = signal<TItem[]>([]);
  protected readonly nextCursor = signal<string | null>(null);
  protected readonly hasMore = signal(true);
  protected readonly isLoading = signal(false);
  protected readonly hasError = signal(false);

  /** Reset stream. switchMap cancels in-flight reset responses when a new
   * resetKey arrives; the takeUntil chained on loadMore handles cancelling
   * pagination requests already in-flight at reset time. */
  private readonly reset$ = new Subject<void>();

  /** Pagination stream. exhaustMap drops emissions arriving while a fetch
   * is in flight, keeping pagination single-flight per resetKey. */
  private readonly loadMore$ = new Subject<void>();

  constructor() {
    effect(() => {
      // Tracking the resetKey signal triggers a fresh fetch whenever it
      // changes — including the implicit initial run, which is what drives
      // the first page load when the input is left unset.
      this.resetKey();
      untracked(() => {
        this.items.set([]);
        this.nextCursor.set(null);
        this.hasMore.set(true);
        this.hasError.set(false);
        this.isLoading.set(false);
        this.reset$.next();
      });
    });

    this.reset$
      .pipe(
        switchMap(() => {
          this.isLoading.set(true);
          this.hasError.set(false);
          return this.runFetch(null).pipe(
            tap((page) => {
              this.items.set(page.items);
              this.nextCursor.set(page.nextCursor);
              this.hasMore.set(page.nextCursor !== null);
              this.isLoading.set(false);
            }),
            catchError(() => {
              this.hasError.set(true);
              this.isLoading.set(false);
              return of(null);
            }),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();

    this.loadMore$
      .pipe(
        exhaustMap(() => {
          if (!this.hasMore() || this.isLoading()) return of(null);
          this.isLoading.set(true);
          this.hasError.set(false);
          const cursor = this.nextCursor();
          return this.runFetch(cursor).pipe(
            tap((page) => {
              this.items.update((prev) => [...prev, ...page.items]);
              this.nextCursor.set(page.nextCursor);
              this.hasMore.set(page.nextCursor !== null);
              this.isLoading.set(false);
            }),
            catchError(() => {
              this.hasError.set(true);
              this.isLoading.set(false);
              return of(null);
            }),
            // A reset arriving while pagination is in flight cancels the
            // inner observable so its tap never writes stale items into the
            // already-cleared state.
            takeUntil(this.reset$),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  private readonly runFetch = (
    cursor: string | null,
  ): Observable<FeedPage<TItem>> => {
    const customSource = this.source();
    if (customSource) return customSource(cursor, PAGE_SIZE);
    // The default branch is reachable only when no custom `source` is set,
    // which by the component's contract means TItem is RecipeFeedItem. The
    // cast bridges the generic type to the concrete tRPC return shape.
    return from(
      this.trpc.recipes.feed.query({
        ...(cursor ? { cursor } : {}),
        limit: PAGE_SIZE,
      }),
    ) as unknown as Observable<FeedPage<TItem>>;
  };

  /**
   * Reference to the inline `cdk-virtual-scroll-viewport`. We read
   * `getRenderedRange().end` — the index just past the *last* rendered
   * item — to measure proximity to the loaded tail. Comparing against
   * `scrolledIndexChange`'s emitted index (the *first* visible item)
   * tops out at `total - visibleCount`, so a tight threshold never
   * fires when many of the loaded items are visible simultaneously
   * (true on consumers with small item sizes like the plan sidebar).
   */
  private readonly viewport = viewChild(CdkVirtualScrollViewport);

  protected readonly onScrolledIndexChange = (): void => {
    const viewport = this.viewport();
    if (!viewport) return;
    const total = this.items().length;
    // `total > PREFETCH_THRESHOLD` keeps tiny first pages (rare but
    // possible — e.g. a filtered query returning 2 hits with a next
    // cursor) from auto-prefetching the moment everything renders.
    // Without it, `renderedEnd === total` on initial layout would
    // satisfy the proximity check and load every page back-to-back.
    if (
      total > PREFETCH_THRESHOLD &&
      total - viewport.getRenderedRange().end <= PREFETCH_THRESHOLD &&
      this.hasMore() &&
      !this.isLoading() &&
      !this.hasError()
    ) {
      this.loadMore$.next();
    }
  };

  protected readonly onRetry = (): void => {
    this.loadMore$.next();
  };

  protected readonly trackById = (_: number, item: TItem): string => item.id;
}
