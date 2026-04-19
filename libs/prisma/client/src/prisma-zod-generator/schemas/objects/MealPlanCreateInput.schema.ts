import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutMealPlansInputObjectSchema as UserCreateNestedOneWithoutMealPlansInputObjectSchema } from './UserCreateNestedOneWithoutMealPlansInput.schema';
import { MealPlanSlotCreateNestedManyWithoutMealPlanInputObjectSchema as MealPlanSlotCreateNestedManyWithoutMealPlanInputObjectSchema } from './MealPlanSlotCreateNestedManyWithoutMealPlanInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      name: z.string().optional().nullable(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      user: z.lazy(() => UserCreateNestedOneWithoutMealPlansInputObjectSchema),
      slots: z.lazy(
        () => MealPlanSlotCreateNestedManyWithoutMealPlanInputObjectSchema,
      ),
    })
    .strict();
export const MealPlanCreateInputObjectSchema: z.ZodType<Prisma.MealPlanCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanCreateInput>;
export const MealPlanCreateInputObjectZodSchema = makeSchema();
