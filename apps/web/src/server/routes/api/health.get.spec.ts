const prismaMock = vi.hoisted(() => ({ $queryRaw: vi.fn() }));
const redisMock = vi.hoisted(() => ({ pingRedis: vi.fn() }));

vi.mock('h3', () => ({ defineEventHandler: (fn: any) => fn }));
vi.mock('@kookio/prisma-client/server', () => ({ prisma: prismaMock }));
vi.mock('../../infra/redis', () => redisMock);

import handler from './health.get';

describe('/api/health', () => {
  let perfSpy: ReturnType<typeof vi.spyOn> | undefined;

  beforeEach(() => {
    vi.clearAllMocks();
    // Default: Redis is "not configured". Tests that exercise the redis
    // probe re-stub REDIS_URL with a value. Keeping the default unset
    // means the prisma-focused tests don't accidentally trigger a redis
    // call (which would also burn extra performance.now ticks and throw
    // off the latency assertion).
    vi.stubEnv('REDIS_URL', '');
  });

  afterEach(() => {
    perfSpy?.mockRestore();
    vi.unstubAllEnvs();
  });

  it('returns ok + prisma=ok + prisma_latency_ms when query succeeds', async () => {
    prismaMock.$queryRaw.mockResolvedValueOnce(undefined);
    const seq = [100, 103];
    let i = 0;
    perfSpy = vi
      .spyOn(performance, 'now')
      .mockImplementation(() => seq[i++ % seq.length]);

    const res = await handler({} as any);
    expect(res.status).toBe('ok');
    expect(res.prisma).toBe<'ok' | 'down'>('ok');
    expect(res.prisma_error).toBeNull();
    expect(typeof res.uptime).toBe('number');
    expect(typeof res.timestamp).toBe('string');
    expect(res.prisma_latency_ms).toBe(3);
    expect(prismaMock.$queryRaw).toHaveBeenCalledTimes(1);
  });

  it('returns prisma=down + error message when query fails', async () => {
    prismaMock.$queryRaw.mockRejectedValueOnce(new Error('fail-fast'));
    const res = await handler({} as any);
    expect(res.status).toBe('ok');
    expect(res.prisma).toBe<'ok' | 'down'>('down');
    expect(res.prisma_error).toContain('fail-fast');
    expect(res.prisma_latency_ms).toBeNull();
  });

  describe('redis probe', () => {
    beforeEach(() => {
      // Keep prisma succeeding quickly so the redis assertions don't
      // have to also juggle a prisma-failure path.
      prismaMock.$queryRaw.mockResolvedValue(undefined);
    });

    it('returns redis=skipped when REDIS_URL is not configured', async () => {
      // Inherits the empty REDIS_URL from the outer beforeEach.
      const res = await handler({} as any);

      expect(res.redis).toBe<'ok' | 'down' | 'skipped'>('skipped');
      expect(res.redis_error).toBeNull();
      expect(res.redis_latency_ms).toBeNull();
      expect(redisMock.pingRedis).not.toHaveBeenCalled();
    });

    it('returns redis=ok + redis_latency_ms when ping succeeds', async () => {
      vi.stubEnv('REDIS_URL', 'redis://localhost:6379');
      redisMock.pingRedis.mockResolvedValueOnce('PONG');

      // Sequence covers (prisma start, prisma end, redis start, redis end).
      const seq = [100, 100, 200, 207];
      let i = 0;
      perfSpy = vi
        .spyOn(performance, 'now')
        .mockImplementation(() => seq[i++ % seq.length]);

      const res = await handler({} as any);

      expect(res.redis).toBe<'ok' | 'down' | 'skipped'>('ok');
      expect(res.redis_error).toBeNull();
      expect(res.redis_latency_ms).toBe(7);
      expect(redisMock.pingRedis).toHaveBeenCalledTimes(1);
    });

    it('returns redis=down + error message when ping rejects', async () => {
      vi.stubEnv('REDIS_URL', 'redis://localhost:6379');
      redisMock.pingRedis.mockRejectedValueOnce(
        new Error('Redis is temporarily unavailable (cooldown)'),
      );

      const res = await handler({} as any);

      expect(res.redis).toBe<'ok' | 'down' | 'skipped'>('down');
      expect(res.redis_error).toContain('cooldown');
      expect(res.redis_latency_ms).toBeNull();
    });

    it('coerces non-Error throws into a string redis_error', async () => {
      vi.stubEnv('REDIS_URL', 'redis://localhost:6379');
      redisMock.pingRedis.mockRejectedValueOnce('plain-string-error');

      const res = await handler({} as any);

      expect(res.redis).toBe<'ok' | 'down' | 'skipped'>('down');
      expect(res.redis_error).toBe('plain-string-error');
    });
  });
});
