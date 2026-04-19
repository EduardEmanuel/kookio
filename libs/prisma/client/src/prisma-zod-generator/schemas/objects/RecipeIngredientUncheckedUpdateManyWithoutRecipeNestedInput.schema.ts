import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeIngredientCreateWithoutRecipeInputObjectSchema as RecipeIngredientCreateWithoutRecipeInputObjectSchema } from './RecipeIngredientCreateWithoutRecipeInput.schema';
import { RecipeIngredientUncheckedCreateWithoutRecipeInputObjectSchema as RecipeIngredientUncheckedCreateWithoutRecipeInputObjectSchema } from './RecipeIngredientUncheckedCreateWithoutRecipeInput.schema';
import { RecipeIngredientCreateOrConnectWithoutRecipeInputObjectSchema as RecipeIngredientCreateOrConnectWithoutRecipeInputObjectSchema } from './RecipeIngredientCreateOrConnectWithoutRecipeInput.schema';
import { RecipeIngredientUpsertWithWhereUniqueWithoutRecipeInputObjectSchema as RecipeIngredientUpsertWithWhereUniqueWithoutRecipeInputObjectSchema } from './RecipeIngredientUpsertWithWhereUniqueWithoutRecipeInput.schema';
import { RecipeIngredientCreateManyRecipeInputEnvelopeObjectSchema as RecipeIngredientCreateManyRecipeInputEnvelopeObjectSchema } from './RecipeIngredientCreateManyRecipeInputEnvelope.schema';
import { RecipeIngredientWhereUniqueInputObjectSchema as RecipeIngredientWhereUniqueInputObjectSchema } from './RecipeIngredientWhereUniqueInput.schema';
import { RecipeIngredientUpdateWithWhereUniqueWithoutRecipeInputObjectSchema as RecipeIngredientUpdateWithWhereUniqueWithoutRecipeInputObjectSchema } from './RecipeIngredientUpdateWithWhereUniqueWithoutRecipeInput.schema';
import { RecipeIngredientUpdateManyWithWhereWithoutRecipeInputObjectSchema as RecipeIngredientUpdateManyWithWhereWithoutRecipeInputObjectSchema } from './RecipeIngredientUpdateManyWithWhereWithoutRecipeInput.schema';
import { RecipeIngredientScalarWhereInputObjectSchema as RecipeIngredientScalarWhereInputObjectSchema } from './RecipeIngredientScalarWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => RecipeIngredientCreateWithoutRecipeInputObjectSchema),
          z
            .lazy(() => RecipeIngredientCreateWithoutRecipeInputObjectSchema)
            .array(),
          z.lazy(
            () => RecipeIngredientUncheckedCreateWithoutRecipeInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeIngredientUncheckedCreateWithoutRecipeInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => RecipeIngredientCreateOrConnectWithoutRecipeInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeIngredientCreateOrConnectWithoutRecipeInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              RecipeIngredientUpsertWithWhereUniqueWithoutRecipeInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeIngredientUpsertWithWhereUniqueWithoutRecipeInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RecipeIngredientCreateManyRecipeInputEnvelopeObjectSchema)
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
              RecipeIngredientUpdateWithWhereUniqueWithoutRecipeInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeIngredientUpdateWithWhereUniqueWithoutRecipeInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              RecipeIngredientUpdateManyWithWhereWithoutRecipeInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeIngredientUpdateManyWithWhereWithoutRecipeInputObjectSchema,
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
export const RecipeIngredientUncheckedUpdateManyWithoutRecipeNestedInputObjectSchema: z.ZodType<Prisma.RecipeIngredientUncheckedUpdateManyWithoutRecipeNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeIngredientUncheckedUpdateManyWithoutRecipeNestedInput>;
export const RecipeIngredientUncheckedUpdateManyWithoutRecipeNestedInputObjectZodSchema =
  makeSchema();
