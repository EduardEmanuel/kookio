import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionEntryWhereUniqueInputObjectSchema as RecipeCollectionEntryWhereUniqueInputObjectSchema } from './RecipeCollectionEntryWhereUniqueInput.schema';
import { RecipeCollectionEntryCreateWithoutRecipeInputObjectSchema as RecipeCollectionEntryCreateWithoutRecipeInputObjectSchema } from './RecipeCollectionEntryCreateWithoutRecipeInput.schema';
import { RecipeCollectionEntryUncheckedCreateWithoutRecipeInputObjectSchema as RecipeCollectionEntryUncheckedCreateWithoutRecipeInputObjectSchema } from './RecipeCollectionEntryUncheckedCreateWithoutRecipeInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeCollectionEntryWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => RecipeCollectionEntryCreateWithoutRecipeInputObjectSchema),
        z.lazy(
          () =>
            RecipeCollectionEntryUncheckedCreateWithoutRecipeInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const RecipeCollectionEntryCreateOrConnectWithoutRecipeInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryCreateOrConnectWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryCreateOrConnectWithoutRecipeInput>;
export const RecipeCollectionEntryCreateOrConnectWithoutRecipeInputObjectZodSchema =
  makeSchema();
