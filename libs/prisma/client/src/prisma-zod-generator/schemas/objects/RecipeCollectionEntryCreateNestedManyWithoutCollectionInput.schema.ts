import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionEntryCreateWithoutCollectionInputObjectSchema as RecipeCollectionEntryCreateWithoutCollectionInputObjectSchema } from './RecipeCollectionEntryCreateWithoutCollectionInput.schema';
import { RecipeCollectionEntryUncheckedCreateWithoutCollectionInputObjectSchema as RecipeCollectionEntryUncheckedCreateWithoutCollectionInputObjectSchema } from './RecipeCollectionEntryUncheckedCreateWithoutCollectionInput.schema';
import { RecipeCollectionEntryCreateOrConnectWithoutCollectionInputObjectSchema as RecipeCollectionEntryCreateOrConnectWithoutCollectionInputObjectSchema } from './RecipeCollectionEntryCreateOrConnectWithoutCollectionInput.schema';
import { RecipeCollectionEntryCreateManyCollectionInputEnvelopeObjectSchema as RecipeCollectionEntryCreateManyCollectionInputEnvelopeObjectSchema } from './RecipeCollectionEntryCreateManyCollectionInputEnvelope.schema';
import { RecipeCollectionEntryWhereUniqueInputObjectSchema as RecipeCollectionEntryWhereUniqueInputObjectSchema } from './RecipeCollectionEntryWhereUniqueInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => RecipeCollectionEntryCreateWithoutCollectionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeCollectionEntryCreateWithoutCollectionInputObjectSchema,
            )
            .array(),
          z.lazy(
            () =>
              RecipeCollectionEntryUncheckedCreateWithoutCollectionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeCollectionEntryUncheckedCreateWithoutCollectionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              RecipeCollectionEntryCreateOrConnectWithoutCollectionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeCollectionEntryCreateOrConnectWithoutCollectionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () =>
            RecipeCollectionEntryCreateManyCollectionInputEnvelopeObjectSchema,
        )
        .optional(),
      connect: z
        .union([
          z.lazy(() => RecipeCollectionEntryWhereUniqueInputObjectSchema),
          z
            .lazy(() => RecipeCollectionEntryWhereUniqueInputObjectSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();
export const RecipeCollectionEntryCreateNestedManyWithoutCollectionInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryCreateNestedManyWithoutCollectionInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryCreateNestedManyWithoutCollectionInput>;
export const RecipeCollectionEntryCreateNestedManyWithoutCollectionInputObjectZodSchema =
  makeSchema();
