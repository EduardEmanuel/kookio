import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeUpdateWithoutCollectionEntriesInputObjectSchema as RecipeUpdateWithoutCollectionEntriesInputObjectSchema } from './RecipeUpdateWithoutCollectionEntriesInput.schema';
import { RecipeUncheckedUpdateWithoutCollectionEntriesInputObjectSchema as RecipeUncheckedUpdateWithoutCollectionEntriesInputObjectSchema } from './RecipeUncheckedUpdateWithoutCollectionEntriesInput.schema';
import { RecipeCreateWithoutCollectionEntriesInputObjectSchema as RecipeCreateWithoutCollectionEntriesInputObjectSchema } from './RecipeCreateWithoutCollectionEntriesInput.schema';
import { RecipeUncheckedCreateWithoutCollectionEntriesInputObjectSchema as RecipeUncheckedCreateWithoutCollectionEntriesInputObjectSchema } from './RecipeUncheckedCreateWithoutCollectionEntriesInput.schema';
import { RecipeWhereInputObjectSchema as RecipeWhereInputObjectSchema } from './RecipeWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      update: z.union([
        z.lazy(() => RecipeUpdateWithoutCollectionEntriesInputObjectSchema),
        z.lazy(
          () => RecipeUncheckedUpdateWithoutCollectionEntriesInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => RecipeCreateWithoutCollectionEntriesInputObjectSchema),
        z.lazy(
          () => RecipeUncheckedCreateWithoutCollectionEntriesInputObjectSchema,
        ),
      ]),
      where: z.lazy(() => RecipeWhereInputObjectSchema).optional(),
    })
    .strict();
export const RecipeUpsertWithoutCollectionEntriesInputObjectSchema: z.ZodType<Prisma.RecipeUpsertWithoutCollectionEntriesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUpsertWithoutCollectionEntriesInput>;
export const RecipeUpsertWithoutCollectionEntriesInputObjectZodSchema =
  makeSchema();
