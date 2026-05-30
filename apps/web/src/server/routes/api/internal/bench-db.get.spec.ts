import type { H3Event } from 'h3';

const defaultIterations = 100;
const prismaMock = vi.hoisted(() => ({ $queryRaw: vi.fn() }));
const redisInfraMock = vi.hoisted(() => ({
  getRedis: vi.fn(), // default: throw (simulate "not configured")
}));
const spyPerfDeltas = vi.fn((deltas: number[]) => {
  // performance.now() is called twice per iteration: t0 and t1.
  // For each delta d, emit [0, d].
  const seq: number[] = [];

  for (const d of deltas) seq.push(0, d);

  let i = 0;

  return vi.spyOn(performance, 'now').mockImplementation(() => seq[i++] ?? 0);
});
const spyPerfConstantDelta = vi.fn((deltaMs: number) => {
  // Alternate between 0 and delta to produce a constant duration.
  let toggle = 0;

  return vi
    .spyOn(performance, 'now')
    .mockImplementation(() => (toggle++ % 2 === 0 ? 0 : deltaMs));
});

type MockHeaders = Record<string, string | number | string[] | undefined> & {
  get?: (name: string) => string | null;
  set?: (name: string, value: string) => void;
};
type MockH3Event = { headers: MockHeaders; query?: Record<string, string> };
type MockCreateErrorInput = { statusCode: number; statusMessage?: string };

vi.mock('h3', () => {
  const getHeader = (event: MockH3Event, name: string) => {
    const headers = event?.headers ?? {};
    const target = String(name).toLowerCase();

    if (typeof headers.get === 'function') return headers.get(name);
    for (const k of Object.keys(headers))
      if (k.toLowerCase() === target) return headers[k];
    return undefined;
  };
  const setHeader = (
    event: MockH3Event,
    name: string,
    value: string | number,
  ) => {
    if (!event.headers) event.headers = {};
    if (typeof event.headers.set === 'function')
      event.headers.set(name, String(value));
    else event.headers[name] = value;
  };
  const getQuery = (event: MockH3Event) => event?.query ?? {};
  const eventHandler = (fn: (event: MockH3Event) => unknown) => fn;
  const createError = ({ statusCode, statusMessage }: MockCreateErrorInput) =>
    Object.assign(new Error(statusMessage ?? 'Error'), { statusCode });

  return { getHeader, setHeader, getQuery, eventHandler, createError };
});
vi.mock('@kookio/prisma-client/server', () => ({ prisma: prismaMock }));
vi.mock('@server/infra/redis', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@server/infra/redis')>();
  return {
    ...actual,
    // override getRedis and keep the rest (ipHash, redisKey, setJSON, etc.) real
    getRedis: redisInfraMock.getRedis,
  };
});
vi.mock('@server/infra/rate-limit', () => {
  const setHeader = (
    event: MockH3Event,
    name: string,
    value: string | number,
  ) => {
    if (!event.headers) event.headers = {};
    if (typeof event.headers.set === 'function')
      event.headers.set(name, String(value));
    else event.headers[name] = String(value);
  };
  const createError = ({ statusCode, statusMessage }: MockCreateErrorInput) =>
    Object.assign(new Error(statusMessage ?? 'Error'), { statusCode });
  const counters = new Map<string, { count: number; resetAt: number }>();
  const h3ApplyRateLimit = async (
    event: MockH3Event,
    opts: {
      bucket: string;
      max: number;
      windowSeconds: number;
      identifier?: string;
    },
  ) => {
    const { bucket, max, windowSeconds, identifier = 'unknown' } = opts;
    const now = Date.now();
    const resetAt = now + windowSeconds * 1000;
    const isProd = process.env['VERCEL_ENV'] === 'production';

    if (!isProd) {
      setHeader(event, 'X-RateLimit-Limit', String(max));
      setHeader(event, 'X-RateLimit-Remaining', String(max));
      setHeader(event, 'X-RateLimit-Reset', Math.floor(resetAt / 1000));
      return { allowed: true, remaining: max, resetAtMs: resetAt, identifier };
    }

    const key = `${bucket}:${identifier}`;
    const rec = counters.get(key);

    if (!rec || now > rec.resetAt) {
      counters.set(key, { count: 1, resetAt });
      setHeader(event, 'X-RateLimit-Limit', String(max));
      setHeader(event, 'X-RateLimit-Remaining', String(max - 1));
      setHeader(event, 'X-RateLimit-Reset', Math.floor(resetAt / 1000));
      return {
        allowed: true,
        remaining: max - 1,
        resetAtMs: resetAt,
        identifier,
      };
    }
    if (rec.count >= max) {
      setHeader(event, 'X-RateLimit-Limit', String(max));
      setHeader(event, 'X-RateLimit-Remaining', '0');
      setHeader(event, 'X-RateLimit-Reset', Math.floor(rec.resetAt / 1000));
      const retryAfter = Math.max(1, Math.ceil((rec.resetAt - now) / 1000));
      setHeader(event, 'Retry-After', retryAfter);
      throw createError({
        statusCode: 429,
        statusMessage: 'Too Many Requests',
      });
    }
    rec.count++;
    setHeader(event, 'X-RateLimit-Limit', String(max));
    setHeader(event, 'X-RateLimit-Remaining', String(max - rec.count));
    setHeader(event, 'X-RateLimit-Reset', Math.floor(rec.resetAt / 1000));
    return {
      allowed: true,
      remaining: max - rec.count,
      resetAtMs: rec.resetAt,
      identifier,
    };
  };

  return { h3ApplyRateLimit };
});

