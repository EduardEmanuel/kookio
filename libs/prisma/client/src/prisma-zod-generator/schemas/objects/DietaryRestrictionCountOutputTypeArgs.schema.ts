import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DietaryRestrictionCountOutputTypeSelectObjectSchema as DietaryRestrictionCountOutputTypeSelectObjectSchema } from './DietaryRestrictionCountOutputTypeSelect.schema';

const makeSchema = () =>
  z
    .object({
      select: z
        .lazy(() => DietaryRestrictionCountOutputTypeSelectObjectSchema)
        .optional(),
    })
    .strict();
export const DietaryRestrictionCountOutputTypeArgsObjectSchema = makeSchema();
export const DietaryRestrictionCountOutputTypeArgsObjectZodSchema =
  makeSchema();
