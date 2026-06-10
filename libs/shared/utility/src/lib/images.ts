/// <reference types="vite/client" />

/**
 * Build a Vercel Image Optimization URL for a remote image.
 *
 * In production the upstream image is routed through `/_vercel/image`, which
 * resizes it to `width`, transcodes to AVIF/WebP when the client supports it,
 * and edge-caches the result — cutting feed-card payloads by ~70–90%.
 *
 * In dev the loader is not wired into `nx serve web`, so the raw upstream URL
 * is returned (passthrough keeps localhost rendering the original image).
 * `import.meta.env.PROD` is a build-time constant, so SSR and the browser
 * resolve to the same branch and hydration stays stable.
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
  if (!import.meta.env.PROD) return src;
  return `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
};

/**
 * Build a `srcset` string for a responsive image from a list of widths, so the
 * browser picks the smallest candidate that covers its rendered size × DPR.
 *
 * The widths MUST be a subset of `images.sizes` in `vercel.json` — Vercel
 * rejects (400) any width it has not been configured to emit. In dev every
 * candidate resolves to the same raw URL (harmless); the browser just loads it
 * once. Returns `null` when there is no `src`.
 */
export const optimizedImageSrcSet = (
  src: string | null | undefined,
  widths: readonly number[],
  quality = 75,
): string | null => {
  if (!src) return null;
  return widths
    .map((width) => `${optimizedImageUrl(src, width, quality)} ${width}w`)
    .join(', ');
};