import { REDIS_PING_RESPONSE } from '../../../infra/constants';
import handler from './bench-db.get';

const asEvent = (mock: MockH3Event) => mock as unknown as H3Event;

describe('bench-db.get route (internal)', () => {
  let perfSpy: ReturnType<typeof vi.spyOn> | undefined;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('ALLOW_BENCH', 'true');
    vi.stubEnv('BENCH_KEY', 'secret');
    vi.stubEnv('BENCH_ITERATIONS', String(defaultIterations));
    // Default: Redis not configured → getRedis throws so the route skips Redis.
    redisInfraMock.getRedis.mockRejectedValue(new Error('missing REDIS_URL'));
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    perfSpy?.mockRestore();
  });

  it('accepts case-insensitive header (X-Bench-Key) and returns DB summary', async () => {
    perfSpy = spyPerfConstantDelta(2);
    prismaMock.$queryRaw.mockResolvedValueOnce(undefined); // warm-up
    for (let i = 0; i < defaultIterations; i++)
      prismaMock.$queryRaw.mockResolvedValueOnce(undefined);

    const res = await handler(
      asEvent({ headers: { 'X-Bench-Key': 'secret' } }),
    );

    expect(res.db).toMatchObject({
      probes: defaultIterations,
      avg_ms: 2,
      p50_ms: 2,
      p95_ms: 2,
    });
    expect(res.redis.enabled).toBe(false);
    expect(prismaMock.$queryRaw).toHaveBeenCalledTimes(defaultIterations + 1);
  });

  it('404 when ALLOW_BENCH !== true', async () => {
    vi.stubEnv('ALLOW_BENCH', 'false');
    await expect(
      handler(asEvent({ headers: { 'x-bench-key': 'secret' } })),
    ).rejects.toMatchObject({ statusCode: 404 });
    expect(prismaMock.$queryRaw).not.toHaveBeenCalled();
  });

  it('401 without key or with wrong key', async () => {
    await expect(handler(asEvent({ headers: {} }))).rejects.toMatchObject({
      statusCode: 401,
    });
    await expect(
      handler(asEvent({ headers: { 'x-bench-key': 'wrong' } })),
    ).rejects.toMatchObject({ statusCode: 401 });
    expect(prismaMock.$queryRaw).not.toHaveBeenCalled();
  });

  it('performs BENCH_ITERATIONS pings on DB and summarizes', async () => {
    const iterations = 50;

    vi.stubEnv('BENCH_ITERATIONS', String(iterations));
    prismaMock.$queryRaw.mockResolvedValueOnce(undefined); // warm-up
    for (let i = 0; i < iterations; i++)
      prismaMock.$queryRaw.mockResolvedValueOnce(undefined);

    perfSpy = spyPerfConstantDelta(1.5);

    const res = await handler(
      asEvent({ headers: { 'x-bench-key': 'secret' } }),
    );

    expect(res.db.probes).toBe(iterations);
    expect(res.db.avg_ms).toBeCloseTo(1.5, 2);
    expect(res.db.p95_ms).toBeCloseTo(1.5, 2);
    expect(prismaMock.$queryRaw).toHaveBeenCalledTimes(iterations + 1);
  });

  it('propagates prisma errors after auth', async () => {
    prismaMock.$queryRaw.mockRejectedValueOnce(new Error('db down')); // warm-up fails
    await expect(
      handler(asEvent({ headers: { 'x-bench-key': 'secret' } })),
    ).rejects.toBeInstanceOf(Error);
  });
});

