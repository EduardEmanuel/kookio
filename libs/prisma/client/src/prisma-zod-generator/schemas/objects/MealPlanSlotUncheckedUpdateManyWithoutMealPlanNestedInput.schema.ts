import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanSlotCreateWithoutMealPlanInputObjectSchema as MealPlanSlotCreateWithoutMealPlanInputObjectSchema } from './MealPlanSlotCreateWithoutMealPlanInput.schema';
import { MealPlanSlotUncheckedCreateWithoutMealPlanInputObjectSchema as MealPlanSlotUncheckedCreateWithoutMealPlanInputObjectSchema } from './MealPlanSlotUncheckedCreateWithoutMealPlanInput.schema';
import { MealPlanSlotCreateOrConnectWithoutMealPlanInputObjectSchema as MealPlanSlotCreateOrConnectWithoutMealPlanInputObjectSchema } from './MealPlanSlotCreateOrConnectWithoutMealPlanInput.schema';
import { MealPlanSlotUpsertWithWhereUniqueWithoutMealPlanInputObjectSchema as MealPlanSlotUpsertWithWhereUniqueWithoutMealPlanInputObjectSchema } from './MealPlanSlotUpsertWithWhereUniqueWithoutMealPlanInput.schema';
import { MealPlanSlotCreateManyMealPlanInputEnvelopeObjectSchema as MealPlanSlotCreateManyMealPlanInputEnvelopeObjectSchema } from './MealPlanSlotCreateManyMealPlanInputEnvelope.schema';
import { MealPlanSlotWhereUniqueInputObjectSchema as MealPlanSlotWhereUniqueInputObjectSchema } from './MealPlanSlotWhereUniqueInput.schema';
import { MealPlanSlotUpdateWithWhereUniqueWithoutMealPlanInputObjectSchema as MealPlanSlotUpdateWithWhereUniqueWithoutMealPlanInputObjectSchema } from './MealPlanSlotUpdateWithWhereUniqueWithoutMealPlanInput.schema';
import { MealPlanSlotUpdateManyWithWhereWithoutMealPlanInputObjectSchema as MealPlanSlotUpdateManyWithWhereWithoutMealPlanInputObjectSchema } from './MealPlanSlotUpdateManyWithWhereWithoutMealPlanInput.schema';
import { MealPlanSlotScalarWhereInputObjectSchema as MealPlanSlotScalarWhereInputObjectSchema } from './MealPlanSlotScalarWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => MealPlanSlotCreateWithoutMealPlanInputObjectSchema),
          z
            .lazy(() => MealPlanSlotCreateWithoutMealPlanInputObjectSchema)
            .array(),
          z.lazy(
            () => MealPlanSlotUncheckedCreateWithoutMealPlanInputObjectSchema,
          ),
          z
            .lazy(
              () => MealPlanSlotUncheckedCreateWithoutMealPlanInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => MealPlanSlotCreateOrConnectWithoutMealPlanInputObjectSchema,
          ),
          z
            .lazy(
              () => MealPlanSlotCreateOrConnectWithoutMealPlanInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              MealPlanSlotUpsertWithWhereUniqueWithoutMealPlanInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                MealPlanSlotUpsertWithWhereUniqueWithoutMealPlanInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MealPlanSlotCreateManyMealPlanInputEnvelopeObjectSchema)
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
              MealPlanSlotUpdateWithWhereUniqueWithoutMealPlanInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                MealPlanSlotUpdateWithWhereUniqueWithoutMealPlanInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              MealPlanSlotUpdateManyWithWhereWithoutMealPlanInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                MealPlanSlotUpdateManyWithWhereWithoutMealPlanInputObjectSchema,
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
export const MealPlanSlotUncheckedUpdateManyWithoutMealPlanNestedInputObjectSchema: z.ZodType<Prisma.MealPlanSlotUncheckedUpdateManyWithoutMealPlanNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotUncheckedUpdateManyWithoutMealPlanNestedInput>;
export const MealPlanSlotUncheckedUpdateManyWithoutMealPlanNestedInputObjectZodSchema =
  makeSchema();
