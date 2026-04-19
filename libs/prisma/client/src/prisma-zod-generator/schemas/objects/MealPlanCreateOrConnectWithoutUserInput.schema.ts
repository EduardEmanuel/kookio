import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanWhereUniqueInputObjectSchema as MealPlanWhereUniqueInputObjectSchema } from './MealPlanWhereUniqueInput.schema';
import { MealPlanCreateWithoutUserInputObjectSchema as MealPlanCreateWithoutUserInputObjectSchema } from './MealPlanCreateWithoutUserInput.schema';
import { MealPlanUncheckedCreateWithoutUserInputObjectSchema as MealPlanUncheckedCreateWithoutUserInputObjectSchema } from './MealPlanUncheckedCreateWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => MealPlanWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => MealPlanCreateWithoutUserInputObjectSchema),
        z.lazy(() => MealPlanUncheckedCreateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const MealPlanCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.MealPlanCreateOrConnectWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanCreateOrConnectWithoutUserInput>;
export const MealPlanCreateOrConnectWithoutUserInputObjectZodSchema =
  makeSchema();