describe('bench-db.get – Redis summary', () => {
  let perfSpy: ReturnType<typeof vi.spyOn> | undefined;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('ALLOW_BENCH', 'true');
    vi.stubEnv('BENCH_KEY', 'secret');
    vi.stubEnv('BENCH_ITERATIONS', String(defaultIterations));
    prismaMock.$queryRaw.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    perfSpy?.mockRestore();
  });

  it('skips Redis gracefully when getRedis throws', async () => {
    // default from outer beforeEach: throws
    perfSpy = spyPerfConstantDelta(2);

    const res = await handler(
      asEvent({ headers: { 'x-bench-key': 'secret' } }),
    );

    expect(res.redis.enabled).toBe(false);
    expect(res.redis).toMatchObject({
      probes: 0,
      avg_ms: 0,
      p50_ms: 0,
      p95_ms: 0,
    });
  });

  it('measures Redis when available', async () => {
    const ping = vi.fn().mockResolvedValue(REDIS_PING_RESPONSE);

    redisInfraMock.getRedis.mockResolvedValue({ ping });
    perfSpy = spyPerfConstantDelta(1);

    const res = await handler(
      asEvent({ headers: { 'x-bench-key': 'secret' } }),
    );

    expect(res.redis.enabled).toBe(true);
    expect(res.redis.probes).toBe(defaultIterations);
    expect(res.redis.avg_ms).toBeCloseTo(1, 2);
    expect(res.redis.p50_ms).toBeCloseTo(1, 2);
    expect(ping).toHaveBeenCalledTimes(1 + defaultIterations);
  });
});

