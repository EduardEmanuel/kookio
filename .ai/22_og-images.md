# OG Image Generation Guidelines

> **Status: Future Direction** — `satori`, `satori-html`, and `sharp` are **not installed**, and there are no `/api/v1/og/*` routes. Existing API routes are only `health.get.ts`, `internal/bench-db.get.ts`, and the tRPC handler. Add this only when SEO/social previews are explicitly needed.

## Stack

- AnalogJS API routes (h3/Nitro) for the endpoint
- `@analogjs/content/og` — `ImageResponse` class
- `satori` + `satori-html` for HTML→PNG rendering
- `sharp` for image optimization
- Tailwind classes supported in templates

## Setup

### Install Dependencies

```bash
npm install satori satori-html sharp --save
```

### File Structure

src/
└── server/
└── routes/
└── api/
└── v1/
└── og/
├── default.ts ← generic OG image
├── blog.ts ← blog post OG images
└── docs.ts ← docs page OG images

## API Route Implementation

### Generic OG Image

```typescript
// src/server/routes/api/v1/og/default.ts
import { defineEventHandler, getQuery } from 'h3';
import { ImageResponse } from '@analogjs/content/og';

const FONT_URL = 'https://og-playground.vercel.app/inter-latin-ext-700-normal.woff';

export default defineEventHandler(async (event) => {
  const { title, description } = getQuery(event);

  const [fontData] = await Promise.all([fetch(FONT_URL).then((r) => r.arrayBuffer())]);

  const template = `
    <div tw="bg-white flex flex-col w-full h-full p-16 justify-between">
      <div tw="flex flex-col">
        <span tw="text-gray-400 text-2xl mb-4">kookio.app</span>
        <h1 tw="text-gray-900 text-6xl font-bold leading-tight">
          ${title ?? 'Kookio'}
        </h1>
        ${
          description
            ? `
          <p tw="text-gray-600 text-3xl mt-6 leading-relaxed">
            ${description}
          </p>
        `
            : ''
        }
      </div>
      <div tw="flex items-center">
        <span tw="text-gray-400 text-xl">kookio.app</span>
      </div>
    </div>
  `;

  return new ImageResponse(template, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Inter',
        data: fontData,
        style: 'normal',
        weight: 700,
      },
    ],
  });
});
```

### Blog Post OG Image

```typescript
// src/server/routes/api/v1/og/blog.ts
import { defineEventHandler, getQuery, createError } from 'h3';
import { ImageResponse } from '@analogjs/content/og';

export default defineEventHandler(async (event) => {
  const { title, author, date } = getQuery(event);

  if (!title) {
    throw createError({
      statusCode: 400,
      statusMessage: 'title is required',
    });
  }

  const fontData = await fetch('https://og-playground.vercel.app/inter-latin-ext-700-normal.woff').then((r) => r.arrayBuffer());

  const template = `
    <div tw="bg-gray-950 flex flex-col w-full h-full p-16 justify-between">
      <div tw="flex items-center">
        <span tw="text-white text-2xl font-bold">Kookio Blog</span>
      </div>
      <div tw="flex flex-col">
        <h1 tw="text-white text-5xl font-bold leading-tight max-w-3xl">
          ${title}
        </h1>
        ${
          author || date
            ? `
          <div tw="flex items-center mt-8 text-gray-400 text-xl">
            ${author ? `<span>${author}</span>` : ''}
            ${author && date ? `<span tw="mx-3">·</span>` : ''}
            ${date ? `<span>${date}</span>` : ''}
          </div>
        `
            : ''
        }
      </div>
    </div>
  `;

  return new ImageResponse(template, {
    width: 1200,
    height: 630,
    fonts: [{ name: 'Inter', data: fontData, style: 'normal', weight: 700 }],
  });
});
```

## Registering OG Meta Tags

### Static Pages

```html
<!-- src/index.html -->
<meta property="og:image" content="https://kookio.app/api/v1/og/default" />
<meta name="twitter:image" content="https://kookio.app/api/v1/og/default" />
<meta name="twitter:card" content="summary_large_image" />
```

