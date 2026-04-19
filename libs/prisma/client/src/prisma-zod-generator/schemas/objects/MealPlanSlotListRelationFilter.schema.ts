import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealPlanSlotWhereInputObjectSchema as MealPlanSlotWhereInputObjectSchema } from './MealPlanSlotWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      every: z.lazy(() => MealPlanSlotWhereInputObjectSchema).optional(),
      some: z.lazy(() => MealPlanSlotWhereInputObjectSchema).optional(),
      none: z.lazy(() => MealPlanSlotWhereInputObjectSchema).optional(),
    })
    .strict();
export const MealPlanSlotListRelationFilterObjectSchema: z.ZodType<Prisma.MealPlanSlotListRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSlotListRelationFilter>;
export const MealPlanSlotListRelationFilterObjectZodSchema = makeSchema();
