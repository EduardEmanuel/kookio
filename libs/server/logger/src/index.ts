// server-logger/src/index.ts
import { pino, Logger } from 'pino';
import type {
  AppLogger,
  AuditLogger,
  LogNamespace,
} from '@kookio/core-logging';
import type { AuditEvent } from '@kookio/core-security';

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

const wrap = (p: Logger): AppLogger => {
  return {
    child: (b) => wrap(p.child(b)),
    fatal: (o, m) => p.fatal(o, m),
    error: (o, m) => p.error(o, m),
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
