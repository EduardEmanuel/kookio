import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UtensilSelectObjectSchema as UtensilSelectObjectSchema } from './UtensilSelect.schema';
import { UtensilIncludeObjectSchema as UtensilIncludeObjectSchema } from './UtensilInclude.schema';

const makeSchema = () =>
  z
    .object({
      select: z.lazy(() => UtensilSelectObjectSchema).optional(),
      include: z.lazy(() => UtensilIncludeObjectSchema).optional(),
    })
    .strict();
export const UtensilArgsObjectSchema = makeSchema();
export const UtensilArgsObjectZodSchema = makeSchema();
