import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      slug: z.literal(true).optional(),
      label: z.literal(true).optional(),
      emoji: z.literal(true).optional(),
      description: z.literal(true).optional(),
    })
    .strict();
export const DietaryRestrictionMaxAggregateInputObjectSchema: z.ZodType<Prisma.DietaryRestrictionMaxAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.DietaryRestrictionMaxAggregateInputType>;
export const DietaryRestrictionMaxAggregateInputObjectZodSchema = makeSchema();
