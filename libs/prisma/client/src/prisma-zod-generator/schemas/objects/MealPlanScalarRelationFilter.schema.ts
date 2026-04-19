import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanWhereInputObjectSchema as MealPlanWhereInputObjectSchema } from './MealPlanWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      is: z.lazy(() => MealPlanWhereInputObjectSchema).optional(),
      isNot: z.lazy(() => MealPlanWhereInputObjectSchema).optional(),
    })
    .strict();
export const MealPlanScalarRelationFilterObjectSchema: z.ZodType<Prisma.MealPlanScalarRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanScalarRelationFilter>;
export const MealPlanScalarRelationFilterObjectZodSchema = makeSchema();
