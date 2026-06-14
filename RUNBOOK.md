# Runbook

Quick reference for diagnosing and resolving common incidents in the Kookio
production stack. Keep this short and practical — link out for depth.

**On-call checklist** before starting:

- [ ] Open the Discord `#kookio-alerts` channel
- [ ] Open Vercel Dashboard → kookio project
- [ ] Open CockroachDB Cloud Console → kookio cluster
- [ ] Open the failing GitHub Actions run (link from Discord/email alert)

Related references:

- [`libs/prisma-client/README.md`](libs/prisma-client/README.md) — database
  architecture, migration flow, schema change patterns
- [`.ai/12_prisma-zod.md`](.ai/12_prisma-zod.md) — Prisma + CockroachDB gotchas
- [ER diagram (interactive)](https://dbdocs.io/dinea.eduard/kookio-db?schema=public&view=relationships)
  — password protected, ask maintainer

---

## 1. Application returns "too many connections" errors

### Symptoms

- 500 responses with `Error: too many connections for role "kookio_app"`
- Pino error logs spike in Vercel Functions dashboard
- User reports "app is slow" or "app is down"

### Diagnosis

1. In CockroachDB Console → kookio → **SQL Users** → view active connections per role
2. If `kookio_app` is near the user connection limit, it's this scenario
3. Cross-check Vercel Functions → `kookio` project → concurrent invocation count

### Resolution

- **Short-term**: in Vercel, reduce concurrency by lowering max duration on
  the most-used function, or temporarily disable the feature driving load
- **Verify `DATABASE_URL`** points to the CockroachDB Serverless endpoint (has
  built-in pooling), NOT a direct SQL endpoint. Serverless URLs look like
  `postgresql://...@[cluster-id].cockroachlabs.cloud:26257/...`
- Redeploy the current Production to reset function instances:
  Vercel Dashboard → Deployments → latest Production → **Redeploy**

### Prevention

- Add Redis caching for hot reads (`IngredientCatalog`, `MealCategory`,
  `MealArea`) — see `.ai/15_redis-pino.md` → `cacheGetOrSet()`
- Consider enabling Prisma Accelerate if Cockroach budget consistently > 70%
  for three consecutive months (see scenario 5)
- Monitor connection count in CockroachDB Console weekly

---

## 2. GitHub Action `migrate-prod` failed

### Symptoms

- Discord `🚨 Production migration FAILED` message with @mention
- Email from `action-send-mail` with subject `❌ CI/CD issue`
- GitHub Actions run shows `migrate-prod` job in failed state

### Diagnosis

1. Open the Actions run linked in the Discord message
2. Expand the `Prisma migrate` step — look for the Prisma error code
3. Common culprits:
   - `P3018` + `2BP01` — spurious `DROP TYPE "public"."crdb_internal_region";`
     (see `.ai/12_prisma-zod.md`)
   - `P1001` — connection refused; Cockroach cluster paused or credentials wrong
   - `P3009` — previous migration is in "failed" state

### Resolution

**For P3018 / `2BP01`** (enum-related spurious DROP):

```bash
# Mark the failed migration as rolled back
npx prisma migrate resolve --rolled-back <migration_name> \
  --schema=libs/prisma-client/schema.prisma

# Drop any partially-created enum (confirm name from error log)
npx prisma db execute --stdin --schema=libs/prisma-client/schema.prisma <<SQL
DROP TYPE IF EXISTS "YourEnum";
SQL

# Delete local migration dir, regenerate without the bad DROP, redeploy
rm -rf libs/prisma-client/migrations/<migration_name>
npm run migrate-dev-create-only:prisma-client
# Manually remove the `DROP TYPE "public"."crdb_internal_region";` line
npm run migrate-deploy:prisma-client
```

**For P1001**: verify `KOOKIO_MIGRATE_CONNECTION` in GitHub environment
`production` is current. Check Cockroach cluster state — Basic plan clusters
auto-scale to zero; first request may cold-start.

**For P3009**: inspect `_prisma_migrations` table:

```bash
npx prisma db execute --stdin --schema=libs/prisma-client/schema.prisma <<SQL
SELECT migration_name, finished_at, rolled_back_at, applied_steps_count, logs
FROM _prisma_migrations
ORDER BY started_at DESC
LIMIT 5;
SQL
```

Use `prisma migrate resolve --applied <name>` or `--rolled-back <name>`
based on what actually happened in the DB.

### Prevention

- **Always** run `npm run migrate-dev-create-only:prisma-client` first, review
  the SQL, and remove spurious lines
- Test migrations on `kookio_dev` → `kookio_test` before merging to `main`
- Require manual approval on `production` GitHub environment (already configured)

---

## 3. CockroachDB Serverless cluster reached 80% of monthly budget

### Symptoms

- Email from CockroachDB "You've used 75% of your resource limit" (sent at 50%,
  75%, 100%)
- Dashboard shows Request Units (RUs) or Storage approaching the configured
  monthly limit

### Diagnosis

1. CockroachDB Console → kookio cluster → **Overview**
2. Check "Request units used" and "Storage used" against the limit
3. Cluster is on the **Basic** plan (pay-as-you-go) — first $15/month is free
   (~50M RU + 10 GiB storage); beyond that, cluster enters throttled state
   with free baseline performance, but does NOT stop

### Resolution

**Short-term — identify heavy queries**:

1. CockroachDB Console → **SQL Activity** → sort by "Total time"
2. Cross-reference top queries with the app code
3. Apply caching for repeated reads — `cacheGetOrSet()` in `.ai/15_redis-pino.md`

**Medium-term — raise budget**:

- CockroachDB Console → **Billing** → edit monthly resource limit
- Budget scales smoothly — no hard break, just higher billing if exceeded

**Long-term — optimize**:

- Add missing `@@index` on frequently-filtered columns (check slow query log)
- Move static content routes from SSR to SSG in `app.routes.server.ts`
  (see `.ai/17_analog-ssr-ssg.md`)
- See scenario 5 below for the full optimization path

### Prevention

- Review Cockroach Console **Metrics** tab weekly
- Set a Discord alert at 60% budget consumption (proactive, not just 75% email)
- Keep Redis cache TTLs aggressive for immutable reference data
  (`IngredientCatalog`, `MealCategory`, `MealArea`)

---

## 4. Discord notification was not received for a production failure

### Symptoms

- A GitHub Actions job failed on `main` but no Discord message appeared in
  `#kookio-alerts`
- Email alert arrived but Discord did not

### Diagnosis

1. Open the failed Actions run
2. Expand the `Notify Discord on failure` step
3. Check the HTTP response code in the step log:
   - `✅ Discord notification sent (HTTP 2xx)` — Discord accepted it, check
     channel permissions
   - `⚠️ Discord notification failed (HTTP 4xx)` — webhook URL wrong / expired
   - Step was skipped — conditional `if:` did not match (check `needs.*.result`)

### Resolution

**If webhook is broken**:

```bash
# Test the webhook manually — replace <DISCORD_WEBHOOK> with the secret value
# (pulled from GitHub repo secrets, NEVER paste it into code)
curl -X POST "<DISCORD_WEBHOOK>" \
  -H "Content-Type: application/json" \
  -d '{"content": "Test from terminal"}'
```

- `HTTP 204` = webhook works, check GitHub secret is current
- `HTTP 401/404` = webhook deleted or regenerated; create new one in Discord
  Channel → Integrations → Webhooks, update `DISCORD_WEBHOOK` secret in GitHub

**If the step was skipped**:

- Verify the job's `if:` condition matches (e.g. `failure() && needs.x.result == 'failure'`)
- Confirm the failing job is in the `needs` list of the notify step

### Prevention

- Manually test `DISCORD_WEBHOOK` every 3 months — Discord has been known to
  revoke inactive webhooks
- Keep a backup notification channel (email via `action-send-mail` is already
  configured)

---

## 5. Performance optimization path (reference, not an incident)

This is a decision tree for when the app starts feeling slow or Cockroach
budget is under pressure. Apply in order — don't jump to step 4 without trying
1–3 first.

### Step 1 — Redis caching for hot reads

Already in the stack (`.ai/15_redis-pino.md`). Cache static reference data:

| Model               | TTL  | Key pattern                       |
| ------------------- | ---- | --------------------------------- |
| `IngredientCatalog` | 24 h | `kookio:cache:ingredient:<id>`    |
| `MealCategory`      | 24 h | `kookio:cache:meal-category:<id>` |
| `MealArea`          | 24 h | `kookio:cache:meal-area:<id>`     |
| `Recipe` (PUBLIC)   | 1 h  | `kookio:cache:recipe:<id>`        |

Pattern: wrap the repository call with `cacheGetOrSet()`. Invalidate on
mutations (`cacheDelete` after `repo.update`).

### Step 2 — Database indexes

Check CockroachDB Console → **SQL Activity** → slow queries → identify
sequential scans. Add `@@index` in `schema.prisma` for frequently-filtered
columns. Common candidates:

- `PantryItem.userId` (already a FK, verify index exists)
- `Recipe.status` + `Recipe.categoryId` (composite)
- `CookingSession.userId` + `CookingSession.completedAt` (composite, for history queries)

Indexes are non-blocking in CockroachDB but take time on large tables.

### Step 3 — SSR → SSG conversion

In `apps/web/src/app/app.routes.server.ts`, move routes that serve identical
content to all users from `RenderMode.Server` to `RenderMode.Prerender`.

Candidates:

- `/recipes` (catalog listing)
- `/recipes/:id` (individual recipe — if status is PUBLIC)
- `/about`, `/changelog`, `/blog/**`

Impact: eliminates per-request DB load entirely; pages served as static files
by Vercel.

### Step 4 — Prisma Accelerate (last resort)

Only consider when Cockroach budget consistently exceeds 70% for three
consecutive months AND Redis caching + indexing + SSG have been applied.

Trade-offs:

- **Free tier**: 60K queries/month (generous but easy to hit on a growing app)
- **Adds dependency**: another service in the request path — more moving parts
- **Benefits**: edge caching, global connection pooling, query-level cache
  strategies

Setup:

1. Enable Accelerate in Prisma Data Platform dashboard
2. Update `DATABASE_URL` to the Accelerate-prefixed URL
   (`prisma+postgres://...`)
3. Keep `DIRECT_DATABASE_URL` pointing at the raw CockroachDB endpoint for
   migrations
4. Add `cacheStrategy: { ttl: <seconds> }` per-query where beneficial

Do NOT enable Accelerate "just in case" — it adds complexity without benefit
below the budget pressure threshold.

---

_Last updated: when editing a scenario, append the date and reason to a
changelog at the bottom of this file._

## Changelog

- `2026-04-20` — initial runbook with 5 scenarios
