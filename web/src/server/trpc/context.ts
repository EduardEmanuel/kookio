import { config } from 'dotenv-safe';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

import { inferAsyncReturnType } from '@trpc/server';

import type { PrismaClient as PrismaClientType } from '@kookio/prisma';

const require = createRequire(import.meta.url);
const PRISMA_ENV_FILE = process.env['PRISMA_ENV_FILE'] ?? 'libs/data-access/prisma/.env.local';
const PRISMA_ENV_EXAMPLE = process.env['PRISMA_ENV_EXAMPLE'] ?? 'libs/data-access/prisma/.env.example';

config({
  path: resolve(process.cwd(), PRISMA_ENV_FILE),
  example: resolve(process.cwd(), PRISMA_ENV_EXAMPLE),
  allowEmptyValues: true,
});

const { PrismaClient } = require(resolve(process.cwd(), 'libs/data-access/prisma/src/generated/prisma-client/index.js')) as typeof import('@kookio/prisma');

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
const prisma: PrismaClientType = new PrismaClient();

export const createContext = () => ({ prisma });
export type Context = inferAsyncReturnType<typeof createContext>;
