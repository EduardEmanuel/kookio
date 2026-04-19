import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanCreateWithoutUserInputObjectSchema as MealPlanCreateWithoutUserInputObjectSchema } from './MealPlanCreateWithoutUserInput.schema';
import { MealPlanUncheckedCreateWithoutUserInputObjectSchema as MealPlanUncheckedCreateWithoutUserInputObjectSchema } from './MealPlanUncheckedCreateWithoutUserInput.schema';
import { MealPlanCreateOrConnectWithoutUserInputObjectSchema as MealPlanCreateOrConnectWithoutUserInputObjectSchema } from './MealPlanCreateOrConnectWithoutUserInput.schema';
import { MealPlanCreateManyUserInputEnvelopeObjectSchema as MealPlanCreateManyUserInputEnvelopeObjectSchema } from './MealPlanCreateManyUserInputEnvelope.schema';
import { MealPlanWhereUniqueInputObjectSchema as MealPlanWhereUniqueInputObjectSchema } from './MealPlanWhereUniqueInput.schema';

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
      createMany: z
        .lazy(() => MealPlanCreateManyUserInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => MealPlanWhereUniqueInputObjectSchema),
          z.lazy(() => MealPlanWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();
export const MealPlanUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.MealPlanUncheckedCreateNestedManyWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanUncheckedCreateNestedManyWithoutUserInput>;
export const MealPlanUncheckedCreateNestedManyWithoutUserInputObjectZodSchema =
  makeSchema();
