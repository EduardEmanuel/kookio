import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionEntryWhereUniqueInputObjectSchema as RecipeCollectionEntryWhereUniqueInputObjectSchema } from './RecipeCollectionEntryWhereUniqueInput.schema';
import { RecipeCollectionEntryUpdateWithoutCollectionInputObjectSchema as RecipeCollectionEntryUpdateWithoutCollectionInputObjectSchema } from './RecipeCollectionEntryUpdateWithoutCollectionInput.schema';
import { RecipeCollectionEntryUncheckedUpdateWithoutCollectionInputObjectSchema as RecipeCollectionEntryUncheckedUpdateWithoutCollectionInputObjectSchema } from './RecipeCollectionEntryUncheckedUpdateWithoutCollectionInput.schema';
import { RecipeCollectionEntryCreateWithoutCollectionInputObjectSchema as RecipeCollectionEntryCreateWithoutCollectionInputObjectSchema } from './RecipeCollectionEntryCreateWithoutCollectionInput.schema';
import { RecipeCollectionEntryUncheckedCreateWithoutCollectionInputObjectSchema as RecipeCollectionEntryUncheckedCreateWithoutCollectionInputObjectSchema } from './RecipeCollectionEntryUncheckedCreateWithoutCollectionInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeCollectionEntryWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(
          () => RecipeCollectionEntryUpdateWithoutCollectionInputObjectSchema,
        ),
        z.lazy(
          () =>
            RecipeCollectionEntryUncheckedUpdateWithoutCollectionInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(
          () => RecipeCollectionEntryCreateWithoutCollectionInputObjectSchema,
        ),
        z.lazy(
          () =>
            RecipeCollectionEntryUncheckedCreateWithoutCollectionInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const RecipeCollectionEntryUpsertWithWhereUniqueWithoutCollectionInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryUpsertWithWhereUniqueWithoutCollectionInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryUpsertWithWhereUniqueWithoutCollectionInput>;
export const RecipeCollectionEntryUpsertWithWhereUniqueWithoutCollectionInputObjectZodSchema =
  makeSchema();
