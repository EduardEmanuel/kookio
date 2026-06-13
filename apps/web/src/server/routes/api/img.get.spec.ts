const h3Mocks = vi.hoisted(() => ({
  getQuery: vi.fn(),
  getHeader: vi.fn(),
  setResponseHeader: vi.fn(),
}));

const sharpMocks = vi.hoisted(() => {
  const toBuffer = vi.fn();
  const webp = vi.fn(() => ({ toBuffer }));
  const avif = vi.fn(() => ({ toBuffer }));
  const resize = vi.fn(() => ({ webp, avif }));
  const sharp = vi.fn(() => ({ resize }));
  return { sharp, resize, webp, avif, toBuffer };
});

vi.mock('h3', () => ({
  defineEventHandler: (fn: any) => fn,
  getQuery: h3Mocks.getQuery,
  getHeader: h3Mocks.getHeader,
  setResponseHeader: h3Mocks.setResponseHeader,
  // Mirror h3's createError shape closely enough to assert on `statusCode`.
  createError: (opts: { statusCode: number; statusMessage?: string }) =>
    Object.assign(new Error(opts.statusMessage), opts),
}));
vi.mock('sharp', () => ({ default: sharpMocks.sharp }));

import handler from './img.get';

const VALID_URL =
  'https://www.themealdb.com/images/media/meals/0umm891763364625.jpg';

const okFetch = () =>
  ({
    ok: true,
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
  }) as unknown as Response;

describe('/api/img', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Happy-path defaults; individual tests override as needed.
    h3Mocks.getQuery.mockReturnValue({ url: VALID_URL, w: '640', q: '75' });
    h3Mocks.getHeader.mockReturnValue('');
    sharpMocks.toBuffer.mockResolvedValue(Buffer.from('optimized'));
    vi.stubGlobal('fetch', vi.fn(okFetch));
    vi.stubEnv('VERCEL', '');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('resizes to the requested width and transcodes to webp by default', async () => {
    const res = await handler({} as any);

    expect(sharpMocks.sharp).toHaveBeenCalledOnce();
    expect(sharpMocks.resize).toHaveBeenCalledWith(640, undefined, {
      withoutEnlargement: true,
    });
    expect(sharpMocks.webp).toHaveBeenCalledWith({ quality: 75 });
    expect(sharpMocks.avif).not.toHaveBeenCalled();
    expect(h3Mocks.setResponseHeader).toHaveBeenCalledWith(
      {},
      'content-type',
      'image/webp',
    );
    expect(res).toEqual(Buffer.from('optimized'));
  });

  it('transcodes to avif when the client advertises image/avif', async () => {
    h3Mocks.getHeader.mockReturnValue('image/avif,image/webp,*/*');

    await handler({} as any);

    expect(sharpMocks.avif).toHaveBeenCalledWith({ quality: 75 });
    expect(sharpMocks.webp).not.toHaveBeenCalled();
    expect(h3Mocks.setResponseHeader).toHaveBeenCalledWith(
      {},
      'content-type',
      'image/avif',
    );
  });

  it('falls back to the default quality when q is missing or non-numeric', async () => {
    h3Mocks.getQuery.mockReturnValue({ url: VALID_URL, w: '640', q: 'abc' });

    await handler({} as any);

    expect(sharpMocks.webp).toHaveBeenCalledWith({ quality: 75 });
  });

  it('404s on Vercel before touching the query or sharp', async () => {
    vi.stubEnv('VERCEL', '1');

    await expect(handler({} as any)).rejects.toMatchObject({ statusCode: 404 });
    expect(h3Mocks.getQuery).not.toHaveBeenCalled();
    expect(sharpMocks.sharp).not.toHaveBeenCalled();
  });

  it('400s when url is absent', async () => {
    h3Mocks.getQuery.mockReturnValue({ w: '640', q: '75' });

    await expect(handler({} as any)).rejects.toMatchObject({ statusCode: 400 });
  });

  it('400s when url is malformed', async () => {
    h3Mocks.getQuery.mockReturnValue({ url: 'not a url', w: '640', q: '75' });

    await expect(handler({} as any)).rejects.toMatchObject({ statusCode: 400 });
  });

  it('400s when the host is not on the allowlist (SSRF guard)', async () => {
    h3Mocks.getQuery.mockReturnValue({
      url: 'https://evil.test/a.jpg',
      w: '640',
      q: '75',
    });

    await expect(handler({} as any)).rejects.toMatchObject({ statusCode: 400 });
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('400s when the protocol is not https', async () => {
    h3Mocks.getQuery.mockReturnValue({
      url: 'http://www.themealdb.com/a.jpg',
      w: '640',
      q: '75',
    });

    await expect(handler({} as any)).rejects.toMatchObject({ statusCode: 400 });
  });

  it('400s when the width is not on the allowlist', async () => {
    h3Mocks.getQuery.mockReturnValue({ url: VALID_URL, w: '123', q: '75' });

    await expect(handler({} as any)).rejects.toMatchObject({ statusCode: 400 });
  });

  it('502s when the upstream fetch fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => ({ ok: false }) as unknown as Response),
    );

    await expect(handler({} as any)).rejects.toMatchObject({ statusCode: 502 });
    expect(sharpMocks.sharp).not.toHaveBeenCalled();
  });
});
