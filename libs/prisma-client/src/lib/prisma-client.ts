import { PrismaPg } from '@prisma/adapter-pg';

import { Prisma, PrismaClient } from '../generated/prisma/client';

export const isRetryableTxError = (e: unknown) => {
  const err = e as unknown & { code?: string; message?: string };
  const code = err?.code as string | undefined;
  const msg: string = (err?.message ?? '').toString();
  return (
    code === 'P2034' ||
    code === 'P2036' ||
    msg.includes('40001') ||
    msg.includes('restart transaction')
  );
};

const retryOnConflict = async <T>(
  fn: () => Promise<T>,
  retries = 3,
): Promise<T> => {
  let last: unknown;
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (e) {
      last = e;
      if (!isRetryableTxError(e) || i === retries) throw e;
      await new Promise((r) => setTimeout(r, 50 * (i + 1)));
    }
  }
  throw last as never;
};

const retryExtension = Prisma.defineExtension({
  query: {
    $allModels: {
      create: ({ args, query }) => retryOnConflict(() => query(args)),
      createMany: ({ args, query }) => retryOnConflict(() => query(args)),
      update: ({ args, query }) => retryOnConflict(() => query(args)),
      updateMany: ({ args, query }) => retryOnConflict(() => query(args)),
      delete: ({ args, query }) => retryOnConflict(() => query(args)),
      deleteMany: ({ args, query }) => retryOnConflict(() => query(args)),
      upsert: ({ args, query }) => retryOnConflict(() => query(args)),
    },
  },
});

// When DATABASE_URL is absent the adapter silently falls back to the localhost
// placeholder, so every query fails with a cryptic
// `P1001: Can't reach database server at 127.0.0.1:26257` — once per request.
// This guard turns that into a single, clearly-labelled error so a
// misconfigured runtime (e.g. a Vercel preview deploy missing the variable) is
// immediately obvious instead of an 8x cryptic-connection-error pile-up.
// Module construction stays offline-safe: build / prerender / unit tests import
// the client but never issue a query, so the guard never fires for them.
const databaseUrlConfigured = Boolean(process.env['DATABASE_URL']);

const databaseUrlGuard = Prisma.defineExtension({
  query: {
    $allModels: {
      $allOperations: ({ model, operation, args, query }) => {
        if (!databaseUrlConfigured) {
          throw new Error(
            `DATABASE_URL is not configured — refusing to run ${model}.${operation} ` +
              'against the localhost placeholder. Set DATABASE_URL for this ' +
              'environment before serving requests.',
          );
        }
        return query(args);
      },
    },
  },
});

const createPrismaClient = () => {
  // Prisma 7 is Rust-free: the connection runs through a JS driver adapter
  // (`@prisma/adapter-pg` — CockroachDB speaks the Postgres wire protocol).
  // The placeholder mirrors prisma.config.ts so module construction never
  // throws when DATABASE_URL is absent (SSR build / prerender path); the
  // pg pool connects lazily on first query, and real server runtimes always
  // have the variable injected via `with:env`.
  const adapter = new PrismaPg({
    connectionString:
      process.env['DATABASE_URL'] ??
      'postgresql://placeholder:placeholder@localhost:26257/kookio',
    // A single statement must not pin a serverless function for the whole 60s
    // Vercel ceiling — CockroachDB enforces this as the Postgres
    // `statement_timeout`. Generous enough for app queries and batched seeds.
    statement_timeout: 20_000,
    // Fail fast if the pool can't hand out a connection instead of hanging.
    connectionTimeoutMillis: 10_000,
    // Cap the per-instance pg pool. Vercel runs many concurrent function
    // instances, so a large pool per instance multiplies into CockroachDB
    // connection-limit exhaustion under load; one request needs only a few.
    max: 5,
  });
  // Guard chained last so it runs outermost — a missing-URL failure surfaces
  // before the retry layer ever engages (it is not a retryable tx conflict).
  return new PrismaClient({ adapter })
    .$extends(retryExtension)
    .$extends(databaseUrlGuard);
};

type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;

const g = globalThis as unknown as { prisma?: ExtendedPrismaClient };
export const prisma: ExtendedPrismaClient = (g.prisma ??= createPrismaClient());

export const paginate = <T>(items: T[]) => ({
  data: items,
  pagination: {
    page: 1,
    pageSize: items.length,
    total: items.length,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  },
});
