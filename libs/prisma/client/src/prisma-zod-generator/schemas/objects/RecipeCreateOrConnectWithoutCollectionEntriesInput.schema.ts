import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeCreateWithoutCollectionEntriesInputObjectSchema as RecipeCreateWithoutCollectionEntriesInputObjectSchema } from './RecipeCreateWithoutCollectionEntriesInput.schema';
import { RecipeUncheckedCreateWithoutCollectionEntriesInputObjectSchema as RecipeUncheckedCreateWithoutCollectionEntriesInputObjectSchema } from './RecipeUncheckedCreateWithoutCollectionEntriesInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => RecipeCreateWithoutCollectionEntriesInputObjectSchema),
        z.lazy(
          () => RecipeUncheckedCreateWithoutCollectionEntriesInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const RecipeCreateOrConnectWithoutCollectionEntriesInputObjectSchema: z.ZodType<Prisma.RecipeCreateOrConnectWithoutCollectionEntriesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCreateOrConnectWithoutCollectionEntriesInput>;
export const RecipeCreateOrConnectWithoutCollectionEntriesInputObjectZodSchema =
  makeSchema();
