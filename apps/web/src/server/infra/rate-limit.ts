/* eslint-disable @typescript-eslint/no-explicit-any */

import { getHeader, setHeader, createError, type H3Event } from 'h3';
import { getRedis, redisKey, increaseWithTimeToLive } from './redis';

export type RateLimitResult = {
  allowed: boolean;
  count: number;
  remaining: number;
  resetAtMs: number;
  windowSeconds: number;
  key: string;
  identifier: string;
};

/**
 * Extract client IP:
 * - prefers first value from X-Forwarded-For
 * - falls back to socket remoteAddress
 */
export const getClientIp = (event: any): string => {
  const xfwd = getHeader(event, 'x-forwarded-for');
  const fromHeader = xfwd?.split(',')[0]?.trim();
  return fromHeader || event?.node?.req?.socket?.remoteAddress || 'unknown';
};

/**
 * Core fixed-window rate-limit check (no framework side-effects).
 * Increments the counter and returns metadata (allowed/remaining/resetAt).
 */
export const rateLimitFixedWindow = async (
  bucketId: string,
  identifier: string,
  maxPerWindow: number,
  windowSeconds: number,
): Promise<RateLimitResult> => {
  const key = redisKey('rl', bucketId, identifier);
  const count = await increaseWithTimeToLive(key, windowSeconds);
  const redis = await getRedis();
  const ttlSeconds = await redis.ttl(key);
  const secondsLeft = ttlSeconds > 0 ? ttlSeconds : windowSeconds;
  const resetAtMs = Date.now() + secondsLeft * 1000;

  return {
    allowed: count <= maxPerWindow,
    count,
    remaining: Math.max(0, maxPerWindow - count),
    resetAtMs,
    windowSeconds,
    key,
    identifier,
  };
};

/**
 * h3 adapter: applies headers and throws 429 when blocked.
 * By default enforces only when VERCEL_ENV === 'production'.
 */
export const h3ApplyRateLimit = async (
  event: H3Event,
  options: {
    bucket: string;
    max: number;
    windowSeconds: number;
    identifier?: string;
    onlyInProd?: boolean;
  },
): Promise<RateLimitResult> => {
  const {
    bucket,
    max,
    windowSeconds,
    identifier = getClientIp(event),
    onlyInProd = true,
  } = options;

  const isProd = process.env['VERCEL_ENV'] === 'production';

  if (onlyInProd && !isProd) {
    const fakeResetAt = Date.now() + windowSeconds * 1000;
    setHeader(event, 'X-RateLimit-Limit', String(max));
    setHeader(event, 'X-RateLimit-Remaining', String(max));
    setHeader(
      event,
      'X-RateLimit-Reset',
      String(Math.floor(fakeResetAt / 1000)),
    );
    return {
      allowed: true,
      count: 0,
      remaining: max,
      resetAtMs: fakeResetAt,
      windowSeconds,
      key: redisKey('rl', bucket, identifier),
      identifier,
    };
  }

  const result = await rateLimitFixedWindow(
    bucket,
    identifier,
    max,
    windowSeconds,
  );

  setHeader(event, 'X-RateLimit-Limit', String(max));
  setHeader(event, 'X-RateLimit-Remaining', String(result.remaining));
  setHeader(
    event,
    'X-RateLimit-Reset',
    String(Math.floor(result.resetAtMs / 1000)),
  );

  if (!result.allowed) {
    const retryAfter = Math.max(
      1,
      Math.ceil((result.resetAtMs - Date.now()) / 1000),
    );

    setHeader(event, 'Retry-After', retryAfter);
    throw createError({ statusCode: 429, statusMessage: 'Too Many Requests' });
  }
  return result;
};
