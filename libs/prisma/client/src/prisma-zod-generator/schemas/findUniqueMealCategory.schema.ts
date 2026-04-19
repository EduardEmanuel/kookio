import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealCategorySelectObjectSchema as MealCategorySelectObjectSchema } from './objects/MealCategorySelect.schema';
import { MealCategoryIncludeObjectSchema as MealCategoryIncludeObjectSchema } from './objects/MealCategoryInclude.schema';
import { MealCategoryWhereUniqueInputObjectSchema as MealCategoryWhereUniqueInputObjectSchema } from './objects/MealCategoryWhereUniqueInput.schema';

export const MealCategoryFindUniqueSchema: z.ZodType<Prisma.MealCategoryFindUniqueArgs> =
  z
    .object({
      select: MealCategorySelectObjectSchema.optional(),
      include: MealCategoryIncludeObjectSchema.optional(),
      where: MealCategoryWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.MealCategoryFindUniqueArgs>;

export const MealCategoryFindUniqueZodSchema = z
  .object({
    select: MealCategorySelectObjectSchema.optional(),
    include: MealCategoryIncludeObjectSchema.optional(),
    where: MealCategoryWhereUniqueInputObjectSchema,
  })
  .strict();
