import { createHash } from 'node:crypto';
import { createClient, RedisClientType } from 'redis';

import { logger } from '@kookio/server-logger';

const APP = 'kookio';
const STAGE = process.env['VERCEL_ENV'] ?? 'development';
const REDIS_PREFIX = process.env['REDIS_PREFIX']?.trim() ?? `${APP}:${STAGE}`;

let client: RedisClientType | null = null;

/**
 * Short, non-reversible IP "fingerprint" for keys.
 * Avoid storing raw IP to keep keys short & less sensitive.
 */
export const ipHash = (ip: string): string =>
  createHash('sha1').update(ip).digest('base64url').slice(0, 10);

/**
 * Build a Redis key from parts. Keeps things readable and avoids accidental
 * whitespace or empty segments. Optional global prefix comes first.
 *
 * Example:
 *   redisKey(RATE_LIMIT, HASH_IP, TIMESTAMP)   => "RATE_LIMIT:HASH_IP:TIMESTAMP"
 *   with REDIS_PREFIX="kookio:development"     => "kookio:development:RATE_LIMIT:HASH_IP:TIMESTAMP"
 */
export const redisKey = (...parts: Array<string | number>): string => {
  const normalized = parts
    .map((p) => String(p).trim())
    .filter((p) => p.length > 0);
  return [REDIS_PREFIX, ...normalized].filter(Boolean).join(':');
};

/**
 * Ensure we have a connected client. Throws fast if REDIS_URL is missing.
 * Use this in server-only code (Nitro/Analog server routes, etc).
 */
export const getRedis = async (): Promise<RedisClientType> => {
  if (client && client.isOpen) return client;

  const url = process.env['REDIS_URL'];

  if (!url) {
    throw new Error(
      'Missing REDIS_URL. Add it to your environment (Vercel Preview/Prod).',
    );
  }

  const newClient = createClient({ url });

  newClient.on('error', (err) => {
    logger.error('❌ [redis] client error:', err?.message ?? err);
  });

  await newClient.connect();
  client = newClient as RedisClientType;
  return client;
};

export const quitRedis = async (): Promise<void> => {
  if (client) {
    try {
      await client.quit();
    } finally {
      client = null;
    }
  }
};

export const setString = async (
  key: string,
  value: string,
  timeToLiveSeconds: number,
): Promise<void> => {
  if (!Number.isFinite(timeToLiveSeconds) || timeToLiveSeconds <= 0) {
    throw new Error(
      `setString("${key}") requires positive "timeToLiveSeconds" (seconds).`,
    );
  }

  const redis = await getRedis();

  if (timeToLiveSeconds > 0) {
    await redis.set(key, value, { EX: Math.ceil(timeToLiveSeconds) });
  }
};

export const getString = async (key: string): Promise<string | null> => {
  const redis = await getRedis();

  return redis.get(key);
};

export const setJSON = async <T>(
  key: string,
  value: T,
  timeToLiveSeconds: number,
): Promise<void> => {
  const payload = JSON.stringify(value);

  await setString(key, payload, timeToLiveSeconds);
};

export const getJSON = async <T = unknown>(key: string): Promise<T | null> => {
  const raw = await getString(key);
  if (raw == null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch (error) {
    logger.error(error, `❌ [redis] JSON parse error for key "${key}":`);
    return null;
  }
};

/**
 * Increments a key in a "fixed window" and ensures it expires.
 * - On the first hit of the window, we set a TTL.
 * - On subsequent hits (while TTL is active), we only increment.
 *
 * Returns the current count after increment.
 *
 * NOTE: TTL semantics:
 *   TTL = -2 → key does not exist
 *   TTL = -1 → key exists but has no expiration
 *   TTL >=  0 → seconds to expire
 */
export const increaseWithTimeToLive = async (
  key: string,
  windowSeconds: number,
): Promise<number> => {
  const redis = await getRedis();

  // A small buffer avoids edge cases where the window ends exactly at request time.
  const timeToLiveWithBuffer = Math.max(1, Math.ceil(windowSeconds + 5));

  // Use MULTI to fetch both INCR and TTL atomically.
  const transaction = redis.multi();
  transaction.incr(key);
  transaction.ttl(key);

  // node-redis types are loose here; narrow to [number, number].
  const [count, ttl] = (await transaction.exec()) as unknown as [
    number,
    number,
  ];

  if (ttl === -1 || ttl === -2) {
    // No TTL set → apply one for the window.
    await redis.expire(key, timeToLiveWithBuffer);
  }

  return count;
};

export const pingRedis = async (): Promise<string> => {
  const redis = await getRedis();
  return redis.ping();
};
