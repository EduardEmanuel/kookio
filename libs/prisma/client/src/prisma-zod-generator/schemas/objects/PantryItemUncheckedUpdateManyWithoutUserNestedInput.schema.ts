import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PantryItemCreateWithoutUserInputObjectSchema as PantryItemCreateWithoutUserInputObjectSchema } from './PantryItemCreateWithoutUserInput.schema';
import { PantryItemUncheckedCreateWithoutUserInputObjectSchema as PantryItemUncheckedCreateWithoutUserInputObjectSchema } from './PantryItemUncheckedCreateWithoutUserInput.schema';
import { PantryItemCreateOrConnectWithoutUserInputObjectSchema as PantryItemCreateOrConnectWithoutUserInputObjectSchema } from './PantryItemCreateOrConnectWithoutUserInput.schema';
import { PantryItemUpsertWithWhereUniqueWithoutUserInputObjectSchema as PantryItemUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './PantryItemUpsertWithWhereUniqueWithoutUserInput.schema';
import { PantryItemCreateManyUserInputEnvelopeObjectSchema as PantryItemCreateManyUserInputEnvelopeObjectSchema } from './PantryItemCreateManyUserInputEnvelope.schema';
import { PantryItemWhereUniqueInputObjectSchema as PantryItemWhereUniqueInputObjectSchema } from './PantryItemWhereUniqueInput.schema';
import { PantryItemUpdateWithWhereUniqueWithoutUserInputObjectSchema as PantryItemUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './PantryItemUpdateWithWhereUniqueWithoutUserInput.schema';
import { PantryItemUpdateManyWithWhereWithoutUserInputObjectSchema as PantryItemUpdateManyWithWhereWithoutUserInputObjectSchema } from './PantryItemUpdateManyWithWhereWithoutUserInput.schema';
import { PantryItemScalarWhereInputObjectSchema as PantryItemScalarWhereInputObjectSchema } from './PantryItemScalarWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => PantryItemCreateWithoutUserInputObjectSchema),
          z.lazy(() => PantryItemCreateWithoutUserInputObjectSchema).array(),
          z.lazy(() => PantryItemUncheckedCreateWithoutUserInputObjectSchema),
          z
            .lazy(() => PantryItemUncheckedCreateWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PantryItemCreateOrConnectWithoutUserInputObjectSchema),
          z
            .lazy(() => PantryItemCreateOrConnectWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => PantryItemUpsertWithWhereUniqueWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () => PantryItemUpsertWithWhereUniqueWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PantryItemCreateManyUserInputEnvelopeObjectSchema)
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
            () => PantryItemUpdateWithWhereUniqueWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () => PantryItemUpdateWithWhereUniqueWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => PantryItemUpdateManyWithWhereWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () => PantryItemUpdateManyWithWhereWithoutUserInputObjectSchema,
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
export const PantryItemUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.PantryItemUncheckedUpdateManyWithoutUserNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemUncheckedUpdateManyWithoutUserNestedInput>;
export const PantryItemUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema =
  makeSchema();
