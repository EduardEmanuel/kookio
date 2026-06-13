import { afterEach, describe, expect, it, vi } from 'vitest';

import { optimizedImageSrcSet, optimizedImageUrl } from './images';

describe('optimizedImageUrl', () => {
  afterEach(() => vi.unstubAllEnvs());

  it('returns null for a null/undefined/empty src', () => {
    expect(optimizedImageUrl(null, 640)).toBeNull();
    expect(optimizedImageUrl(undefined, 640)).toBeNull();
    expect(optimizedImageUrl('', 640)).toBeNull();
  });

  it('routes through the local /api/img optimizer in dev', () => {
    vi.stubEnv('PROD', false);
    expect(optimizedImageUrl('https://x.test/a b.jpg', 640)).toBe(
      '/api/img?url=https%3A%2F%2Fx.test%2Fa%20b.jpg&w=640&q=75',
    );
  });

  it('routes through /_vercel/image in prod, url-encoding the upstream src', () => {
    vi.stubEnv('PROD', true);
    expect(optimizedImageUrl('https://x.test/a b.jpg', 640)).toBe(
      '/_vercel/image?url=https%3A%2F%2Fx.test%2Fa%20b.jpg&w=640&q=75',
    );
  });

  it('honours a custom quality', () => {
    vi.stubEnv('PROD', true);
    expect(optimizedImageUrl('https://x.test/a.jpg', 320, 60)).toContain(
      '&q=60',
    );
  });
});

describe('optimizedImageSrcSet', () => {
  afterEach(() => vi.unstubAllEnvs());

  it('returns null when there is no src', () => {
    expect(optimizedImageSrcSet(null, [320, 640])).toBeNull();
  });

  it('builds a width-descriptor set in prod', () => {
    vi.stubEnv('PROD', true);
    expect(optimizedImageSrcSet('https://x.test/a.jpg', [320, 640])).toBe(
      '/_vercel/image?url=https%3A%2F%2Fx.test%2Fa.jpg&w=320&q=75 320w, ' +
        '/_vercel/image?url=https%3A%2F%2Fx.test%2Fa.jpg&w=640&q=75 640w',
    );
  });
});
