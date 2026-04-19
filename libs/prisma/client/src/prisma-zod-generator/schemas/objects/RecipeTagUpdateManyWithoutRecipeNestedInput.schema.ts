import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeTagCreateWithoutRecipeInputObjectSchema as RecipeTagCreateWithoutRecipeInputObjectSchema } from './RecipeTagCreateWithoutRecipeInput.schema';
import { RecipeTagUncheckedCreateWithoutRecipeInputObjectSchema as RecipeTagUncheckedCreateWithoutRecipeInputObjectSchema } from './RecipeTagUncheckedCreateWithoutRecipeInput.schema';
import { RecipeTagCreateOrConnectWithoutRecipeInputObjectSchema as RecipeTagCreateOrConnectWithoutRecipeInputObjectSchema } from './RecipeTagCreateOrConnectWithoutRecipeInput.schema';
import { RecipeTagUpsertWithWhereUniqueWithoutRecipeInputObjectSchema as RecipeTagUpsertWithWhereUniqueWithoutRecipeInputObjectSchema } from './RecipeTagUpsertWithWhereUniqueWithoutRecipeInput.schema';
import { RecipeTagCreateManyRecipeInputEnvelopeObjectSchema as RecipeTagCreateManyRecipeInputEnvelopeObjectSchema } from './RecipeTagCreateManyRecipeInputEnvelope.schema';
import { RecipeTagWhereUniqueInputObjectSchema as RecipeTagWhereUniqueInputObjectSchema } from './RecipeTagWhereUniqueInput.schema';
import { RecipeTagUpdateWithWhereUniqueWithoutRecipeInputObjectSchema as RecipeTagUpdateWithWhereUniqueWithoutRecipeInputObjectSchema } from './RecipeTagUpdateWithWhereUniqueWithoutRecipeInput.schema';
import { RecipeTagUpdateManyWithWhereWithoutRecipeInputObjectSchema as RecipeTagUpdateManyWithWhereWithoutRecipeInputObjectSchema } from './RecipeTagUpdateManyWithWhereWithoutRecipeInput.schema';
import { RecipeTagScalarWhereInputObjectSchema as RecipeTagScalarWhereInputObjectSchema } from './RecipeTagScalarWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => RecipeTagCreateWithoutRecipeInputObjectSchema),
          z.lazy(() => RecipeTagCreateWithoutRecipeInputObjectSchema).array(),
          z.lazy(() => RecipeTagUncheckedCreateWithoutRecipeInputObjectSchema),
          z
            .lazy(() => RecipeTagUncheckedCreateWithoutRecipeInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RecipeTagCreateOrConnectWithoutRecipeInputObjectSchema),
          z
            .lazy(() => RecipeTagCreateOrConnectWithoutRecipeInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => RecipeTagUpsertWithWhereUniqueWithoutRecipeInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeTagUpsertWithWhereUniqueWithoutRecipeInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RecipeTagCreateManyRecipeInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => RecipeTagWhereUniqueInputObjectSchema),
          z.lazy(() => RecipeTagWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => RecipeTagWhereUniqueInputObjectSchema),
          z.lazy(() => RecipeTagWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => RecipeTagWhereUniqueInputObjectSchema),
          z.lazy(() => RecipeTagWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => RecipeTagWhereUniqueInputObjectSchema),
          z.lazy(() => RecipeTagWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => RecipeTagUpdateWithWhereUniqueWithoutRecipeInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                RecipeTagUpdateWithWhereUniqueWithoutRecipeInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => RecipeTagUpdateManyWithWhereWithoutRecipeInputObjectSchema,
          ),
          z
            .lazy(
              () => RecipeTagUpdateManyWithWhereWithoutRecipeInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => RecipeTagScalarWhereInputObjectSchema),
          z.lazy(() => RecipeTagScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const RecipeTagUpdateManyWithoutRecipeNestedInputObjectSchema: z.ZodType<Prisma.RecipeTagUpdateManyWithoutRecipeNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeTagUpdateManyWithoutRecipeNestedInput>;
export const RecipeTagUpdateManyWithoutRecipeNestedInputObjectZodSchema =
  makeSchema();
