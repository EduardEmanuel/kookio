import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeIngredientCreateWithoutIngredientInputObjectSchema as RecipeIngredientCreateWithoutIngredientInputObjectSchema } from './RecipeIngredientCreateWithoutIngredientInput.schema';
import { RecipeIngredientUncheckedCreateWithoutIngredientInputObjectSchema as RecipeIngredientUncheckedCreateWithoutIngredientInputObjectSchema } from './RecipeIngredientUncheckedCreateWithoutIngredientInput.schema';
import { RecipeIngredientCreateOrConnectWithoutIngredientInputObjectSchema as RecipeIngredientCreateOrConnectWithoutIngredientInputObjectSchema } from './RecipeIngredientCreateOrConnectWithoutIngredientInput.schema';
import { RecipeIngredientUpsertWithWhereUniqueWithoutIngredientInputObjectSchema as RecipeIngredientUpsertWithWhereUniqueWithoutIngredientInputObjectSchema } from './RecipeIngredientUpsertWithWhereUniqueWithoutIngredientInput.schema';
import { RecipeIngredientCreateManyIngredientInputEnvelopeObjectSchema as RecipeIngredientCreateManyIngredientInputEnvelopeObjectSchema } from './RecipeIngredientCreateManyIngredientInputEnvelope.schema';
import { RecipeIngredientWhereUniqueInputObjectSchema as RecipeIngredientWhereUniqueInputObjectSchema } from './RecipeIngredientWhereUniqueInput.schema';
import { RecipeIngredientUpdateWithWhereUniqueWithoutIngredientInputObjectSchema as RecipeIngredientUpdateWithWhereUniqueWithoutIngredientInputObjectSchema } from './RecipeIngredientUpdateWithWhereUniqueWithoutIngredientInput.schema';
import { RecipeIngredientUpdateManyWithWhereWithoutIngredientInputObjectSchema as RecipeIngredientUpdateManyWithWhereWithoutIngredientInputObjectSchema } from './RecipeIngredientUpdateManyWithWhereWithoutIngredientInput.schema';
import { RecipeIngredientScalarWhereInputObjectSchema as RecipeIngredientScalarWhereInputObjectSchema } from './RecipeIngredientScalarWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => RecipeIngredientCreateWithoutIngredientInputObjectSchema,
          ),
          z
            .lazy(
              () => RecipeIngredientCreateWithoutIngredientInputObjectSchema,
            )
            .array(),
          z.lazy(
            () =>
              RecipeIngredientUncheckedCreateWithoutIngredientInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeIngredientUncheckedCreateWithoutIngredientInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              RecipeIngredientCreateOrConnectWithoutIngredientInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeIngredientCreateOrConnectWithoutIngredientInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              RecipeIngredientUpsertWithWhereUniqueWithoutIngredientInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeIngredientUpsertWithWhereUniqueWithoutIngredientInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () => RecipeIngredientCreateManyIngredientInputEnvelopeObjectSchema,
        )
        .optional(),
      set: z
        .union([
          z.lazy(() => RecipeIngredientWhereUniqueInputObjectSchema),
          z.lazy(() => RecipeIngredientWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => RecipeIngredientWhereUniqueInputObjectSchema),
          z.lazy(() => RecipeIngredientWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => RecipeIngredientWhereUniqueInputObjectSchema),
          z.lazy(() => RecipeIngredientWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => RecipeIngredientWhereUniqueInputObjectSchema),
          z.lazy(() => RecipeIngredientWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              RecipeIngredientUpdateWithWhereUniqueWithoutIngredientInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeIngredientUpdateWithWhereUniqueWithoutIngredientInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              RecipeIngredientUpdateManyWithWhereWithoutIngredientInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeIngredientUpdateManyWithWhereWithoutIngredientInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => RecipeIngredientScalarWhereInputObjectSchema),
          z.lazy(() => RecipeIngredientScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const RecipeIngredientUpdateManyWithoutIngredientNestedInputObjectSchema: z.ZodType<Prisma.RecipeIngredientUpdateManyWithoutIngredientNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientUpdateManyWithoutIngredientNestedInput>;
export const RecipeIngredientUpdateManyWithoutIngredientNestedInputObjectZodSchema =
  makeSchema();
