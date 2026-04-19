import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      slug: z.literal(true).optional(),
      name: z.literal(true).optional(),
      emoji: z.literal(true).optional(),
      category: z.literal(true).optional(),
    })
    .strict();
export const UtensilMinAggregateInputObjectSchema: z.ZodType<Prisma.UtensilMinAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.UtensilMinAggregateInputType>;
export const UtensilMinAggregateInputObjectZodSchema = makeSchema();
