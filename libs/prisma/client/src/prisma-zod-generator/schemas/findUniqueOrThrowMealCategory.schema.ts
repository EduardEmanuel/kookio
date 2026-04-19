import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealCategorySelectObjectSchema as MealCategorySelectObjectSchema } from './objects/MealCategorySelect.schema';
import { MealCategoryIncludeObjectSchema as MealCategoryIncludeObjectSchema } from './objects/MealCategoryInclude.schema';
import { MealCategoryWhereUniqueInputObjectSchema as MealCategoryWhereUniqueInputObjectSchema } from './objects/MealCategoryWhereUniqueInput.schema';

export const MealCategoryFindUniqueOrThrowSchema: z.ZodType<Prisma.MealCategoryFindUniqueOrThrowArgs> =
  z
    .object({
      select: MealCategorySelectObjectSchema.optional(),
      include: MealCategoryIncludeObjectSchema.optional(),
      where: MealCategoryWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.MealCategoryFindUniqueOrThrowArgs>;

export const MealCategoryFindUniqueOrThrowZodSchema = z
  .object({
    select: MealCategorySelectObjectSchema.optional(),
    include: MealCategoryIncludeObjectSchema.optional(),
    where: MealCategoryWhereUniqueInputObjectSchema,
  })
  .strict();
