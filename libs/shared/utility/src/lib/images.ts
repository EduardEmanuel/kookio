/// <reference types="vite/client" />

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
 * Build a `srcset` string for a responsive image from a list of widths, so the
 * browser picks the smallest candidate that covers its rendered size × DPR.
 *
 * The widths MUST be a subset of `images.sizes` in `vercel.json` — both the
 * Vercel optimizer and the local `/api/img` route reject (400) any width they
 * have not been configured to emit, so a stray width fails the same way in dev
 * and prod. Returns `null` when there is no `src`.
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
