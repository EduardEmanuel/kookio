import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionEntryWhereUniqueInputObjectSchema as RecipeCollectionEntryWhereUniqueInputObjectSchema } from './RecipeCollectionEntryWhereUniqueInput.schema';
import { RecipeCollectionEntryCreateWithoutCollectionInputObjectSchema as RecipeCollectionEntryCreateWithoutCollectionInputObjectSchema } from './RecipeCollectionEntryCreateWithoutCollectionInput.schema';
import { RecipeCollectionEntryUncheckedCreateWithoutCollectionInputObjectSchema as RecipeCollectionEntryUncheckedCreateWithoutCollectionInputObjectSchema } from './RecipeCollectionEntryUncheckedCreateWithoutCollectionInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeCollectionEntryWhereUniqueInputObjectSchema),
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
export const RecipeCollectionEntryCreateOrConnectWithoutCollectionInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryCreateOrConnectWithoutCollectionInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryCreateOrConnectWithoutCollectionInput>;
export const RecipeCollectionEntryCreateOrConnectWithoutCollectionInputObjectZodSchema =
  makeSchema();
