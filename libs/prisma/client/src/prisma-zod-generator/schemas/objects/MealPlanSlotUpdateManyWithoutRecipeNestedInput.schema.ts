import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanSlotCreateWithoutRecipeInputObjectSchema as MealPlanSlotCreateWithoutRecipeInputObjectSchema } from './MealPlanSlotCreateWithoutRecipeInput.schema';
import { MealPlanSlotUncheckedCreateWithoutRecipeInputObjectSchema as MealPlanSlotUncheckedCreateWithoutRecipeInputObjectSchema } from './MealPlanSlotUncheckedCreateWithoutRecipeInput.schema';
import { MealPlanSlotCreateOrConnectWithoutRecipeInputObjectSchema as MealPlanSlotCreateOrConnectWithoutRecipeInputObjectSchema } from './MealPlanSlotCreateOrConnectWithoutRecipeInput.schema';
import { MealPlanSlotUpsertWithWhereUniqueWithoutRecipeInputObjectSchema as MealPlanSlotUpsertWithWhereUniqueWithoutRecipeInputObjectSchema } from './MealPlanSlotUpsertWithWhereUniqueWithoutRecipeInput.schema';
import { MealPlanSlotCreateManyRecipeInputEnvelopeObjectSchema as MealPlanSlotCreateManyRecipeInputEnvelopeObjectSchema } from './MealPlanSlotCreateManyRecipeInputEnvelope.schema';
import { MealPlanSlotWhereUniqueInputObjectSchema as MealPlanSlotWhereUniqueInputObjectSchema } from './MealPlanSlotWhereUniqueInput.schema';
import { MealPlanSlotUpdateWithWhereUniqueWithoutRecipeInputObjectSchema as MealPlanSlotUpdateWithWhereUniqueWithoutRecipeInputObjectSchema } from './MealPlanSlotUpdateWithWhereUniqueWithoutRecipeInput.schema';
import { MealPlanSlotUpdateManyWithWhereWithoutRecipeInputObjectSchema as MealPlanSlotUpdateManyWithWhereWithoutRecipeInputObjectSchema } from './MealPlanSlotUpdateManyWithWhereWithoutRecipeInput.schema';
import { MealPlanSlotScalarWhereInputObjectSchema as MealPlanSlotScalarWhereInputObjectSchema } from './MealPlanSlotScalarWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => MealPlanSlotCreateWithoutRecipeInputObjectSchema),
          z
            .lazy(() => MealPlanSlotCreateWithoutRecipeInputObjectSchema)
            .array(),
          z.lazy(
            () => MealPlanSlotUncheckedCreateWithoutRecipeInputObjectSchema,
          ),
          z
            .lazy(
              () => MealPlanSlotUncheckedCreateWithoutRecipeInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => MealPlanSlotCreateOrConnectWithoutRecipeInputObjectSchema,
          ),
          z
            .lazy(
              () => MealPlanSlotCreateOrConnectWithoutRecipeInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              MealPlanSlotUpsertWithWhereUniqueWithoutRecipeInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                MealPlanSlotUpsertWithWhereUniqueWithoutRecipeInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MealPlanSlotCreateManyRecipeInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => MealPlanSlotWhereUniqueInputObjectSchema),
          z.lazy(() => MealPlanSlotWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => MealPlanSlotWhereUniqueInputObjectSchema),
          z.lazy(() => MealPlanSlotWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => MealPlanSlotWhereUniqueInputObjectSchema),
          z.lazy(() => MealPlanSlotWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => MealPlanSlotWhereUniqueInputObjectSchema),
          z.lazy(() => MealPlanSlotWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              MealPlanSlotUpdateWithWhereUniqueWithoutRecipeInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                MealPlanSlotUpdateWithWhereUniqueWithoutRecipeInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => MealPlanSlotUpdateManyWithWhereWithoutRecipeInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                MealPlanSlotUpdateManyWithWhereWithoutRecipeInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => MealPlanSlotScalarWhereInputObjectSchema),
          z.lazy(() => MealPlanSlotScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const MealPlanSlotUpdateManyWithoutRecipeNestedInputObjectSchema: z.ZodType<Prisma.MealPlanSlotUpdateManyWithoutRecipeNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotUpdateManyWithoutRecipeNestedInput>;
export const MealPlanSlotUpdateManyWithoutRecipeNestedInputObjectZodSchema =
  makeSchema();
