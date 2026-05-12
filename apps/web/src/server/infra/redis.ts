import { createHash } from 'node:crypto';
import { createClient, RedisClientType } from 'redis';

import { logger } from '@kookio/server-logger';

const APP = 'kookio';
const STAGE = process.env['VERCEL_ENV'] ?? 'development';
const REDIS_PREFIX = process.env['REDIS_PREFIX']?.trim() ?? `${APP}:${STAGE}`;

let client: RedisClientType | null = null;

// Cooldown after a connect failure: prevents the next call from immediately
// kicking off another retry burst. Long enough that a dev nav between pages
// doesn't restart the loop; short enough that prod recovery picks up Redis
// coming back without a server restart.
const CONNECT_FAILURE_COOLDOWN_MS = 60_000;
// Max retries node-redis attempts before `reconnectStrategy` returns false
// and the client gives up. Tuned for dev-without-Redis: enough to ride out
// a brief network blip in prod, capped so a permanently broken URL stops
// after ~30s of backoff (200 → 400 → … → 2000 ms, mostly at 2000 ms).
const RECONNECT_MAX_RETRIES = 12;
let lastConnectFailureAt: number | null = null;

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

  if (
    lastConnectFailureAt !== null &&
    Date.now() - lastConnectFailureAt < CONNECT_FAILURE_COOLDOWN_MS
  ) {
    // Don't kick off another retry burst inside the cooldown window —
    // surfaces fast as a clean error to callers (which our routers wrap in
    // try/catch and degrade gracefully) instead of every page nav restarting
    // the same 12-retry loop.
    throw new Error('Redis is temporarily unavailable (cooldown)');
  }

  const url = process.env['REDIS_URL'];

  if (!url) {
    throw new Error(
      'Missing REDIS_URL. Add it to your environment (Vercel Preview/Prod).',
    );
  }

  const newClient = createClient({
    url,
    socket: {
      // Cap reconnects so a permanently broken Redis (dev without VPN to
      // Redis Cloud, etc.) doesn't loop forever in the background. node-redis
      // calls this with `retries` starting at 0; returning `false` signals
      // "give up, transition to closed".
      reconnectStrategy: (retries: number) => {
        if (retries >= RECONNECT_MAX_RETRIES) return false;
        return Math.min(retries * 200, 2000);
      },
    },
  });

  // Dedupe the error event to a single line per client lifetime — without
  // this, every reconnect attempt fires a separate log entry and floods the
  // dev console even with the cap above. The first error carries the actual
  // diagnostic; subsequent ones are almost always the same root cause.
  let errorLogged = false;
  newClient.on('error', (err) => {
    if (errorLogged) return;
    errorLogged = true;
    // Pino's signature is `error(obj, msg)` — the previous form passed the
    // err as a positional arg and Pino dropped it on the floor, leaving
    // every retry as an empty `client error:` line in the logs.
    logger.error(
      { err },
      '❌ [redis] client error (further retries suppressed)',
    );
  });

  try {
    await newClient.connect();
    client = newClient as RedisClientType;
    lastConnectFailureAt = null;
    return client;
  } catch (err) {
    lastConnectFailureAt = Date.now();
    throw err;
  }
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
