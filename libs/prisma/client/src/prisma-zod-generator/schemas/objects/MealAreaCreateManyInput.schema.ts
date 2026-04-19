import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      externalId: z.string(),
      name: z.string(),
      flag: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
    })
    .strict();
export const MealAreaCreateManyInputObjectSchema: z.ZodType<Prisma.MealAreaCreateManyInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealAreaCreateManyInput>;
export const MealAreaCreateManyInputObjectZodSchema = makeSchema();
