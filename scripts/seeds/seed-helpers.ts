import { logger as base } from '@kookio/server-logger';

export const logger = base.child({ ns: 'seed' });

export const env = {
  ADMIN_EMAIL: process.env['SEED_ADMIN_EMAIL'],
  ADMIN_PASSWORD: process.env['SEED_ADMIN_PASSWORD'],
} as const;
