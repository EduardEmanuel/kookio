import { defineEventHandler, send, setResponseStatus } from 'h3';

const STATIC_ASSET_PREFIXES = [
  '/icons/',
  '/assets/',
  '/fonts/',
  '/_analog/',
  '/__analog/',
];

const STATIC_ASSET_EXACT = new Set([
  '/favicon.ico',
  '/manifest.webmanifest',
  '/robots.txt',
  '/sitemap.xml',
  '/sw.js',
]);

const BOT_SCAN_PATTERNS = [
  /\.php$/i,
  /\.aspx?$/i,
  /\.jsp$/i,
  /^\/wp-(?:admin|login|includes|content)/,
  /^\/wordpress/,
  /^\/xmlrpc\.php/,
  /^\/\.env(?:$|\/|\.|_)/,
  /^\/\.git(?:$|\/)/,
  /^\/\.well-known\/vercel\//,
];

export default defineEventHandler(async (event) => {
  const path = event.path.split('?')[0];

  if (
    STATIC_ASSET_EXACT.has(path) ||
    STATIC_ASSET_PREFIXES.some((prefix) => path.startsWith(prefix))
  ) {
    return;
  }

  if (BOT_SCAN_PATTERNS.some((pattern) => pattern.test(path))) {
    setResponseStatus(event, 404);
    await send(event, '');
  }
});
