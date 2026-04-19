import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealAreaSelectObjectSchema as MealAreaSelectObjectSchema } from './objects/MealAreaSelect.schema';
import { MealAreaIncludeObjectSchema as MealAreaIncludeObjectSchema } from './objects/MealAreaInclude.schema';
import { MealAreaWhereUniqueInputObjectSchema as MealAreaWhereUniqueInputObjectSchema } from './objects/MealAreaWhereUniqueInput.schema';
import { MealAreaCreateInputObjectSchema as MealAreaCreateInputObjectSchema } from './objects/MealAreaCreateInput.schema';
import { MealAreaUncheckedCreateInputObjectSchema as MealAreaUncheckedCreateInputObjectSchema } from './objects/MealAreaUncheckedCreateInput.schema';
import { MealAreaUpdateInputObjectSchema as MealAreaUpdateInputObjectSchema } from './objects/MealAreaUpdateInput.schema';
import { MealAreaUncheckedUpdateInputObjectSchema as MealAreaUncheckedUpdateInputObjectSchema } from './objects/MealAreaUncheckedUpdateInput.schema';

export const MealAreaUpsertOneSchema: z.ZodType<Prisma.MealAreaUpsertArgs> = z
  .object({
    select: MealAreaSelectObjectSchema.optional(),
    include: MealAreaIncludeObjectSchema.optional(),
    where: MealAreaWhereUniqueInputObjectSchema,
    create: z.union([
      MealAreaCreateInputObjectSchema,
      MealAreaUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      MealAreaUpdateInputObjectSchema,
      MealAreaUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict() as unknown as z.ZodType<Prisma.MealAreaUpsertArgs>;

export const MealAreaUpsertOneZodSchema = z
  .object({
    select: MealAreaSelectObjectSchema.optional(),
    include: MealAreaIncludeObjectSchema.optional(),
    where: MealAreaWhereUniqueInputObjectSchema,
    create: z.union([
      MealAreaCreateInputObjectSchema,
      MealAreaUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      MealAreaUpdateInputObjectSchema,
      MealAreaUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict();
