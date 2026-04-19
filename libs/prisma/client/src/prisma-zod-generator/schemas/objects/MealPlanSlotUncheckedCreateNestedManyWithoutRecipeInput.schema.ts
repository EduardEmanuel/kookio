import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanSlotCreateWithoutRecipeInputObjectSchema as MealPlanSlotCreateWithoutRecipeInputObjectSchema } from './MealPlanSlotCreateWithoutRecipeInput.schema';
import { MealPlanSlotUncheckedCreateWithoutRecipeInputObjectSchema as MealPlanSlotUncheckedCreateWithoutRecipeInputObjectSchema } from './MealPlanSlotUncheckedCreateWithoutRecipeInput.schema';
import { MealPlanSlotCreateOrConnectWithoutRecipeInputObjectSchema as MealPlanSlotCreateOrConnectWithoutRecipeInputObjectSchema } from './MealPlanSlotCreateOrConnectWithoutRecipeInput.schema';
import { MealPlanSlotCreateManyRecipeInputEnvelopeObjectSchema as MealPlanSlotCreateManyRecipeInputEnvelopeObjectSchema } from './MealPlanSlotCreateManyRecipeInputEnvelope.schema';
import { MealPlanSlotWhereUniqueInputObjectSchema as MealPlanSlotWhereUniqueInputObjectSchema } from './MealPlanSlotWhereUniqueInput.schema';

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
      createMany: z
        .lazy(() => MealPlanSlotCreateManyRecipeInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => MealPlanSlotWhereUniqueInputObjectSchema),
          z.lazy(() => MealPlanSlotWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const MealPlanSlotUncheckedCreateNestedManyWithoutRecipeInputObjectSchema: z.ZodType<Prisma.MealPlanSlotUncheckedCreateNestedManyWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotUncheckedCreateNestedManyWithoutRecipeInput>;
export const MealPlanSlotUncheckedCreateNestedManyWithoutRecipeInputObjectZodSchema =
  makeSchema();
