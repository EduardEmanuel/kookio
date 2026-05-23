// Service worker stub — inert, no caching.
// Excludes: /api/*, /auth/*
// Replace with a real caching strategy when FEATURE_PWA is enabled.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Never intercept API or auth requests. (/_trpc/* used to be listed
  // here but it is not a real path on this app — tRPC is served under
  // /api/trpc/* which is already covered by the /api/ prefix above.)
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/auth/')) {
    return;
  }

  // Pass through — no caching
});
