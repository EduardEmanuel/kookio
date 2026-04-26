// Service worker stub — inert, no caching.
// Excludes: /api/*, /_trpc/*, /auth/*
// Replace with a real caching strategy when FEATURE_PWA is enabled.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Never intercept API, tRPC or auth requests
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/_trpc/') ||
    url.pathname.startsWith('/auth/')
  ) {
    return;
  }

  // Pass through — no caching
});
