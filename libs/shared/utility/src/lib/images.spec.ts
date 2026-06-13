import { afterEach, describe, expect, it, vi } from 'vitest';

import { kookioImageLoader, optimizedImageUrl } from './images';

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

describe('kookioImageLoader', () => {
  afterEach(() => vi.unstubAllEnvs());

  it('builds a dev /api/img URL at an allowlisted width', () => {
    vi.stubEnv('PROD', false);
    expect(kookioImageLoader({ src: 'https://x.test/a.jpg', width: 640 })).toBe(
      '/api/img?url=https%3A%2F%2Fx.test%2Fa.jpg&w=640&q=75',
    );
  });

  it('builds a prod /_vercel/image URL', () => {
    vi.stubEnv('PROD', true);
    expect(kookioImageLoader({ src: 'https://x.test/a.jpg', width: 640 })).toBe(
      '/_vercel/image?url=https%3A%2F%2Fx.test%2Fa.jpg&w=640&q=75',
    );
  });

  it('snaps a non-allowlisted width up to the nearest allowed size', () => {
    vi.stubEnv('PROD', true);
    // 50 → 64 (first allowlisted width ≥ 50)
    expect(
      kookioImageLoader({ src: 'https://x.test/a.jpg', width: 50 }),
    ).toContain('&w=64&');
  });

  it('caps widths beyond the largest allowlisted size', () => {
    vi.stubEnv('PROD', true);
    expect(
      kookioImageLoader({ src: 'https://x.test/a.jpg', width: 4000 }),
    ).toContain('&w=960&');
  });

  it('falls back to the largest width when none is provided', () => {
    vi.stubEnv('PROD', true);
    expect(kookioImageLoader({ src: 'https://x.test/a.jpg' })).toContain(
      '&w=960&',
    );
  });
});
