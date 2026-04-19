import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PantryItemSelectObjectSchema as PantryItemSelectObjectSchema } from './PantryItemSelect.schema';
import { PantryItemIncludeObjectSchema as PantryItemIncludeObjectSchema } from './PantryItemInclude.schema';

const makeSchema = () =>
  z
    .object({
      select: z.lazy(() => PantryItemSelectObjectSchema).optional(),
      include: z.lazy(() => PantryItemIncludeObjectSchema).optional(),
    })
    .strict();
export const PantryItemArgsObjectSchema = makeSchema();
export const PantryItemArgsObjectZodSchema = makeSchema();
