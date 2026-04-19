import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanSlotScalarWhereInputObjectSchema as MealPlanSlotScalarWhereInputObjectSchema } from './MealPlanSlotScalarWhereInput.schema';
import { MealPlanSlotUpdateManyMutationInputObjectSchema as MealPlanSlotUpdateManyMutationInputObjectSchema } from './MealPlanSlotUpdateManyMutationInput.schema';
import { MealPlanSlotUncheckedUpdateManyWithoutRecipeInputObjectSchema as MealPlanSlotUncheckedUpdateManyWithoutRecipeInputObjectSchema } from './MealPlanSlotUncheckedUpdateManyWithoutRecipeInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => MealPlanSlotScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => MealPlanSlotUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => MealPlanSlotUncheckedUpdateManyWithoutRecipeInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const MealPlanSlotUpdateManyWithWhereWithoutRecipeInputObjectSchema: z.ZodType<Prisma.MealPlanSlotUpdateManyWithWhereWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotUpdateManyWithWhereWithoutRecipeInput>;
export const MealPlanSlotUpdateManyWithWhereWithoutRecipeInputObjectZodSchema =
  makeSchema();
