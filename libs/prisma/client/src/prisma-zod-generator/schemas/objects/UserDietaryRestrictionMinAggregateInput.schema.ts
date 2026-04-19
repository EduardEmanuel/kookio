import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      userId: z.literal(true).optional(),
      dietaryRestrictionId: z.literal(true).optional(),
    })
    .strict();
export const UserDietaryRestrictionMinAggregateInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionMinAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionMinAggregateInputType>;
export const UserDietaryRestrictionMinAggregateInputObjectZodSchema =
  makeSchema();
