-- Backfill "favorites" RecipeCollection for every user who completed
-- onboarding before the seed was added to onboarding.commit.
--
-- ON CONFLICT DO NOTHING relies on the @@unique([userId, name]) index
-- (RecipeCollection_userId_name_key) so the migration is idempotent and
-- safe to re-run.
INSERT INTO "RecipeCollection" ("id", "userId", "name", "createdAt", "updatedAt")
SELECT gen_random_uuid(), up."userId", 'favorites', NOW(), NOW()
FROM "UserProfile" AS up
WHERE up."onboardingDone" = true
  AND NOT EXISTS (
    SELECT 1 FROM "RecipeCollection" AS rc
    WHERE rc."userId" = up."userId" AND rc."name" = 'favorites'
  );
