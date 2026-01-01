/* eslint-disable @typescript-eslint/no-explicit-any */
import { type RedisClientType } from 'redis';

import { REDIS_PING_RESPONSE } from './constants';

const createClient = vi.hoisted(() =>
  vi.fn(
    (_opts: { url: string }) =>
      new FakeRedisClient() as unknown as RedisClientType,
  ),
);
const loggerMock = vi.hoisted(() => ({
  error: vi.fn(),
  warn: vi.fn(),
  info: vi.fn(),
  debug: vi.fn(),
}));
const importSuite = async () => {
  // fresh module to reset internal singleton `client` and capture env-derived prefix
  vi.resetModules();
  // Keep mocks, but clear their call history
  vi.clearAllMocks();
  return await import('./redis');
};

vi.mock('@kookio/server-logger', () => ({ logger: loggerMock }));
vi.mock('redis', () => ({ createClient: createClient }));

// Fake Redis client with minimal stateful behavior + spy-able methods
class FakeRedisClient {
  isOpen = false;

  private kv = new Map<string, string>();
  private counts = new Map<string, number>();
  private ttls = new Map<string, number>(); // seconds
  on = vi.fn((_event: string, _cb: (...args: any[]) => void) => this);

  connect = vi.fn(async () => {
    this.isOpen = true;
    return this;
  });

  quit = vi.fn(async () => {
    this.isOpen = false;
    return 'OK';
  });

  // String KV
  set = vi.fn(async (key: string, value: string, opts?: { EX?: number }) => {
    this.kv.set(key, value);
    if (opts?.EX && Number.isFinite(opts.EX))
      this.ttls.set(key, Math.ceil(opts.EX));
    return 'OK';
  });

  get = vi.fn(async (key: string) => this.kv.get(key) ?? null);

  // TTL / INCR
  incr = vi.fn(async (key: string) => {
    const v = (this.counts.get(key) ?? 0) + 1;
    this.counts.set(key, v);
    return v;
  });

  ttl = vi.fn(async (key: string) => {
    // -2: key does not exist, -1: exists no expiration, >=0: seconds
    const has = this.counts.has(key) || this.kv.has(key);

    if (!has && !this.ttls.has(key)) return -2;
    if (!this.ttls.has(key)) return -1;
    return this.ttls.get(key);
  });

  expire = vi.fn(async (key: string, seconds: number) => {
    this.ttls.set(key, Math.max(1, Math.ceil(seconds)));
    return 1;
  });

  ping = vi.fn(async () => REDIS_PING_RESPONSE);

  multi = () => {
    const ops: Array<() => Promise<any>> = [];
    return {
      incr: (key: string) => (ops.push(() => this.incr(key)), this),
      ttl: (key: string) => (ops.push(() => this.ttl(key)), this),
      exec: async () => {
        const out: any[] = [];
        for (const op of ops) out.push(await op());
        return out;
      },
    };
  };
}