### Dynamic Pages via RouteMeta

```typescript
// src/app/pages/[locale]/blog/[slug].page.ts
import { RouteMeta } from '@analogjs/router';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { injectLoad } from '@analogjs/router';
import type { load } from './[slug].server';

export const routeMeta: RouteMeta = {
  title: () => {
    const post = inject(ActivatedRoute).snapshot.data['load'];
    return post?.attributes.title ?? 'Blog';
  },
  meta: () => {
    const route = inject(ActivatedRoute);
    const slug = route.snapshot.params['slug'];
    const locale = route.snapshot.params['locale'];
    const post = route.snapshot.data['load'];

    const title = encodeURIComponent(post?.attributes.title ?? '');
    const author = encodeURIComponent(post?.attributes.author ?? '');
    const date = encodeURIComponent(post?.attributes.date ?? '');
    const ogUrl = `https://kookio.app/api/v1/og/blog?title=${title}&author=${author}&date=${date}`;

    return [
      { name: 'description', content: post?.attributes.description },
      { property: 'og:title', content: post?.attributes.title },
      { property: 'og:description', content: post?.attributes.description },
      { property: 'og:image', content: ogUrl },
      { property: 'og:locale', content: locale },
      { property: 'og:type', content: 'article' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: ogUrl },
      { name: 'twitter:title', content: post?.attributes.title },
    ];
  },
};
```

## Caching OG Images

- OG images are expensive to generate (font fetch + satori rendering) —
  always cache with Redis:

```typescript
import { defineEventHandler, getQuery } from 'h3';
import { ImageResponse } from '@analogjs/content/og';
import { cacheGetOrSet } from '@kookio/server/redis';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const cacheKey = `kookio:og:blog:${JSON.stringify(query)}`;

  return cacheGetOrSet(
    cacheKey,
    async () => {
      const fontData = await fetch(FONT_URL).then((r) => r.arrayBuffer());
      return new ImageResponse(buildTemplate(query), {
        width: 1200,
        height: 630,
        fonts: [{ name: 'Inter', data: fontData, style: 'normal', weight: 700 }],
      });
    },
    60 * 60 * 24 * 7, // 7 days
  );
});
```

- Cache font data separately — fetching the font on every request is slow:

```typescript
// libs/server/src/og/fonts.ts
let cachedFont: ArrayBuffer | null = null;

export async function getInterFont(): Promise<ArrayBuffer> {
  if (cachedFont) return cachedFont;
  cachedFont = await fetch(FONT_URL).then((r) => r.arrayBuffer());
  return cachedFont;
}
```

- In-memory font cache is sufficient — font data doesn't change between requests
  on the same instance

## SSG Prerendering OG Routes

- Prerender OG image routes for static content pages:

```typescript
  // vite.config.ts
  prerender: {
    routes: async () => {
      const slugs = await getBlogSlugs();
      return [
        ...slugs.map(slug => `/api/v1/og/blog?title=${encodeURIComponent(slug)}`),
      ];
    },
  }
```

- Prerendered OG images are served as static files by Vercel —
  zero compute cost after build

## Template Rules

- Always sanitize user-provided query parameters before injecting into template —
  never inject raw strings:

```typescript
function sanitize(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').slice(0, 200); // max length
}
```

- Limit title length to ~80 characters for readability in OG previews
- Always specify `width: 1200, height: 630` — standard OG image dimensions
- Use Tailwind `tw` classes for styling — they are supported by satori-html
- Do NOT use CSS Grid in satori templates — use Flexbox only (satori limitation)
- Do NOT use `background-image` — satori has limited CSS support
- Test OG images with [opengraph.xyz](https://www.opengraph.xyz) before deploying

## General Rules

- OG image endpoints are h3 API routes — not tRPC procedures
- Never generate OG images client-side — always server-side via API route
- Always validate required query parameters — throw `createError(400)` if missing
- Cache aggressively — OG images are read-only and change rarely
- Keep templates simple — complex layouts may not render correctly in satori
- Use system-safe fonts or always load a web font — never assume font availability
