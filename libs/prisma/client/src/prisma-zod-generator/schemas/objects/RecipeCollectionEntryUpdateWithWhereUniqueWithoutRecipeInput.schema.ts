import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionEntryWhereUniqueInputObjectSchema as RecipeCollectionEntryWhereUniqueInputObjectSchema } from './RecipeCollectionEntryWhereUniqueInput.schema';
import { RecipeCollectionEntryUpdateWithoutRecipeInputObjectSchema as RecipeCollectionEntryUpdateWithoutRecipeInputObjectSchema } from './RecipeCollectionEntryUpdateWithoutRecipeInput.schema';
import { RecipeCollectionEntryUncheckedUpdateWithoutRecipeInputObjectSchema as RecipeCollectionEntryUncheckedUpdateWithoutRecipeInputObjectSchema } from './RecipeCollectionEntryUncheckedUpdateWithoutRecipeInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeCollectionEntryWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => RecipeCollectionEntryUpdateWithoutRecipeInputObjectSchema),
        z.lazy(
          () =>
            RecipeCollectionEntryUncheckedUpdateWithoutRecipeInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const RecipeCollectionEntryUpdateWithWhereUniqueWithoutRecipeInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryUpdateWithWhereUniqueWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryUpdateWithWhereUniqueWithoutRecipeInput>;
export const RecipeCollectionEntryUpdateWithWhereUniqueWithoutRecipeInputObjectZodSchema =
  makeSchema();