describe('bench-db.get – rate limit / headers (production)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('VERCEL_ENV', 'production');
    vi.stubEnv('ALLOW_BENCH', 'true');
    vi.stubEnv('BENCH_KEY', 'secret');
    vi.stubEnv('BENCH_ITERATIONS', '0'); // minimal DB cost on the happy path
    prismaMock.$queryRaw.mockResolvedValue(undefined);
    // Redis skipped to keep tests focused on rate limit
    redisInfraMock.getRedis.mockRejectedValue(new Error('missing REDIS_URL'));
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('sets X-RateLimit-* headers and allows under the threshold', async () => {
    const event: MockH3Event = {
      headers: { 'x-bench-key': 'secret', 'x-forwarded-for': '1.2.3.4' },
    };
    const res = await handler(asEvent(event));

    expect(res.db).toBeDefined();
    expect(String(event.headers['X-RateLimit-Limit'])).toBe('10');
    expect(String(event.headers['X-RateLimit-Remaining'])).toBe('9'); // after first hit
    expect(Number(event.headers['X-RateLimit-Reset'])).toBeGreaterThan(0);
  });

  it('after 10 requests from the same IP → 429 and Retry-After present', async () => {
    const make = () =>
      handler(
        asEvent({
          headers: { 'x-bench-key': 'secret', 'x-forwarded-for': '5.6.7.8' },
        }),
      );

    for (let i = 0; i < 10; i++) await expect(make()).resolves.toBeDefined();
    await expect(make()).rejects.toMatchObject({ statusCode: 429 });

    const ev: MockH3Event = {
      headers: { 'x-bench-key': 'secret', 'x-forwarded-for': '5.6.7.8' },
    };
    await expect(handler(asEvent(ev))).rejects.toMatchObject({
      statusCode: 429,
    });
    expect(String(ev.headers['X-RateLimit-Remaining'])).toBe('0');
    expect(Number(ev.headers['Retry-After'])).toBeGreaterThan(0);
  });

  it('X-Forwarded-For: uses the first IP (with spaces) in the list', async () => {
    const ip1 = ' 10.0.0.1 ';
    const ip2 = '10.0.0.2';
    const hdr = `${ip1}, ${ip2}`;

    for (let i = 0; i < 10; i++) {
      await expect(
        handler(
          asEvent({
            headers: { 'x-bench-key': 'secret', 'x-forwarded-for': hdr },
          }),
        ),
      ).resolves.toBeDefined();
    }
    await expect(
      handler(
        asEvent({
          headers: { 'x-bench-key': 'secret', 'x-forwarded-for': hdr },
        }),
      ),
    ).rejects.toMatchObject({ statusCode: 429 });
  });
});

describe('bench-db.get – iterations & percentile', () => {
  let perfSpy: ReturnType<typeof vi.spyOn> | undefined;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('ALLOW_BENCH', 'true');
    vi.stubEnv('BENCH_KEY', 'secret');
    prismaMock.$queryRaw.mockResolvedValue(undefined);
    // Skip Redis for these cases
    redisInfraMock.getRedis.mockRejectedValue(new Error('missing REDIS_URL'));
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    perfSpy?.mockRestore();
  });

  it('invalid BENCH_ITERATIONS → defaults to 100 probes', async () => {
    vi.stubEnv('BENCH_ITERATIONS', 'not-a-number');
    const res = await handler(
      asEvent({ headers: { 'x-bench-key': 'secret' } }),
    );
    expect(res.db.probes).toBe(defaultIterations);
    expect(prismaMock.$queryRaw).toHaveBeenCalledTimes(1 + defaultIterations); // warm-up + defaultIterations
  });

  it('percentile with interpolation: [2, 8] → p50=5 and p95 ~ 7.7', async () => {
    vi.stubEnv('BENCH_ITERATIONS', '2');
    perfSpy = spyPerfDeltas([2, 8]); // now(): [0,2, 0,8]

    const res = await handler(
      asEvent({ headers: { 'x-bench-key': 'secret' } }),
    );

    expect(res.db.probes).toBe(2);
    expect(res.db.p50_ms).toBeCloseTo(5, 2);
    expect(res.db.avg_ms).toBeCloseTo(5, 2);
    // p95 for [2,8] with linear interpolation: 2*(1-0.95) + 8*0.95 = 7.7
    expect(res.db.p95_ms).toBeCloseTo(7.7, 2);
  });

  it('?ops from query overrides env/default', async () => {
    // Provide ops via query, ignore BENCH_ITERATIONS.
    const event: MockH3Event = {
      headers: { 'x-bench-key': 'secret' },
      query: { ops: '3' },
    };

    perfSpy = spyPerfConstantDelta(1);

    const res = await handler(asEvent(event));

    expect(res.db.probes).toBe(3);
    expect(prismaMock.$queryRaw).toHaveBeenCalledTimes(1 + 3); // warm-up + 3
  });
});
