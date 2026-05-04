const prismaMock = vi.hoisted(() => ({ $queryRaw: vi.fn() }));

vi.mock('h3', () => ({ defineEventHandler: (fn: any) => fn }));
vi.mock('@kookio/prisma-client/server', () => ({ prisma: prismaMock }));

import handler from './health.get';

describe('/api/health', () => {
  let perfSpy: ReturnType<typeof vi.spyOn> | undefined;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    perfSpy?.mockRestore();
  });

  it('returns ok + db=ok + latency_ms when query succeeds', async () => {
    prismaMock.$queryRaw.mockResolvedValueOnce(undefined);
    const seq = [100, 103];
    let i = 0;
    perfSpy = vi
      .spyOn(performance, 'now')
      .mockImplementation(() => seq[i++ % seq.length]);

    const res = await handler({} as any);
    expect(res.status).toBe('ok');
    expect(res.db).toBe<'ok' | 'down'>('ok');
    expect(res.error).toBeNull();
    expect(typeof res.uptime).toBe('number');
    expect(typeof res.timestamp).toBe('string');
    expect(res.latency_ms).toBe(3);
    expect(prismaMock.$queryRaw).toHaveBeenCalledTimes(1);
  });

  it('returns db=down + error message when query fails', async () => {
    prismaMock.$queryRaw.mockRejectedValueOnce(new Error('fail-fast'));
    const res = await handler({} as any);
    expect(res.status).toBe('ok');
    expect(res.db).toBe<'ok' | 'down'>('down');
    expect(res.error).toContain('fail-fast');
    expect(res.latency_ms).toBeNull();
  });
});
