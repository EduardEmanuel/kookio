-- CreateTable
CREATE TABLE "Ingredient" (
    "id" UUID NOT NULL,
    "name" STRING NOT NULL,
    "quantity" INT4 NOT NULL,
    "unit" STRING NOT NULL,
    "optional" BOOL NOT NULL DEFAULT false,
    "userId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ingredient_user_idx" ON "Ingredient"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "userId_name_unique" ON "Ingredient"("userId", "name");
