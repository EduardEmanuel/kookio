import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanCreateWithoutUserInputObjectSchema as MealPlanCreateWithoutUserInputObjectSchema } from './MealPlanCreateWithoutUserInput.schema';
import { MealPlanUncheckedCreateWithoutUserInputObjectSchema as MealPlanUncheckedCreateWithoutUserInputObjectSchema } from './MealPlanUncheckedCreateWithoutUserInput.schema';
import { MealPlanCreateOrConnectWithoutUserInputObjectSchema as MealPlanCreateOrConnectWithoutUserInputObjectSchema } from './MealPlanCreateOrConnectWithoutUserInput.schema';
import { MealPlanUpsertWithWhereUniqueWithoutUserInputObjectSchema as MealPlanUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './MealPlanUpsertWithWhereUniqueWithoutUserInput.schema';
import { MealPlanCreateManyUserInputEnvelopeObjectSchema as MealPlanCreateManyUserInputEnvelopeObjectSchema } from './MealPlanCreateManyUserInputEnvelope.schema';
import { MealPlanWhereUniqueInputObjectSchema as MealPlanWhereUniqueInputObjectSchema } from './MealPlanWhereUniqueInput.schema';
import { MealPlanUpdateWithWhereUniqueWithoutUserInputObjectSchema as MealPlanUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './MealPlanUpdateWithWhereUniqueWithoutUserInput.schema';
import { MealPlanUpdateManyWithWhereWithoutUserInputObjectSchema as MealPlanUpdateManyWithWhereWithoutUserInputObjectSchema } from './MealPlanUpdateManyWithWhereWithoutUserInput.schema';
import { MealPlanScalarWhereInputObjectSchema as MealPlanScalarWhereInputObjectSchema } from './MealPlanScalarWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => MealPlanCreateWithoutUserInputObjectSchema),
          z.lazy(() => MealPlanCreateWithoutUserInputObjectSchema).array(),
          z.lazy(() => MealPlanUncheckedCreateWithoutUserInputObjectSchema),
          z
            .lazy(() => MealPlanUncheckedCreateWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MealPlanCreateOrConnectWithoutUserInputObjectSchema),
          z
            .lazy(() => MealPlanCreateOrConnectWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => MealPlanUpsertWithWhereUniqueWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () => MealPlanUpsertWithWhereUniqueWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MealPlanCreateManyUserInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => MealPlanWhereUniqueInputObjectSchema),
          z.lazy(() => MealPlanWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => MealPlanWhereUniqueInputObjectSchema),
          z.lazy(() => MealPlanWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => MealPlanWhereUniqueInputObjectSchema),
          z.lazy(() => MealPlanWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => MealPlanWhereUniqueInputObjectSchema),
          z.lazy(() => MealPlanWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => MealPlanUpdateWithWhereUniqueWithoutUserInputObjectSchema,
          ),
          z
            .lazy(
              () => MealPlanUpdateWithWhereUniqueWithoutUserInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => MealPlanUpdateManyWithWhereWithoutUserInputObjectSchema),
          z
            .lazy(() => MealPlanUpdateManyWithWhereWithoutUserInputObjectSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => MealPlanScalarWhereInputObjectSchema),
          z.lazy(() => MealPlanScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const MealPlanUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.MealPlanUncheckedUpdateManyWithoutUserNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanUncheckedUpdateManyWithoutUserNestedInput>;
export const MealPlanUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema =
  makeSchema();
