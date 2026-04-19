# Redis & Pino Guidelines

## Redis

### Provider & Version

- Redis Cloud as managed provider
- `redis` npm package v5 (Node.js client)
- Used for: caching, session management, rate limiting, queue/pub-sub

### File Structure

libs/
└── server/
└── src/
├── redis/
│ ├── client.ts ← Redis singleton
│ ├── cache.ts ← caching helpers
│ ├── session.ts ← session management helpers
│ ├── rate-limit.ts ← rate limiting helpers
│ └── queue.ts ← pub-sub / queue helpers

### Singleton Client

- Always use a singleton Redis client — never instantiate per request:

```typescript
// libs/server/src/redis/client.ts
import { createClient, RedisClientType } from 'redis';

function createRedisClient(): RedisClientType {
  const client = createClient({
    url: process.env['REDIS_URL'],
    socket: {
      reconnectStrategy: (retries) => Math.min(retries * 50, 2000),
    },
  }) as RedisClientType;

  client.on('error', (err) => logger.error({ err }, 'Redis client error'));
  client.on('connect', () => logger.info('Redis connected'));
  client.on('reconnecting', () => logger.warn('Redis reconnecting'));

  return client;
}

const globalForRedis = globalThis as unknown as {
  redis: RedisClientType | undefined;
};

export const redis: RedisClientType = globalForRedis.redis ?? createRedisClient();

if (process.env['NODE_ENV'] !== 'production') {
  globalForRedis.redis = redis;
}

// Connect on startup
if (!redis.isOpen) {
  await redis.connect();
}
```

- Inject `redis` via tRPC context or h3 event context — never import directly in routers

### Key Naming Convention

- Use hierarchical, colon-separated keys:
  <app>:<domain>:<entity>:<id>:<field?>
  Examples:
  kookio:cache:user:abc123
  kookio:session:xyz789
  kookio:rate-limit:ip:192.168.1.1
  kookio:queue:emails:pending
- Always prefix with app name (`kookio:`) to avoid collisions in shared Redis instances
- Define key builder functions — never construct keys inline:

```typescript
export const keys = {
  user: (id: string) => `kookio:cache:user:${id}`,
  session: (id: string) => `kookio:session:${id}`,
  rateLimitIp: (ip: string) => `kookio:rate-limit:ip:${ip}`,
  emailQueue: () => `kookio:queue:emails:pending`,
} as const;
```

### Caching

- Always set TTL on cached values — never cache without expiry:

```typescript
// libs/server/src/redis/cache.ts
import { redis } from './client';

const DEFAULT_TTL_SECONDS = 300; // 5 minutes

export async function cacheGet<T>(key: string): Promise<T | null> {
  const value = await redis.get(key);
  return value ? JSON.parse(value) : null;
}

export async function cacheSet<T>(key: string, value: T, ttlSeconds = DEFAULT_TTL_SECONDS): Promise<void> {
  await redis.set(key, JSON.stringify(value), { EX: ttlSeconds });
}

export async function cacheDelete(key: string): Promise<void> {
  await redis.del(key);
}

export async function cacheGetOrSet<T>(key: string, fetcher: () => Promise<T>, ttlSeconds = DEFAULT_TTL_SECONDS): Promise<T> {
  const cached = await cacheGet<T>(key);
  if (cached !== null) return cached;

  const value = await fetcher();
  await cacheSet(key, value, ttlSeconds);
  return value;
}
```

- Use `cacheGetOrSet()` as the primary caching pattern — avoids cache stampedes
- Invalidate cache explicitly on mutations — never rely on TTL alone for consistency:

```typescript
// After updating a user
await prisma.user.update({ where: { id }, data: input });
await cacheDelete(keys.user(id));
```

### Session Management

- Store sessions as JSON with explicit TTL:

```typescript
// libs/server/src/redis/session.ts
import { redis } from './client';
import { keys } from './keys';

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

export async function setSession<T>(id: string, data: T): Promise<void> {
  await redis.set(keys.session(id), JSON.stringify(data), {
    EX: SESSION_TTL_SECONDS,
  });
}

export async function getSession<T>(id: string): Promise<T | null> {
  const value = await redis.get(keys.session(id));
  return value ? JSON.parse(value) : null;
}

export async function deleteSession(id: string): Promise<void> {
  await redis.del(keys.session(id));
}

export async function refreshSession(id: string): Promise<void> {
  await redis.expire(keys.session(id), SESSION_TTL_SECONDS);
}
```

### Rate Limiting

- Use sliding window rate limiting with Redis atomic operations:

