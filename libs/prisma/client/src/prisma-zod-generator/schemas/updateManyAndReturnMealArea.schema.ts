import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealAreaSelectObjectSchema as MealAreaSelectObjectSchema } from './objects/MealAreaSelect.schema';
import { MealAreaUpdateManyMutationInputObjectSchema as MealAreaUpdateManyMutationInputObjectSchema } from './objects/MealAreaUpdateManyMutationInput.schema';
import { MealAreaWhereInputObjectSchema as MealAreaWhereInputObjectSchema } from './objects/MealAreaWhereInput.schema';

export const MealAreaUpdateManyAndReturnSchema: z.ZodType<Prisma.MealAreaUpdateManyAndReturnArgs> =
  z
    .object({
      select: MealAreaSelectObjectSchema.optional(),
      data: MealAreaUpdateManyMutationInputObjectSchema,
      where: MealAreaWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.MealAreaUpdateManyAndReturnArgs>;

export const MealAreaUpdateManyAndReturnZodSchema = z
  .object({
    select: MealAreaSelectObjectSchema.optional(),
    data: MealAreaUpdateManyMutationInputObjectSchema,
    where: MealAreaWhereInputObjectSchema.optional(),
  })
  .strict();
