import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealCategoryUpdateManyMutationInputObjectSchema as MealCategoryUpdateManyMutationInputObjectSchema } from './objects/MealCategoryUpdateManyMutationInput.schema';
import { MealCategoryWhereInputObjectSchema as MealCategoryWhereInputObjectSchema } from './objects/MealCategoryWhereInput.schema';

export const MealCategoryUpdateManySchema: z.ZodType<Prisma.MealCategoryUpdateManyArgs> =
  z
    .object({
      data: MealCategoryUpdateManyMutationInputObjectSchema,
      where: MealCategoryWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.MealCategoryUpdateManyArgs>;

export const MealCategoryUpdateManyZodSchema = z
  .object({
    data: MealCategoryUpdateManyMutationInputObjectSchema,
    where: MealCategoryWhereInputObjectSchema.optional(),
  })
  .strict();
