import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealAreaWhereInputObjectSchema as MealAreaWhereInputObjectSchema } from './objects/MealAreaWhereInput.schema';

export const MealAreaDeleteManySchema: z.ZodType<Prisma.MealAreaDeleteManyArgs> =
  z
    .object({ where: MealAreaWhereInputObjectSchema.optional() })
    .strict() as unknown as z.ZodType<Prisma.MealAreaDeleteManyArgs>;

export const MealAreaDeleteManyZodSchema = z
  .object({ where: MealAreaWhereInputObjectSchema.optional() })
  .strict();
