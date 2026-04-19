import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanSlotCreateWithoutMealPlanInputObjectSchema as MealPlanSlotCreateWithoutMealPlanInputObjectSchema } from './MealPlanSlotCreateWithoutMealPlanInput.schema';
import { MealPlanSlotUncheckedCreateWithoutMealPlanInputObjectSchema as MealPlanSlotUncheckedCreateWithoutMealPlanInputObjectSchema } from './MealPlanSlotUncheckedCreateWithoutMealPlanInput.schema';
import { MealPlanSlotCreateOrConnectWithoutMealPlanInputObjectSchema as MealPlanSlotCreateOrConnectWithoutMealPlanInputObjectSchema } from './MealPlanSlotCreateOrConnectWithoutMealPlanInput.schema';
import { MealPlanSlotCreateManyMealPlanInputEnvelopeObjectSchema as MealPlanSlotCreateManyMealPlanInputEnvelopeObjectSchema } from './MealPlanSlotCreateManyMealPlanInputEnvelope.schema';
import { MealPlanSlotWhereUniqueInputObjectSchema as MealPlanSlotWhereUniqueInputObjectSchema } from './MealPlanSlotWhereUniqueInput.schema';

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
      createMany: z
        .lazy(() => MealPlanSlotCreateManyMealPlanInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => MealPlanSlotWhereUniqueInputObjectSchema),
          z.lazy(() => MealPlanSlotWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const MealPlanSlotCreateNestedManyWithoutMealPlanInputObjectSchema: z.ZodType<Prisma.MealPlanSlotCreateNestedManyWithoutMealPlanInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotCreateNestedManyWithoutMealPlanInput>;
export const MealPlanSlotCreateNestedManyWithoutMealPlanInputObjectZodSchema =
  makeSchema();
