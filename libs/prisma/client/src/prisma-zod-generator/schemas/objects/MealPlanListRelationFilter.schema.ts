import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanWhereInputObjectSchema as MealPlanWhereInputObjectSchema } from './MealPlanWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      every: z.lazy(() => MealPlanWhereInputObjectSchema).optional(),
      some: z.lazy(() => MealPlanWhereInputObjectSchema).optional(),
      none: z.lazy(() => MealPlanWhereInputObjectSchema).optional(),
    })
    .strict();
export const MealPlanListRelationFilterObjectSchema: z.ZodType<Prisma.MealPlanListRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanListRelationFilter>;
export const MealPlanListRelationFilterObjectZodSchema = makeSchema();
