import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      userId: z.string(),
      name: z.string().optional().nullable(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();
export const MealPlanCreateManyInputObjectSchema: z.ZodType<Prisma.MealPlanCreateManyInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanCreateManyInput>;
export const MealPlanCreateManyInputObjectZodSchema = makeSchema();
