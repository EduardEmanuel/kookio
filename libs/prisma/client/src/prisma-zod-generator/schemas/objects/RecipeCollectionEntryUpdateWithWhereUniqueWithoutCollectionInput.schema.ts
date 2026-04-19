import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionEntryWhereUniqueInputObjectSchema as RecipeCollectionEntryWhereUniqueInputObjectSchema } from './RecipeCollectionEntryWhereUniqueInput.schema';
import { RecipeCollectionEntryUpdateWithoutCollectionInputObjectSchema as RecipeCollectionEntryUpdateWithoutCollectionInputObjectSchema } from './RecipeCollectionEntryUpdateWithoutCollectionInput.schema';
import { RecipeCollectionEntryUncheckedUpdateWithoutCollectionInputObjectSchema as RecipeCollectionEntryUncheckedUpdateWithoutCollectionInputObjectSchema } from './RecipeCollectionEntryUncheckedUpdateWithoutCollectionInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeCollectionEntryWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(
          () => RecipeCollectionEntryUpdateWithoutCollectionInputObjectSchema,
        ),
        z.lazy(
          () =>
            RecipeCollectionEntryUncheckedUpdateWithoutCollectionInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const RecipeCollectionEntryUpdateWithWhereUniqueWithoutCollectionInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryUpdateWithWhereUniqueWithoutCollectionInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryUpdateWithWhereUniqueWithoutCollectionInput>;
export const RecipeCollectionEntryUpdateWithWhereUniqueWithoutCollectionInputObjectZodSchema =
  makeSchema();
