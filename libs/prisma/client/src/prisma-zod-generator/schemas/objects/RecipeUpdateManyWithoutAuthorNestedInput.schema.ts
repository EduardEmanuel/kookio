import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCreateWithoutAuthorInputObjectSchema as RecipeCreateWithoutAuthorInputObjectSchema } from './RecipeCreateWithoutAuthorInput.schema';
import { RecipeUncheckedCreateWithoutAuthorInputObjectSchema as RecipeUncheckedCreateWithoutAuthorInputObjectSchema } from './RecipeUncheckedCreateWithoutAuthorInput.schema';
import { RecipeCreateOrConnectWithoutAuthorInputObjectSchema as RecipeCreateOrConnectWithoutAuthorInputObjectSchema } from './RecipeCreateOrConnectWithoutAuthorInput.schema';
import { RecipeUpsertWithWhereUniqueWithoutAuthorInputObjectSchema as RecipeUpsertWithWhereUniqueWithoutAuthorInputObjectSchema } from './RecipeUpsertWithWhereUniqueWithoutAuthorInput.schema';
import { RecipeCreateManyAuthorInputEnvelopeObjectSchema as RecipeCreateManyAuthorInputEnvelopeObjectSchema } from './RecipeCreateManyAuthorInputEnvelope.schema';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeUpdateWithWhereUniqueWithoutAuthorInputObjectSchema as RecipeUpdateWithWhereUniqueWithoutAuthorInputObjectSchema } from './RecipeUpdateWithWhereUniqueWithoutAuthorInput.schema';
import { RecipeUpdateManyWithWhereWithoutAuthorInputObjectSchema as RecipeUpdateManyWithWhereWithoutAuthorInputObjectSchema } from './RecipeUpdateManyWithWhereWithoutAuthorInput.schema';
import { RecipeScalarWhereInputObjectSchema as RecipeScalarWhereInputObjectSchema } from './RecipeScalarWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => RecipeCreateWithoutAuthorInputObjectSchema),
          z.lazy(() => RecipeCreateWithoutAuthorInputObjectSchema).array(),
          z.lazy(() => RecipeUncheckedCreateWithoutAuthorInputObjectSchema),
          z
            .lazy(() => RecipeUncheckedCreateWithoutAuthorInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RecipeCreateOrConnectWithoutAuthorInputObjectSchema),
          z
            .lazy(() => RecipeCreateOrConnectWithoutAuthorInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => RecipeUpsertWithWhereUniqueWithoutAuthorInputObjectSchema,
          ),
          z
            .lazy(
              () => RecipeUpsertWithWhereUniqueWithoutAuthorInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RecipeCreateManyAuthorInputEnvelopeObjectSchema)
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
            () => RecipeUpdateWithWhereUniqueWithoutAuthorInputObjectSchema,
          ),
          z
            .lazy(
              () => RecipeUpdateWithWhereUniqueWithoutAuthorInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => RecipeUpdateManyWithWhereWithoutAuthorInputObjectSchema),
          z
            .lazy(() => RecipeUpdateManyWithWhereWithoutAuthorInputObjectSchema)
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
export const RecipeUpdateManyWithoutAuthorNestedInputObjectSchema: z.ZodType<Prisma.RecipeUpdateManyWithoutAuthorNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUpdateManyWithoutAuthorNestedInput>;
export const RecipeUpdateManyWithoutAuthorNestedInputObjectZodSchema =
  makeSchema();
