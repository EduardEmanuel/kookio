# Redis & Pino Guidelines

> **Status: Active.** Pino logger lives at `libs/server/logger/`. Redis code lives at [apps/web/src/server/infra/redis.ts](../apps/web/src/server/infra/redis.ts) and [apps/web/src/server/infra/rate-limit.ts](../apps/web/src/server/infra/rate-limit.ts) — a single-file pair inside the app, **not** the multi-module `libs/server/src/redis/{client,cache,session,rate-limit,queue}.ts` split that the chapter below sketches. The chapter is preserved as a reference for the modules that don't exist yet, but the layout is intentional.
>
> **What exists:** `getRedis` (lazy-connect singleton with 60 s cooldown circuit breaker, 12-retry reconnect cap, and deduped error log), `redisKey` (prefix builder), `ipHash`, low-level `getString` / `setString` / `getJSON` / `setJSON` with mandatory TTL, `increaseWithTimeToLive` (atomic INCR + EXPIRE), and `rateLimitFixedWindow` + `h3ApplyRateLimit` adapter. The `groceriesBought` store on the tRPC context (Redis-backed in production, in-memory fallback for tests) holds the per-user "bought" markers for the derived `/groceries` list. Rate limiting uses **fixed window** (`INCR` + `EXPIRE`), not the sliding-window-with-sorted-sets pattern shown below — this is a deliberate choice for public endpoints and is fine at current volume.
>
> **What does not exist, and why:**
>
> - **`cache.ts` (cache-aside helpers like `cacheGetOrSet`).** The primitives `getJSON` / `setJSON` already cover storing values with a TTL; no query has been profiled as slow enough to justify a formal cache-aside layer. Add it the first time a real read hot-spot is identified, not speculatively.
> - **`session.ts` (Redis-backed sessions).** Auth is Firebase. ID tokens are self-contained JWTs verified per request in the tRPC context via `firebase-admin`; there is no server-side session state to store. Add a session module only if the project moves to opaque server-issued session tokens, immediate revocation deny-lists, or per-session preferences.
> - **`queue.ts` (pub-sub).** No tRPC subscription, WebSocket, or SSE handler exists in the codebase. Pub-sub becomes mandatory the moment a real-time feature ships on Vercel — events generated on one serverless instance must reach clients connected to other instances. The first such feature (e.g. live "ingredient expiring" alerts) is the trigger to add `queue.ts`, not before.
> - **Keepalive cron** (weekly `redis.ping()` to prevent the free-tier deletion cycle described under "Provisioning, deletion policy & recovery"). Deferred until Redis becomes a hot-path dependency (catalog cache, AI recommendations) — until then, accept the manual recovery cycle.
>
> Treat the cache / session / queue subsections below as **design intent for when one of those triggers fires** — do not preemptively introduce these modules.

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

### Provisioning, deletion policy & recovery

Redis is provisioned through the **Vercel Marketplace Integration**
(Vercel project → Integrations → Redis), **not** by signing up directly
on redis.io. The integration auto-syncs `REDIS_URL` to every environment
selected at install time (dev / preview / prod). Local sync is
`vercel env pull` (or `scripts/with-vercel-env.ts` for multi-env).

**Constraints of the free tier (in use):**

- One free database per Vercel account → all three environments share
  the same instance by design. Acceptable for current scope; revisit
  if user data starts crossing env boundaries.
- 30 MB ceiling. Per-user state must stay small (the groceries-bought
  set is `string[]` of catalog ids — ~5 KB worst case per power user).
- No HA. Picking any HA option on the free tier silently makes the
  plan unavailable, so it stays disabled.
- Region: Frankfurt (`eu-central-1`) to match the CockroachDB region.

**The free tier auto-deletes on inactivity.** Confirmed 2026-05: the
previous instance `kookio-shared-fra1-redis` was deleted after a
warning email on 2026-02-15. The runtime diagnostic at the time was
`getaddrinfo ENOTFOUND redis-…cloud.redislabs.com` — DNS no longer
resolved, distinct from `ECONNREFUSED` which would have indicated only
a transient connection issue. **Plan for the same cycle to recur**
unless the keepalive cron mentioned in the status banner ships.

