import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  getExpirationLabel,
  getExpirationStatus,
  isPastExpiry,
} from './expiration';

const NOW = new Date('2026-05-03T12:00:00.000Z');
const HOUR = 1000 * 60 * 60;
const DAY = HOUR * 24;

const offset = (ms: number) => new Date(NOW.getTime() + ms);

describe('expiration helpers', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('getExpirationStatus', () => {
    it('returns "none" when expiresAt is null', () => {
      expect(getExpirationStatus(null)).toBe('none');
    });

    it('returns "none" when given an invalid date string', () => {
      expect(getExpirationStatus('not-a-date')).toBe('none');
    });

    it('returns "expired" for past dates', () => {
      expect(getExpirationStatus(offset(-DAY))).toBe('expired');
      expect(getExpirationStatus(offset(-30 * DAY))).toBe('expired');
    });

    it('returns "expired" within the next 24h', () => {
      expect(getExpirationStatus(offset(HOUR))).toBe('expired');
      expect(getExpirationStatus(offset(23 * HOUR))).toBe('expired');
    });

    it('returns "soon" between 1 and 7 days from now', () => {
      expect(getExpirationStatus(offset(DAY))).toBe('soon');
      expect(getExpirationStatus(offset(3 * DAY))).toBe('soon');
      expect(getExpirationStatus(offset(6 * DAY))).toBe('soon');
    });

    it('returns "ok" at exactly 7 days and beyond', () => {
      expect(getExpirationStatus(offset(7 * DAY))).toBe('ok');
      expect(getExpirationStatus(offset(30 * DAY))).toBe('ok');
    });

    it('accepts ISO date strings', () => {
      expect(getExpirationStatus(offset(3 * DAY).toISOString())).toBe('soon');
    });
  });

  describe('isPastExpiry', () => {
    it('is false for null', () => {
      expect(isPastExpiry(null)).toBe(false);
    });

    it('is false for future dates, even within 24h', () => {
      expect(isPastExpiry(offset(HOUR))).toBe(false);
      expect(isPastExpiry(offset(7 * DAY))).toBe(false);
    });

    it('is true for any past date', () => {
      expect(isPastExpiry(offset(-1))).toBe(true);
      expect(isPastExpiry(offset(-30 * DAY))).toBe(true);
    });

    it('is false at "now"', () => {
      expect(isPastExpiry(NOW)).toBe(false);
    });
  });

  describe('getExpirationLabel', () => {
    it('returns empty string for null', () => {
      expect(getExpirationLabel(null)).toBe('');
    });

    it('formats past dates beyond 24h with day count', () => {
      expect(getExpirationLabel(offset(-DAY))).toBe('Expired 1d ago');
      expect(getExpirationLabel(offset(-2 * DAY))).toBe('Expired 2d ago');
      expect(getExpirationLabel(offset(-30 * DAY))).toBe('Expired 30d ago');
    });

    it('returns "Expired today" within the last 24h', () => {
      expect(getExpirationLabel(offset(-HOUR))).toBe('Expired today');
      expect(getExpirationLabel(offset(-23 * HOUR))).toBe('Expired today');
    });

    it('returns "Expires today" within the next 24h', () => {
      expect(getExpirationLabel(NOW)).toBe('Expires today');
      expect(getExpirationLabel(offset(23 * HOUR))).toBe('Expires today');
    });

    it('returns "Expires tomorrow" between 24h and 48h', () => {
      expect(getExpirationLabel(offset(DAY))).toBe('Expires tomorrow');
      expect(getExpirationLabel(offset(47 * HOUR))).toBe('Expires tomorrow');
    });

    it('returns "Expires in Xd" beyond 48h', () => {
      expect(getExpirationLabel(offset(2 * DAY))).toBe('Expires in 2d');
      expect(getExpirationLabel(offset(7 * DAY))).toBe('Expires in 7d');
      expect(getExpirationLabel(offset(30 * DAY))).toBe('Expires in 30d');
    });
  });
});
