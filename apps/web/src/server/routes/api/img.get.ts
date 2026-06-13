import {
  createError,
  defineEventHandler,
  getHeader,
  getQuery,
  setResponseHeader,
} from 'h3';
import sharp from 'sharp';

/**
 * Local stand-in for Vercel's `/_vercel/image` optimizer, used only
 * **off-Vercel** — the dev server (`nx serve web`) and any local production
 * preset. On a real Vercel deployment the markup points at `/_vercel/image`
 * instead (see `optimizedImageUrl` in `@kookio/shared-utility`), so this route
 * is never referenced there; the `VERCEL` guard below is belt-and-braces.
 *
 * The allowlists mirror the `images` block in `vercel.json` (`domains`,
 * `sizes`, `qualities`) on purpose: a width/host/quality that the platform
 * optimizer would reject with a 400 in production fails the same way in dev,
 * so mismatches surface locally instead of after deploy.
 */
const ALLOWED_HOSTS = new Set(['www.themealdb.com']);
const ALLOWED_WIDTHS = new Set([320, 480, 640, 960]);
const DEFAULT_QUALITY = 75;

export default defineEventHandler(async (event) => {
  // On Vercel the platform owns `/_vercel/image`; never run sharp in a function.
  if (process.env['VERCEL']) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' });
  }

  const { url, w, q } = getQuery(event);

  if (typeof url !== 'string' || !url) {
    throw createError({ statusCode: 400, statusMessage: 'url is required' });
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'url is malformed' });
  }
  if (parsed.protocol !== 'https:' || !ALLOWED_HOSTS.has(parsed.host)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'url host not allowed',
    });
  }

  const width = Number(w);
  if (!ALLOWED_WIDTHS.has(width)) {
    throw createError({ statusCode: 400, statusMessage: 'width not allowed' });
  }
  const quality = Number(q) || DEFAULT_QUALITY;

  const upstream = await fetch(parsed.href);
  if (!upstream.ok) {
    throw createError({
      statusCode: 502,
      statusMessage: 'upstream image fetch failed',
    });
  }
  const input = Buffer.from(await upstream.arrayBuffer());

  // Match the production transcode: AVIF when the client advertises it, WebP
  // otherwise — the two formats listed in vercel.json `images.formats`.
  const useAvif = (getHeader(event, 'accept') ?? '').includes('image/avif');
  const pipeline = sharp(input).resize(width, undefined, {
    withoutEnlargement: true,
  });
  const output = await (
    useAvif ? pipeline.avif({ quality }) : pipeline.webp({ quality })
  ).toBuffer();

  setResponseHeader(
    event,
    'content-type',
    useAvif ? 'image/avif' : 'image/webp',
  );
  setResponseHeader(
    event,
    'cache-control',
    'public, max-age=31536000, immutable',
  );
  return output;
});
