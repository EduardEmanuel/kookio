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
  });
  return new PrismaClient({ adapter }).$extends(retryExtension);
};

type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;

const g = globalThis as unknown as { prisma?: ExtendedPrismaClient };
export const prisma: ExtendedPrismaClient = (g.prisma ??= createPrismaClient());

export const withTxRetry = async <T>(
  client: PrismaClient,
  fn: (client: Prisma.TransactionClient) => Promise<T>,
  retries = 3,
): Promise<T> => {
  let last: unknown;
  for (let i = 0; i <= retries; i++) {
    try {
      return await client.$transaction(async (tx: Prisma.TransactionClient) =>
        fn(tx),
      );
    } catch (e) {
      last = e;
      if (!isRetryableTxError(e) || i === retries) throw e;
      await new Promise((r) => setTimeout(r, 50 * (i + 1)));
    }
  }
  throw last as never;
};

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
