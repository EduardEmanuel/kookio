import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUtensilFindManySchema as UserUtensilFindManySchema } from '../findManyUserUtensil.schema';
import { UtensilCountOutputTypeArgsObjectSchema as UtensilCountOutputTypeArgsObjectSchema } from './UtensilCountOutputTypeArgs.schema';

const makeSchema = () =>
  z
    .object({
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
export const UtensilIncludeObjectSchema: z.ZodType<Prisma.UtensilInclude> =
  makeSchema() as unknown as z.ZodType<Prisma.UtensilInclude>;
export const UtensilIncludeObjectZodSchema = makeSchema();
