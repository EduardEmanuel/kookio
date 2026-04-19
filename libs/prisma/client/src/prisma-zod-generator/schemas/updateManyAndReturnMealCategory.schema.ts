import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealCategorySelectObjectSchema as MealCategorySelectObjectSchema } from './objects/MealCategorySelect.schema';
import { MealCategoryUpdateManyMutationInputObjectSchema as MealCategoryUpdateManyMutationInputObjectSchema } from './objects/MealCategoryUpdateManyMutationInput.schema';
import { MealCategoryWhereInputObjectSchema as MealCategoryWhereInputObjectSchema } from './objects/MealCategoryWhereInput.schema';

export const MealCategoryUpdateManyAndReturnSchema: z.ZodType<Prisma.MealCategoryUpdateManyAndReturnArgs> =
  z
    .object({
      select: MealCategorySelectObjectSchema.optional(),
      data: MealCategoryUpdateManyMutationInputObjectSchema,
      where: MealCategoryWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.MealCategoryUpdateManyAndReturnArgs>;

export const MealCategoryUpdateManyAndReturnZodSchema = z
  .object({
    select: MealCategorySelectObjectSchema.optional(),
    data: MealCategoryUpdateManyMutationInputObjectSchema,
    where: MealCategoryWhereInputObjectSchema.optional(),
  })
  .strict();
