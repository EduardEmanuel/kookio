// context.ts
import { prisma, type AuthSession } from '@kookio/prisma-client';

export type Context = {
  token?: string;
  session: AuthSession | null;
  prisma: typeof prisma;
};

// Adapter hook (set from a real adapter later)
export type SessionAdapter = (token?: string) => Promise<AuthSession | null>;
let resolveSession: SessionAdapter = async () => null;
export const setSessionResolver = (fn: SessionAdapter) => {
  resolveSession = fn;
};

type HeaderValue = string | string[] | undefined;
type HeaderMap =
  | { get?: (name: string) => string | null }
  | Record<string, HeaderValue>;
type ContextOptions = {
  req?: { headers?: HeaderMap };
  node?: { req?: { headers?: Record<string, HeaderValue> } };
};

type HeadersWithGet = { get: (name: string) => string | null };

const hasGet = (h: HeaderMap): h is HeadersWithGet =>
  typeof (h as Record<string, unknown>)['get'] === 'function';

const getHeaderValue = (headers: HeaderMap | undefined, name: string) => {
  if (!headers) return undefined;
  if (hasGet(headers)) return headers.get(name) ?? undefined;
  const v = (headers as Record<string, HeaderValue>)[name];
  return Array.isArray(v) ? v[0] : v;
};

export const createContext = async (opts: ContextOptions): Promise<Context> => {
  const headers = opts.node?.req?.headers ?? opts?.req?.headers;
  const tokenHeader = getHeaderValue(headers, 'authorization');
  const token = tokenHeader?.replace(/^Bearer\s+/i, '');
  const session = await resolveSession(token);

  return {
    token,
    session,
    prisma,
  };
};
