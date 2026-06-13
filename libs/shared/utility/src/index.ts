// `labeling/measure-unit-labels` is intentionally NOT re-exported here. Its
// runtime import of `MeasureUnitSchema` from `@kookio/prisma-client` walks
// the generator's wildcard re-export tree (~2000 files) under Vite SSR dev,
// which is fine for the handful of routes that actually need pantry / recipe
// quantity labels but a real cold-start tax for the rest. Callers reach for
// it via `@kookio/shared-utility/measure-units` so only those routes pay.
// `images` is intentionally NOT re-exported here. Its only consumer is the
// `IMAGE_LOADER` provider in `app.config.ts`, which is on every route's SSR
// critical path; importing it via the barrel would drag the whole barrel's
// graph along. Reach for it via `@kookio/shared-utility/image`.
export * from './lib/labeling/ingredient-labelers';
export * from './lib/labeling/user-labelers';
export * from './lib/material-symbols-icons';
export * from './lib/urls';
