import type { AuthSession } from '@kookio/core-security';
import { PrismaIngredientRepository } from '@kookio/prisma-client';

export type Context = {
  token?: string;
  session: AuthSession | null;
  repository: {
    ingredient: PrismaIngredientRepository;
  };
};

type HeaderValue = string | string[] | undefined;
type HeaderMap =
  | { get?: (name: string) => string | null }
  | Record<string, HeaderValue>;

type ContextOptions = {
  req?: { headers?: HeaderMap };
  node?: { req?: { headers?: Record<string, HeaderValue> } };
};

const getHeaderValue = (headers: HeaderMap | undefined, name: string) => {
  if (!headers) return undefined;
  if (typeof (headers as { get?: unknown }).get === 'function') {
    const value = (headers as { get: (key: string) => string | null }).get(
      name,
    );
    return value ?? undefined;
  }

  const value = (headers as Record<string, HeaderValue>)[name];
  return Array.isArray(value) ? value[0] : value;
};

export const createContext = (opts: ContextOptions): Context => {
  const ingredient = new PrismaIngredientRepository();
  const session: AuthSession | null = null; // TODO: implement session retrieval
  const headers = opts.node?.req?.headers ?? opts.req?.headers;
  const tokenHeader = getHeaderValue(headers, 'authorization');
  const token = tokenHeader?.replace(/^Bearer\s+/i, '');

  return {
    token,
    session,
    repository: {
      ingredient,
    },
  };
};
