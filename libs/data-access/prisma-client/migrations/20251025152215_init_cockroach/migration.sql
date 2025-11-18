-- CreateTable
CREATE TABLE "Ingredient" (
    "id" UUID NOT NULL,
    "name" STRING NOT NULL,
    "quantity" INT4 NOT NULL,
    "unit" STRING NOT NULL,
    "optional" BOOL NOT NULL,
    "userId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);
