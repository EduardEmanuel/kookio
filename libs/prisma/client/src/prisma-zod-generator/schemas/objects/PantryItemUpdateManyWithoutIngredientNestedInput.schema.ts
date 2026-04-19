import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PantryItemCreateWithoutIngredientInputObjectSchema as PantryItemCreateWithoutIngredientInputObjectSchema } from './PantryItemCreateWithoutIngredientInput.schema';
import { PantryItemUncheckedCreateWithoutIngredientInputObjectSchema as PantryItemUncheckedCreateWithoutIngredientInputObjectSchema } from './PantryItemUncheckedCreateWithoutIngredientInput.schema';
import { PantryItemCreateOrConnectWithoutIngredientInputObjectSchema as PantryItemCreateOrConnectWithoutIngredientInputObjectSchema } from './PantryItemCreateOrConnectWithoutIngredientInput.schema';
import { PantryItemUpsertWithWhereUniqueWithoutIngredientInputObjectSchema as PantryItemUpsertWithWhereUniqueWithoutIngredientInputObjectSchema } from './PantryItemUpsertWithWhereUniqueWithoutIngredientInput.schema';
import { PantryItemCreateManyIngredientInputEnvelopeObjectSchema as PantryItemCreateManyIngredientInputEnvelopeObjectSchema } from './PantryItemCreateManyIngredientInputEnvelope.schema';
import { PantryItemWhereUniqueInputObjectSchema as PantryItemWhereUniqueInputObjectSchema } from './PantryItemWhereUniqueInput.schema';
import { PantryItemUpdateWithWhereUniqueWithoutIngredientInputObjectSchema as PantryItemUpdateWithWhereUniqueWithoutIngredientInputObjectSchema } from './PantryItemUpdateWithWhereUniqueWithoutIngredientInput.schema';
import { PantryItemUpdateManyWithWhereWithoutIngredientInputObjectSchema as PantryItemUpdateManyWithWhereWithoutIngredientInputObjectSchema } from './PantryItemUpdateManyWithWhereWithoutIngredientInput.schema';
import { PantryItemScalarWhereInputObjectSchema as PantryItemScalarWhereInputObjectSchema } from './PantryItemScalarWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => PantryItemCreateWithoutIngredientInputObjectSchema),
          z
            .lazy(() => PantryItemCreateWithoutIngredientInputObjectSchema)
            .array(),
          z.lazy(
            () => PantryItemUncheckedCreateWithoutIngredientInputObjectSchema,
          ),
          z
            .lazy(
              () => PantryItemUncheckedCreateWithoutIngredientInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => PantryItemCreateOrConnectWithoutIngredientInputObjectSchema,
          ),
          z
            .lazy(
              () => PantryItemCreateOrConnectWithoutIngredientInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              PantryItemUpsertWithWhereUniqueWithoutIngredientInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                PantryItemUpsertWithWhereUniqueWithoutIngredientInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PantryItemCreateManyIngredientInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => PantryItemWhereUniqueInputObjectSchema),
          z.lazy(() => PantryItemWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => PantryItemWhereUniqueInputObjectSchema),
          z.lazy(() => PantryItemWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => PantryItemWhereUniqueInputObjectSchema),
          z.lazy(() => PantryItemWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PantryItemWhereUniqueInputObjectSchema),
          z.lazy(() => PantryItemWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              PantryItemUpdateWithWhereUniqueWithoutIngredientInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                PantryItemUpdateWithWhereUniqueWithoutIngredientInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              PantryItemUpdateManyWithWhereWithoutIngredientInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                PantryItemUpdateManyWithWhereWithoutIngredientInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => PantryItemScalarWhereInputObjectSchema),
          z.lazy(() => PantryItemScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const PantryItemUpdateManyWithoutIngredientNestedInputObjectSchema: z.ZodType<Prisma.PantryItemUpdateManyWithoutIngredientNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemUpdateManyWithoutIngredientNestedInput>;
export const PantryItemUpdateManyWithoutIngredientNestedInputObjectZodSchema =
  makeSchema();
