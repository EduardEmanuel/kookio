type AuditEvent = import('@kookio/prisma-client').AuditEvent;

export type LogLevel =
  | 'fatal'
  | 'error'
  | 'warn'
  | 'info'
  | 'debug'
  | 'trace'
  | 'silent';

export type AppLogger = {
  child(bindings: Record<string, unknown>): AppLogger;
  debug(obj: unknown, msg?: string): void;
  error(obj: unknown, msg?: string): void;
  fatal(obj: unknown, msg?: string): void;
  info(obj: unknown, msg?: string): void;
  trace(obj: unknown, msg?: string): void;
  warn(obj: unknown, msg?: string): void;
};

export const noopLogger: AppLogger = {
  child: () => noopLogger,
  debug: () => {
    /* empty */
  },
  error: () => {
    /* empty */
  },
  fatal: () => {
    /* empty */
  },
  info: () => {
    /* empty */
  },
  trace: () => {
    /* empty */
  },
  warn: () => {
    /* empty */
  },
};

export type AuditLogger = {
  event(ev: AuditEvent): void;
};

export type LogNamespace = 'audit' | 'http' | 'trpc' | 'prisma';
