import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanScalarWhereInputObjectSchema as MealPlanScalarWhereInputObjectSchema } from './MealPlanScalarWhereInput.schema';
import { MealPlanUpdateManyMutationInputObjectSchema as MealPlanUpdateManyMutationInputObjectSchema } from './MealPlanUpdateManyMutationInput.schema';
import { MealPlanUncheckedUpdateManyWithoutUserInputObjectSchema as MealPlanUncheckedUpdateManyWithoutUserInputObjectSchema } from './MealPlanUncheckedUpdateManyWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => MealPlanScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => MealPlanUpdateManyMutationInputObjectSchema),
        z.lazy(() => MealPlanUncheckedUpdateManyWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const MealPlanUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.MealPlanUpdateManyWithWhereWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanUpdateManyWithWhereWithoutUserInput>;
export const MealPlanUpdateManyWithWhereWithoutUserInputObjectZodSchema =
  makeSchema();
