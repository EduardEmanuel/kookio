import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutMealPlansInputObjectSchema as UserCreateNestedOneWithoutMealPlansInputObjectSchema } from './UserCreateNestedOneWithoutMealPlansInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      name: z.string().optional().nullable(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      user: z.lazy(() => UserCreateNestedOneWithoutMealPlansInputObjectSchema),
    })
    .strict();
export const MealPlanCreateWithoutSlotsInputObjectSchema: z.ZodType<Prisma.MealPlanCreateWithoutSlotsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanCreateWithoutSlotsInput>;
export const MealPlanCreateWithoutSlotsInputObjectZodSchema = makeSchema();
