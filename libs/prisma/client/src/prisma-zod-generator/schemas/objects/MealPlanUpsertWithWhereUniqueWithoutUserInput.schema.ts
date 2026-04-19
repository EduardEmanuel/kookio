import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanWhereUniqueInputObjectSchema as MealPlanWhereUniqueInputObjectSchema } from './MealPlanWhereUniqueInput.schema';
import { MealPlanUpdateWithoutUserInputObjectSchema as MealPlanUpdateWithoutUserInputObjectSchema } from './MealPlanUpdateWithoutUserInput.schema';
import { MealPlanUncheckedUpdateWithoutUserInputObjectSchema as MealPlanUncheckedUpdateWithoutUserInputObjectSchema } from './MealPlanUncheckedUpdateWithoutUserInput.schema';
import { MealPlanCreateWithoutUserInputObjectSchema as MealPlanCreateWithoutUserInputObjectSchema } from './MealPlanCreateWithoutUserInput.schema';
import { MealPlanUncheckedCreateWithoutUserInputObjectSchema as MealPlanUncheckedCreateWithoutUserInputObjectSchema } from './MealPlanUncheckedCreateWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => MealPlanWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => MealPlanUpdateWithoutUserInputObjectSchema),
        z.lazy(() => MealPlanUncheckedUpdateWithoutUserInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => MealPlanCreateWithoutUserInputObjectSchema),
        z.lazy(() => MealPlanUncheckedCreateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const MealPlanUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.MealPlanUpsertWithWhereUniqueWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanUpsertWithWhereUniqueWithoutUserInput>;
export const MealPlanUpsertWithWhereUniqueWithoutUserInputObjectZodSchema =
  makeSchema();
