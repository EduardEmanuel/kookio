import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCreateWithoutAreaInputObjectSchema as RecipeCreateWithoutAreaInputObjectSchema } from './RecipeCreateWithoutAreaInput.schema';
import { RecipeUncheckedCreateWithoutAreaInputObjectSchema as RecipeUncheckedCreateWithoutAreaInputObjectSchema } from './RecipeUncheckedCreateWithoutAreaInput.schema';
import { RecipeCreateOrConnectWithoutAreaInputObjectSchema as RecipeCreateOrConnectWithoutAreaInputObjectSchema } from './RecipeCreateOrConnectWithoutAreaInput.schema';
import { RecipeUpsertWithWhereUniqueWithoutAreaInputObjectSchema as RecipeUpsertWithWhereUniqueWithoutAreaInputObjectSchema } from './RecipeUpsertWithWhereUniqueWithoutAreaInput.schema';
import { RecipeCreateManyAreaInputEnvelopeObjectSchema as RecipeCreateManyAreaInputEnvelopeObjectSchema } from './RecipeCreateManyAreaInputEnvelope.schema';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeUpdateWithWhereUniqueWithoutAreaInputObjectSchema as RecipeUpdateWithWhereUniqueWithoutAreaInputObjectSchema } from './RecipeUpdateWithWhereUniqueWithoutAreaInput.schema';
import { RecipeUpdateManyWithWhereWithoutAreaInputObjectSchema as RecipeUpdateManyWithWhereWithoutAreaInputObjectSchema } from './RecipeUpdateManyWithWhereWithoutAreaInput.schema';
import { RecipeScalarWhereInputObjectSchema as RecipeScalarWhereInputObjectSchema } from './RecipeScalarWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => RecipeCreateWithoutAreaInputObjectSchema),
          z.lazy(() => RecipeCreateWithoutAreaInputObjectSchema).array(),
          z.lazy(() => RecipeUncheckedCreateWithoutAreaInputObjectSchema),
          z
            .lazy(() => RecipeUncheckedCreateWithoutAreaInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RecipeCreateOrConnectWithoutAreaInputObjectSchema),
          z
            .lazy(() => RecipeCreateOrConnectWithoutAreaInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => RecipeUpsertWithWhereUniqueWithoutAreaInputObjectSchema),
          z
            .lazy(() => RecipeUpsertWithWhereUniqueWithoutAreaInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RecipeCreateManyAreaInputEnvelopeObjectSchema)
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
          z.lazy(() => RecipeUpdateWithWhereUniqueWithoutAreaInputObjectSchema),
          z
            .lazy(() => RecipeUpdateWithWhereUniqueWithoutAreaInputObjectSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => RecipeUpdateManyWithWhereWithoutAreaInputObjectSchema),
          z
            .lazy(() => RecipeUpdateManyWithWhereWithoutAreaInputObjectSchema)
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
export const RecipeUncheckedUpdateManyWithoutAreaNestedInputObjectSchema: z.ZodType<Prisma.RecipeUncheckedUpdateManyWithoutAreaNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUncheckedUpdateManyWithoutAreaNestedInput>;
export const RecipeUncheckedUpdateManyWithoutAreaNestedInputObjectZodSchema =
  makeSchema();
