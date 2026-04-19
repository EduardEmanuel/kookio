import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      userId: z.literal(true).optional(),
      dietaryRestrictionId: z.literal(true).optional(),
    })
    .strict();
export const UserDietaryRestrictionMaxAggregateInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionMaxAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionMaxAggregateInputType>;
export const UserDietaryRestrictionMaxAggregateInputObjectZodSchema =
  makeSchema();
