import z from 'zod';

/**
 * Reusable Zod schemas for primary-key fields, named after **what they
 * validate** (not after which kind of table they live in). Naming this way
 * keeps the contract self-describing in routers — a future contributor can
 * tell at a glance whether an endpoint will reject a non-UUID payload.
 *
 *  ┌─────────────────────────┬──────────────────────────────┐
 *  │ Schema                  │ Use for                      │
 *  ├─────────────────────────┼──────────────────────────────┤
 *  │ SemanticIdSchema        │ Tables seeded with semantic  │
 *  │  = z.string().min(1)    │ IDs for grep-able dev/E2E    │
 *  │                         │ logs (today: `Utensil`,      │
 *  │                         │ `DietaryRestriction`).       │
 *  ├─────────────────────────┼──────────────────────────────┤
 *  │ UuidIdSchema            │ Everything else — IDs come   │
 *  │  = z.guid()             │ from Prisma's runtime        │
 *  │                         │ `@default(uuid())` and are   │
 *  │                         │ never written by hand        │
 *  │                         │ (PantryItem, Recipe,         │
 *  │                         │ IngredientCatalog,           │
 *  │                         │ MealCategory, MealArea, …).  │
 *  └─────────────────────────┴──────────────────────────────┘
 *
 * Decision rule: pick by **how the ID is produced**, not what conceptual
 * bucket the table is in. If a fixture or factory writes the ID by hand
 * with letters in it, use `SemanticIdSchema`. If only Prisma writes the
 * ID, use `UuidIdSchema`. When in doubt, look at the seed for that table.
 *
 * Neither schema replaces the existence check that the server performs
 * at write-time — UUID format on the wire is a soft documentation cue,
 * not a security boundary.
 */

export const SemanticIdSchema = z.string().min(1);

// `z.guid()`, not Zod 4's `z.uuid()`. Zod 4 split UUID validation into a
// strict `z.uuid()` (enforces the RFC 9562 version + variant bits) and a
// loose `z.guid()` (any `8-4-4-4-12` hex) — the latter matches what Zod 3's
// `z.string().uuid()` accepted. Keeping the loose form is deliberate per the
// project's "validation mirrors data reality" rule: format validation here
// is a typo-catcher, the write-time existence check is the real integrity
// boundary, and tightening to strict v4 would reject hand-written fixture /
// E2E IDs that the schema accepted before without buying any real safety.
export const UuidIdSchema = z.guid();
