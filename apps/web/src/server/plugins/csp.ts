import { randomBytes } from 'node:crypto';

import { setResponseHeader } from 'h3';
import { defineNitroPlugin } from 'nitropack/runtime';

/**
 * Nonce-based Content-Security-Policy for server-rendered HTML.
 *
 * The static CSP that used to live in vercel.json carried `script-src 'self'`,
 * which blocked every inline script the app emits — the anti-FOUC theme script
 * and the service-worker registration in index.html, plus the inline scripts
 * Angular generates for `withEventReplay()` hydration (`ng-event-dispatch-contract`
 * and the per-page `__jsaction_bootstrap(...)` call). The jsaction call encodes
 * the page's event list, so its hash changes per page and a static hash
 * allowlist can't cover it — a per-request nonce is the only clean fix.
 *
 * This runs in Nitro's `beforeResponse` hook (h3 emits it for every response,
 * regardless of how Analog's render handler is wired), mints a fresh nonce per
 * request, stamps it on every inline <script> (those without a `src`) in the
 * SSR HTML, and sets the CSP header carrying that nonce.
 *
 * The CSP MUST be emitted here, not in vercel.json: two CSP headers combine by
 * intersection, so a static `script-src 'self'` at the edge would override the
 * nonce. Keep vercel.json free of a Content-Security-Policy. All routes are SSR
 * (no prerendered/SSG routes) so every HTML response passes through here; a
 * prerendered static file would bypass Nitro and miss the per-request nonce.
 */
const buildCsp = (nonce: string): string =>
  [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https:",
    "frame-src 'self' https://*.firebaseapp.com",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "frame-ancestors 'self'",
  ].join('; ');

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('beforeResponse', (event, response) => {
    const body = (response as { body?: unknown }).body;

    // Only touch full HTML documents; skip API/JSON/asset responses.
    if (
      typeof body !== 'string' ||
      (!body.includes('<!DOCTYPE html') && !body.includes('<html'))
    ) {
      return;
    }

    const nonce = randomBytes(16).toString('base64');

    // Stamp nonce on inline <script> only (those without a src attribute);
    // external scripts (src=) and JSON data blocks are left untouched.
    (response as { body: string }).body = body.replace(
      /<script(?![^>]*\bsrc=)([^>]*)>/g,
      `<script nonce="${nonce}"$1>`,
    );

    setResponseHeader(event, 'Content-Security-Policy', buildCsp(nonce));
  });
});
