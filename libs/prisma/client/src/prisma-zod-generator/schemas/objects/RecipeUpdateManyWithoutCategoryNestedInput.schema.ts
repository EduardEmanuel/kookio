import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCreateWithoutCategoryInputObjectSchema as RecipeCreateWithoutCategoryInputObjectSchema } from './RecipeCreateWithoutCategoryInput.schema';
import { RecipeUncheckedCreateWithoutCategoryInputObjectSchema as RecipeUncheckedCreateWithoutCategoryInputObjectSchema } from './RecipeUncheckedCreateWithoutCategoryInput.schema';
import { RecipeCreateOrConnectWithoutCategoryInputObjectSchema as RecipeCreateOrConnectWithoutCategoryInputObjectSchema } from './RecipeCreateOrConnectWithoutCategoryInput.schema';
import { RecipeUpsertWithWhereUniqueWithoutCategoryInputObjectSchema as RecipeUpsertWithWhereUniqueWithoutCategoryInputObjectSchema } from './RecipeUpsertWithWhereUniqueWithoutCategoryInput.schema';
import { RecipeCreateManyCategoryInputEnvelopeObjectSchema as RecipeCreateManyCategoryInputEnvelopeObjectSchema } from './RecipeCreateManyCategoryInputEnvelope.schema';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeUpdateWithWhereUniqueWithoutCategoryInputObjectSchema as RecipeUpdateWithWhereUniqueWithoutCategoryInputObjectSchema } from './RecipeUpdateWithWhereUniqueWithoutCategoryInput.schema';
import { RecipeUpdateManyWithWhereWithoutCategoryInputObjectSchema as RecipeUpdateManyWithWhereWithoutCategoryInputObjectSchema } from './RecipeUpdateManyWithWhereWithoutCategoryInput.schema';
import { RecipeScalarWhereInputObjectSchema as RecipeScalarWhereInputObjectSchema } from './RecipeScalarWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => RecipeCreateWithoutCategoryInputObjectSchema),
          z.lazy(() => RecipeCreateWithoutCategoryInputObjectSchema).array(),
          z.lazy(() => RecipeUncheckedCreateWithoutCategoryInputObjectSchema),
          z
            .lazy(() => RecipeUncheckedCreateWithoutCategoryInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RecipeCreateOrConnectWithoutCategoryInputObjectSchema),
          z
            .lazy(() => RecipeCreateOrConnectWithoutCategoryInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => RecipeUpsertWithWhereUniqueWithoutCategoryInputObjectSchema,
          ),
          z
            .lazy(
              () => RecipeUpsertWithWhereUniqueWithoutCategoryInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RecipeCreateManyCategoryInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => RecipeWhereUniqueInputObjectSchema),
          z.lazy(() => RecipeWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => RecipeWhereUniqueInputObjectSchema),
          z.lazy(() => RecipeWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => RecipeWhereUniqueInputObjectSchema),
          z.lazy(() => RecipeWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => RecipeWhereUniqueInputObjectSchema),
          z.lazy(() => RecipeWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => RecipeUpdateWithWhereUniqueWithoutCategoryInputObjectSchema,
          ),
          z
            .lazy(
              () => RecipeUpdateWithWhereUniqueWithoutCategoryInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => RecipeUpdateManyWithWhereWithoutCategoryInputObjectSchema,
          ),
          z
            .lazy(
              () => RecipeUpdateManyWithWhereWithoutCategoryInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => RecipeScalarWhereInputObjectSchema),
          z.lazy(() => RecipeScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const RecipeUpdateManyWithoutCategoryNestedInputObjectSchema: z.ZodType<Prisma.RecipeUpdateManyWithoutCategoryNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUpdateManyWithoutCategoryNestedInput>;
export const RecipeUpdateManyWithoutCategoryNestedInputObjectZodSchema =
  makeSchema();
