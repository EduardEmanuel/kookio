import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealAreaUpdateManyMutationInputObjectSchema as MealAreaUpdateManyMutationInputObjectSchema } from './objects/MealAreaUpdateManyMutationInput.schema';
import { MealAreaWhereInputObjectSchema as MealAreaWhereInputObjectSchema } from './objects/MealAreaWhereInput.schema';

export const MealAreaUpdateManySchema: z.ZodType<Prisma.MealAreaUpdateManyArgs> =
  z
    .object({
      data: MealAreaUpdateManyMutationInputObjectSchema,
      where: MealAreaWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.MealAreaUpdateManyArgs>;

export const MealAreaUpdateManyZodSchema = z
  .object({
    data: MealAreaUpdateManyMutationInputObjectSchema,
    where: MealAreaWhereInputObjectSchema.optional(),
  })
  .strict();
