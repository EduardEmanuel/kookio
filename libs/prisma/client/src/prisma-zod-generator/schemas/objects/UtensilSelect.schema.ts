import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUtensilFindManySchema as UserUtensilFindManySchema } from '../findManyUserUtensil.schema';
import { UtensilCountOutputTypeArgsObjectSchema as UtensilCountOutputTypeArgsObjectSchema } from './UtensilCountOutputTypeArgs.schema';

const makeSchema = () =>
  z
    .object({
      id: z.boolean().optional(),
      slug: z.boolean().optional(),
      name: z.boolean().optional(),
      emoji: z.boolean().optional(),
      category: z.boolean().optional(),
      users: z
        .union([z.boolean(), z.lazy(() => UserUtensilFindManySchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => UtensilCountOutputTypeArgsObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const UtensilSelectObjectSchema: z.ZodType<Prisma.UtensilSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.UtensilSelect>;
export const UtensilSelectObjectZodSchema = makeSchema();
