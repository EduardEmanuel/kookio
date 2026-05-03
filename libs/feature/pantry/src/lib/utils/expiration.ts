export type ExpirationStatus = 'expired' | 'soon' | 'ok' | 'none';

const DAY_MS = 1000 * 60 * 60 * 24;

const toDate = (value: Date | string | null): Date | null => {
  if (value === null) return null;
  const date = typeof value === 'string' ? new Date(value) : value;
  return Number.isNaN(date.getTime()) ? null : date;
};

const daysFromNow = (value: Date | string | null): number | null => {
  const date = toDate(value);
  return date ? (date.getTime() - Date.now()) / DAY_MS : null;
};

/**
 * Visual urgency tier for a pantry item's expiry date.
 *
 * - `expired` — already past or within the next 24h (renders red)
 * - `soon` — within 1–7 days (renders orange)
 * - `ok` — more than 7 days away (renders green)
 * - `none` — no expiry set (renders neutral)
 *
 * The `<24h` threshold maps onto `expired` deliberately: items that lapse
 * the same day deserve the same urgency cue as already-lapsed ones.
 */
export const getExpirationStatus = (
  expiresAt: Date | string | null,
): ExpirationStatus => {
  const days = daysFromNow(expiresAt);
  if (days === null) return 'none';
  if (days < 1) return 'expired';
  if (days < 7) return 'soon';
  return 'ok';
};

/**
 * `true` only when the expiry date is strictly in the past. Used to bucket
 * items into the "Expired" section, which is narrower than the visual
 * `expired` tier above (the latter also covers items that lapse today).
 */
export const isPastExpiry = (expiresAt: Date | string | null): boolean => {
  const days = daysFromNow(expiresAt);
  return days !== null && days < 0;
};

/** Human-readable countdown label, e.g. "Expires in 3d", "Expired 2d ago". */
export const getExpirationLabel = (expiresAt: Date | string | null): string => {
  const days = daysFromNow(expiresAt);
  if (days === null) return '';
  if (days <= -1) return `Expired ${Math.floor(Math.abs(days))}d ago`;
  if (days < 0) return 'Expired today';
  if (days < 1) return 'Expires today';
  if (days < 2) return 'Expires tomorrow';
  return `Expires in ${Math.floor(days)}d`;
};
