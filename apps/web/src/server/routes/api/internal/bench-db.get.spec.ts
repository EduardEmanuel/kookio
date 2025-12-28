/* eslint-disable @typescript-eslint/no-explicit-any */

const prismaMock = vi.hoisted(() => ({ $queryRaw: vi.fn() }));
const spyPerfConstantDelta = vi.fn((deltaMs: number) => {
  let toggle = 0;
  return vi
    .spyOn(performance, 'now')
    .mockImplementation(() => (toggle++ % 2 === 0 ? 0 : deltaMs));
});

vi.mock('h3', () => {
  const getHeader = (event: any, name: string) => {
    const headers = event?.headers ?? {};
    const target = String(name).toLowerCase();
    if (headers && typeof headers.get === 'function') {
      return headers.get(name);
    }
    for (const k of Object.keys(headers)) {
      if (k.toLowerCase() === target) return headers[k];
    }
    return undefined;
  };
  return {
    defineEventHandler: (fn: any) => fn,
    getHeader,
    createError: ({ statusCode, statusMessage }: any) =>
      Object.assign(new Error(statusMessage ?? 'Error'), { statusCode }),
  };
});
vi.mock('@kookio/prisma-client', () => ({ prisma: prismaMock }));

import handler from './bench-db.get';

describe('bench-db.get route (internal)', () => {
  let perfSpy: ReturnType<typeof vi.spyOn> | undefined;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('ALLOW_BENCH', 'true');
    vi.stubEnv('BENCH_KEY', 'secret');
    vi.stubEnv('BENCH_ITERATIONS', '1');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    perfSpy?.mockRestore();
  });

  it('acceptă header case-insensitive (X-Bench-Key)', async () => {
    perfSpy = spyPerfConstantDelta(2);
    prismaMock.$queryRaw.mockResolvedValueOnce(undefined); // warmup
    prismaMock.$queryRaw.mockResolvedValueOnce(undefined); // 1 iteration
    await expect(
      handler({ headers: { 'X-Bench-Key': 'secret' } } as any),
    ).resolves.toBeDefined();
  });

  it('404 dacă ALLOW_BENCH !== true', async () => {
    vi.stubEnv('ALLOW_BENCH', 'false');
    await expect(
      handler({ headers: { 'x-bench-key': 'secret' } } as any),
    ).rejects.toMatchObject({ statusCode: 404 });
    expect(prismaMock.$queryRaw).not.toHaveBeenCalled();
  });

  it('401 fără cheie sau cu cheie greșită', async () => {
    await expect(handler({ headers: {} } as any)).rejects.toMatchObject({
      statusCode: 401,
    });

    await expect(
      handler({ headers: { 'x-bench-key': 'wrong' } } as any),
    ).rejects.toMatchObject({ statusCode: 401 });

    expect(prismaMock.$queryRaw).not.toHaveBeenCalled();
  });

  it('raportează metrica pentru 1 iterație (avg=p50=p95)', async () => {
    // warmup + 1 iteration
    prismaMock.$queryRaw.mockResolvedValueOnce(undefined);
    prismaMock.$queryRaw.mockResolvedValueOnce(undefined);
    perfSpy = spyPerfConstantDelta(2);

    const res = await handler({ headers: { 'x-bench-key': 'secret' } } as any);
    expect(res).toMatchObject({ n: 1, avg_ms: 2, p50_ms: 2, p95_ms: 2 });
    expect(prismaMock.$queryRaw).toHaveBeenCalledTimes(2);
  });

  it('cap BENCH_ITERATIONS la 10', async () => {
    vi.stubEnv('BENCH_ITERATIONS', '50');
    prismaMock.$queryRaw.mockResolvedValueOnce(undefined); // warmup
    for (let i = 0; i < 10; i++)
      prismaMock.$queryRaw.mockResolvedValueOnce(undefined);
    perfSpy = spyPerfConstantDelta(1.5);

    const res = await handler({ headers: { 'x-bench-key': 'secret' } } as any);
    expect(res.n).toBe(10);
    expect(prismaMock.$queryRaw).toHaveBeenCalledTimes(11);
    expect(res.avg_ms).toBeCloseTo(1.5, 2);
    expect(res.p95_ms).toBeCloseTo(1.5, 2);
  });

  it('propagă erorile prisma după auth/flag', async () => {
    prismaMock.$queryRaw.mockRejectedValueOnce(new Error('db down')); // warmup fail
    await expect(
      handler({ headers: { 'x-bench-key': 'secret' } } as any),
    ).rejects.toBeInstanceOf(Error);
  });
});
