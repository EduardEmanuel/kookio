// Avoid Nx/TS path aliases in raw Node ESM scripts.
// Keep a tiny local logger instead of importing @kookio/logger.
export const logger = {
  error: (...args) => console.error(...args),
  warn: (...args) => console.warn(...args),
  info: (...args) => console.log(...args),
  debug: (...args) => console.debug(...args),
};
