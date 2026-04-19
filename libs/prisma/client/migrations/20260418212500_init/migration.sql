-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "RecipeStatus" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateEnum
CREATE TYPE "MealSlotType" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK');

-- CreateEnum
CREATE TYPE "MeasureUnit" AS ENUM ('G', 'KG', 'ML', 'L', 'TSP', 'TBSP', 'CUP', 'OZ', 'LB', 'PIECE', 'SLICE', 'CLOVE', 'BUNCH', 'PINCH', 'TO_TASTE', 'TO_SERVE', 'GARNISH', 'OTHER');

-- CreateEnum
CREATE TYPE "IngredientCategory" AS ENUM ('MEAT', 'FISH', 'DAIRY', 'PRODUCE', 'GRAINS', 'LEGUMES', 'SPICES', 'CONDIMENTS', 'HERBS', 'NUTS', 'BEVERAGES', 'SWEETS', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "email" STRING NOT NULL,
    "firebaseUid" STRING,
    "name" STRING,
    "roles" "Role"[] DEFAULT ARRAY[]::"Role"[],
    "amr" STRING[] DEFAULT ARRAY[]::STRING[],
    "isDisabled" BOOL NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebAuthnCredential" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "credentialId" BYTES NOT NULL,
    "publicKey" BYTES NOT NULL,
    "counter" INT4 NOT NULL DEFAULT 0,
    "transports" STRING[] DEFAULT ARRAY[]::STRING[],
    "aaguid" UUID,
    "attestationFmt" STRING,
    "backupEligible" BOOL NOT NULL DEFAULT false,
    "backupState" BOOL NOT NULL DEFAULT false,
    "deviceType" STRING,
    "lastUsedAt" TIMESTAMP(3),
    "meta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WebAuthnCredential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "adultsCount" INT4 NOT NULL DEFAULT 1,
    "childrenCount" INT4 NOT NULL DEFAULT 0,
    "onboardingDone" BOOL NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DietaryRestriction" (
    "id" STRING NOT NULL,
    "slug" STRING NOT NULL,
    "label" STRING NOT NULL,
    "emoji" STRING,
    "description" STRING,

    CONSTRAINT "DietaryRestriction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDietaryRestriction" (
    "userId" STRING NOT NULL,
    "dietaryRestrictionId" STRING NOT NULL,

    CONSTRAINT "UserDietaryRestriction_pkey" PRIMARY KEY ("userId","dietaryRestrictionId")
);

-- CreateTable
CREATE TABLE "Utensil" (
    "id" STRING NOT NULL,
    "slug" STRING NOT NULL,
    "name" STRING NOT NULL,
    "emoji" STRING,
    "category" STRING,

    CONSTRAINT "Utensil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserUtensil" (
    "userId" STRING NOT NULL,
    "utensilId" STRING NOT NULL,

    CONSTRAINT "UserUtensil_pkey" PRIMARY KEY ("userId","utensilId")
);

-- CreateTable
CREATE TABLE "MealCategory" (
    "id" STRING NOT NULL,
    "externalId" STRING NOT NULL,
    "name" STRING NOT NULL,
    "imageUrl" STRING,
    "description" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MealCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealArea" (
    "id" STRING NOT NULL,
    "externalId" STRING NOT NULL,
    "name" STRING NOT NULL,
    "flag" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MealArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IngredientCatalog" (
    "id" STRING NOT NULL,
    "externalId" STRING,
    "name" STRING NOT NULL,
    "normalizedName" STRING NOT NULL,
    "description" STRING,
    "imageUrl" STRING,
    "category" "IngredientCategory",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IngredientCatalog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" STRING NOT NULL,
    "externalId" STRING,
    "slug" STRING NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING,
    "imageUrl" STRING,
    "youtubeUrl" STRING,
    "sourceUrl" STRING,
    "instructions" STRING NOT NULL,
    "status" "RecipeStatus" NOT NULL DEFAULT 'PUBLIC',
    "servings" INT4 NOT NULL DEFAULT 4,
    "prepTimeMinutes" INT4,
    "cookTimeMinutes" INT4,
    "categoryId" STRING,
    "areaId" STRING,
    "authorId" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "id" STRING NOT NULL,
    "recipeId" STRING NOT NULL,
    "ingredientCatalogId" STRING NOT NULL,
    "quantity" FLOAT8,
    "unit" "MeasureUnit",
    "notes" STRING,

    CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeTag" (
    "id" STRING NOT NULL,
    "recipeId" STRING NOT NULL,
    "tag" STRING NOT NULL,

    CONSTRAINT "RecipeTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PantryItem" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "ingredientCatalogId" STRING NOT NULL,
    "quantity" FLOAT8 NOT NULL,
    "unit" "MeasureUnit" NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PantryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeCollection" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "name" STRING NOT NULL,
    "emoji" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecipeCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeCollectionEntry" (
    "collectionId" STRING NOT NULL,
    "recipeId" STRING NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecipeCollectionEntry_pkey" PRIMARY KEY ("collectionId","recipeId")
);

-- CreateTable
CREATE TABLE "MealPlan" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "name" STRING,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MealPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealPlanSlot" (
    "id" STRING NOT NULL,
    "mealPlanId" STRING NOT NULL,
    "recipeId" STRING,
    "date" TIMESTAMP(3) NOT NULL,
    "slotType" "MealSlotType" NOT NULL,
    "servings" INT4 NOT NULL DEFAULT 1,

    CONSTRAINT "MealPlanSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CookingSession" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "recipeId" STRING NOT NULL,
    "servings" INT4 NOT NULL,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CookingSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_firebaseUid_key" ON "User"("firebaseUid");

-- CreateIndex
CREATE INDEX "idx_user_email" ON "User"("email");

-- CreateIndex
CREATE INDEX "idx_webauthn_user" ON "WebAuthnCredential"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "uq_webauthn_user_cred" ON "WebAuthnCredential"("userId", "credentialId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DietaryRestriction_slug_key" ON "DietaryRestriction"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Utensil_slug_key" ON "Utensil"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "MealCategory_externalId_key" ON "MealCategory"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "MealArea_externalId_key" ON "MealArea"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "IngredientCatalog_externalId_key" ON "IngredientCatalog"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "IngredientCatalog_normalizedName_key" ON "IngredientCatalog"("normalizedName");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_externalId_key" ON "Recipe"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_slug_key" ON "Recipe"("slug");

-- CreateIndex
CREATE INDEX "Recipe_status_idx" ON "Recipe"("status");

-- CreateIndex
CREATE INDEX "Recipe_categoryId_idx" ON "Recipe"("categoryId");

-- CreateIndex
CREATE INDEX "Recipe_areaId_idx" ON "Recipe"("areaId");

-- CreateIndex
CREATE INDEX "Recipe_authorId_idx" ON "Recipe"("authorId");

-- CreateIndex
CREATE INDEX "Recipe_externalId_idx" ON "Recipe"("externalId");

-- CreateIndex
CREATE INDEX "RecipeIngredient_recipeId_idx" ON "RecipeIngredient"("recipeId");

-- CreateIndex
CREATE INDEX "RecipeIngredient_ingredientCatalogId_idx" ON "RecipeIngredient"("ingredientCatalogId");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeIngredient_recipeId_ingredientCatalogId_key" ON "RecipeIngredient"("recipeId", "ingredientCatalogId");

-- CreateIndex
CREATE INDEX "RecipeTag_recipeId_idx" ON "RecipeTag"("recipeId");

-- CreateIndex
CREATE INDEX "RecipeTag_tag_idx" ON "RecipeTag"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeTag_recipeId_tag_key" ON "RecipeTag"("recipeId", "tag");

-- CreateIndex
CREATE INDEX "PantryItem_userId_idx" ON "PantryItem"("userId");

-- CreateIndex
CREATE INDEX "PantryItem_expiresAt_idx" ON "PantryItem"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "PantryItem_userId_ingredientCatalogId_key" ON "PantryItem"("userId", "ingredientCatalogId");

-- CreateIndex
CREATE INDEX "RecipeCollection_userId_idx" ON "RecipeCollection"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeCollection_userId_name_key" ON "RecipeCollection"("userId", "name");

-- CreateIndex
CREATE INDEX "MealPlan_userId_idx" ON "MealPlan"("userId");

-- CreateIndex
CREATE INDEX "MealPlanSlot_mealPlanId_idx" ON "MealPlanSlot"("mealPlanId");

-- CreateIndex
CREATE UNIQUE INDEX "MealPlanSlot_mealPlanId_date_slotType_key" ON "MealPlanSlot"("mealPlanId", "date", "slotType");

-- CreateIndex
CREATE INDEX "CookingSession_userId_idx" ON "CookingSession"("userId");

-- CreateIndex
CREATE INDEX "CookingSession_recipeId_idx" ON "CookingSession"("recipeId");

-- CreateIndex
CREATE INDEX "CookingSession_userId_recipeId_idx" ON "CookingSession"("userId", "recipeId");

-- AddForeignKey
ALTER TABLE "WebAuthnCredential" ADD CONSTRAINT "WebAuthnCredential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDietaryRestriction" ADD CONSTRAINT "UserDietaryRestriction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDietaryRestriction" ADD CONSTRAINT "UserDietaryRestriction_dietaryRestrictionId_fkey" FOREIGN KEY ("dietaryRestrictionId") REFERENCES "DietaryRestriction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserUtensil" ADD CONSTRAINT "UserUtensil_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserUtensil" ADD CONSTRAINT "UserUtensil_utensilId_fkey" FOREIGN KEY ("utensilId") REFERENCES "Utensil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "MealCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "MealArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_ingredientCatalogId_fkey" FOREIGN KEY ("ingredientCatalogId") REFERENCES "IngredientCatalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeTag" ADD CONSTRAINT "RecipeTag_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PantryItem" ADD CONSTRAINT "PantryItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PantryItem" ADD CONSTRAINT "PantryItem_ingredientCatalogId_fkey" FOREIGN KEY ("ingredientCatalogId") REFERENCES "IngredientCatalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeCollection" ADD CONSTRAINT "RecipeCollection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeCollectionEntry" ADD CONSTRAINT "RecipeCollectionEntry_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "RecipeCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeCollectionEntry" ADD CONSTRAINT "RecipeCollectionEntry_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPlan" ADD CONSTRAINT "MealPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPlanSlot" ADD CONSTRAINT "MealPlanSlot_mealPlanId_fkey" FOREIGN KEY ("mealPlanId") REFERENCES "MealPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPlanSlot" ADD CONSTRAINT "MealPlanSlot_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CookingSession" ADD CONSTRAINT "CookingSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CookingSession" ADD CONSTRAINT "CookingSession_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
