# Content Guidelines

> **Status: Future Direction** — `@analogjs/content`, `marked`, `marked-*`, `prismjs`, and `front-matter` are installed in `package.json`, but there is **zero usage** in code: no `src/content/` directory, no `injectContent`/`injectContentFiles` calls, no `MarkdownComponent`, no `marked.config.ts`. Anything below is the intended design once a blog/docs surface is built.

## Stack

- `@analogjs/content` for file-based content management
- `marked` v15 for Markdown rendering
- `marked-gfm-heading-id` for GitHub Flavored Markdown heading IDs
- `marked-highlight` + `prismjs` for syntax highlighting
- `marked-mangle` for heading ID mangling
- `front-matter` for YAML frontmatter parsing

## Use Cases

- Blog articles
- Documentation
- Changelog
- Static marketing pages

## File Structure

src/
└── content/
├── blog/
│ ├── my-first-post.md
│ └── another-post.md
├── docs/
│ ├── getting-started.md
│ └── api-reference.md
├── changelog/
│ └── v1.0.0.md
└── pages/
└── about.md

## Frontmatter Convention

- Always define frontmatter at the top of every content file
- Use consistent fields across content types:

### Blog Posts

```yaml
---
title: 'My Post Title'
description: 'A short description for SEO and previews'
date: '2024-01-15'
author: 'Author Name'
tags: ['angular', 'analog']
published: true
slug: 'my-post-title'
coverImage: '/images/blog/my-post-title.jpg'
---
```

### Documentation Pages

```yaml
---
title: 'Getting Started'
description: 'How to set up the project'
order: 1
section: 'Introduction'
---
```

### Changelog

```yaml
---
version: '1.0.0'
date: '2024-01-15'
breaking: false
---
```

### Static Pages

```yaml
---
title: 'About Us'
description: 'Learn more about the project'
---
```

## Marked Configuration

### Setup

- Configure Marked with all extensions in a single shared setup file:

```typescript
// libs/server/src/content/marked.config.ts
import { marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { markedHighlight } from 'marked-highlight';
import { mangle } from 'marked-mangle';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-markdown';

marked.use(gfmHeadingId());
marked.use(mangle());
marked.use(
  markedHighlight({
    highlight(code, lang) {
      const language = Prism.languages[lang] ? lang : 'plaintext';
      return Prism.highlight(code, Prism.languages[language], language);
    },
  }),
);

export { marked };
```

- Import `marked` exclusively from this config file — never import directly from `marked`
- Add Prism language components explicitly — do not import all languages (bundle size)

### Rendering

- Always render Markdown server-side — never in the browser:

```typescript
// libs/server/src/content/render.ts
import { marked } from './marked.config';

export function renderMarkdown(content: string): string {
  return marked.parse(content) as string;
}
```

- Cache rendered HTML in Redis — Markdown rendering is expensive for large files:

```typescript
export async function getRenderedContent(slug: string, raw: string): Promise<string> {
  return cacheGetOrSet(
    keys.content(slug),
    async () => renderMarkdown(raw),
    60 * 60 * 24, // 24 hours
  );
}
```

- Invalidate content cache on deployment — never serve stale rendered HTML after updates

## @analogjs/content Integration

### Defining Content Files

- Use `injectContent()` to load a single content file by slug:

```typescript
// src/app/pages/blog/[slug].page.ts
import { injectContent, MarkdownComponent } from '@analogjs/content';
import { toSignal } from '@angular/core/rxjs-interop';

interface PostAttributes {
  title: string;
  description: string;
  date: string;
  author: string;
  published: boolean;
}

export default class BlogPostPage {
  readonly post = toSignal(injectContent<PostAttributes>({ param: 'slug', subdirectory: 'blog' }));
}
```

### Listing Content Files

- Use `injectContentFiles()` to list all content files in a directory:

```typescript
import { injectContentFiles } from '@analogjs/content';

export default class BlogListPage {
  readonly posts = injectContentFiles<PostAttributes>((file) => file.attributes.published === true);

  readonly sortedPosts = computed(() => [...this.posts()].sort((a, b) => new Date(b.attributes.date).getTime() - new Date(a.attributes.date).getTime()));
}
```

- Always filter by `published: true` for blog posts — never expose draft content
- Sort content by date descending — newest first

### Rendering Content

- Use `MarkdownComponent` from `@analogjs/content` to render content files:

```html
@if (post()) {
<analog-markdown [content]="post()!.content" />
}
```

- Never use `[innerHTML]` to render Markdown — always use `MarkdownComponent`
  or server-rendered HTML via `DomSanitizer`

### Route Metadata from Frontmatter

- Use frontmatter attributes for route metadata (SEO):

```typescript
export const routeMeta: RouteMeta = {
  title: () => injectContent<PostAttributes>().pipe(map((post) => post.attributes.title)),
  meta: () =>
    injectContent<PostAttributes>().pipe(
      map((post) => [
        { name: 'description', content: post.attributes.description },
        { property: 'og:title', content: post.attributes.title },
        { property: 'og:description', content: post.attributes.description },
      ]),
    ),
};
```

## Content Authoring Rules

### Markdown Style

- Use ATX-style headings (`#`, `##`) — never Setext-style (`===`, `---`)
- Start content headings at `##` — `#` is reserved for the page title from frontmatter
- Use fenced code blocks with explicit language tags:

````markdown
```typescript
const x = 1;
```
````

- Use GFM task lists for changelogs:

```markdown
- [x] Feature A
- [ ] Feature B (in progress)
```

- Use reference-style links for URLs repeated multiple times
- Keep line length under 100 characters for readability in editors

### Supported Prism Languages

Only import and use languages that are explicitly configured:

- `typescript` / `javascript`
- `scss` / `css`
- `bash` / `shell`
- `json`
- `sql`
- `markdown`
- `plaintext` (fallback for unknown languages)

Add new language imports to `marked.config.ts` when needed — document the addition.

### Images

- Store content images in `public/images/<content-type>/`
- Always include `alt` text on images — required for accessibility (WCAG AA)
- Use relative paths for images colocated with content:

```markdown
![Screenshot of the dashboard](/images/blog/my-post/dashboard.png)
```

## Static Site Generation (SSG)

- Prerender all content routes for production — never serve content dynamically
  when SSG is possible:

```typescript
  // vite.config.ts
  prerender: {
    routes: async () => {
      const posts = await getContentFiles('blog');
      return [
        '/',
        '/blog',
        ...posts.map(p => `/blog/${p.slug}`),
        '/docs',
        '/changelog',
      ];
    },
  }
```

- Regenerate prerendered pages on deployment when content changes
- Use Redis content cache only for dynamically rendered pages — SSG pages
  are served as static files by Vercel

## General Rules

- All content files use `.md` extension — never `.mdx`
- Frontmatter is required on every content file — fail loudly if missing
- Never store content in the database — filesystem is the source of truth
- Never render user-provided Markdown without sanitization —
  only render trusted content authored by the team
- Run spell-check on content files in CI
