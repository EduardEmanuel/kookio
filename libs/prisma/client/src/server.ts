/**
 * Server-only public surface of `@kookio/prisma-client`.
 *
 * Re-exports the Prisma client instance and its retry / pagination helpers.
 * Importing this module evaluates `Prisma.defineExtension`, which throws in
 * a browser environment — front-end code must stay on the root barrel
 * (types + zod schemas only).
 *
 * Consumed by:
 *   - server-side libs (`libs/server/...`)
 *   - app server routes (`apps/web/src/server/...`)
 *   - seed / maintenance scripts (`scripts/seeds/...`)
 *   - E2E fixtures and helpers that need direct DB access
 */
export * from './lib/prisma-client';
