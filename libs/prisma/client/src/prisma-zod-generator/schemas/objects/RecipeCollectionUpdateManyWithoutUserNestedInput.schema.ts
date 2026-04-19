import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCollectionCreateWithoutUserInputObjectSchema as RecipeCollectionCreateWithoutUserInputObjectSchema } from './RecipeCollectionCreateWithoutUserInput.schema';
import { RecipeCollectionUncheckedCreateWithoutUserInputObjectSchema as RecipeCollectionUncheckedCreateWithoutUserInputObjectSchema } from './RecipeCollectionUncheckedCreateWithoutUserInput.schema';
import { RecipeCollectionCreateOrConnectWithoutUserInputObjectSchema as RecipeCollectionCreateOrConnectWithoutUserInputObjectSchema } from './RecipeCollectionCreateOrConnectWithoutUserInput.schema';
import { RecipeCollectionUpsertWithWhereUniqueWithoutUserInputObjectSchema as RecipeCollectionUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './RecipeCollectionUpsertWithWhereUniqueWithoutUserInput.schema';
import { RecipeCollectionCreateManyUserInputEnvelopeObjectSchema as RecipeCollectionCreateManyUserInputEnvelopeObjectSchema } from './RecipeCollectionCreateManyUserInputEnvelope.schema';
import { RecipeCollectionWhereUniqueInputObjectSchema as RecipeCollectionWhereUniqueInputObjectSchema } from './RecipeCollectionWhereUniqueInput.schema';
import { RecipeCollectionUpdateWithWhereUniqueWithoutUserInputObjectSchema as RecipeCollectionUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './RecipeCollectionUpdateWithWhereUniqueWithoutUserInput.schema';
import { RecipeCollectionUpdateManyWithWhereWithoutUserInputObjectSchema as RecipeCollectionUpdateManyWithWhereWithoutUserInputObjectSchema } from './RecipeCollectionUpdateManyWithWhereWithoutUserInput.schema';
import { RecipeCollectionScalarWhereInputObjectSchema as RecipeCollectionScalarWhereInputObjectSchema } from './RecipeCollectionScalarWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => RecipeCollectionCreateWithoutUserInputObjectSchema),
          z
            .lazy(() => RecipeCollectionCreateWithoutUserInputObjectSchema)
            .array(),
          z.lazy(
            () => RecipeCollectionUncheckedCreateWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () => RecipeCollectionUncheckedCreateWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => RecipeCollectionCreateOrConnectWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () => RecipeCollectionCreateOrConnectWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              RecipeCollectionUpsertWithWhereUniqueWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeCollectionUpsertWithWhereUniqueWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RecipeCollectionCreateManyUserInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => RecipeCollectionWhereUniqueInputObjectSchema),
          z.lazy(() => RecipeCollectionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => RecipeCollectionWhereUniqueInputObjectSchema),
          z.lazy(() => RecipeCollectionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => RecipeCollectionWhereUniqueInputObjectSchema),
          z.lazy(() => RecipeCollectionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => RecipeCollectionWhereUniqueInputObjectSchema),
          z.lazy(() => RecipeCollectionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              RecipeCollectionUpdateWithWhereUniqueWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeCollectionUpdateWithWhereUniqueWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              RecipeCollectionUpdateManyWithWhereWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeCollectionUpdateManyWithWhereWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => RecipeCollectionScalarWhereInputObjectSchema),
          z.lazy(() => RecipeCollectionScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const RecipeCollectionUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.RecipeCollectionUpdateManyWithoutUserNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCollectionUpdateManyWithoutUserNestedInput>;
export const RecipeCollectionUpdateManyWithoutUserNestedInputObjectZodSchema =
  makeSchema();
