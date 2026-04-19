import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealCategoryWhereInputObjectSchema as MealCategoryWhereInputObjectSchema } from './objects/MealCategoryWhereInput.schema';

export const MealCategoryDeleteManySchema: z.ZodType<Prisma.MealCategoryDeleteManyArgs> =
  z
    .object({ where: MealCategoryWhereInputObjectSchema.optional() })
    .strict() as unknown as z.ZodType<Prisma.MealCategoryDeleteManyArgs>;

export const MealCategoryDeleteManyZodSchema = z
  .object({ where: MealCategoryWhereInputObjectSchema.optional() })
  .strict();
