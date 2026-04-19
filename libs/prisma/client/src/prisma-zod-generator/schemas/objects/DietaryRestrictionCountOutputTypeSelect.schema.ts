import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      users: z.boolean().optional(),
    })
    .strict();
export const DietaryRestrictionCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.DietaryRestrictionCountOutputTypeSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.DietaryRestrictionCountOutputTypeSelect>;
export const DietaryRestrictionCountOutputTypeSelectObjectZodSchema =
  makeSchema();
