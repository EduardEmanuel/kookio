import * as z from 'zod';
import type { Prisma } from '@prisma/client';

const makeSchema = () =>
  z
    .object({
      credentials: z.boolean().optional(),
      pantryItems: z.boolean().optional(),
      recipes: z.boolean().optional(),
      collections: z.boolean().optional(),
      mealPlans: z.boolean().optional(),
      cookingSessions: z.boolean().optional(),
    })
    .strict();
export const UserCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.UserCountOutputTypeSelect>;
export const UserCountOutputTypeSelectObjectZodSchema = makeSchema();
