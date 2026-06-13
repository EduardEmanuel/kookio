/// <reference types="vite/client" />

/**
 * Widths (px) the image optimizer is allowed to emit. MUST stay in sync with
 * `images.sizes` in `vercel.json` (the production Vercel optimizer) and
 * `ALLOWED_WIDTHS` in `apps/web/src/server/routes/api/img.get.ts` (the local
 * dev optimizer) — a width outside this set is rejected with a 400 by both.
 * Covers small fixed thumbnails (48/64/96/128) through responsive card and
 * hero widths (320–960).
 */
const OPTIMIZED_WIDTHS = [48, 64, 96, 128, 256, 320, 480, 640, 960] as const;

/** Round a requested width up to the nearest allowlisted optimizer width
 * (capped at the largest). Lets `NgOptimizedImage` request any displayed-size
 * width without ever tripping the optimizer's 400. */
const snapWidth = (width: number): number =>
  OPTIMIZED_WIDTHS.find((w) => w >= width) ??
  OPTIMIZED_WIDTHS[OPTIMIZED_WIDTHS.length - 1];

/**
 * Build an Image Optimization URL for a remote image. The query shape
 * (`?url=&w=&q=`) is identical across environments; only the endpoint differs:
 *
 * - **Production (Vercel)** → `/_vercel/image`, the platform optimizer, which
 *   resizes to `width`, transcodes to AVIF/WebP when the client supports it,
 *   and edge-caches the result — cutting feed-card payloads by ~70–90%.
 * - **Dev / non-Vercel** → `/api/img`, a local Nitro route backed by sharp
 *   (`apps/web/src/server/routes/api/img.get.ts`) that performs the same
 *   resize + transcode. `/_vercel/*` is a reserved namespace on Vercel, so the
 *   local optimizer lives under `/api/` to avoid any build/route conflict.
 *
 * `import.meta.env.PROD` is a build-time constant, so SSR and the browser
 * resolve to the same endpoint and hydration stays stable.
 *
 * Returns `null` for a null/empty `src` so callers can omit the `<img>`
 * entirely rather than render a broken one.
 */
export const optimizedImageUrl = (
  src: string | null | undefined,
  width: number,
  quality = 75,
): string | null => {
  if (!src) return null;
  const endpoint = import.meta.env.PROD ? '/_vercel/image' : '/api/img';
  return `${endpoint}?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
};

/**
 * Angular `IMAGE_LOADER` for `NgOptimizedImage`, registered in
 * `apps/web/src/app/app.config.ts`. Maps the directive's requested width to an
 * optimizer URL via {@link optimizedImageUrl}, snapping the width into the
 * allowlist first so the optimizer never 400s. `config.src` is the raw
 * upstream URL bound to `ngSrc`; `config.width` is set for each `srcset`
 * candidate (and omitted for the base `src`, where the largest width is used).
 *
 * Typed structurally rather than against `@angular/common`'s
 * `ImageLoaderConfig` so this browser-safe utility lib takes no Angular
 * dependency; the shape is a subset of `ImageLoaderConfig` and assignable to
 * the `IMAGE_LOADER` token.
 */
export const kookioImageLoader = (config: {
  src: string;
  width?: number;
}): string =>
  optimizedImageUrl(
    config.src,
    snapWidth(config.width ?? OPTIMIZED_WIDTHS[OPTIMIZED_WIDTHS.length - 1]),
  ) ?? config.src;
