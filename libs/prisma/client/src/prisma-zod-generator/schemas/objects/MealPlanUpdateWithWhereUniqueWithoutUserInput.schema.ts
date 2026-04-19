import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanWhereUniqueInputObjectSchema as MealPlanWhereUniqueInputObjectSchema } from './MealPlanWhereUniqueInput.schema';
import { MealPlanUpdateWithoutUserInputObjectSchema as MealPlanUpdateWithoutUserInputObjectSchema } from './MealPlanUpdateWithoutUserInput.schema';
import { MealPlanUncheckedUpdateWithoutUserInputObjectSchema as MealPlanUncheckedUpdateWithoutUserInputObjectSchema } from './MealPlanUncheckedUpdateWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => MealPlanWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => MealPlanUpdateWithoutUserInputObjectSchema),
        z.lazy(() => MealPlanUncheckedUpdateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const MealPlanUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.MealPlanUpdateWithWhereUniqueWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanUpdateWithWhereUniqueWithoutUserInput>;
export const MealPlanUpdateWithWhereUniqueWithoutUserInputObjectZodSchema =
  makeSchema();
