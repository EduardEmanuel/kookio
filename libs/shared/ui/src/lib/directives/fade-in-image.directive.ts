import {
  Directive,
  ElementRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';

/**
 * Fades an `<img>` in once its bitmap has decoded, revealing whatever
 * placeholder sits behind it (e.g. a skeleton shimmer on the wrapper).
 *
 * Progressive enhancement, by design:
 * - The image defaults to **visible** (`opacity: 1`). SSR output, a no-JS
 *   client, and images already in cache all show immediately — the fade is
 *   never a prerequisite for the picture appearing.
 * - Only when the directive runs in the browser AND finds the bitmap not yet
 *   decoded does it flip to `opacity: 0` and fade back to `1` on `load`.
 *   Cached images (which report `complete` synchronously) and re-scrolled
 *   virtual-scroll items therefore appear instantly, with no re-flash.
 * - `error` resolves the loading state too, so a broken src never gets stuck
 *   invisible.
 * - Respects `prefers-reduced-motion: reduce` (no transition).
 */
@Directive({
  selector: 'img[kookioFadeInImage]',
  host: {
    '[style.opacity]': 'loading() ? "0" : "1"',
    '[style.transition]': 'reduceMotion() ? null : "opacity 300ms ease"',
    '(load)': 'loading.set(false)',
    '(error)': 'loading.set(false)',
  },
})
export class FadeInImageDirective {
  private readonly img = inject<ElementRef<HTMLImageElement>>(ElementRef);

  /** True only while a not-yet-decoded image awaits its bitmap in the browser. */
  protected readonly loading = signal(false);

  /** Read once in the browser; SSR leaves it false (harmless — no transition
   * runs server-side). Signal so the host binding re-evaluates when set. */
  protected readonly reduceMotion = signal(false);

  constructor() {
    afterNextRender(() => {
      if (typeof matchMedia === 'function') {
        this.reduceMotion.set(
          matchMedia('(prefers-reduced-motion: reduce)').matches,
        );
      }
      const el = this.img.nativeElement;
      // `complete && naturalWidth > 0` means the bitmap is already decoded
      // (cached / synchronously available); only fade when it isn't.
      if (!(el.complete && el.naturalWidth > 0)) this.loading.set(true);
    });
  }
}
