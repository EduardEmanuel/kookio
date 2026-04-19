import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealAreaSelectObjectSchema as MealAreaSelectObjectSchema } from './objects/MealAreaSelect.schema';
import { MealAreaIncludeObjectSchema as MealAreaIncludeObjectSchema } from './objects/MealAreaInclude.schema';
import { MealAreaUpdateInputObjectSchema as MealAreaUpdateInputObjectSchema } from './objects/MealAreaUpdateInput.schema';
import { MealAreaUncheckedUpdateInputObjectSchema as MealAreaUncheckedUpdateInputObjectSchema } from './objects/MealAreaUncheckedUpdateInput.schema';
import { MealAreaWhereUniqueInputObjectSchema as MealAreaWhereUniqueInputObjectSchema } from './objects/MealAreaWhereUniqueInput.schema';

export const MealAreaUpdateOneSchema: z.ZodType<Prisma.MealAreaUpdateArgs> = z
  .object({
    select: MealAreaSelectObjectSchema.optional(),
    include: MealAreaIncludeObjectSchema.optional(),
    data: z.union([
      MealAreaUpdateInputObjectSchema,
      MealAreaUncheckedUpdateInputObjectSchema,
    ]),
    where: MealAreaWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.MealAreaUpdateArgs>;

export const MealAreaUpdateOneZodSchema = z
  .object({
    select: MealAreaSelectObjectSchema.optional(),
    include: MealAreaIncludeObjectSchema.optional(),
    data: z.union([
      MealAreaUpdateInputObjectSchema,
      MealAreaUncheckedUpdateInputObjectSchema,
    ]),
    where: MealAreaWhereUniqueInputObjectSchema,
  })
  .strict();
