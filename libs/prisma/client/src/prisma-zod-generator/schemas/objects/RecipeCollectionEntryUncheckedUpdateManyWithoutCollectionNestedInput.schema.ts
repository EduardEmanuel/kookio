import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionEntryCreateWithoutCollectionInputObjectSchema as RecipeCollectionEntryCreateWithoutCollectionInputObjectSchema } from './RecipeCollectionEntryCreateWithoutCollectionInput.schema';
import { RecipeCollectionEntryUncheckedCreateWithoutCollectionInputObjectSchema as RecipeCollectionEntryUncheckedCreateWithoutCollectionInputObjectSchema } from './RecipeCollectionEntryUncheckedCreateWithoutCollectionInput.schema';
import { RecipeCollectionEntryCreateOrConnectWithoutCollectionInputObjectSchema as RecipeCollectionEntryCreateOrConnectWithoutCollectionInputObjectSchema } from './RecipeCollectionEntryCreateOrConnectWithoutCollectionInput.schema';
import { RecipeCollectionEntryUpsertWithWhereUniqueWithoutCollectionInputObjectSchema as RecipeCollectionEntryUpsertWithWhereUniqueWithoutCollectionInputObjectSchema } from './RecipeCollectionEntryUpsertWithWhereUniqueWithoutCollectionInput.schema';
import { RecipeCollectionEntryCreateManyCollectionInputEnvelopeObjectSchema as RecipeCollectionEntryCreateManyCollectionInputEnvelopeObjectSchema } from './RecipeCollectionEntryCreateManyCollectionInputEnvelope.schema';
import { RecipeCollectionEntryWhereUniqueInputObjectSchema as RecipeCollectionEntryWhereUniqueInputObjectSchema } from './RecipeCollectionEntryWhereUniqueInput.schema';
import { RecipeCollectionEntryUpdateWithWhereUniqueWithoutCollectionInputObjectSchema as RecipeCollectionEntryUpdateWithWhereUniqueWithoutCollectionInputObjectSchema } from './RecipeCollectionEntryUpdateWithWhereUniqueWithoutCollectionInput.schema';
import { RecipeCollectionEntryUpdateManyWithWhereWithoutCollectionInputObjectSchema as RecipeCollectionEntryUpdateManyWithWhereWithoutCollectionInputObjectSchema } from './RecipeCollectionEntryUpdateManyWithWhereWithoutCollectionInput.schema';
import { RecipeCollectionEntryScalarWhereInputObjectSchema as RecipeCollectionEntryScalarWhereInputObjectSchema } from './RecipeCollectionEntryScalarWhereInput.schema';

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
      upsert: z
        .union([
          z.lazy(
            () =>
              RecipeCollectionEntryUpsertWithWhereUniqueWithoutCollectionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeCollectionEntryUpsertWithWhereUniqueWithoutCollectionInputObjectSchema,
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
      set: z
        .union([
          z.lazy(() => RecipeCollectionEntryWhereUniqueInputObjectSchema),
          z
            .lazy(() => RecipeCollectionEntryWhereUniqueInputObjectSchema)
            .array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => RecipeCollectionEntryWhereUniqueInputObjectSchema),
          z
            .lazy(() => RecipeCollectionEntryWhereUniqueInputObjectSchema)
            .array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => RecipeCollectionEntryWhereUniqueInputObjectSchema),
          z
            .lazy(() => RecipeCollectionEntryWhereUniqueInputObjectSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => RecipeCollectionEntryWhereUniqueInputObjectSchema),
          z
            .lazy(() => RecipeCollectionEntryWhereUniqueInputObjectSchema)
            .array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              RecipeCollectionEntryUpdateWithWhereUniqueWithoutCollectionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeCollectionEntryUpdateWithWhereUniqueWithoutCollectionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              RecipeCollectionEntryUpdateManyWithWhereWithoutCollectionInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeCollectionEntryUpdateManyWithWhereWithoutCollectionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => RecipeCollectionEntryScalarWhereInputObjectSchema),
          z
            .lazy(() => RecipeCollectionEntryScalarWhereInputObjectSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();
export const RecipeCollectionEntryUncheckedUpdateManyWithoutCollectionNestedInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryUncheckedUpdateManyWithoutCollectionNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryUncheckedUpdateManyWithoutCollectionNestedInput>;
export const RecipeCollectionEntryUncheckedUpdateManyWithoutCollectionNestedInputObjectZodSchema =
  makeSchema();
