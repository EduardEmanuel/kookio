import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealAreaSelectObjectSchema as MealAreaSelectObjectSchema } from './objects/MealAreaSelect.schema';
import { MealAreaCreateManyInputObjectSchema as MealAreaCreateManyInputObjectSchema } from './objects/MealAreaCreateManyInput.schema';

export const MealAreaCreateManyAndReturnSchema: z.ZodType<Prisma.MealAreaCreateManyAndReturnArgs> =
  z
    .object({
      select: MealAreaSelectObjectSchema.optional(),
      data: z.union([
        MealAreaCreateManyInputObjectSchema,
        z.array(MealAreaCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.MealAreaCreateManyAndReturnArgs>;

export const MealAreaCreateManyAndReturnZodSchema = z
  .object({
    select: MealAreaSelectObjectSchema.optional(),
    data: z.union([
      MealAreaCreateManyInputObjectSchema,
      z.array(MealAreaCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
