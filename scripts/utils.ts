export const logger = {
  error: (...args: unknown[]) => console.error(...args),
  warn: (...args: unknown[]) => console.warn(...args),
  info: (...args: unknown[]) => console.log(...args),
  debug: (...args: unknown[]) => console.debug(...args),
};
