import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      users: z.boolean().optional(),
    })
    .strict();
export const UtensilCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.UtensilCountOutputTypeSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.UtensilCountOutputTypeSelect>;
export const UtensilCountOutputTypeSelectObjectZodSchema = makeSchema();
