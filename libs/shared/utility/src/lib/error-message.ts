/**
 * Extract a human-readable message from an unknown thrown value, falling back to
 * `fallback` when the value carries no usable `message` string. Centralises the
 * `err`-narrowing that every feature store's `catchError` block repeats.
 */
export const messageFromError = (err: unknown, fallback: string): string => {
  if (typeof err === 'object' && err !== null && 'message' in err) {
    const msg = (err as { message?: unknown }).message;
    return typeof msg === 'string' && msg.length > 0 ? msg : fallback;
  }
  return fallback;
};
