import { pino, Logger } from 'pino';
import { captureException } from '@sentry/node';

import type { AuditEvent } from '@kookio/prisma-client';

export type LogNamespace = 'audit' | 'http' | 'trpc' | 'prisma';

export type AppLogger = {
  child(bindings: Record<string, unknown>): AppLogger;
  debug(obj: unknown, msg?: string): void;
  error(obj: unknown, msg?: string): void;
  fatal(obj: unknown, msg?: string): void;
  info(obj: unknown, msg?: string): void;
  trace(obj: unknown, msg?: string): void;
  warn(obj: unknown, msg?: string): void;
};

export type AuditLogger = {
  event(ev: AuditEvent): void;
};

const isProd =
  process.env['VERCEL'] === '1' || process.env['NODE_ENV'] === 'production';
const level = process.env['LOG_LEVEL'] ?? (isProd ? 'info' : 'debug');

const base = pino(
  isProd
    ? {
        level,
        base: undefined,
        redact: ['password', '*.token', 'authorization'],
      }
    : {
        level,
        base: undefined,
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss.l',
            ignore: 'pid,hostname',
          },
        },
      },
);

// Bridge handled server errors to Sentry. Every `log.error`/`log.fatal` call
// in the server passes its error as the `err` field of the first argument (the
// project-wide `{ err, ... }` logging convention), so this is the single
// server-side capture chokepoint — the back-end mirror of the client's
// `reportError` helper. No-op until Sentry is initialised by the `sentry` Nitro
// plugin, so scripts and tests that import the logger stay silent.
const captureFromLog = (obj: unknown, msg?: string): void => {
  if (!obj || typeof obj !== 'object' || !('err' in obj)) return;
  const { err, ...context } = obj as { err: unknown } & Record<string, unknown>;
  captureException(err, { extra: { ...context, msg } });
};

const wrap = (p: Logger): AppLogger => {
  return {
    child: (b) => wrap(p.child(b)),
    fatal: (o, m) => {
      captureFromLog(o, m);
      p.fatal(o, m);
    },
    error: (o, m) => {
      captureFromLog(o, m);
      p.error(o, m);
    },
    warn: (o, m) => p.warn(o, m),
    info: (o, m) => p.info(o, m),
    debug: (o, m) => p.debug(o, m),
    trace: (o, m) => p.trace(o, m),
  };
};

export const logger: AppLogger = wrap(base);

export const createLogger = (
  ns: LogNamespace,
  bindings?: Record<string, unknown>,
): AppLogger => {
  return wrap(base.child({ ns, ...(bindings ?? {}) }));
};

export const createAudit = (
  bindings?: Record<string, unknown>,
): AuditLogger => {
  const child = base.child({ ns: 'audit', ...(bindings ?? {}) });

  return {
    event: (ev: AuditEvent) => child.info({ audit: true, ...ev }, 'audit'),
  };
};
