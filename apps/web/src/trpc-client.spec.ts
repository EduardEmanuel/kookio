import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@kookio/feature-auth', () => ({
  getResolvedAuth: vi.fn(),
}));

import { getResolvedAuth } from '@kookio/feature-auth';
import { TrpcHeaders, authAwareFetch } from './trpc-client';

const TEN_MINUTES_MS = 10 * 60 * 1000;
const TWO_MINUTES_MS = 2 * 60 * 1000;

const makeMockUser = (expiresInMs: number, newToken = 'refreshed-token') => ({
  getIdTokenResult: vi.fn().mockResolvedValue({
    expirationTime: new Date(Date.now() + expiresInMs).toISOString(),
  }),
  getIdToken: vi.fn().mockResolvedValue(newToken),
});

describe('authAwareFetch', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch);
    vi.mocked(getResolvedAuth).mockReturnValue(null);
    mockFetch.mockResolvedValue(new Response('ok', { status: 200 }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  // ─── No auth ──────────────────────────────────────────────────────────────

  it('calls fetch directly when no auth', async () => {
    const response = await authAwareFetch('http://test/api', {});

    expect(mockFetch).toHaveBeenCalledOnce();
    expect(response.status).toBe(200);
  });

  // ─── Proactive refresh (PASUL 2) ─────────────────────────────────────────

  it('uses existing headers when token has > 5 min remaining', async () => {
    const user = makeMockUser(TEN_MINUTES_MS);
    vi.mocked(getResolvedAuth).mockReturnValue({ currentUser: user } as never);

    await authAwareFetch('http://test/api', {});

    expect(user.getIdToken).not.toHaveBeenCalled();
    expect(mockFetch).toHaveBeenCalledOnce();
  });

  it('force-refreshes and updates headers when token expires in < 5 min', async () => {
    const user = makeMockUser(TWO_MINUTES_MS, 'new-token');
    vi.mocked(getResolvedAuth).mockReturnValue({ currentUser: user } as never);
    const setHeadersSpy = vi.spyOn(TrpcHeaders, 'set');

    await authAwareFetch('http://test/api', {});

    expect(user.getIdToken).toHaveBeenCalledWith(true);
    expect(setHeadersSpy).toHaveBeenCalledWith({
      Authorization: 'Bearer new-token',
    });

    const [, opts] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(new Headers(opts.headers as HeadersInit).get('Authorization')).toBe(
      'Bearer new-token',
    );
  });

  it('preserves other headers when force-refreshing', async () => {
    const user = makeMockUser(TWO_MINUTES_MS, 'new-token');
    vi.mocked(getResolvedAuth).mockReturnValue({ currentUser: user } as never);

    await authAwareFetch('http://test/api', {
      headers: { 'X-Custom': 'value', Authorization: 'Bearer old-token' },
    });

    const [, opts] = mockFetch.mock.calls[0] as [string, RequestInit];
    const headers = new Headers(opts.headers as HeadersInit);
    expect(headers.get('X-Custom')).toBe('value');
    expect(headers.get('Authorization')).toBe('Bearer new-token');
  });

  it('proceeds with original headers when getIdTokenResult throws', async () => {
    const user = {
      getIdTokenResult: vi.fn().mockRejectedValue(new Error('network')),
      getIdToken: vi.fn(),
    };
    vi.mocked(getResolvedAuth).mockReturnValue({ currentUser: user } as never);

    const response = await authAwareFetch('http://test/api', {});

    expect(mockFetch).toHaveBeenCalledOnce();
    expect(response.status).toBe(200);
  });

  // ─── 401 retry (PASUL 3) ─────────────────────────────────────────────────

  it('retries once on 401 with fresh token', async () => {
    const user = makeMockUser(TEN_MINUTES_MS, 'retry-token');
    vi.mocked(getResolvedAuth).mockReturnValue({ currentUser: user } as never);
    mockFetch
      .mockResolvedValueOnce(new Response('', { status: 401 }))
      .mockResolvedValueOnce(new Response('ok', { status: 200 }));

    const response = await authAwareFetch('http://test/api', {});

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(user.getIdToken).toHaveBeenCalledWith(true);
    expect(response.status).toBe(200);
  });

  it('updates TrpcHeaders signal after successful 401 retry', async () => {
    const user = makeMockUser(TEN_MINUTES_MS, 'retry-token');
    vi.mocked(getResolvedAuth).mockReturnValue({ currentUser: user } as never);
    mockFetch
      .mockResolvedValueOnce(new Response('', { status: 401 }))
      .mockResolvedValueOnce(new Response('ok', { status: 200 }));
    const setHeadersSpy = vi.spyOn(TrpcHeaders, 'set');

    await authAwareFetch('http://test/api', {});

    expect(setHeadersSpy).toHaveBeenCalledWith({
      Authorization: 'Bearer retry-token',
    });
  });

  it('returns 401 without looping on double 401', async () => {
    const user = makeMockUser(TEN_MINUTES_MS);
    vi.mocked(getResolvedAuth).mockReturnValue({ currentUser: user } as never);
    mockFetch.mockResolvedValue(new Response('', { status: 401 }));

    const response = await authAwareFetch('http://test/api', {});

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(response.status).toBe(401);
  });

  it('returns 401 as-is when no user is logged in', async () => {
    mockFetch.mockResolvedValue(new Response('', { status: 401 }));

    const response = await authAwareFetch('http://test/api', {});

    expect(mockFetch).toHaveBeenCalledOnce();
    expect(response.status).toBe(401);
  });

  it('returns original 401 when retry refresh throws', async () => {
    const user = {
      getIdTokenResult: vi.fn().mockResolvedValue({
        expirationTime: new Date(Date.now() + TEN_MINUTES_MS).toISOString(),
      }),
      getIdToken: vi.fn().mockRejectedValue(new Error('network')),
    };
    vi.mocked(getResolvedAuth).mockReturnValue({ currentUser: user } as never);
    mockFetch.mockResolvedValue(new Response('', { status: 401 }));

    const response = await authAwareFetch('http://test/api', {});

    expect(mockFetch).toHaveBeenCalledOnce();
    expect(response.status).toBe(401);
  });
});
