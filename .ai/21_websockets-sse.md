# WebSockets & Server-Sent Events Guidelines

## When to Use

| Technology             | Use Case                                                                  |
| ---------------------- | ------------------------------------------------------------------------- |
| **WebSockets**         | Bidirectional real-time (chat, collaborative editing, live cursors)       |
| **SSE**                | Unidirectional server→client streams (notifications, live feed, progress) |
| **tRPC Subscriptions** | Type-safe real-time over WebSockets (preferred for app features)          |
| **Polling**            | Low-frequency updates where real-time isn't critical                      |

### Decision Rule

- Need type safety + Angular integration → **tRPC Subscriptions**
- Need raw bidirectional WebSocket (e.g. third-party protocol) → **Nitro WebSocket handler**
- Need server→client stream without full duplex → **SSE**
- Updates every 30s+ and data isn't critical → **polling**

## Setup

### Enable WebSockets in Nitro

```typescript
// vite.config.ts
analog({
  nitro: {
    experimental: {
      websocket: true,
    },
  },
});
```

### Fix HMR Port Conflict

- Remove port from `project.json` / `angular.json` and define in `vite.config.ts`:

```typescript
  server: {
    port: 3000,
    hmr: {
      port: 3002,
      path: 'vite-hmr',
    },
  },
```

## tRPC Subscriptions (Preferred)

- Use tRPC subscriptions for all app-level real-time features —
  type-safe, integrates with Angular via `toSignal()`
- Define subscriptions in the router:

```typescript
// src/server/trpc/routers/notifications.router.ts
import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';

export const notificationsRouter = router({
  onNotification: protectedProcedure.input(z.object({ userId: z.string().uuid() })).subscription(async function* ({ input, ctx }) {
    while (true) {
      const notification = await waitForNotification(input.userId);
      yield notification;
    }
  }),
});
```

- Consume in Angular component:

```typescript
export default class NotificationsPage {
  private readonly trpc = injectTrpcClient();

  readonly notifications = toSignal(this.trpc.notifications.onNotification.subscribe({ userId: this.userId }), { initialValue: [] });
}
```

- Always use `protectedProcedure` for subscriptions — never expose real-time
  streams to unauthenticated users unless explicitly public

## Raw WebSocket Handler (Nitro)

- Use only when tRPC subscriptions are insufficient (e.g. third-party protocols,
  binary data, gaming):

```typescript
// src/server/routes/api/ws/chat.ts
import { defineWebSocketHandler } from 'h3';

export default defineWebSocketHandler({
  open(peer) {
    peer.subscribe('chat');
    peer.publish('chat', {
      user: 'server',
      message: `${peer} joined`,
    });
  },

  message(peer, message) {
    peer.publish('chat', {
      user: peer.toString(),
      message: message.toString(),
    });
  },

  close(peer) {
    peer.unsubscribe('chat');
    peer.publish('chat', {
      user: 'server',
      message: `${peer} left`,
    });
  },

  error(peer, error) {
    logger.error({ err: error, peer: peer.toString() }, 'WebSocket error');
  },
});
```

- WebSocket routes follow the same filesystem convention as API routes:
  `src/server/routes/api/ws/chat.ts` → `ws://kookio.app/api/ws/chat`
- Always handle `error` and `close` events — never leave them unhandled
- Always log WebSocket errors with Pino — never use `console.error`

## Server-Sent Events (SSE)

- Use SSE for server→client streams where full duplex is not needed:

```typescript
// src/server/routes/api/sse/feed.ts
import { defineEventHandler, createEventStream } from 'h3';

export default defineEventHandler(async (event) => {
  const eventStream = createEventStream(event);

  const interval = setInterval(async () => {
    await eventStream.push(
      JSON.stringify({
        type: 'update',
        data: await getLatestFeedItems(),
        timestamp: Date.now(),
      }),
    );
  }, 5000);

  eventStream.onClosed(async () => {
    clearInterval(interval);
    await eventStream.close();
  });

  return eventStream.send();
});
```

- Always clean up intervals and resources in `onClosed` — memory leaks
  in serverless environments are critical
- SSE connections are exposed as regular API routes under `/api/sse/`

### Consuming SSE in Angular

```typescript
export class FeedService {
  readonly #destroyRef = inject(DestroyRef);

  readonly feed = signal<FeedItem[]>([]);

  connect() {
    const source = new EventSource('/api/sse/feed');

    source.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.feed.update((items) => [...items, data]);
    };

    source.onerror = () => {
      logger.warn('SSE connection error — reconnecting');
    };

    // Close on destroy
    this.#destroyRef.onDestroy(() => source.close());
  }
}
```

- Always close `EventSource` on component/service destroy
- Handle `onerror` — browsers auto-reconnect SSE but you should log errors
- Never use SSE for authenticated streams without token validation in the handler

## Redis Pub-Sub Integration

- For multi-instance deployments on Vercel, use Redis pub-sub to broadcast
  events across server instances:

```typescript
  // WebSocket handler with Redis pub-sub
  open(peer) {
    peer.subscribe('notifications');

    // Subscribe to Redis channel
    subscribe<Notification>('kookio:notifications', async (notification) => {
      peer.publish('notifications', JSON.stringify(notification));
    });
  }
```

- This ensures all connected clients receive events regardless of which
  Vercel function instance they're connected to
- Vercel serverless functions have connection limits — monitor active
  WebSocket connections in production

## Vercel Considerations

- Vercel supports WebSockets on Pro/Enterprise plans only
- Serverless function timeout (60s on Pro) applies to WebSocket connections —
  connections are terminated after timeout
- For persistent WebSocket connections, consider Vercel's Edge Runtime or
  a dedicated WebSocket service (e.g. Ably, Pusher, Soketi)
- SSE connections are also subject to the same timeout limits
- Monitor connection count and duration in Vercel Dashboard → Functions

## General Rules

- Never implement real-time features without considering the Vercel timeout limits
- Always prefer tRPC subscriptions over raw WebSocket handlers for app features
- Always clean up subscriptions and connections on component destroy
- Never send sensitive data (tokens, PII) over unencrypted WebSocket connections
- Use Redis pub-sub for broadcasting across multiple server instances
- Test WebSocket behavior locally before deploying — Vercel timeout behavior
  differs from local development
