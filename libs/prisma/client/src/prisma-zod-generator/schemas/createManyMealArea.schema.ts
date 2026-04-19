import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealAreaCreateManyInputObjectSchema as MealAreaCreateManyInputObjectSchema } from './objects/MealAreaCreateManyInput.schema';

export const MealAreaCreateManySchema: z.ZodType<Prisma.MealAreaCreateManyArgs> =
  z
    .object({
      data: z.union([
        MealAreaCreateManyInputObjectSchema,
        z.array(MealAreaCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.MealAreaCreateManyArgs>;

export const MealAreaCreateManyZodSchema = z
  .object({
    data: z.union([
      MealAreaCreateManyInputObjectSchema,
      z.array(MealAreaCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();
