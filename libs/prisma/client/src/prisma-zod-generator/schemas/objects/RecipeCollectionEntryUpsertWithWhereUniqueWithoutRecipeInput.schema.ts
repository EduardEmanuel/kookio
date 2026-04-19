import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionEntryWhereUniqueInputObjectSchema as RecipeCollectionEntryWhereUniqueInputObjectSchema } from './RecipeCollectionEntryWhereUniqueInput.schema';
import { RecipeCollectionEntryUpdateWithoutRecipeInputObjectSchema as RecipeCollectionEntryUpdateWithoutRecipeInputObjectSchema } from './RecipeCollectionEntryUpdateWithoutRecipeInput.schema';
import { RecipeCollectionEntryUncheckedUpdateWithoutRecipeInputObjectSchema as RecipeCollectionEntryUncheckedUpdateWithoutRecipeInputObjectSchema } from './RecipeCollectionEntryUncheckedUpdateWithoutRecipeInput.schema';
import { RecipeCollectionEntryCreateWithoutRecipeInputObjectSchema as RecipeCollectionEntryCreateWithoutRecipeInputObjectSchema } from './RecipeCollectionEntryCreateWithoutRecipeInput.schema';
import { RecipeCollectionEntryUncheckedCreateWithoutRecipeInputObjectSchema as RecipeCollectionEntryUncheckedCreateWithoutRecipeInputObjectSchema } from './RecipeCollectionEntryUncheckedCreateWithoutRecipeInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeCollectionEntryWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => RecipeCollectionEntryUpdateWithoutRecipeInputObjectSchema),
        z.lazy(
          () =>
            RecipeCollectionEntryUncheckedUpdateWithoutRecipeInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => RecipeCollectionEntryCreateWithoutRecipeInputObjectSchema),
        z.lazy(
          () =>
            RecipeCollectionEntryUncheckedCreateWithoutRecipeInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const RecipeCollectionEntryUpsertWithWhereUniqueWithoutRecipeInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryUpsertWithWhereUniqueWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryUpsertWithWhereUniqueWithoutRecipeInput>;
export const RecipeCollectionEntryUpsertWithWhereUniqueWithoutRecipeInputObjectZodSchema =
  makeSchema();