```typescript
// libs/server/src/redis/rate-limit.ts
import { redis } from './client';
import { keys } from './keys';

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export async function checkRateLimit(identifier: string, limit: number, windowSeconds: number): Promise<RateLimitResult> {
  const key = keys.rateLimitIp(identifier);
  const now = Date.now();
  const windowStart = now - windowSeconds * 1000;

  // Sliding window using sorted sets
  await redis.zRemRangeByScore(key, 0, windowStart);
  const count = await redis.zCard(key);

  if (count >= limit) {
    const oldest = await redis.zRange(key, 0, 0, { REV: false });
    const resetAt = oldest[0] ? Number(oldest[0]) + windowSeconds * 1000 : now + windowSeconds * 1000;

    return { allowed: false, remaining: 0, resetAt };
  }

  await redis.zAdd(key, { score: now, value: `${now}` });
  await redis.expire(key, windowSeconds);

  return {
    allowed: true,
    remaining: limit - count - 1,
    resetAt: now + windowSeconds * 1000,
  };
}
```

- Apply rate limiting in h3 middleware or tRPC middleware — not per-procedure
- Return `429 Too Many Requests` with `Retry-After` header when limit is exceeded

### Pub-Sub / Queue

- Use Redis pub-sub for real-time events between server instances:

```typescript
// libs/server/src/redis/queue.ts
import { redis } from './client';

export async function publish<T>(channel: string, message: T): Promise<void> {
  await redis.publish(channel, JSON.stringify(message));
}

export async function subscribe<T>(channel: string, handler: (message: T) => Promise<void>): Promise<void> {
  // Subscriber needs a dedicated connection
  const subscriber = redis.duplicate();
  await subscriber.connect();

  await subscriber.subscribe(channel, async (raw) => {
    const message = JSON.parse(raw) as T;
    await handler(message);
  });
}
```

- Always use a **duplicate client** for subscriptions — a subscribed client
  cannot issue other commands
- For persistent queues, prefer Redis Streams (`XADD`/`XREAD`) over pub-sub

### General Redis Rules

- Always handle Redis errors gracefully — never let Redis failure crash the server
- Wrap Redis operations in try/catch and fall back to the source of truth (Prisma) on failure
- Never store sensitive data (passwords, tokens) in Redis without encryption
- Monitor key expiry — use `OBJECT ENCODING` and `DEBUG SLEEP` in staging to verify TTLs
- Never use `KEYS *` in production — use `SCAN` for key iteration

---

## Pino

### Setup & Configuration

- Pino is used exclusively server-side (Nitro/h3)
- Use `pino-pretty` for development, raw JSON in production:

```typescript
// libs/server/src/logger.ts
import pino, { Logger } from 'pino';

export const logger: Logger = pino({
  level: process.env['LOG_LEVEL'] ?? 'info',
  ...(process.env['NODE_ENV'] !== 'production' && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    },
  }),
});
```

- Export a single `logger` instance — never instantiate `pino()` directly elsewhere

### Log Levels

| Level   | When to use                                               |
| ------- | --------------------------------------------------------- |
| `trace` | Very detailed debugging — disabled in production          |
| `debug` | Debugging info useful during development                  |
| `info`  | Normal operational events (server start, request handled) |
| `warn`  | Unexpected but recoverable situations                     |
| `error` | Errors that need attention — always include `err` object  |
| `fatal` | Unrecoverable errors — always followed by process exit    |

### Structured Logging

- Always log structured objects — never interpolate strings:

```typescript
// ✅ correct — structured, queryable
logger.info({ userId: ctx.user.uid, action: 'create_post' }, 'Post created');
logger.error({ err, userId: ctx.user.uid }, 'Failed to create post');

// ❌ avoid — unstructured, hard to query
logger.info(`Post created by user ${ctx.user.uid}`);
logger.error(`Failed to create post: ${err.message}`);
```

- Always pass `err` as a field named `err` — Pino serializes it automatically:

```typescript
try {
  await riskyOperation();
} catch (err) {
  logger.error({ err }, 'Operation failed');
  throw err;
}
```

### Child Loggers

- Use child loggers to bind request context — never pass context manually to every log call:

```typescript
// In h3 middleware or tRPC context
export async function createContext(event: H3Event) {
  const requestLogger = logger.child({
    requestId: crypto.randomUUID(),
    method: event.method,
    path: event.path,
  });

  return { event, logger: requestLogger };
}
```

- Use `ctx.logger` throughout tRPC procedures — not the global `logger` instance

### What to Log

- ✅ Request start/end with duration
- ✅ Auth events (login, logout, token refresh)
- ✅ External API calls with duration and status
- ✅ Cache hits/misses
- ✅ Background job start/end/failure
- ✅ All errors with full context

### What NOT to Log

- ❌ Passwords, tokens, secrets, API keys
- ❌ Full request/response bodies (may contain PII)
- ❌ Firebase ID tokens
- ❌ Credit card or payment information
- ❌ Personal data beyond what's needed for debugging (email, name)

### General Pino Rules

- Never use `console.log` on the server — always use `logger`
- Set `LOG_LEVEL=debug` in development, `LOG_LEVEL=info` in production
- In CI, use `LOG_LEVEL=warn` to reduce noise
- Logs are JSON in production — ensure your log aggregator (e.g. Vercel logs,
  Datadog) can parse them
