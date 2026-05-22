/*
  Warnings:

  - The `instructions` column on the `Recipe` table is dropped (was a
    flat string carrying the whole recipe body). Existing values are
    discarded — replaced by structured rows in the new `RecipeStep`
    child table. The seed data already carries `steps[]`; existing
    dev rows will be re-seeded from the canonical recipes.json.
  - The `@default(4)` on `Recipe.servings` is dropped. Every row now
    carries an explicit servings count (sourced from the cleaned
    recipes.json), no fallback at insert time.

  Data is intentionally NOT migrated — confirmed by the maintainer; the
  flat `instructions` column has no in-place upgrade path to per-step
  rows. The seed script regenerates `Recipe.servings`, `Recipe.difficulty`,
  and `RecipeStep` rows from the canonical recipes.json snapshot.
*/

-- CreateEnum
CREATE TYPE "public"."Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- AlterTable
ALTER TABLE "public"."Recipe" DROP COLUMN "instructions";
ALTER TABLE "public"."Recipe" ALTER COLUMN "servings" DROP DEFAULT;
ALTER TABLE "public"."Recipe" ADD COLUMN "difficulty" "public"."Difficulty";

-- CreateTable
CREATE TABLE "public"."RecipeStep" (
    "id" STRING NOT NULL,
    "recipeId" STRING NOT NULL,
    "order" INT4 NOT NULL,
    "title" STRING(120),
    "content" STRING NOT NULL,

    CONSTRAINT "RecipeStep_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RecipeStep_recipeId_idx" ON "public"."RecipeStep"("recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeStep_recipeId_order_key" ON "public"."RecipeStep"("recipeId", "order");

-- AddForeignKey
ALTER TABLE "public"."RecipeStep" ADD CONSTRAINT "RecipeStep_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "public"."Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
