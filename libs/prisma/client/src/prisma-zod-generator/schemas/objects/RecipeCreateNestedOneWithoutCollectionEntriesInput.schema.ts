import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCreateWithoutCollectionEntriesInputObjectSchema as RecipeCreateWithoutCollectionEntriesInputObjectSchema } from './RecipeCreateWithoutCollectionEntriesInput.schema';
import { RecipeUncheckedCreateWithoutCollectionEntriesInputObjectSchema as RecipeUncheckedCreateWithoutCollectionEntriesInputObjectSchema } from './RecipeUncheckedCreateWithoutCollectionEntriesInput.schema';
import { RecipeCreateOrConnectWithoutCollectionEntriesInputObjectSchema as RecipeCreateOrConnectWithoutCollectionEntriesInputObjectSchema } from './RecipeCreateOrConnectWithoutCollectionEntriesInput.schema';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => RecipeCreateWithoutCollectionEntriesInputObjectSchema),
          z.lazy(
            () =>
              RecipeUncheckedCreateWithoutCollectionEntriesInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () => RecipeCreateOrConnectWithoutCollectionEntriesInputObjectSchema,
        )
        .optional(),
      connect: z.lazy(() => RecipeWhereUniqueInputObjectSchema).optional(),
    })
    .strict();
export const RecipeCreateNestedOneWithoutCollectionEntriesInputObjectSchema: z.ZodType<Prisma.RecipeCreateNestedOneWithoutCollectionEntriesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCreateNestedOneWithoutCollectionEntriesInput>;
export const RecipeCreateNestedOneWithoutCollectionEntriesInputObjectZodSchema =
  makeSchema();
