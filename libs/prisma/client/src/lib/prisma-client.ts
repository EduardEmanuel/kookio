import { PrismaClient } from '@prisma/client';
import * as runtime from '@prisma/client/runtime/library.js';

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

const createPrismaClient = () =>
  new PrismaClient().$extends({
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

type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;

const g = globalThis as unknown as { prisma?: ExtendedPrismaClient };
export const prisma: ExtendedPrismaClient = (g.prisma ??= createPrismaClient());

export const withTxRetry = async <T>(
  client: PrismaClient,
  fn: (client: Omit<PrismaClient, runtime.ITXClientDenyList>) => Promise<T>,
  retries = 3,
): Promise<T> => {
  let last: unknown;
  for (let i = 0; i <= retries; i++) {
    try {
      return await client.$transaction(async (tx) => fn(tx));
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
