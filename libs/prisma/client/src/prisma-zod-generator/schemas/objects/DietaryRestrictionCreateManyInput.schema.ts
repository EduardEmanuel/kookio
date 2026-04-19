import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      slug: z.string(),
      label: z.string(),
      emoji: z.string().optional().nullable(),
      description: z.string().optional().nullable(),
    })
    .strict();
export const DietaryRestrictionCreateManyInputObjectSchema: z.ZodType<Prisma.DietaryRestrictionCreateManyInput> =
  makeSchema() as unknown as z.ZodType<Prisma.DietaryRestrictionCreateManyInput>;
export const DietaryRestrictionCreateManyInputObjectZodSchema = makeSchema();