beforeEach(() => {
  vi.unstubAllEnvs();
  loggerMock.error.mockClear();
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('ipHash', () => {
  it('is deterministic, short, and URL-safe', async () => {
    const { ipHash } = await importSuite();
    const a = ipHash('1.2.3.4');
    const b = ipHash('1.2.3.4');
    const c = ipHash('5.6.7.8');

    expect(a).toBe(b);
    expect(a).not.toBe(c);
    expect(a).toMatch(/^[A-Za-z0-9_-]{10}$/);
  });
});

describe('redisKey & REDIS_PREFIX', () => {
  it('uses REDIS_PREFIX when provided', async () => {
    vi.stubEnv('REDIS_PREFIX', 'kookio:development');

    const { redisKey } = await importSuite();

    expect(redisKey(' bench ', '', ' ip ')).toBe('kookio:development:bench:ip');
  });

  it('falls back to kookio:<VERCEL_ENV>', async () => {
    vi.unstubAllEnvs(); // ensure no custom REDIS_PREFIX is left
    vi.stubEnv('VERCEL_ENV', 'preview');

    const { redisKey } = await importSuite();

    expect(redisKey('bench', 'abc')).toBe('kookio:preview:bench:abc');
  });
});

describe('getRedis / quitRedis', () => {
  it('throws when REDIS_URL is missing', async () => {
    const { getRedis } = await importSuite();

    await expect(getRedis()).rejects.toThrow(/Missing REDIS_URL/i);
    expect(createClient).not.toHaveBeenCalled();
  });

  it('creates and memoizes a client, reusing when open', async () => {
    vi.stubEnv('REDIS_URL', 'redis://example');

    const { getRedis } = await importSuite();
    const c1 = await getRedis();
    const c2 = await getRedis();

    expect(createClient).toHaveBeenCalledTimes(1);
    expect(c1).toBe(c2);
    expect(c1.isOpen).toBe(true);
  });

  it('quitRedis closes and clears the cached client', async () => {
    vi.stubEnv('REDIS_URL', 'redis://example');

    const { getRedis, quitRedis } = await importSuite();
    const c1 = await getRedis();

    await quitRedis();

    const c2 = await getRedis();

    expect(createClient).toHaveBeenCalledTimes(2);
    expect(c1).not.toBe(c2);
  });
});

describe('String & JSON helpers', () => {
  it('setString requires positive TTL', async () => {
    vi.stubEnv('REDIS_URL', 'redis://example');

    const { setString } = await importSuite();

    await expect(setString('k', 'v', 0)).rejects.toThrow(/requires positive/i);
    await expect(setString('k', 'v', -5)).rejects.toThrow(/requires positive/i);
  });

  it('setString uses EX = ceil(seconds) and getString returns value', async () => {
    vi.stubEnv('REDIS_URL', 'redis://example');

    const { setString, getString, getRedis } = await importSuite();

    await setString('key', 'value', 1.2);

    const v = await getString('key');

    expect(v).toBe('value');

    // Inspect last returned fake client to assert EX usage
    const client = (
      createClient as unknown as { mock: { results: any[] } }
    ).mock.results.slice(-1)[0].value as FakeRedisClient;
    const setCall = client.set.mock.calls.find(([k]) => k === 'key');

    if (setCall) expect(setCall[2]).toEqual({ EX: 2 });
    // sanity check via ttl()
    expect(await (await getRedis()).ttl('key')).toBe(2);
  });

  it('setJSON/getJSON roundtrip and parse error path', async () => {
    vi.stubEnv('REDIS_URL', 'redis://example');

    const { setJSON, getJSON, getRedis } = await importSuite();

    await setJSON('obj', { a: 1, b: 'x' }, 10);
    await expect(getJSON('obj')).resolves.toEqual({ a: 1, b: 'x' });
    // Corrupt the value and ensure parse error is consumed + logged
    const r = await getRedis();

    await r.set('bad', '{not-json');
    await expect(getJSON('bad')).resolves.toBeNull();
    expect(loggerMock.error).toHaveBeenCalled();
  });
});

describe('increaseWithTimeToLive (fixed window)', () => {
  it('sets TTL on first hit, then only increments while TTL is active', async () => {
    vi.stubEnv('REDIS_URL', 'redis://example');

    const { increaseWithTimeToLive, getRedis } = await importSuite();
    const key = 'bucket:iphash';
    const ttlSeconds = 60;
    const c1 = await increaseWithTimeToLive(key, ttlSeconds);

    expect(c1).toBe(1);
    // TTL should be applied as ceil(window+5)
    const redis = await getRedis();
    const expected = Math.max(1, Math.ceil(ttlSeconds + 5));

    expect(await redis.ttl(key)).toBe(expected);

    const c2 = await increaseWithTimeToLive(key, ttlSeconds);

    expect(c2).toBe(2);
    // No additional expire() needed (still positive)
    // We can assert count grew and TTL stayed the same
    expect(await redis.ttl(key)).toBe(expected);
  });

  it('guards negative or tiny windows with min TTL = 1', async () => {
    vi.stubEnv('REDIS_URL', 'redis://example');

    const { increaseWithTimeToLive, getRedis } = await importSuite();
    const key = 'bucket:tiny';
    const c = await increaseWithTimeToLive(key, -10);

    expect(c).toBe(1);

    const redis = await getRedis();

    expect(await redis.ttl(key)).toBe(1);
  });
});

describe('pingRedis', () => {
  it('returns PONG', async () => {
    vi.stubEnv('REDIS_URL', 'redis://example');

    const { pingRedis } = await importSuite();

    await expect(pingRedis()).resolves.toBe(REDIS_PING_RESPONSE);
  });
});
