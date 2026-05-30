import { defineConfig } from 'prisma/config';

// Prisma 7 moves connection URLs out of schema.prisma and into this config
// file. The real URL is injected into process.env by `npm run with:env`
// (Vercel env pull) before any `nx migrate-*` / `seed` target runs.
//
// We intentionally do NOT use the `env('DATABASE_URL')` helper: Prisma 7
// resolves this config eagerly on *every* command, and that helper throws
// when the variable is absent. `generate` (and the build/test targets that
// depend on it) must run without DB credentials — as they did when the URL
// lived in the schema's lazily-resolved `env()`. The placeholder below lets
// the config load offline; `generate` never connects, and `with:env`
// supplies the real value whenever a command actually touches the database.
//
// Note: Prisma 7 dropped `directUrl` from the datasource config — migrations
// now run over `url` through the driver adapter, so DIRECT_DATABASE_URL is no
// longer consumed here.
export default defineConfig({
  schema: 'libs/prisma/client/schema.prisma',
  migrations: {
    path: 'libs/prisma/client/migrations',
  },
  datasource: {
    url:
      process.env['DATABASE_URL'] ??
      'postgresql://placeholder:placeholder@localhost:26257/kookio',
  },
});
