import { PrismaClient } from '@prisma/client';
import * as runtime from '@prisma/client/runtime/library.js'

export type GlobalPrismaClient = { prisma: PrismaClient };

const g = globalThis as unknown as GlobalPrismaClient;

if (!g.prisma) {
  g.prisma = new PrismaClient();
}

export const prisma = g.prisma;

/**
 * Conservative retry for CockroachDB SERIALIZABLE conflicts.
 * - Prisma may surface 40001 as a message
 * - Known codes we watch for: P2034 (tx already closed) / P2036 (tx retries)
 * Adjust if you see different patterns in logs.
 */
export function isRetryableTxError(e: unknown) {
  const err = e as unknown & { code?: string; message?: string };
  const code = err?.code as string | undefined;
  const msg: string = (err?.message ?? '').toString();
  return code === 'P2034' || code === 'P2036' || msg.includes('40001') || msg.includes('restart transaction');
}

export async function withTxRetry<T>(prisma: PrismaClient, fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => Promise<T>, retries = 3): Promise<T> {
  let last: unknown;
  for (let i = 0; i <= retries; i++) {
    try {
      return await prisma.$transaction(async (tx) => fn(tx));
    } catch (e) {
      last = e;
      if (!isRetryableTxError(e) || i === retries) throw e;
      await new Promise((r) => setTimeout(r, 50 * (i + 1)));
    }
  }
  throw last;
}