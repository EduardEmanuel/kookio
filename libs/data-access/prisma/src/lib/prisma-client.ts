import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, parse, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import dotenvSafe from 'dotenv-safe';
import type { Prisma as PrismaNamespace, PrismaClient as PrismaClientType } from '../../generated/prisma-client';

const require = createRequire(import.meta.url);

let envLoaded = false;
function resolveWorkspacePath(relativePath: string) {
  const moduleDir = dirname(fileURLToPath(import.meta.url));
  let current = moduleDir;
  const { root } = parse(current);

  while (true) {
    const candidate = join(current, relativePath);
    if (existsSync(candidate)) {
      return candidate;
    }
    if (current === root) {
      break;
    }
    current = dirname(current);
  }

  return resolve(process.cwd(), relativePath);
}

function ensurePrismaEnvLoaded() {
  if (envLoaded) {
    return;
  }

  const envFileRelative = process.env['PRISMA_ENV_FILE'] ?? 'libs/data-access/prisma/.env.local';
  const envExampleRelative = process.env['PRISMA_ENV_EXAMPLE'] ?? 'libs/data-access/prisma/.env.example';

  const envFile = resolveWorkspacePath(envFileRelative);
  const envExample = resolveWorkspacePath(envExampleRelative);

  if (!existsSync(envFile) || !existsSync(envExample)) {
    envLoaded = true;
    return;
  }

  try {
    dotenvSafe.config({
      path: envFile,
      example: envExample,
      allowEmptyValues: true,
    });
  } catch (error) {
    console.warn(`[prisma-client] Failed to load env file ${envFile}`, error);
  } finally {
    envLoaded = true;
  }
}

ensurePrismaEnvLoaded();

type GeneratedPrismaModule = typeof import('../../generated/prisma-client');

function loadGeneratedClient(): GeneratedPrismaModule {
  const moduleDir = dirname(fileURLToPath(import.meta.url));
  const localCandidate = join(moduleDir, '../../generated/prisma-client/index.js');
  if (existsSync(localCandidate)) {
    return require(localCandidate) as GeneratedPrismaModule;
  }

  const suffix = join('libs', 'data-access', 'prisma', 'generated', 'prisma-client', 'index.js');
  let current = moduleDir;
  const { root } = parse(current);

  while (true) {
    const candidate = join(current, suffix);
    if (existsSync(candidate)) {
      return require(candidate) as GeneratedPrismaModule;
    }
    if (current === root) break;
    current = dirname(current);
  }

  throw new Error(
    `Unable to locate Prisma client at ${suffix}. ` +
      'Ensure `nx run prisma:generate-*` has been executed and that the workspace root is detectable.'
  );
}

const { PrismaClient: PrismaClientCtor, Prisma: PrismaNamespaceValue } = loadGeneratedClient();

declare global {
  // eslint-disable-next-line no-var
  var __kookioPrisma: PrismaClientType | undefined;
}

const prismaClient = globalThis.__kookioPrisma ?? new PrismaClientCtor();

if (process.env['NODE_ENV'] !== 'production') {
  globalThis.__kookioPrisma = prismaClient;
}

export const prisma = prismaClient;
export const PrismaClient = PrismaClientCtor;
export const Prisma = PrismaNamespaceValue;
export type PrismaClient = PrismaClientType;
export type Prisma = PrismaNamespace;
