import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionEntryCreateWithoutRecipeInputObjectSchema as RecipeCollectionEntryCreateWithoutRecipeInputObjectSchema } from './RecipeCollectionEntryCreateWithoutRecipeInput.schema';
import { RecipeCollectionEntryUncheckedCreateWithoutRecipeInputObjectSchema as RecipeCollectionEntryUncheckedCreateWithoutRecipeInputObjectSchema } from './RecipeCollectionEntryUncheckedCreateWithoutRecipeInput.schema';
import { RecipeCollectionEntryCreateOrConnectWithoutRecipeInputObjectSchema as RecipeCollectionEntryCreateOrConnectWithoutRecipeInputObjectSchema } from './RecipeCollectionEntryCreateOrConnectWithoutRecipeInput.schema';
import { RecipeCollectionEntryUpsertWithWhereUniqueWithoutRecipeInputObjectSchema as RecipeCollectionEntryUpsertWithWhereUniqueWithoutRecipeInputObjectSchema } from './RecipeCollectionEntryUpsertWithWhereUniqueWithoutRecipeInput.schema';
import { RecipeCollectionEntryCreateManyRecipeInputEnvelopeObjectSchema as RecipeCollectionEntryCreateManyRecipeInputEnvelopeObjectSchema } from './RecipeCollectionEntryCreateManyRecipeInputEnvelope.schema';
import { RecipeCollectionEntryWhereUniqueInputObjectSchema as RecipeCollectionEntryWhereUniqueInputObjectSchema } from './RecipeCollectionEntryWhereUniqueInput.schema';
import { RecipeCollectionEntryUpdateWithWhereUniqueWithoutRecipeInputObjectSchema as RecipeCollectionEntryUpdateWithWhereUniqueWithoutRecipeInputObjectSchema } from './RecipeCollectionEntryUpdateWithWhereUniqueWithoutRecipeInput.schema';
import { RecipeCollectionEntryUpdateManyWithWhereWithoutRecipeInputObjectSchema as RecipeCollectionEntryUpdateManyWithWhereWithoutRecipeInputObjectSchema } from './RecipeCollectionEntryUpdateManyWithWhereWithoutRecipeInput.schema';
import { RecipeCollectionEntryScalarWhereInputObjectSchema as RecipeCollectionEntryScalarWhereInputObjectSchema } from './RecipeCollectionEntryScalarWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => RecipeCollectionEntryCreateWithoutRecipeInputObjectSchema,
          ),
          z
            .lazy(
              () => RecipeCollectionEntryCreateWithoutRecipeInputObjectSchema,
            )
            .array(),
          z.lazy(
            () =>
              RecipeCollectionEntryUncheckedCreateWithoutRecipeInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeCollectionEntryUncheckedCreateWithoutRecipeInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              RecipeCollectionEntryCreateOrConnectWithoutRecipeInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeCollectionEntryCreateOrConnectWithoutRecipeInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              RecipeCollectionEntryUpsertWithWhereUniqueWithoutRecipeInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeCollectionEntryUpsertWithWhereUniqueWithoutRecipeInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () => RecipeCollectionEntryCreateManyRecipeInputEnvelopeObjectSchema,
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
              RecipeCollectionEntryUpdateWithWhereUniqueWithoutRecipeInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeCollectionEntryUpdateWithWhereUniqueWithoutRecipeInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              RecipeCollectionEntryUpdateManyWithWhereWithoutRecipeInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeCollectionEntryUpdateManyWithWhereWithoutRecipeInputObjectSchema,
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
export const RecipeCollectionEntryUncheckedUpdateManyWithoutRecipeNestedInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryUncheckedUpdateManyWithoutRecipeNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionEntryUncheckedUpdateManyWithoutRecipeNestedInput>;
export const RecipeCollectionEntryUncheckedUpdateManyWithoutRecipeNestedInputObjectZodSchema =
  makeSchema();
