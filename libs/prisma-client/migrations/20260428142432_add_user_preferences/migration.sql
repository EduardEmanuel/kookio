-- CreateTable
CREATE TABLE "user_preferred_categories" (
    "userId" STRING NOT NULL,
    "mealCategoryId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_preferred_categories_pkey" PRIMARY KEY ("userId","mealCategoryId")
);

-- CreateTable
CREATE TABLE "user_preferred_areas" (
    "userId" STRING NOT NULL,
    "mealAreaId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_preferred_areas_pkey" PRIMARY KEY ("userId","mealAreaId")
);

-- CreateIndex
CREATE INDEX "idx_user_pref_category_user" ON "user_preferred_categories"("userId");

-- CreateIndex
CREATE INDEX "idx_user_pref_area_user" ON "user_preferred_areas"("userId");

-- AddForeignKey
ALTER TABLE "user_preferred_categories" ADD CONSTRAINT "user_preferred_categories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_preferred_categories" ADD CONSTRAINT "user_preferred_categories_mealCategoryId_fkey" FOREIGN KEY ("mealCategoryId") REFERENCES "MealCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_preferred_areas" ADD CONSTRAINT "user_preferred_areas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_preferred_areas" ADD CONSTRAINT "user_preferred_areas_mealAreaId_fkey" FOREIGN KEY ("mealAreaId") REFERENCES "MealArea"("id") ON DELETE CASCADE ON UPDATE CASCADE;
