import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealAreaSelectObjectSchema as MealAreaSelectObjectSchema } from './objects/MealAreaSelect.schema';
import { MealAreaIncludeObjectSchema as MealAreaIncludeObjectSchema } from './objects/MealAreaInclude.schema';
import { MealAreaCreateInputObjectSchema as MealAreaCreateInputObjectSchema } from './objects/MealAreaCreateInput.schema';
import { MealAreaUncheckedCreateInputObjectSchema as MealAreaUncheckedCreateInputObjectSchema } from './objects/MealAreaUncheckedCreateInput.schema';

export const MealAreaCreateOneSchema: z.ZodType<Prisma.MealAreaCreateArgs> = z
  .object({
    select: MealAreaSelectObjectSchema.optional(),
    include: MealAreaIncludeObjectSchema.optional(),
    data: z.union([
      MealAreaCreateInputObjectSchema,
      MealAreaUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict() as unknown as z.ZodType<Prisma.MealAreaCreateArgs>;

export const MealAreaCreateOneZodSchema = z
  .object({
    select: MealAreaSelectObjectSchema.optional(),
    include: MealAreaIncludeObjectSchema.optional(),
    data: z.union([
      MealAreaCreateInputObjectSchema,
      MealAreaUncheckedCreateInputObjectSchema,
    ]),
  })
  .strict();
