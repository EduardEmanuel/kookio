import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UtensilCountOutputTypeSelectObjectSchema as UtensilCountOutputTypeSelectObjectSchema } from './UtensilCountOutputTypeSelect.schema';

const makeSchema = () =>
  z
    .object({
      select: z.lazy(() => UtensilCountOutputTypeSelectObjectSchema).optional(),
    })
    .strict();
export const UtensilCountOutputTypeArgsObjectSchema = makeSchema();
export const UtensilCountOutputTypeArgsObjectZodSchema = makeSchema();
