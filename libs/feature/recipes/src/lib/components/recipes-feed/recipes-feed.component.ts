import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, catchError, exhaustMap, from, of, tap } from 'rxjs';

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

@Component({
  selector: 'kookio-recipes-feed',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ScrollingModule,
    MatProgressSpinnerModule,
    KookioIconComponent,
    RecipeCardComponent,
  ],
  templateUrl: './recipes-feed.component.html',
  styleUrl: './recipes-feed.component.scss',
})
export class RecipesFeedComponent {
  private readonly trpc = inject(RECIPES_TRPC);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly itemSize = ITEM_SIZE_PX;

  protected readonly items = signal<RecipeFeedItem[]>([]);
  protected readonly nextCursor = signal<string | null>(null);
  protected readonly hasMore = signal(true);
  protected readonly isLoading = signal(false);
  protected readonly hasError = signal(false);

  /**
   * Single-flight load coordination. exhaustMap drops emissions that arrive
   * while a fetch is in flight, so rapid scroll events do not spawn parallel
   * page requests against the same cursor.
   */
  private readonly loadMore$ = new Subject<void>();

  constructor() {
    this.loadMore$
      .pipe(
        exhaustMap(() => {
          if (!this.hasMore() || this.isLoading()) return of(null);
          this.isLoading.set(true);
          this.hasError.set(false);
          const cursor = this.nextCursor();
          return from(
            this.trpc.recipes.feed.query({
              ...(cursor ? { cursor } : {}),
              limit: PAGE_SIZE,
            }),
          ).pipe(
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
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();

    this.loadMore$.next();
  }

  protected readonly onScrolledIndexChange = (index: number): void => {
    const total = this.items().length;
    // Only prefetch once the loaded tail is large enough that the threshold
    // is meaningful. Without this guard, a short feed (fewer items than the
    // threshold) would auto-prefetch the moment the viewport emits its
    // initial index 0 — defeating cursor pagination by loading every page
    // back-to-back without any real user scrolling.
    if (
      total > PREFETCH_THRESHOLD &&
      total - index <= PREFETCH_THRESHOLD &&
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

  protected readonly trackById = (_: number, item: RecipeFeedItem): string =>
    item.id;
}
