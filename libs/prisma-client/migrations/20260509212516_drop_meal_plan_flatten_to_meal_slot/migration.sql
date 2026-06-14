/*
  Warnings:

  - The `MealPlan` parent table is dropped along with its 2 rows.
  - The `MealPlanSlot` table is dropped along with its 7 rows. The new
    `MealSlot` table is created flat (no parent), with a direct FK to
    `User`. Slots are no longer grouped under a per-user "plan" row.

  Data is intentionally NOT migrated — confirmed by the maintainer; the
  existing rows were dev-only test data.
*/

-- DropForeignKey
ALTER TABLE "public"."MealPlanSlot" DROP CONSTRAINT "MealPlanSlot_mealPlanId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MealPlanSlot" DROP CONSTRAINT "MealPlanSlot_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MealPlan" DROP CONSTRAINT "MealPlan_userId_fkey";

-- DropTable
DROP TABLE "public"."MealPlanSlot";

-- DropTable
DROP TABLE "public"."MealPlan";

-- CreateTable
CREATE TABLE "public"."MealSlot" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "recipeId" STRING,
    "date" TIMESTAMP(3) NOT NULL,
    "slotType" "public"."MealSlotType" NOT NULL,
    "servings" INT4 NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MealSlot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MealSlot_userId_date_idx" ON "public"."MealSlot"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "MealSlot_userId_date_slotType_key" ON "public"."MealSlot"("userId", "date", "slotType");

-- AddForeignKey
ALTER TABLE "public"."MealSlot" ADD CONSTRAINT "MealSlot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MealSlot" ADD CONSTRAINT "MealSlot_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "public"."Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;
