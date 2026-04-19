import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealAreaSelectObjectSchema as MealAreaSelectObjectSchema } from './objects/MealAreaSelect.schema';
import { MealAreaIncludeObjectSchema as MealAreaIncludeObjectSchema } from './objects/MealAreaInclude.schema';
import { MealAreaWhereUniqueInputObjectSchema as MealAreaWhereUniqueInputObjectSchema } from './objects/MealAreaWhereUniqueInput.schema';

export const MealAreaDeleteOneSchema: z.ZodType<Prisma.MealAreaDeleteArgs> = z
  .object({
    select: MealAreaSelectObjectSchema.optional(),
    include: MealAreaIncludeObjectSchema.optional(),
    where: MealAreaWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.MealAreaDeleteArgs>;

export const MealAreaDeleteOneZodSchema = z
  .object({
    select: MealAreaSelectObjectSchema.optional(),
    include: MealAreaIncludeObjectSchema.optional(),
    where: MealAreaWhereUniqueInputObjectSchema,
  })
  .strict();
