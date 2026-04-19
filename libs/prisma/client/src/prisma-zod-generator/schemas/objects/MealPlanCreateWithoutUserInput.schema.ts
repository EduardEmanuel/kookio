import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanSlotCreateNestedManyWithoutMealPlanInputObjectSchema as MealPlanSlotCreateNestedManyWithoutMealPlanInputObjectSchema } from './MealPlanSlotCreateNestedManyWithoutMealPlanInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      name: z.string().optional().nullable(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      slots: z
        .lazy(
          () => MealPlanSlotCreateNestedManyWithoutMealPlanInputObjectSchema,
        )
        .optional(),
    })
    .strict();
export const MealPlanCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.MealPlanCreateWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanCreateWithoutUserInput>;
export const MealPlanCreateWithoutUserInputObjectZodSchema = makeSchema();
