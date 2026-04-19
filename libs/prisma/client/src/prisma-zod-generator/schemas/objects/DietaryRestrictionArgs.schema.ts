import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DietaryRestrictionSelectObjectSchema as DietaryRestrictionSelectObjectSchema } from './DietaryRestrictionSelect.schema';
import { DietaryRestrictionIncludeObjectSchema as DietaryRestrictionIncludeObjectSchema } from './DietaryRestrictionInclude.schema';

const makeSchema = () =>
  z
    .object({
      select: z.lazy(() => DietaryRestrictionSelectObjectSchema).optional(),
      include: z.lazy(() => DietaryRestrictionIncludeObjectSchema).optional(),
    })
    .strict();
export const DietaryRestrictionArgsObjectSchema = makeSchema();
export const DietaryRestrictionArgsObjectZodSchema = makeSchema();
