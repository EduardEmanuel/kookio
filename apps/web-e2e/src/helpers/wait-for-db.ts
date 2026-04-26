import { prisma } from '@kookio/prisma-client';
import { logger } from '@kookio/server-logger';

export const waitForDbReady = async (tries = 6, baseDelayMs = 300) => {
  let lastErr: unknown;

  if (!process.env['DATABASE_URL']) {
    throw new Error(
      'E2E missing DATABASE_URL (ensure with-vercel-env.mjs injects it).',
    );
  }
  for (let i = 1; i <= tries; i++) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return;
    } catch (e) {
      lastErr = e;
      logger.error(e, `❌ waitForDbReady: DB not ready`);
      await new Promise((r) => setTimeout(r, baseDelayMs * i));
    }
  }
  throw lastErr;
};