**Recovery procedure (env-only, no code changes):**

1. Vercel UI → kookio project → Integrations → Redis → install fresh
   free instance (Frankfurt, no HA, all envs ticked).
2. `vercel env pull` locally; restart `nx serve web`.
3. Verify with a Redis-touching flow (e.g. `groceries.list` followed
   by a `groceries.toggleBought` click) — successful logs should be
   silent; the cooldown error string is the canary that something is
   still wrong.

The old uninstalled instance leaves a cosmetic tombstone row in the
Vercel UI with status `Uninstalled`. Vercel does not allow removing
uninstalled product records — by design, ignore.

**Defensive architecture that absorbs Redis outages:**

- **60 s cooldown circuit breaker** in `getRedis()` — after a failed
  connect, subsequent calls throw fast for the cooldown window instead
  of recreating the client and starting a new retry burst on every page
  nav. Without it, every navigation to a Redis-touching route restarted
  the reconnect loop.
- **`RECONNECT_MAX_RETRIES = 12`** cap on node-redis reconnect strategy
  with exponential backoff up to 2 s — gives up cleanly instead of
  looping forever in the background.
- **Deduped `client.on('error', …)`** — single log line per client
  lifetime instead of one per retry. Surfaces the actual diagnostic
  once.
- **Read paths** (`groceries.list`, `groceries.stats`) wrap reads in a
  `safeReadBought` helper that catches and returns the empty set on
  failure. Page renders fine; bought-state appears unchecked.
- **Write paths** (`groceries.toggleBought`) catch the Redis call and
  return `{ persisted: false, isBought: input.intendedState, … }`
  instead of 500. The client keeps the optimistic flip, surfaces a
  one-time snackbar, and treats the toggle as session-local.

**Why the asymmetric write contract** (`intendedState` in input,
`persisted` in output): the server cannot read prior state when Redis
is down, so it cannot synthesise a correct `isBought` in the response
on its own. The client passes its post-optimistic-flip state as
`intendedState`; the server confirms it or — on a real failure that
escapes the Redis catch — surfaces a 500 so the client rolls back.

When adding a new Redis-touching write path, mirror this pattern:
catch the Redis call separately from the rest of the handler, return
a `persisted: false` response on Redis failure, and only 500 for
genuine bugs (Postgres down, derivation crash, etc.).

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

### Sentry bridge — `error` / `fatal` forward to Sentry

`@kookio/server-logger`'s `wrap()` is the **single server-side error
chokepoint**: `logger.error(...)` and `logger.fatal(...)` forward the `err`
field of their first argument to `Sentry.captureException` (with the remaining
log bindings as `extra`) before delegating to Pino. Every `log.error({ err, … },
'…')` across the tRPC routers and `server-auth` therefore reports to Sentry
automatically — the back-end mirror of the client's `reportError` helper
(`@kookio/shared-observability`).

- The capture is a **no-op until Sentry is initialised**, which happens only in
  the Nitro plugin `apps/web/src/server/plugins/sentry.ts` (guarded by the
  server-only `SENTRY_DSN`, the Vercel integration's var — not exposed to the
  browser). Scripts, seeds, and tests that import the logger never init Sentry,
  so they stay silent.
- Keep the `{ err }` convention. The bridge only fires when the first argument
  is an object with an `err` key; a bare `logger.error('msg')` is logged but
  **not** sent to Sentry. Deliberate — only real errors become Sentry events.
- `@sentry/node` is **externalized** in the Nitro build (`vite.config.ts` →
  `nitro.externals.external`) because it pulls a large OpenTelemetry graph; it
  resolves at runtime from the traced `node_modules`, like `firebase`.
- Unhandled server faults (SSR render crashes, uncaught route throws) are
  captured separately by the same plugin's `error` hook, filtered to 5xx so the
  asset-404 middleware doesn't spam Sentry.

### General Pino Rules

- Never use `console.log` on the server — always use `logger`
- Set `LOG_LEVEL=debug` in development, `LOG_LEVEL=info` in production
- In CI, use `LOG_LEVEL=warn` to reduce noise
- Logs are JSON in production — ensure your log aggregator (e.g. Vercel logs,
  Datadog) can parse them
